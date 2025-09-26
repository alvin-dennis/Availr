# 📅 Availr

**Availr** is a powerful, interactive CLI and minimal web server that streamlines availability scheduling through CSV import, personalized email invites, and confirmation tracking. Designed for **multi-user** workflows without needing a database.

---

## 🚀 Features

- ✅ CSV Upload & Email Extraction
- ✉️ Email Invites with Personalized Availability Buttons
- 🔁 Confirmation Tracking (via Link)
- 📊 CLI for Workflow Automation (Import → Send → Track)
- 🌐 Minimal Web Server using Hono to receive confirmations
- 🧑‍💼 Multi-user & multi-tenant ready
- 🔒 No database required (uses JSON)

---

## 📦 Installation (Local Dev)

```bash
git clone https://github.com/alvin-dennis/Availr.git
cd Availr
```

```bash
npm install or bun install
```

```bash
npm link
```

Now you can use availr globally from your terminal.

🔐 Environment Variables

Create a .env file in the root directory:

```bash
AVAILR_EMAIL=youremail@example.com
AVAILR_PASS=your-app-password
```

⚠️ For Gmail, use an App Password.

## 🖥️ Usage (CLI Commands)

Start the CLI:

```bash
availr
```

You'll see an interactive menu:

```txt
📅 Welcome to Availr CLI

? What would you like to do?
❯ Import CSV
  Send Emails
  Check Confirmations
  Start Server
  Check Health
  Restart CLI
  Help
  Exit
```

## 📊 CSV Format

### 📝 Structure Requirements

Availr expects a properly formatted CSV file with contact information. The minimum required columns are:

```csv
Name,Email
Alvin Dennis,alvin@example.com
Jane Smith,jane@example.com
John Doe,john@example.com
```

### ✨ Extended Format (Recommended)

For better personalization, you can include additional fields:

```csv
Name,Email,Department,PreferredTime
Alvin Dennis,alvin@example.com,Engineering,Morning
Jane Smith,jane@example.com,Marketing,Afternoon
John Doe,john@example.com,Sales,Evening
```

### 💡 Tips for CSV Creation

- **Headers are required** - The first row must contain column names
- **Avoid special characters** in the CSV data when possible
- **UTF-8 encoding** is recommended for international characters
- Create/edit using:
  - Microsoft Excel (Save as CSV)
  - Google Sheets (Download as CSV)
  - Numbers (Export as CSV)
  - Any text editor (comma-separated values)

### 🔄 Sample Workflow

1. Prepare your contacts in a spreadsheet
2. Export/save as CSV format
3. Import into Availr using the CLI
4. All contacts will receive personalized availability requests!

> **Pro Tip**: For large lists, consider splitting your CSV into batches of 50-100 contacts for better email deliverability.


## 🔄 Workflows & **Commands**

<table>
  <thead>
    <tr>
      <th align="center">Step</th>
      <th align="left">Command</th>
      <th align="left">Description</th>
      <th align="left">Key Features</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">1️⃣</td>
      <td align="left"><code>availr → Import CSV</code></td>
      <td align="left">Upload contact data</td>
      <td align="left">
        • CSV validation<br>
        • Email format checking<br>
        • Automatic field mapping
      </td>
    </tr>
    <tr>
      <td align="center">2️⃣</td>
      <td align="left"><code>availr → Send Emails</code></td>
      <td align="left">Dispatch invites</td>
      <td align="left">
        • Personalized templates<br>
        • Tracking links<br>
        • Delivery confirmation
      </td>
    </tr>
    <tr>
      <td align="center">4️⃣</td>
      <td align="left"><code>availr → Check Confirmations</code></td>
      <td align="left">Monitor responses</td>
      <td align="left">
        • Response dashboard<br>
        • Status tracking<br>
        • Results export
      </td>
    </tr>
    <tr>
      <td align="center">3️⃣</td>
      <td align="left"><code>availr → Start Server</code></td>
      <td align="left">Run web endpoint</td>
      <td align="left">
        • Hono web server<br>
        • Confirmation reception<br>
        • Real-time updates
      </td>
    </tr>
    <tr>
      <td align="center">5️⃣</td>
      <td align="left"><code>availr → Check Health</code></td>
      <td align="left">System diagnostics</td>
      <td align="left">
        • Environment validation<br>
        • Network connectivity<br>
        • Server status checks
      </td>
    </tr>
    <tr>
      <td align="center">6️⃣</td>
      <td align="left"><code>availr → Restart CLI</code></td>
      <td align="left">Reset interface</td>
      <td align="left">
        • Clear current session<br>
        • Reload configuration<br>
        • Fresh start for workflows
      </td>
    </tr>
    <tr>
      <td align="center">7️⃣</td>
      <td align="left"><code>availr → Help</code></td>
      <td align="left">Get assistance</td>
      <td align="left">
        • Command documentation<br>
        • Troubleshooting tips<br>
        • Usage examples
      </td>
    </tr>
    <tr>
      <td align="center">8️⃣</td>
      <td align="left"><code>availr → Exit</code></td>
      <td align="left">Close application</td>
      <td align="left">
        • Clean shutdown<br>
        • Save current state<br>
        • Exit gracefully
      </td>
    </tr>
  </tbody>
</table>

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/awesome`
3. Commit your changes: `git commit -m "add awesome feature"`
4. Push to branch: `git push origin feature/awesome`
5. Open a PR

## 📄 License

This project is licensed under the [MIT License](https://github.com/alvin-dennis/Availr/blob/main/LICENSE) - a permissive license that allows you to freely use, modify, distribute, and sell this software with minimal restrictions.

Made with 💙 by Alvin Dennis
