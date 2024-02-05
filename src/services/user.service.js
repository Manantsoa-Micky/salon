const User = require('../models/User.schema');

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const addService = async (userId, service) => {
  const user = await User.findById(userId);
  const finalArray = Array.from(new Set([...user.services, ...service]));
  user.services = finalArray;
};

module.exports = { createUser, addService };
