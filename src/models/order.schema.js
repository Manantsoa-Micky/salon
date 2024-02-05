const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  employee: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  orderNumber: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
