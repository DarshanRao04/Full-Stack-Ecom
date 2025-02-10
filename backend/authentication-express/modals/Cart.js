const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
  },
],
  
  total: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
