const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  comment: {
    type: String,
    required: false,
    default: 'Nice',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
