// server.js

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(__dirname));

// Temporary database (array)
let requests = [];

// API route
app.post("/submit", (req, res) => {
    const { name, email, company, message } = req.body;

    const newRequest = {
        name,
        email,
        company,
        message,
        time: new Date()
    };

    requests.push(newRequest);

    console.log("New Request:", newRequest);

    res.json({ message: "Request submitted successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});