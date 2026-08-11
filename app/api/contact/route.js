import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    console.log(name);

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Name, email and message are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your Gmail
        pass: process.env.SMTP_PASS, // Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"SHAFA Contact" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_USER, // or a different address if you prefer
      subject: subject || `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "—"}
Subject: ${subject || "—"}

Message:
${message}
      `.trim(),
      html: `
        <div style="font-family: Georgia, serif; color: #333; line-height: 1.6;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "—"}</p>
          <p><strong>Subject:</strong> ${subject || "—"}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { message: "Failed to send message." },
      { status: 500 },
    );
  }
}
