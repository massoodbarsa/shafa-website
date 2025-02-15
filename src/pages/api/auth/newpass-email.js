// pages/api/auth/newpass-email.js
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  try {
    // Generate reset token
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Construct reset link
    const resetLink = new URL(
      "/auth/update-password",
      process.env.NEXT_PUBLIC_APP_URL
    );
    resetLink.searchParams.set("token", encodeURIComponent(resetToken));
    resetLink.searchParams.set("email", encodeURIComponent(email));

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click here to reset your password: <a href="${resetLink.toString()}">Reset Password</a></p>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      error: "Failed to send password reset email",
      details: error.message,
    });
  }
}
