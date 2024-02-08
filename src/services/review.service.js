const Review = require('../models/review.schema');

const getAllReviews = async () => {
  const reviews = Review.find();
  return reviews;
};

module.exports = { getAllReviews };
