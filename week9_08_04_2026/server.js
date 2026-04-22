const express = require("express");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory database
let accounts = [];

// Callback function
function addAccount(data, callback) {
  accounts.push(data);
  callback();
}

// Root route
app.get("/", (req, res) => {
  res.send("Bank Manager Server Running");
});

// Form UI
app.get("/form", (req, res) => {
  res.send(`
    <body style="font-family: Arial; background:#1e293b; color:white; text-align:center;">
      <div style="background:#0f172a; padding:20px; border-radius:10px; width:300px; margin:auto; margin-top:50px;">
        <h2>Add Account</h2>
        <form method="POST" action="/add">
          <input name="name" placeholder="Account Holder Name" required style="margin:5px; padding:8px;"><br>
          <input name="accno" placeholder="Account Number" required style="margin:5px; padding:8px;"><br>
          <input name="balance" placeholder="Balance" required style="margin:5px; padding:8px;"><br>
          <button style="margin-top:10px; padding:8px 12px; background:#38bdf8; border:none;">Add</button>
        </form>
      </div>
    </body>
  `);
});

// Account list UI
app.get("/accounts", (req, res) => {
  let rows = accounts.map(a => `
    <tr>
      <td>${a.name}</td>
      <td>${a.accno}</td>
      <td>${a.balance}</td>
    </tr>
  `).join("");

  res.send(`
    <body style="font-family: Arial; background:#1e293b; color:white; text-align:center;">
      <div style="background:#0f172a; padding:20px; border-radius:10px; width:450px; margin:auto; margin-top:50px;">
        <h2>Bank Accounts</h2>
        <table border="1" style="width:100%; border-collapse:collapse;">
          <tr>
            <th>Name</th>
            <th>Account No</th>
            <th>Balance</th>
          </tr>
          ${rows}
        </table>
        <br>
        <a href="/form" style="color:#38bdf8;">Add New Account</a>
      </div>
    </body>
  `);
});

// Add account
app.post("/add", (req, res) => {
  addAccount(req.body, () => {
    res.redirect("/accounts");
  });
});

// Event loop example
setTimeout(() => {
  console.log("Server running...");
}, 1000);

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});