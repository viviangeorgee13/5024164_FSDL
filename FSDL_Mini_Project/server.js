const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let requests = [];

// ===== PRODUCT LIST =====
const products = [
  "Type-C eco charging cable",
  "Bamboo USB charging cable",
  "Solar power bank (10000 mAh)",
  "Solar power bank (20000 mAh)",
  "Wheat straw charger adapter",
  "Bamboo keyboard",
  "Bamboo keyboard + mouse combo",
  "Wireless bamboo keyboard",
  "Eco wireless keyboard",
  "Cork mousepad",
  "Biodegradable phone case",
  "Biodegradable phone case (variant)",
  "Biodegradable phone case (printed)",
  "Biodegradable phone case (premium)",
  "Compostable screen protector",
  "Wooden Bluetooth speaker",
  "Wooden Bluetooth speaker (budget)",
  "Wooden Bluetooth speaker (mini)",
  "Wooden wireless speaker",
  "Solar Bluetooth speaker",
  "Bamboo LED desk lamp",
  "Solar LED lantern",
  "Solar garden light",
  "Paper LED lamp",
  "Eco smart switch (bioplastic)",
  "Biodegradable circuit board",
  "Paper-based battery",
  "Compostable RFID tag",
  "Flexible eco sensor",
  "Plant-based wearable band"
];

// ===== SEND PRODUCTS =====
app.get("/products", (req, res) => {
  res.json(products);
});

// ===== ORDER =====
app.post("/order", (req, res) => {
  const { name, email, product } = req.body;

  const id = "REQ" + Math.floor(100000 + Math.random() * 900000);

  requests.push({
    id,
    name,
    email,
    product,
    status: "Pending",
    eta: "5-7 days"
  });

  res.json({
    message: "Order placed successfully!",
    id,
    status: "Pending",
    eta: "5-7 days"
  });
});

// ===== TRACK =====
app.get("/track", (req, res) => {
  const { id, product } = req.query;

  let result = requests;

  if (id) result = result.filter(r => r.id === id);

  if (product) {
    if (!products.includes(product)) {
      return res.json({ error: "Enter exact product name." });
    }
    result = result.filter(r => r.product === product);
  }

  res.json(result);
});

// ===== SMART CHATBOT =====
app.post("/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();

  let reply = "I can help you with products, delivery, or orders.";

  // 1. Greetings
  if (
    msg.includes("hi") ||
    msg.includes("hello") ||
    msg.includes("good morning") ||
    msg.includes("good afternoon") ||
    msg.includes("good evening")
  ) {
    reply = "Hello! How can I assist you today?";
  }

  // 2. Name
  else if (msg.includes("your name")) {
    reply = "My name is Nexa. I'll help you with your queries.";
  }

  // 3. Purpose / what does app do
  else if (
    msg.includes("what does") ||
    msg.includes("what is this") ||
    msg.includes("greenchip") ||
    msg.includes("purpose")
  ) {
    reply = "GreenChip provides biodegradable electronic products to reduce e-waste.";
  }

  // 4. Delay
  else if (msg.includes("delay")) {
    reply = "Delivery may be delayed due to logistics, but we try to deliver within 5–7 days.";
  }

  // 5. ETA
  else if (
    msg.includes("when") ||
    msg.includes("arrive") ||
    msg.includes("delivery time")
  ) {
    reply = "Your package will arrive within 5–7 working days.";
  }

  // 6. Refund
  else if (msg.includes("refund")) {
    reply = "Refunds are available for defective or undelivered products.";
  }

  // 7. Pricing
  else if (msg.includes("price") || msg.includes("cost")) {
    reply = "You can check prices in the product search section above.";
  }

  // 8. Products list
  else if (msg.includes("products") || msg.includes("what do you sell")) {
    reply = "We offer eco-friendly cables, keyboards, speakers, lighting devices, and more.";
  }

  // 9. PRODUCT DETECTION (SMART)
  else {
    const keywordMatch = products.find(p =>
      msg.includes(p.split(" ")[0].toLowerCase())
    );

    if (keywordMatch) {
      reply = `${keywordMatch} is available and can be delivered in 5–7 days.`;
    } else {
      reply = "That item is not available. Please search from our eco-friendly product list.";
    }
  }

  res.json({ reply });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});