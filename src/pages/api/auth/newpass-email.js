import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  try {
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const resetLink = new URL(
      "/auth/update-password",
      process.env.NEXT_PUBLIC_APP_URL
    );
    resetLink.searchParams.set("token", resetToken);
    resetLink.searchParams.set("email", email);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IDH" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
        <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            You requested a password reset. Click the button below to proceed:
          </p>
          <a href="${resetLink.toString()}" style="display: inline-block; background-color: #3c15ea; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: bold; margin: 20px 0;">
            Reset Password
          </a>
          <p style="color: #666; font-size: 14px; line-height: 1.5;">
            If you didn’t request this, please ignore this email.
          </p>
          <p style="color: #888; font-size: 12px; margin-top: 20px;">
            This link will expire in 1 hour for security reasons.
          </p>
        </div>
      </div>
    `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Password reset error:", error);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
}
