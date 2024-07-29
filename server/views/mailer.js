import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_NODEMAILER,
    pass: process.env.PASS_NODEMAILER,
  },
});

// Function to send email
const sendEmail = async (to, templateData) => {
  const templatePath = path.join(__dirname, `workspaceinvite.ejs`);
  const template = fs.readFileSync(templatePath, 'utf8');
  const htmlContent = ejs.render(template, templateData);

  const mailOptions = {
    from: process.env.EMAIL_NODEMAILER,
    to,
    subject: "Invitation for Notion Teamspace.",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
