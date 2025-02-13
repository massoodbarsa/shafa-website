import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for SSL
    secure: true, // True for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"IHB" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "Verify Your Email",
      html: `<a href="${req.body.link}">Verify Email</a>`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Full error details:", error);
    return res.status(500).json({
      error: "Email failed to send",
      details: error.response || error.message,
    });
  }
}
