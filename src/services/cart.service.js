const Cart = require('../models/cart.schema');

const getAllCartsByUser = async (userId) => {
  const carts = await Cart.find({ _id: userId });
  return carts;
};

module.exports = { getAllCartsByUser };
