const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  orders: {
    type: [mongoose.Types.ObjectId],
    required: true,
    ref: 'Product',
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
  status: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
