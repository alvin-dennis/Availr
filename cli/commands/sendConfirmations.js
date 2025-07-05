import fs from "fs";
import { CONFIRM_TEMPLATE } from "../constants.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { getSession } from "./auth.js";
dotenv.config();

export const sendConfirmations = async () => {
  const confirmations = JSON.parse(
    fs.readFileSync("./confirmations.json", "utf-8")
  );

  const { email: sender, appPassword } = getSession();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: appPassword,
    },
  });

  for (const entry of confirmations) {
    await transporter.sendMail({
      from: sender,
      to: entry.email,
      subject: "Confirmation Received",
      html: CONFIRM_TEMPLATE(entry.name, entry.slot),
    });
    console.log(`✅ Confirmation email sent to ${entry.email}`);
  }
};
