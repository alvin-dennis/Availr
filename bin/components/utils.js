import chalk from "chalk";
import http from "http";
import gradient from "gradient-string";

const dynamicCountdown = async (seconds, message = "Continuing in") => {
  for (let i = seconds; i > 0; i--) {
    process.stdout.write(
      chalk.cyan(`\r${message} ${chalk.bold(i)} second${i !== 1 ? "s" : ""}...`)
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  process.stdout.write("\r" + " ".repeat(50) + "\r");
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

export const TITLE_TEXT = `
  █████╗ ██╗   ██╗ █████╗ ██╗██╗     ██████╗ 
 ██╔══██╗██║   ██║██╔══██╗██║██║     ██╔══██╗
 ███████║██║   ██║███████║██║██║     ██████╔╝
 ██╔══██║╚██╗ ██╔╝██╔══██║██║██║     ██╔══██╗
 ██║  ██║ ╚████╔╝ ██║  ██║██║███████╗██║  ██║
 ╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝
 `;

const blueTheme = {
  darkBlue: "#0D47A1",
  blue: "#1976D2",
  lightBlue: "#2196F3",
  skyBlue: "#03A9F4",
  azure: "#00B0FF",
  cerulean: "#0288D1",
  cyan: "#00FFFF",
  aqua: "#00FFEE",
  darkCyan: "#008B8B",
  navy: "#0D2C54",
  royal: "#4169E1",
  indigo: "#3F51B5",
  sapphire: "#0F52BA",
  prussian: "#003366",
  midnight: "#191970",
};

const renderTitle = () => {
  const terminalWidth = process.stdout.columns || 80;
  const titleLines = TITLE_TEXT.split("\n");
  const titleWidth = Math.max(...titleLines.map((line) => line.length));

  if (terminalWidth < titleWidth) {
    const simplifiedTitle = `
    ╔══════════════════╗
    ║      Availr      ║
    ╚══════════════════╝
    `;
    console.log(
      gradient([blueTheme.lightBlue, blueTheme.lightBlue]).multiline(
        simplifiedTitle
      )
    );
  } else {
    console.log(
      gradient([blueTheme.lightBlue, blueTheme.lightBlue]).multiline(TITLE_TEXT)
    );
  }
};

export { dynamicCountdown, isServerRunning, displayCommands, renderTitle };
