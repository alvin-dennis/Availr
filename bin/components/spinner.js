import chalk from "chalk";

const spinner = {
  frames: ["⠋", "⠙", "⠚", "⠞", "⠖", "⠦", "⠴", "⠲", "⠳", "⠓"],
  interval: null,
  message: "",
  position: 0,
  start(msg = "Loading...") {
    this.message = msg;
    this.position = 0;
    this.interval = setInterval(() => {
      process.stdout.write(
        `\r${chalk.cyan(this.frames[this.position])} ${chalk.white(
          this.message
        )}`
      );
      this.position = (this.position + 1) % this.frames.length;
    }, 80);
  },
  stop(message = "") {
    clearInterval(this.interval);
    process.stdout.write(`\r${" ".repeat(this.message.length + 2)}\r`);
    if (message) console.log(message);
  },
};

export default spinner;
