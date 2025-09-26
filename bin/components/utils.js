import chalk from "chalk";
import http from "http";

const dynamicCountdown = async (seconds, message = "CLI will restart in") => {
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(
      `\r${chalk.yellow(`${message} ${i} second${i !== 1 ? "s" : ""}...`)}`
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  process.stdout.write("\r" + " ".repeat(60) + "\r");
};

const isServerRunning = (port = 3000) => {
  return new Promise((resolve) => {
    const req = http.request(
      {
        method: "HEAD",
        hostname: "localhost",
        port: port,
        path: "/",
        timeout: 1000,
      },
      (res) => {
        resolve(true);
      }
    );

    req.on("error", () => {
      resolve(false);
    });

    req.end();
  });
};

const displayCommands = () => {
  console.log(
    `
${chalk.bold.white("COMMANDS")}
${chalk.gray("─".repeat(8))}
${chalk.cyan("availr import")}    Upload CSV
${chalk.cyan("availr send")}      Send availability emails
${chalk.cyan("availr check")}     Process confirmations
${chalk.cyan("availr server")}    Start backend server
${chalk.cyan("availr health")}    Check server health and status
${chalk.cyan("availr help")}      Show this help menu
${chalk.cyan("availr exit")}      Exit the CLI
${chalk.cyan("availr restart")}   Restart the CLI
`
  );
};

export { dynamicCountdown, isServerRunning, displayCommands };
