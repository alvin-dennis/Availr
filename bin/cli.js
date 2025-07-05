#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";

import { importCSV } from "../src/commands/importCsv.js";
import { sendEmails } from "../src/commands/sendEmails.js";
import { checkConfirmations } from "../src/commands/checkConfirmations.js";
import { sendReminders } from "../src/commands/sendReminders.js";

import spinner from "./components/spinner.js";
import log from "./components/logger.js";
import {
  dynamicCountdown,
  isServerRunning,
  displayCommands,
} from "./components/utils.js";
import runServer from "./components/server.js";
import checkHealth from "./components/healthCheck.js";

// 📂 View JSON Data
const viewJsonData = () => {
  try {
    const emailData = JSON.parse(fs.readFileSync("./data/email.json", "utf8"));
    const confirmationData = JSON.parse(
      fs.readFileSync("./data/confirmation.json", "utf8")
    );

    console.log("\n📧 Email Data:\n");
    console.table(emailData);

    console.log("\n✅ Confirmation Data:\n");
    console.table(confirmationData);
  } catch (error) {
    console.error("❌ Error loading JSON files:", error.message);
  }
};

// 🛠️ Process CLI Arguments
const processCommandArgs = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) return false;

  switch (command) {
    case "import":
      await importCSV();
      return true;
    case "send":
      await sendEmails();
      return true;
    case "check":
      await checkConfirmations();
      return true;
    case "server":
      await runServer();
      return true;
    case "health":
      await checkHealth();
      return true;
    case "help":
      displayCommands();
      return true;
    default:
      console.log(chalk.red(`Unknown command: ${command}`));
      console.log(chalk.yellow("Run 'availr help' for available commands"));
      return true;
  }
};

// 🚀 CLI Main Menu
const main = async () => {
  try {
    const commandProcessed = await processCommandArgs();
    if (commandProcessed) {
      process.exit(0);
    }

    console.clear();
    console.log(chalk.bold.cyan("\nAVAILR CLI\n"));
    console.log(chalk.white("Welcome to Availr!\n"));

    let running = true;

    while (running) {
      console.clear();
      spinner.start("Checking server status...");
      const serverRunning = await isServerRunning();
      spinner.stop();

      await new Promise((resolve) => setTimeout(resolve, 300));

      const serverStatus = serverRunning
        ? chalk.green("online")
        : chalk.red("offline");

      console.log(chalk.bold.cyan("\nAVAILR CLI"));
      console.log(`Server: ${serverStatus}\n`);

      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: [
            { name: "Import CSV", value: "Import CSV" },
            { name: "Send Emails", value: "Send Emails" },
            { name: "Send Confirmation Emails", value: "Send Confirmation Emails" },
            { name: "Send Reminder Emails", value: "Send Reminder Emails" },
            {
              name: serverRunning
                ? `Start Server ${chalk.green("(running)")}`
                : "Start Server",
              value: "Start Server",
            },
            { name: "View Email & Confirmation Data", value: "View Data" },
            { name: "Health Check", value: "Health Check" },
            { name: "Help", value: "Help" },
            { name: "Restart CLI", value: "Restart CLI" },
            { name: "Exit", value: "Exit" },
          ],
        },
      ]);

      switch (action.split(" ")[0] === "Start" ? "Start Server" : action) {
        case "Import CSV":
          spinner.start("Preparing to import CSV...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          try {
            await importCSV();
          } catch (error) {
            log.error(`Import failed: ${error.message}`);
            console.log(
              chalk.yellow("\nCSV import operations can be resource intensive.")
            );
            await dynamicCountdown(5, "Returning to main menu in");
          }
          break;

        case "Send Emails":
          spinner.start("Preparing email service...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await sendEmails();
          break;

        case "Send Confirmation Emails":
          spinner.start("Loading confirmations...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await checkConfirmations();
          break;

        case "Send Reminder Emails":
          spinner.start("Preparing to send reminders...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await sendReminders();
          break;

        case "View Data":
          viewJsonData();
          break;

        case "Start Server":
          await runServer();
          await new Promise((resolve) => setTimeout(resolve, 500));
          break;

        case "Health Check":
          await checkHealth();
          break;

        case "Help":
          log.header("COMMAND REFERENCE");
          displayCommands();
          break;

        case "Restart CLI":
          log.warning("Restarting CLI...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.clear();
          running = false;
          setImmediate(() => main());
          return;

        case "Exit":
          await new Promise((resolve) => setTimeout(resolve, 1000));
          log.info("Goodbye!");
          process.exit(0);

        default:
          log.error("Unknown command. Please try again.");
      }

      console.log(chalk.gray("\nPress any key to continue..."));
      await new Promise((resolve) => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.once("data", () => {
          process.stdin.setRawMode(false);
          resolve();
        });
      });
    }
  } catch (error) {
    console.error(chalk.red(`\nError: ${error.message}`));
    await dynamicCountdown(3);
    console.clear();
    main();
  }
};

process.on("uncaughtException", (err) => {
  console.error(chalk.red(`\nUnexpected error: ${err.message}`));
  console.log(chalk.yellow("CLI will restart shortly..."));

  const restartTime = err.code === "ENOENT" ? 5 : 3;
  setTimeout(() => main(), restartTime * 1000);
});

main().catch((error) => {
  console.error(chalk.red(`\nFatal error: ${error.message}`));
  process.exit(1);
});


