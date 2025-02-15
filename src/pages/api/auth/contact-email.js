import nodemailer from "nodemailer";

const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message, subject } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for SSL
    secure: true, // True for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // HTML Email Template
  const emailHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoUrl}" alt="Logo" style="width: 150px; height: auto;"/>
          </div>
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">New Contact Message</h2>
            <p style="font-size: 16px;">You have received a new message from <strong>${name}</strong>:</p>
            <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
            <div style="border-top: 1px solid #e0e0e0; margin-top: 20px; padding-top: 20px;">
              <p style="font-size: 16px; font-weight: bold;">Message:</p>
              <p style="font-size: 16px; line-height: 1.6;">${message}</p>
            </div>
            <div style="margin-top: 30px; text-align: center; font-size: 14px; color: #777;">
              <p>Thank you for reaching out to us!</p>
              <p style="margin-top: 5px;">&copy; ${new Date().getFullYear()} IHB. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Subject: ${subject}`,
      html: emailHtml,
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
