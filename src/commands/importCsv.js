import fs from "fs";
import inquirer from "inquirer";
import csv from "csv-parser";

export const importCSV = async () => {
  const { filePath } = await inquirer.prompt([
    {
      type: "input",
      name: "filePath",
      message: "CSV path:",
      default: "./contacts.csv",
    },
  ]);

  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        fs.writeFileSync("./emails.json", JSON.stringify(results, null, 2));
        console.log("✅ Emails saved to emails.json");
        resolve(results);
      })
      .on("error", (err) => {
        console.error("❌ Error reading CSV:", err.message);
        reject(err);
      });
  });
};
