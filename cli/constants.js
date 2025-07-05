export const EMAIL_SUBJECT = "Please Confirm Your Availability";

export const EMAIL_TEMPLATE = (name, link) => `
  <div>
    <p>Hi ${name || "there"},</p>
    <p>Please confirm your availability:</p>
    <a href="${link}" style="padding:10px;background:#4CAF50;color:#fff;">Choose Slot</a>
    <p>Thanks,<br/>Team Availr</p>
  </div>
`;

export const CONFIRM_TEMPLATE = (name, slot) => `
  <div>
    <p>Hi ${name || "there"},</p>
    <p>Your time slot (${slot}) is confirmed!</p>
    <p>Regards,<br/>Team Availr</p>
  </div>
`;

export const HTML_CONFIRMATION_FORM = (name, token, slotOptions) => `
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
        <form action="/confirm-slot" method="POST">
          <input type="hidden" name="token" value="${token}">
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
`;

export const HTML_ERROR_MISSING_INFO = (token) => `
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
        <a href="/confirm?token=${encodeURIComponent(token)}">Go back</a>
      </div>
    </body>
  </html>
`;

export const HTML_ERROR_SLOT_TAKEN = (token) => `
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
        <p>Slot already taken. Please try another.</p>
        <a href="/confirm?token=${encodeURIComponent(token)}">Go back</a>
      </div>
    </body>
  </html>
`;

export const HTML_SUCCESS_SLOT_CONFIRMED = (name, slot) => `
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
`;

export const HTML_ERROR_SERVER_ISSUE = () => `
  <html>
    <body style="font-family:sans-serif;">
      <h2>Server Error</h2>
      <p>Something went wrong. Please try again later.</p>
    </body>
  </html>
`