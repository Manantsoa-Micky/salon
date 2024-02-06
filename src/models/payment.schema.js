const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  order: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Order',
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
