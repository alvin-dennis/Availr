#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import boxen from "boxen";
import chalkAnimation from "chalk-animation";

import { importCSV } from "../cli/commands/importCsv.js";
import { previewCSV } from "../cli/commands/previewCSV.js";
import { sendEmails } from "../cli/commands/sendEmails.js";
import { scheduleEmail } from "../cli/commands/scheduleEmail.js";
import { sendConfirmations } from "../cli/commands/sendConfirmations.js";
import { checkData } from "../cli/commands/checkData.js";
import { viewStats } from "../cli/commands/viewStats.js";

import spinner from "./components/spinner.js";
import log from "./components/logger.js";
import {
  dynamicCountdown,
  isServerRunning,
  displayCommands,
} from "./components/utils.js";
import runServer from "./components/server.js";
import checkHealth from "./components/healthCheck.js";
import { renderTitle } from "./components/utils.js";
import { login } from "../cli/commands/auth.js";

const showBanner = () => {
  renderTitle();

  console.log(
    boxen(chalk.white.bold("Professional Email Management Tool"), {
      padding: 1,
      margin: { top: 0, bottom: 1 },
      borderStyle: "single",
      borderColor: "blue",
      dimBorder: true,
    })
  );
};

const showServerStatus = (isRunning) => {
  const statusText = isRunning
    ? chalk.green("● Server Status: Online")
    : chalk.red("○ Server Status: Offline");

  console.log(
    boxen(statusText, {
      padding: { left: 2, right: 2, top: 0, bottom: 0 },
      borderStyle: "single",
      borderColor: isRunning ? "green" : "red",
      dimBorder: true,
    })
  );
  console.log();
};

const processCommandArgs = async () => {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) return false;

  switch (command) {
    case "import":
      await importCSV();
      return true;
    case "preview":
      await previewCSV();
      return true;
    case "send":
      await sendEmails();
      return true;
    case "schedule":
      await scheduleEmail();
      return true;
    case "check data":
      await checkData();
      return true;
    case "send confirmation":
      await sendConfirmations();
      return true;
    case "view stats":
      await viewStats();
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

const main = async () => {
  try {
    const commandProcessed = await processCommandArgs();
    if (commandProcessed) {
      process.exit(0);
    }
    console.clear();

    console.log("🔐 Login to Availr");
    let loggedIn = false;
    while (!loggedIn) {
      loggedIn = await login();
      if (!loggedIn) {
        console.log("🔁 Please try again.\n");
      }
    }


    showBanner();
    const welcomeMsg = chalkAnimation.pulse("Initialising!\n");

    await new Promise((resolve) =>
      setTimeout(() => {
        welcomeMsg.stop();
        resolve();
      }, 2000)
    );

    let running = true;
    while (running) {
      console.clear();

      spinner.start("Initializing server status check...");
      const serverRunning = await isServerRunning();
      spinner.stop();

      await new Promise((resolve) => setTimeout(resolve, 300));

      showBanner();
      showServerStatus(serverRunning);

      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: chalk.white.bold("Please select an operation:"),
          choices: [
            { name: "Import CSV", value: "Import CSV" },
            { name: "Preview CSV", value: "Preview CSV" },
            { name: "Send Emails", value: "Send Emails" },
            { name: "Schedule Emails", value: "Schedule Emails" },
            { name: "Check Data", value: "Check Data" },
            { name: "Send Confirmations", value: "Send Confirmations" },
            { name: "View Stats", value: "View Stats" },
            {
              name: serverRunning
                ? `Start Server ${chalk.green("(running)")}`
                : "Start Server",
              value: "Start Server",
            },
            { name: "Health Check", value: "Health Check" },
            { name: "Help", value: "Help" },
            { name: "Restart CLI", value: "Restart CLI" },
            { name: "Exit", value: "Exit" },
          ],
        },
      ]);

      switch (action.split(" ")[0] === "Start" ? "Start Server" : action) {
        case "Import CSV":
          spinner.start("Initializing CSV import module...");
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
          spinner.start("Initializing email service...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await sendEmails();
          break;

        case "Preview CSV":
          try {
            await previewCSV("test.csv");
          } catch (err) {
            console.log(chalk.red("❌ Error previewing CSV:"), err.message);
          }
          break;

        case "Schedule Emails":
          spinner.start("Initializing email scheduler...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await scheduleEmail();
          break;

        case "Check Data":
          spinner.start("Initializing data analysis...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await checkData();
          break;
        case "Send Confirmations":
          spinner.start("Initializing confirmation service...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await sendConfirmations();
          break;
        case "View Stats":
          try {
            spinner.start("Initializing statistics module...");
            await new Promise((r) => setTimeout(r, 500));
            spinner.stop();

            await viewStats("test.csv");
          } catch (err) {
            console.error(chalk.red(`❌ Failed to view stats: ${err.message}`));
          }
          break;

        case "Start Server":
          spinner.start("Initializing server module...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
          await runServer();
          await new Promise((resolve) => setTimeout(resolve, 500));
          break;
        case "Health Check":
          spinner.start("Initializing health check module...");
          await new Promise((resolve) => setTimeout(resolve, 500));
          spinner.stop();
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
  console.error(
    boxen(chalk.red(`\n❌ System Error: ${err.message}`), {
      padding: 1,
      borderStyle: "single",
      borderColor: "red",
    })
  );
  console.log(chalk.yellow("System will restart momentarily..."));

  const restartTime = err.code === "ENOENT" ? 5 : 3;
  setTimeout(() => main(), restartTime * 1000);
});

main().catch((error) => {
  console.error(chalk.red(`\nCritical System Error: ${error.message}`));
  process.exit(1);
});
