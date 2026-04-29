const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = 3000;

// 🔴 PUT YOUR KEY HERE
const openai = new OpenAI({
  apiKey: "YOUR_API_KEY_HERE"
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

let requests = [];

// CLASSIFICATION
function classify(msg = "") {
  msg = msg.toLowerCase();
  if (msg.includes("buy") || msg.includes("demo")) return "Hot 🔥";
  if (msg.includes("research") || msg.includes("project")) return "Warm ⚡";
  return "Cold ❄";
}

// SCORING
function score(data) {
  let s = 0;
  if (data.company) s += 3;
  if (data.message && data.message.length > 20) s += 2;
  if (data.message && data.message.includes("demo")) s += 5;
  return s;
}

// FORM
app.post("/submit", (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email) {
    return res.json({ message: "Name & Email required", type: "-", priority: "-" });
  }

  const type = classify(message || "");
  const priority = score({ message: message || "", company });

  requests.push({ name, email, company, message, type, priority });

  res.json({
    message: "Request submitted successfully!",
    type,
    priority
  });
});

// GET
app.get("/requests", (req, res) => {
  res.json({ count: requests.length, data: requests });
});

// AI CHAT
app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // ✅ fixed model
      messages: [
        {
          role: "system",
          content: `
You are an assistant for GreenChip.

GreenChip:
- Biodegradable electronics
- Demo delivery: 5–7 days
- Replacement: 2–3 days

Answer only related to this.
Keep answers short.
          `
        },
        { role: "user", content: userMsg }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.log("FULL AI ERROR:", error);
    res.json({ reply: "AI service unavailable. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});