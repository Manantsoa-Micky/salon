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
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now,
  },
  order: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;
