// pages/api/sendMessage.js
import nodemailer from "nodemailer";
import cors, { runMiddleware } from "../../lib/cors";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "justj0267@gmail.com", // Use environment variables for security
    pass: "frmh pcwb elii btdv", // Use an app-specific password for Gmail
  },
});

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
  const mailOptions = {
    from: "justj0267@gmail.com",
    to: "dp868304@gmail.com", // Admin email to receive messages
    subject: req.body.data.subject,
    text: req.body.data.message + "\n Email User >> " + req.body.data.email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send message." });
  }
}
