import nodemailer from "nodemailer";

const logoUrl = `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`;

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
      from: `"IDH" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "Verify Your Email Address",
      text: `Please verify your email: ${req.body.link}`,
      html: `
        <!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!--[if mso]>
          <xml><o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office"></o:OfficeDocumentSettings></xml>
          <style type="text/css">
            td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: Arial, sans-serif;}
          </style>
          <![endif]-->
        </head>
        <body style="margin:0;padding:0;background:#f3f4f6;">
          <!-- Hidden preheader text -->
          <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
            Confirm your email address to complete your IDH registration
          </div>
    
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="center" style="padding:24px;">
                <table width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;padding:24px;" role="presentation">
                  <tr>
                    <td align="center" style="padding-bottom:24px;">
                      <img src="${logoUrl}" width="120" alt="IDH Logo" style="max-width:120px;height:auto;">
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:24px;">
                      <h1 style="color:#111827;font-size:24px;margin:0 0 16px;">Almost there, </h1>
                      <p style="color:#4b5563;margin:0 0 24px;line-height:1.5;">
                        Please verify your email address to activate your IDH account.
                      </p>
                      <a href="${req.body.link}" 
                         style="background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;display:inline-block;font-weight:500;">
                        Confirm Email
                      </a>
                    </td>
                  </tr>
                  <tr>
                
                  </tr>
                </table>
                
                <!-- Footer -->
                <table width="100%" style="max-width:600px;padding:24px 0;" role="presentation">
                  <tr>
                    <td align="center" style="color:#6b7280;font-size:12px;">
                      <p style="margin:0 0 8px;">
                        © ${new Date().getFullYear()} IDH. All rights reserved.
                      </p>
                  
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
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
