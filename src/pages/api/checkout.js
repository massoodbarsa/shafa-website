import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { packageId, currency = "eur" } = req.body;

    const packages = {
      "1 month": { price: 10, name: "1 Month Subscription" },
      "3 months": { price: 25, name: "3 Months Subscription" },
      "1 year": { price: 90, name: "1 Year Subscription" },
    };

    if (!packages[packageId]) {
      return res.status(400).json({ error: "Invalid package selected" });
    }

    // Create a Stripe Checkout Session with European payment methods
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["ideal", "bancontact", "sofort", "card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: packages[packageId].name,
            },
            unit_amount: packages[packageId].price * 100, // Convert EUR to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        userId: req.body.userId, // ✅ Ensure userId is passed from frontend
        packageId: packageId, // ✅ Ensure packageId is included
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
