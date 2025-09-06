
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

// Get correct folder path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Move to project root folder
const projectRoot = path.join(__dirname, "../../../");

// Correct file locations
const emailFilePath = path.join(projectRoot, "data/email.json");
const confirmationFilePath = path.join(projectRoot, "data/confirmation.json");

export const sendReminders = async () => {
  try {
    const emailData = JSON.parse(fs.readFileSync(emailFilePath, "utf8"));
    const confirmationData = JSON.parse(fs.readFileSync(confirmationFilePath, "utf8"));

    const confirmedEmails = confirmationData.map((c) => c.email);
    const pendingEmails = emailData.filter((entry) => !confirmedEmails.includes(entry.email));

    if (pendingEmails.length === 0) {
      console.log(chalk.green("\n✅ All emails have been confirmed. No reminders to send.\n"));
      return;
    }

    console.log(chalk.blue("\n📧 Sending Reminders...\n"));

    // Simulate reminder sending
    pendingEmails.forEach((entry) => {
      console.log(`Reminder sent to: ${entry.name} <${entry.email}>`);
    });

    console.log(chalk.green("\n✅ Reminders sent successfully!\n"));
  } catch (error) {
    console.error(chalk.red(`\n❌ Error sending reminders: ${error.message}\n`));
  }
};


