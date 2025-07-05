import fs from "fs";
import csv from "csv-parser";
import chalk from "chalk";

export function viewStats(filePath) {
  return new Promise((resolve, reject) => {
    let total = 0;
    const csvEmailSet = new Set();
    const allCsvEmails = [];

    const normalizeEmail = (email) => (email || "").trim().toLowerCase();

    const readJsonSafe = (path, label) => {
      try {
        return JSON.parse(fs.readFileSync(path));
      } catch (e) {
        console.log(chalk.yellow(`⚠️  ${label} not found. Skipping...`));
        return [];
      }
    };

    const sentEmailsRaw = readJsonSafe("emails.json", "emails.json");
    const confirmationsRaw = readJsonSafe("confirmations.json", "confirmations.json");
    const failedSendRaw = readJsonSafe("failedEmails.json", "failedEmails.json");

    const sentEmails = sentEmailsRaw.map((e) => normalizeEmail(e.email || e.Email));
    const confirmations = confirmationsRaw.map((c) => normalizeEmail(c.email || c.Email));
    const confirmedCount = confirmations.length;

   
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        total++;
        const email = normalizeEmail(row.email || row.Email);
        if (email) {
          allCsvEmails.push(email);
          csvEmailSet.add(email);
        }
      })
      .on("end", () => {
        const duplicates = allCsvEmails.length - csvEmailSet.size;
        const totalEmails = sentEmails.length;

        
        const scheduledOnly = sentEmails.filter(email => !csvEmailSet.has(email));
        const scheduledCount = scheduledOnly.length;

        console.log(chalk.yellow.bold("\n📊 CSV Stats:\n"));
        console.log("Total Rows:", total);
        console.log("Unique Emails:", csvEmailSet.size);
        console.log("Duplicate Emails:", duplicates);
        console.log("Scheduled Emails Added via CLI:", scheduledCount);
        console.log();

        console.log(chalk.yellow.bold("📬 Email Stats:\n"));
        console.log("Email ID's Attempted:", totalEmails);
        console.log("Emails Sent Successfully (Confirmed):", confirmedCount);
        

        if (failedSendRaw.length) {
          console.log("Emails Failed (SMTP Errors):", failedSendRaw.length);
        }

        console.log();
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
