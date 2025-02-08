import { buffer } from "micro";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

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

    // Calculate subscription dates
    const startDate = new Date();
    let endDate = new Date();
    if (packageId === "1month") endDate.setMonth(endDate.getMonth() + 1);
    if (packageId === "3months") endDate.setMonth(endDate.getMonth() + 3);
    if (packageId === "1year") endDate.setFullYear(endDate.getFullYear() + 1);

    console.log("📅 Subscription Start:", startDate);
    console.log("📅 Subscription End:", endDate);

    // Insert into Supabase
    const { error } = await supabase.from("subscriptions").insert([
      {
        user_id: userId,
        stripe_subscription_id: session.subscription,
        stripe_customer_id: session.customer,
        package: packageId,
        status: "active",
        start_date: startDate,
        end_date: endDate,
      },
    ]);

    if (error) {
      console.error("❌ Supabase Insert Error:", error);
      return res.status(500).json({ error: "Failed to save subscription" });
    }

    console.log("✅ Subscription inserted successfully");
  }

  res.json({ received: true });
}
