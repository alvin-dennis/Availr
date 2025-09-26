import chalk from "chalk";
import fs from "fs";
import path from "path";
import spinner from "./spinner.js";
import log from "./logger.js";
import { isServerRunning } from "./utils.js";

const checkHealth = async () => {
  log.header("SYSTEM HEALTH CHECK");
  spinner.start("Checking system status...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.stop();
  spinner.start("Checking server status...");
  const serverRunning = await isServerRunning();
  spinner.stop();
  if (serverRunning) {
    log.success("Server: Running on port 3000");
  } else {
    log.error("Server: Not running");
  }
  spinner.start("Checking file system...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  spinner.stop();
  try {
    console.log(chalk.bold.white("\nSystem Files"));
    console.log(chalk.gray("─".repeat(12)));
    const files = [
      {
        name: "Confirmations",
        path: path.resolve(process.cwd(), "confirmations.json"),
      },
      { name: "Emails", path: path.resolve(process.cwd(), "emails.json") },
    ];
    for (const file of files) {
      const exists = fs.existsSync(file.path);

      if (exists) {
        const stats = fs.statSync(file.path);
        const fileSizeKB = (stats.size / 1024).toFixed(1);
        console.log(
          `${chalk.cyan("•")} ${chalk.white(file.name)} (${chalk.gray(
            fileSizeKB + " KB"
          )})`
        );
      } else {
        console.log(
          `${chalk.red("•")} ${chalk.white(file.name)} ${chalk.gray(
            "not found"
          )}`
        );
      }
    }
  } catch (error) {
    log.error("Error checking files: " + error.message);
  }
  try {
    spinner.start("Checking version");
    await new Promise((resolve) => setTimeout(resolve, 400));
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
      const version = packageJson.version || "unknown";
      spinner.stop();
      console.log(
        `${chalk.cyan("•")} ${chalk.white("Version")} ${chalk.gray(version)}`
      );
    } else {
      spinner.stop();
      console.log(
        `${chalk.yellow("•")} ${chalk.white("Version")} ${chalk.gray(
          "unknown"
        )}`
      );
    }
  } catch (error) {
    spinner.stop();
    console.log(
      `${chalk.red("•")} ${chalk.white("Version")} ${chalk.gray("error")}`
    );
  }
  try {
    console.log(chalk.bold.white("\nEnvironment"));
    console.log(chalk.gray("─".repeat(11)));
    console.log(
      `${chalk.cyan("•")} ${chalk.white("Node.js")} ${chalk.gray(
        process.version
      )}`
    );
    console.log(
      `${chalk.cyan("•")} ${chalk.white("Platform")} ${chalk.gray(
        process.platform
      )}`
    );
  } catch (error) {
    log.error("Error retrieving system info: " + error.message);
  }
};

export default checkHealth;
