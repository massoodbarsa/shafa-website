import { buffer } from "micro";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { PackageTypes } from "@/enums/PackageTypes";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const sig = req.headers["stripe-signature"];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook Signature Verification Failed", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("✅ Webhook received:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Checkout Session Data:", session);

    const { userId, packageId } = session.metadata || {};

    if (!userId || !packageId) {
      console.error("❌ Missing metadata:", session.metadata);
      return res.status(400).json({ error: "Missing userId or packageId" });
    }

    // Set the start date to the current date
    const startDate = new Date();

    // Create a new Date object for the end date to ensure it's independent of the start date
    let endDate = new Date(startDate); // Create a new Date object to avoid modifying the start date

    // Calculate the end date based on the packageId
    if (packageId === PackageTypes.ONE_MONTH)
      endDate.setMonth(endDate.getMonth() + 1);
    if (packageId === PackageTypes.THREE_MONTHS)
      endDate.setMonth(endDate.getMonth() + 3);
    if (packageId === PackageTypes.ONE_YEAR)
      endDate.setFullYear(endDate.getFullYear() + 1);

    console.log("📅 Subscription Start:", startDate);
    console.log("📅 Subscription End:", endDate);

    // Check if the user already has an active subscription
    const { data: existingSubscriptions, error: fetchError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active");

    if (fetchError) {
      console.error("❌ Error fetching existing subscription:", fetchError);
      return res
        .status(500)
        .json({ error: "Error fetching existing subscription" });
    }

    if (existingSubscriptions.length > 0) {
      // There's an active subscription, so we update the end date
      const existingSubscription = existingSubscriptions[0]; // Get the first active subscription

      const updatedEndDate = new Date(existingSubscription.end_date);
      // Extend the subscription based on the new package
      if (packageId === PackageTypes.ONE_MONTH)
        updatedEndDate.setMonth(updatedEndDate.getMonth() + 1);
      if (packageId === PackageTypes.THREE_MONTHS)
        updatedEndDate.setMonth(updatedEndDate.getMonth() + 3);
      if (packageId === PackageTypes.ONE_YEAR)
        updatedEndDate.setFullYear(updatedEndDate.getFullYear() + 1);

      // Update subscription in the database
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          stripe_subscription_id: session.subscription,
          stripe_customer_id: session.customer,
          last_package: packageId,
          status: "active",
          end_date: updatedEndDate.toISOString(),
        })
        .eq("user_id", userId);

      if (updateError) {
        console.error("❌ Error updating subscription:", updateError);
        return res.status(500).json({ error: "Failed to update subscription" });
      }

      console.log("✅ Subscription updated successfully");
    } else {
      // Insert a new subscription record if none exists
      const { error: insertError } = await supabase
        .from("subscriptions")
        .insert([
          {
            user_id: userId,
            stripe_subscription_id: session.subscription,
            stripe_customer_id: session.customer,
            last_package: packageId,
            status: "active",
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
          },
        ]);

      if (insertError) {
        console.error("❌ Supabase Insert Error:", insertError);
        return res.status(500).json({ error: "Failed to save subscription" });
      }

      console.log("✅ Subscription inserted successfully");
    }
  }

  res.json({ received: true });
}
