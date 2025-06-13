import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "fs";
import path from "path";

const app = new Hono();
app.use("*", cors());

app.get("/confirm", (c) => {
  const name = c.req.query("name") || "";
  const email = c.req.query("email") || "";

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

  return c.html(`
    <html>
      <head>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background: #fff;
            padding: 1.5rem;
            border-radius: 10px;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }
          select, button {
            width: 100%;
            padding: 0.5rem;
            margin-top: 0.5rem;
            font-size: 1rem;
          }
          button {
            background: #4caf50;
            color: #fff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 1rem;
          }
          button:hover {
            background: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hello ${name}, please select your available slot</h2>
          <form action="/confirm" method="POST">
            <input type="hidden" name="name" value="${name}">
            <input type="hidden" name="email" value="${email}">
            <label>
              Choose a slot:
              <select name="slot" required>
                <option value="" disabled selected>Select a time slot</option>
                ${slotOptions}
              </select>
            </label>
            <button type="submit">Confirm</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// app.get("/confirm/:email", (c) => {
//   const email = c.req.param("email");
//   return c.redirect(`/confirm?email=${encodeURIComponent(email)}`);
// });

app.post("/confirm", async (c) => {
  try {
    const formData = await c.req.formData();
    const name = formData.get("name") || "User";
    const email = formData.get("email");
    const slot = formData.get("slot");

    if (!email || !slot) {
      return c.html(
        `
        <html>
          <head>
            <style>
              body {
                font-family: sans-serif;
                background: #f9f9f9;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
              }
              .box {
                background: #fff;
                padding: 1.5rem;
                border-radius: 6px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                text-align: center;
              }
              a {
                display: inline-block;
                margin-top: 1rem;
                text-decoration: none;
                color: #007bff;
              }
              a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="box">
              <h2>Error</h2>
              <p>Missing required information. Please try again.</p>
              <a href="/confirm?name=${encodeURIComponent(
                name
              )}&email=${encodeURIComponent(email)}">Go back</a>
            </div>
          </body>
        </html>
      `,
        400
      );
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

    confirmations.push({
      name: name.toString(),
      email: email.toString(),
      slot: slot.toString(),
      timestamp: new Date().toISOString(),
    });

    fs.writeFileSync(confirmationsPath, JSON.stringify(confirmations, null, 2));
    console.log(`Confirmation saved for ${email} - ${slot}`);

    return c.html(`
      <html>
        <head>
          <style>
            body {
              font-family: sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: #f9f9f9;
            }
            .box {
              text-align: center;
              background: #fff;
              padding: 1rem 1.5rem;
              border-radius: 6px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <div class="box">
            <h2>Thank you, ${name}!</h2>
            <p>Your time slot (${slot}) is confirmed.</p>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error processing form:", error);
    return c.html(
      `
      <html>
        <body style="font-family:sans-serif;">
          <h2>Server Error</h2>
          <p>Something went wrong. Please try again later.</p>
        </body>
      </html>
    `,
      500
    );
  }
});

export default app;
