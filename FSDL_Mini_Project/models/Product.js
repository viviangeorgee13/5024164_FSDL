const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

  name: String,

  price: Number,

  category: String,

  ecoScore: Number,

  sales: {
    type: Number,
    default: 0
  },

  rank: {
    type: Number,
    default: 0
  },

  feedback: {
    type: String,
    default: ""
  }

});

module.exports = mongoose.model(
  "Product",
  ProductSchema
);
