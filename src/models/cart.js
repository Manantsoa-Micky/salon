const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  orders: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  customerId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
