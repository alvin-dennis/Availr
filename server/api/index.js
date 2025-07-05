import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
  HTML_CONFIRMATION_FORM,
  HTML_ERROR_MISSING_INFO,
  HTML_ERROR_SERVER_ISSUE,
  HTML_ERROR_SLOT_TAKEN,
  HTML_SUCCESS_SLOT_CONFIRMED,
} from "../../cli/constants";

const app = new Hono();
app.use("*", cors());
dotenv.config();

const secret = process.env.JWT_SECRET;

app.get("/confirm", (c) => {
  const token = c.req.query("token") || "";

  if (!token) {
    return c.text("Token is missing", 400);
  }

  let name = "";

  try {
    const decoded = jwt.verify(token, secret);
    name = decoded.name;
  } catch (err) {
    return c.text("Invalid or expired token", 401);
  }

  const confirmationsPath = path.resolve(process.cwd(), "confirmations.json");

  let occupiedSlots = [];

  try {
    if (fs.existsSync(confirmationsPath)) {
      const data = fs.readFileSync(confirmationsPath, "utf8");
      const confirmations = JSON.parse(data);
      occupiedSlots = confirmations.map((entry) => entry.slot);
    }
  } catch (err) {
    console.error("Error reading confirmations file:", err);
  }

  const slots = ["9-10 AM", "10-11 AM", "11-12 PM"];
  const slotOptions = slots
    .map(
      (slot) =>
        `<option value="${slot}" ${
          occupiedSlots.includes(slot) ? "disabled" : ""
        }>
           ${slot} ${occupiedSlots.includes(slot) ? "(Taken)" : ""}
         </option>`
    )
    .join("");

  return c.html(HTML_CONFIRMATION_FORM(name, token, slotOptions));
});

app.post("/confirm-slot", async (c) => {
  try {
    const formData = await c.req.formData();
    const token = formData.get("token");
    const slot = formData.get("slot");

    if (!token) {
      return c.text("Token is missing", 400);
    }

    let name = "";
    let email = "";

    try {
      const decoded = jwt.verify(token, secret);
      name = decoded.name;
      email = decoded.email;
    } catch (err) {
      return c.text("Invalid or expired token", 401);
    }

    if (!email || !slot) {
      return c.html(HTML_ERROR_MISSING_INFO(token), 400);
    }

    const confirmationsPath = path.resolve(process.cwd(), "confirmations.json");
    let confirmations = [];

    try {
      if (fs.existsSync(confirmationsPath)) {
        const data = fs.readFileSync(confirmationsPath, "utf8");
        confirmations = JSON.parse(data);
      }
    } catch (err) {
      console.error("Error reading confirmations file:", err);
    }

    const alreadyTaken = confirmations.some((c) => c.slot === slot);
    if (alreadyTaken) {
      return c.html(HTML_ERROR_SLOT_TAKEN(token), 400);
    }

    confirmations.push({
      name: name.toString(),
      email: email.toString(),
      slot: slot.toString(),
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(confirmationsPath, JSON.stringify(confirmations, null, 2));
    console.log(`Confirmation saved for ${email} - ${slot}`);

    return c.html(HTML_SUCCESS_SLOT_CONFIRMED(name, slot));
  } catch (error) {
    console.error("Error processing form:", error);
    return c.html(HTML_ERROR_SERVER_ISSUE, 500);
  }
});

export default app;
