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
      from: `"IHB" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h2 {
            color: #333;
        }
        p {
            color: #666;
            font-size: 16px;
            line-height: 1.5;
        }
        .btn {
            display: inline-block;
            background-color: #fff;
            color: #fff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            border: 2px #3c15ea solid
        }
        .btn:hover {
            background-color: #3c15ea;
            color:#fff
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Password Reset Request</h2>
    <p>You recently requested to reset your password. Click the button below to proceed:</p>
    <a href="${resetLink.toString()}" class="btn">Reset Password</a>
    <p>If you didn’t request this, please ignore this email.</p>
    <p class="footer">This link will expire in 1 hour for security reasons.</p>
</div>

</body>
</html>
`,
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
