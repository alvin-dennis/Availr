import nodemailer from "nodemailer";
import fs from "fs";
import { EMAIL_TEMPLATE, EMAIL_SUBJECT } from "../constants.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { getSession } from "./auth.js";   

dotenv.config();

const generateToken = (name, email) => {
  const payload = { name, email };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
};

export const sendEmails = async () => {
  try {
    const { email: sender, appPassword } = getSession();
    const emails = JSON.parse(fs.readFileSync("./emails.json"));

    if (!Array.isArray(emails)) {
      throw new Error(
        `emails.json must contain an array. Found: ${typeof emails}`
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender,
        pass: appPassword,
      },

    });
    const failedEmails = [];

    for (const user of emails) {
      const email = user.email || user.Email;
      const name = user.name || user.Name || "there";

      if (!email) continue;

      try {
        const token = generateToken(name, email);

        await transporter.sendMail({
          from: sender,
          to: email,
          subject: EMAIL_SUBJECT,
          html: EMAIL_TEMPLATE(
            name,
            `http://localhost:3000/confirm?token=${encodeURIComponent(token)}`
          ),
        });
        console.log(`✉️ Sent to ${email}`);
      } catch (sendError) {
        console.error(`❌ Failed to send to ${email}: ${sendError.message}`);
        failedEmails.push({ ...user, error: sendError.message });
      }
    }

    if (failedEmails.length > 0) {
      fs.writeFileSync(
        "./failedEmails.json",
        JSON.stringify(failedEmails, null, 2)
      );
      console.log(
        `⚠️  ${failedEmails.length} failed email(s) saved to failedEmails.json`
      );
    }
  } catch (error) {
    console.error("Error sending emails:", error.message);
    throw error;
  }
};