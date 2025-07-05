import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

// ✅ Get the correct CLI install path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Go back to the project root (3 folders up from src/commands)
const projectRoot = path.join(__dirname, "../../../");

// ✅ Correct paths to your JSON files inside the 'data' folder
const emailFilePath = path.join(projectRoot, "data/email.json");
const confirmationFilePath = path.join(projectRoot, "data/confirmation.json");

export const viewStatus = async () => {
  try {
    // ✅ Load JSON files
    const emails = JSON.parse(fs.readFileSync(emailFilePath, "utf-8"));
    const confirmations = JSON.parse(fs.readFileSync(confirmationFilePath, "utf-8"));

    // ✅ Match confirmed emails
    const confirmedEmails = confirmations.map((c) => c.email);

    // ✅ Merge status
    const detailedList = emails.map((entry) => ({
      Name: entry.name,
      Email: entry.email,
      Status: confirmedEmails.includes(entry.email) ? "Confirmed" : "Pending"
    }));

    // ✅ CLI Menu
    const { viewOption } = await inquirer.prompt([
      {
        type: "list",
        name: "viewOption",
        message: "What would you like to do?",
        choices: [
          { name: "View All", value: "all" },
          { name: "View Confirmed Only", value: "confirmed" },
          { name: "View Pending Only", value: "pending" },
          { name: "Search by Name/Email", value: "search" },
          { name: "Back to Main Menu", value: "back" }
        ]
      }
    ]);

    if (viewOption === "all") {
      console.log(chalk.bold.green("\n📧 All Emails:\n"));
      console.table(detailedList);
    } else if (viewOption === "confirmed") {
      const confirmed = detailedList.filter(e => e.Status === "Confirmed");
      console.log(chalk.bold.green("\n✅ Confirmed Emails:\n"));
      console.table(confirmed);
    } else if (viewOption === "pending") {
      const pending = detailedList.filter(e => e.Status === "Pending");
      console.log(chalk.bold.yellow("\n⏳ Pending Emails:\n"));
      console.table(pending);
    } else if (viewOption === "search") {
      const { searchQuery } = await inquirer.prompt([
        {
          type: "input",
          name: "searchQuery",
          message: "Enter name or email to search:"
        }
      ]);

      const result = detailedList.filter(
        e =>
          e.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.Email.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (result.length > 0) {
        console.log(chalk.bold.cyan("\n🔍 Search Results:\n"));
        console.table(result);
      } else {
        console.log(chalk.red("\nNo matching records found.\n"));
      }
    } else {
      return; // Back to main menu
    }
   } catch (error) {
    console.error(chalk.red("\n❌ Error loading JSON files:"), error.message);
  }
};





