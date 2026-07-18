import nodemailer from "nodemailer";

export async function sendEmail(to, subject, htmlContent) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;

  if (process.env.NODE_ENV === "test" || !user || !pass) {
    if (process.env.NODE_ENV !== "test") {
      console.warn("WARNING: GMAIL_USER or GMAIL_PASS is not defined in .env. Falling back to console logging.");
    }
    console.log(`\n=================================================`);
    console.log(`[EMAIL Mock/Fallback] To: ${to}\nSubject: ${subject}\nBody: ${htmlContent}`);
    console.log(`=================================================\n`);
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"SALESHUB" <${user}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });
    console.log(`Live Email sent via Gmail SMTP to ${to} (MessageID: ${info.messageId})`);
    return info;
  } catch (error) {
    console.error("Failed to send email via Gmail SMTP:", error.message);
  }
}
