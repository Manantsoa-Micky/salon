const { cartStatus } = require('../enums/enums');
const User = require('../models/User.schema');
const { transformIdListToStringList } = require('../utils/helper');

const createUser = async (userData) => {
  const cart = {
    orders: [],
    status: cartStatus.CREATED,
  };
  const data = {
    ...userData,
    cart: cart,
  };
  const user = await User.create(data);
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
  const user = await User.findById(userId);
  serviceList.forEach((service) => {
    user.cart.push(service);
  });
  user.cart = transformIdListToStringList(user.cart);
  return user.cart;
};

module.exports = {
  createUser,
  addService,
  getUserByFilter,
  updateUser,
  addToCart,
};
