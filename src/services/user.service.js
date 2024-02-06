const { cartStatus } = require('../enums/enums');
const User = require('../models/User.schema');
const Cart = require('../models/cart');
const { transformIdListToStringList } = require('../utils/helper');

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const addService = async (userId, serviceList) => {
  const user = await User.findById(userId);
  serviceList.forEach((service) => {
    user.services.push(service);
  });
  user.services = transformIdListToStringList(user.services);
  await user.save();
  return user.services;
};

const getUserByFilter = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

const updateUser = async (filter, update) => {
  const user = await User.findOneAndUpdate(filter, update, { new: true });
  return user;
};

const addToCart = async (userId, serviceList) => {
  const newCart = [
    {
      orders: [...serviceList],
      status: cartStatus.ACTIVE,
    },
  ];
  const cart = await Cart.create(newCart);
  const user = await User.findById(userId);
  user.cart = cart;
  await user.save();
  return user.cart;
};

module.exports = {
  createUser,
  addService,
  getUserByFilter,
  updateUser,
  addToCart,
};
