import schedule from "node-schedule";
import { sendEmails } from "./sendEmails.js";
import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";

let isInScheduleFlow = false;

export const scheduleEmail = async () => {
  isInScheduleFlow = true;
  console.log(chalk.cyan("\n📅 Email scheduling in progress...\n"));

  try {
    const emailsData = fs.existsSync("./emails.json")
      ? JSON.parse(fs.readFileSync("./emails.json", "utf-8"))
      : [];

    const { method } = await inquirer.prompt({
      type: "list",
      name: "method",
      message: "How do you want to schedule?",
      choices: ["Choose from imported emails", "Enter a custom email"],
    });

    let selected = [];

    if (method === "Choose from imported emails") {
      if (!emailsData.length) {
        console.log(chalk.red("❌ No emails found. Please import CSV first."));
        return;
      }

      const { selectedEmails } = await inquirer.prompt({
        type: "checkbox",
        name: "selectedEmails",
        message: "Select email addresses to schedule:",
        choices: emailsData.map(({ Name, Email }) => ({
          name: `${Name || "Unnamed"} <${Email}>`,
          value: { email: Email, name: Name || "there" },
        })),
        validate: (input) => input.length > 0 || "Select at least one email",
      });

      selected = selectedEmails;
    } else {
      const { email, name } = await inquirer.prompt([
        {
          type: "input",
          name: "email",
          message: "Enter the email address:",
          validate: (input) =>
            /\S+@\S+\.\S+/.test(input) || "Enter a valid email address",
        },
        {
          type: "input",
          name: "name",
          message: "Enter recipient's name:",
          default: "there",
        },
      ]);

      selected = [{ email, name }];
    }

    const { dateTime } = await inquirer.prompt({
      type: "input",
      name: "dateTime",
      message: "Enter date and time (YYYY-MM-DD HH:mm):",
      validate: (input) => {
        const parsedDate = new Date(input);
        return !isNaN(parsedDate.getTime()) || "Enter a valid date and time";
      },
    });

    const scheduledTime = new Date(dateTime);

    selected.forEach(({ email, name }) => {
      schedule.scheduleJob(scheduledTime, async () => {
        try {
          const originalLog = console.log;
          console.log = () => {}; 

          
          const currentData = fs.existsSync("./emails.json")
            ? JSON.parse(fs.readFileSync("./emails.json", "utf-8"))
            : [];

         
          const updatedData = [...currentData, { Name: name, Email: email }];

         
          fs.writeFileSync("./emails.json", JSON.stringify(updatedData, null, 2));

          await sendEmails();
          console.log = originalLog;

          if (isInScheduleFlow) {
            console.log(chalk.green(`✅ Email sent to ${email} at ${new Date().toLocaleString()}`));
          }
        } catch (error) {
          console.error(chalk.red(`❌ Failed to send email to ${email}: ${error.message}`));
        }
      });
    });

    console.log(chalk.green(`\n✅ Emails scheduled for ${scheduledTime.toLocaleString()}\n`));
  } catch (err) {
    console.log(chalk.red("❌ Failed to schedule email(s): "), err.message);
  } finally {
    isInScheduleFlow = false;
  }
};
