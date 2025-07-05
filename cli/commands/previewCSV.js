import fs from "fs";
import csv from "csv-parser";
import chalk from "chalk";

export function previewCSV(filePath) {
  return new Promise((resolve, reject) => {
    let rowCount = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        rowCount++;
        console.log(chalk.green(`Row ${rowCount}:`), row);
      })
      .on("end", () => {
        console.log(chalk.blue.bold(`\n Done previewing. Total rows: ${rowCount}\n`));
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
