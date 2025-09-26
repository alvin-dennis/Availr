import chalk from "chalk";
import { exec } from "child_process";
import { isServerRunning } from "./utils.js";

const runServer = async () => {
  const serverRunning = await isServerRunning();

  if (serverRunning) {
    console.log(chalk.yellow("Server is already running on port 3000"));
    return;
  }

  console.log(
    chalk.green("🚀 Starting Availr server... (Press Ctrl+C to stop)")
  );
  const server = exec("bun run server/index.js");

  server.stdout.on("data", (data) => {
    process.stdout.write(data);
  });
  server.stderr.on("data", (data) => {
    process.stderr.write(chalk.red(data));
  });
  server.on("close", (code) => {
    console.log(chalk.yellow(`Server process exited with code ${code}`));
  });
};

export default runServer;
