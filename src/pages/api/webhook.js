import { buffer } from "micro";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { PackageTypes, Status } from "@/src/enums/PackageTypes";

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const { userId, packageId } = session.metadata || {};

    if (!userId || !packageId) {
      console.error("❌ Missing metadata:", session.metadata);
      return res.status(400).json({ error: "Missing userId or packageId" });
    }

    // Fetch the doctor by user_id
    const { data: doctor, error: doctorFetchError } = await supabase
      .from("doctors")
      .select("id, end_date, last_package")
      .eq("id", userId)
      .single();

    if (doctorFetchError || !doctor) {
      console.error("❌ Doctor not found:", doctorFetchError);
      return res.status(404).json({ error: "Doctor not found" });
    }

    const startDate = new Date();
    let endDate = new Date(doctor.end_date || startDate);

    if (packageId === PackageTypes.BRONZE)
      endDate.setMonth(endDate.getMonth() + 3);
    if (packageId === PackageTypes.SILVER)
      endDate.setMonth(endDate.getMonth() + 6);
    if (packageId === PackageTypes.GOLD)
      endDate.setFullYear(endDate.getFullYear() + 1);

    // Determine if the doctor should be featured
    const isFeatured = packageId === PackageTypes.GOLD;

    // Update the existing doctor's subscription
    const { error: updateError } = await supabase
      .from("doctors")
      .update({
        last_package: packageId,
        status: Status.ACTIVE,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        featured: isFeatured,
      })
      .eq("id", doctor.id);

    if (updateError) {
      console.error("❌ Error updating subscription:", updateError);
      return res.status(500).json({ error: "Failed to update subscription" });
    }
  }

  res.json({ received: true });
}
