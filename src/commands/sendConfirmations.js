import fs from "fs";
import { CONFIRM_TEMPLATE } from "../constants.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendConfirmations = async () => {
  const confirmations = JSON.parse(
    fs.readFileSync("./confirmations.json", "utf-8")
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AVAILR_EMAIL,
      pass: process.env.AVAILR_PASS,
    },
  });

  for (const entry of confirmations) {
    await transporter.sendMail({
      from: process.env.AVAILR_EMAIL,
      to: entry.email,
      subject: "Confirmation Received",
      html: CONFIRM_TEMPLATE(entry.name, entry.slot),
    });
    console.log(`✅ Confirmation email sent to ${entry.email}`);
  }
};
