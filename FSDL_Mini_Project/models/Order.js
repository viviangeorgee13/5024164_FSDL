const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

  requestId: String,

  name: String,

  email: String,

  product: String,

  price: Number,

  status: {
    type: String,
    default: "Pending"
  },

  eta: {
    type: String,
    default: "5-7 days"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "Order",
  OrderSchema
);
