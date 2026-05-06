const express = require("express");
const mongoose = require("mongoose");

const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(
  "mongodb+srv://viviangeorgee13_db_user:NJqIKW9YjMX9IzhO@cluster0.fw4wmcn.mongodb.net/greenchip?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

async function seedProducts() {

  const count = await Product.countDocuments();

  if (count > 0) return;

  const products = [

    {
      name:"Type-C eco charging cable",
      price:349,
      category:"Cable",
      ecoScore:8,
      sales:65,
      rank:1,
      feedback:"Excellent eco-friendly cable with durable build quality."
    },

    {
      name:"Solar power bank (10000 mAh)",
      price:800,
      category:"Power",
      ecoScore:10,
      sales:58,
      rank:2,
      feedback:"Reliable backup power with strong solar charging performance."
    },

    {
      name:"Wooden Bluetooth speaker",
      price:4999,
      category:"Audio",
      ecoScore:9,
      sales:52,
      rank:3,
      feedback:"Premium sound quality and elegant wooden finish."
    },

    {
      name:"Biodegradable phone case",
      price:749,
      category:"Accessory",
      ecoScore:9,
      sales:48,
      rank:4,
      feedback:"Customers love the biodegradable material and slim design."
    },

    {
      name:"Eco wireless keyboard",
      price:2305,
      category:"Keyboard",
      ecoScore:8,
      sales:44,
      rank:5,
      feedback:"Comfortable typing experience with eco-conscious materials."
    },

    {
      name:"Solar Bluetooth speaker",
      price:2199,
      category:"Audio",
      ecoScore:10,
      sales:39,
      rank:6,
      feedback:"Great outdoor speaker with efficient solar charging."
    },

    {
      name:"Bamboo LED desk lamp",
      price:1499,
      category:"Lighting",
      ecoScore:8,
      sales:35,
      rank:7,
      feedback:"Modern bamboo design with warm lighting."
    },

    {
      name:"Paper-based battery",
      price:1200,
      category:"Power",
      ecoScore:9,
      sales:31,
      rank:8,
      feedback:"Innovative sustainable battery technology."
    },

    {
      name:"Flexible eco sensor",
      price:2499,
      category:"Electronics",
      ecoScore:9,
      sales:29,
      rank:9,
      feedback:"Highly useful smart sensing technology."
    },

    {
      name:"Solar LED lantern",
      price:1299,
      category:"Lighting",
      ecoScore:10,
      sales:26,
      rank:10,
      feedback:"Excellent emergency and camping light solution."
    },

    {
      name:"Bamboo keyboard",
      price:14367,
      category:"Keyboard",
      ecoScore:8,
      sales:21,
      rank:11,
      feedback:"Luxury eco keyboard with premium craftsmanship."
    },

    {
      name:"Compostable RFID tag",
      price:199,
      category:"Electronics",
      ecoScore:9,
      sales:18,
      rank:12,
      feedback:"Efficient biodegradable RFID implementation."
    },

    {
      name:"Plant-based wearable band",
      price:2999,
      category:"Wearable",
      ecoScore:8,
      sales:16,
      rank:13,
      feedback:"Comfortable sustainable wearable design."
    },

    {
      name:"Solar garden light",
      price:899,
      category:"Lighting",
      ecoScore:9,
      sales:13,
      rank:14,
      feedback:"Bright and eco-friendly outdoor lighting."
    },

    {
      name:"Bamboo USB charging cable",
      price:499,
      category:"Cable",
      ecoScore:8,
      sales:11,
      rank:15,
      feedback:"Affordable sustainable charging solution."
    },

    {
      name:"Compostable screen protector",
      price:599,
      category:"Accessory",
      ecoScore:8
    },

    {
      name:"Wireless bamboo keyboard",
      price:1701,
      category:"Keyboard",
      ecoScore:8
    },

    {
      name:"Wooden wireless speaker",
      price:1399,
      category:"Audio",
      ecoScore:8
    }

  ];

  await Product.insertMany(products);

  console.log("Products Seeded");
}

async function seedOrders() {

  const existing = await Order.findOne({
    requestId:"REQ111111"
  });

  if (existing) return;

  const oldDate = new Date("2026-04-26");

  await Order.insertMany([

    {
      requestId:"REQ111111",
      name:"Arjun Mehta",
      email:"arjun@gmail.com",
      product:"Solar Bluetooth speaker",
      price:2199,
      status:"Delivered",
      eta:"Delivered",
      createdAt:oldDate
    },

    {
      requestId:"REQ222222",
      name:"Priya Sharma",
      email:"priya@gmail.com",
      product:"Bamboo LED desk lamp",
      price:1499,
      status:"Delivered",
      eta:"Delivered",
      createdAt:oldDate
    },

    {
      requestId:"REQ333333",
      name:"Rohan Das",
      email:"rohan@gmail.com",
      product:"Biodegradable phone case",
      price:749,
      status:"Delivered",
      eta:"Delivered",
      createdAt:oldDate
    }

  ]);

  console.log("Orders Seeded");
}

seedProducts();
seedOrders();

async function updateRanks() {

  const products = await Product.find().sort({ sales:-1 });

  let rank = 1;

  for (const p of products) {

    if (p.sales > 0) {
      p.rank = rank;
      rank++;
    }

    await p.save();
  }
}

app.get("/products", async (req,res)=>{

  const products = await Product.find();

  res.json(products);
});

app.get("/categories", async (req,res)=>{

  const categories =
    await Product.distinct("category");

  res.json(categories);
});

app.get("/popular-products", async (req,res)=>{

  const products =
    await Product.find()
    .sort({ sales:-1 });

  res.json(products);
});

app.post("/order", async (req,res)=>{

  const {
    name,
    email,
    product
  } = req.body;

  const found =
    await Product.findOne({
      name:product
    });

  if (!found) {

    return res.json({
      error:"Product not found"
    });
  }

  const requestId =
    "REQ" +
    Math.floor(100000 + Math.random()*900000);

  const order = new Order({

    requestId,
    name,
    email,
    product:found.name,
    price:found.price

  });

  await order.save();

  found.sales += 1;

  if (!found.feedback) {

    found.feedback =
      "Customers are satisfied with this eco-friendly product.";
  }

  await found.save();

  await updateRanks();

  res.json({

    message:"Order placed successfully!",
    id:requestId,
    status:"Pending",
    eta:"5-7 days",
    price:found.price

  });
});

app.post("/track", async (req,res)=>{

  const {
    id,
    product
  } = req.body;

  let query = {};

  if (id) {

    query.requestId = id;
  }

  if (product) {

    const valid =
      await Product.findOne({
        name:product
      });

    if (!valid) {

      return res.json({
        error:"Invalid Product Name"
      });
    }

    query.product = product;
  }

  const orders =
    await Order.find(query);

  if (orders.length === 0) {

    return res.json({
      error:"No matching requests found."
    });
  }

  res.json(orders);
});

app.get("/history", async (req,res)=>{

  const orders =
    await Order.find()
    .sort({ createdAt:-1 });

  res.json(orders);
});

let previousContext = "";

app.post("/chat", async (req,res)=>{

  const message =
    req.body.message.toLowerCase().trim();

  const products =
    await Product.find();

  const topProducts =
    await Product.find()
    .sort({ sales:-1 })
    .limit(3);

  let reply =
    "I can help with eco products, categories, tracking, sustainability, pricing, delivery timelines, and recommendations.";

  if (/hi|hello|hey|good morning|good evening/.test(message)) {

    reply =
      "Hello. I am Nexa AI, your intelligent sustainable technology assistant. Ask me about products, eco recommendations, pricing, delivery, rankings, or order tracking.";
  }

  else if (
    message.includes("best product") ||
    message.includes("top product") ||
    message.includes("most popular")
  ) {

    reply =
      topProducts.map((p,index)=>
        `${index + 1}. ${p.name} (${p.sales} sales)`
      ).join(" | ");
  }

  else if (
    message.includes("cheap") ||
    message.includes("budget") ||
    message.includes("affordable")
  ) {

    const cheapest =
      [...products]
      .sort((a,b)=>a.price - b.price)
      .slice(0,3);

    reply =
      cheapest.map(p =>
        `${p.name} - ₹${p.price}`
      ).join(" | ");
  }

  else if (
    message.includes("highest eco") ||
    message.includes("eco score") ||
    message.includes("most sustainable")
  ) {

    const ecoProducts =
      products.filter(p => p.ecoScore >= 9);

    reply =
      ecoProducts.map(p =>
        `${p.name} (${p.ecoScore}/10)`
      ).join(" | ");
  }

  else if (
    message.includes("recommend") ||
    message.includes("suggest")
  ) {

    let recommended = [];

    if (message.includes("audio")) {
      recommended = products.filter(p => p.category === "Audio");
    }

    else if (message.includes("keyboard")) {
      recommended = products.filter(p => p.category === "Keyboard");
    }

    else if (message.includes("lighting")) {
      recommended = products.filter(p => p.category === "Lighting");
    }

    else {
      recommended = topProducts;
    }

    reply =
      recommended.slice(0,3).map(p =>
        `${p.name} - ₹${p.price} - Eco ${p.ecoScore}/10`
      ).join(" | ");
  }

  else if (
    message.includes("categories") ||
    message.includes("available categories")
  ) {

    const categories =
      [...new Set(products.map(p => p.category))];

    reply =
      `Available categories: ${categories.join(", ")}`;
  }

  else if (
    message.includes("delivery") ||
    message.includes("eta") ||
    message.includes("arrive")
  ) {

    reply =
      "Orders are usually delivered within 5-7 days. Older orders are automatically marked as Delivered in the system.";
  }

  else if (
    message.includes("refund") ||
    message.includes("return")
  ) {

    reply =
      "Refunds and replacements are available for defective eco products after verification.";
  }

  else if (
    message.includes("track") ||
    message.includes("order status")
  ) {

    reply =
      "Use the Track Orders section with either Request ID or exact product name.";
  }

  else if (
    message.includes("eco") ||
    message.includes("sustainable") ||
    message.includes("environment")
  ) {

    reply =
      "GreenChip products are designed using biodegradable, bamboo-based, recyclable, solar-powered, and compostable materials to reduce electronic waste.";
  }

  else {

    const found = products.find(p => {

      const cleaned =
        p.name
        .toLowerCase()
        .replace(/-/g," ");

      return cleaned
        .split(" ")
        .some(word =>
          word.length > 2 &&
          message.includes(word)
        );
    });

    if (found) {

      previousContext = found.category;

      reply =
        `${found.name} is available under the ${found.category} category for ₹${found.price}. Eco Score: ${found.ecoScore}/10. Current sales: ${found.sales}. ${found.feedback || "This product is gaining popularity among eco-conscious customers."}`;
    }

    else if (previousContext) {

      const contextualProducts =
        products.filter(p => p.category === previousContext);

      reply =
        `You were previously exploring ${previousContext} products. Recommended options: ${contextualProducts.slice(0,3).map(p => p.name).join(", ")}`;
    }

    else {

  const invalidKeywords = [
    "phone",
    "mobile",
    "iphone",
    "android",
    "robot",
    "television",
    "tv",
    "laptop",
    "drone",
    "camera"
  ];

  const invalidDetected =
    invalidKeywords.some(word =>
      message.includes(word)
    );

  if (invalidDetected) {

    reply =
      "That product is currently not available in the GreenChip sustainable marketplace.";
  }

  else {

    reply =
      "I understand your question. Please ask about products, pricing, categories, recommendations, sustainability, delivery, rankings, or order tracking.";
  }
}
  }

  res.json({ reply });
});

app.listen(PORT, ()=>{

  console.log(
    `Server running on http://localhost:${PORT}`
  );
});
