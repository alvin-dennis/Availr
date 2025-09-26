import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "fs";
import path from "path";

const app = new Hono();
app.use("*", cors());

app.get("/confirm", (c) => {
  const name = c.req.query("name") || "";
  const email = c.req.query("email") || "";

  return c.html(`
    <html>
      <body style="font-family:sans-serif;">
        <h2>Hello ${name}, please select your available slot</h2>
        <form action="/confirm" method="POST">
          <input type="hidden" name="name" value="${name}" />
          <input type="hidden" name="email" value="${email}" />
          <label>
            Choose a slot:
            <select name="slot" required>
              <option value="" disabled selected>Select a time slot</option>
              <option value="9-10 AM">9-10 AM</option>
              <option value="10-11 AM">10-11 AM</option>
              <option value="11-12 PM">11-12 PM</option>
            </select>
          </label>
          <br/><br/>
          <button type="submit">Confirm</button>
        </form>
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
          <body style="font-family:sans-serif;">
            <h2>Error</h2>
            <p>Missing required information. Please try again.</p>
            <a href="/confirm?email=${
              email ? encodeURIComponent(email.toString()) : ""
            }">Go back</a>
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
        <body style="font-family:sans-serif;">
          <h2>Thank you, ${name}!</h2>
          <p>Your time slot (${slot}) is confirmed.</p>
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
