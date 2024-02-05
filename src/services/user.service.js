const User = require('../models/User.schema');
const { transformIdListToStringList } = require('../utils/helper');

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const addService = async (userId, service) => {
  const user = await User.findById(userId);
  user.services.push(service[0]);
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

module.exports = { createUser, addService, getUserByFilter, updateUser };
