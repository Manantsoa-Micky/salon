const { cartStatus } = require('../enums/enums');
const User = require('../models/User.schema');
const Cart = require('../models/cart.schema');
const Review = require('../models/review.schema');
const { transformIdListToStringList } = require('../utils/helper');
const seed = require('../sampleData/users.json');

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const findUserById = async (id) => {
  const user = User.findById(id);
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({
    status: { $ne: 'deleted' },
    role: { $ne: 'customer' },
  }).select('_id firstName lastName matricule status role');
  return users;
};

const updateUser = async (filter, update) => {
  const user = await User.findOneAndUpdate(filter, update, { new: true });
  return user;
};

const hardDeleteUser = async (userId) => {
  const user = await User.findOneAndDelete({ _id: userId });
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

const addReview = async (reviewData, userId) => {
  const review = await Review.create(reviewData);
  const user = await User.findById(userId);
  user.reviews.push(review._id);
  user.save();
  return review;
};

const seedUsers = async () => {
  seed.forEach(async (user) => {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      salary: user.salary,
      password: user.password,
      role: user.role,
      username: user.username,
      hours: {
        begin: user.hours.begin,
        end: user.hours.end,
      },
      adress: user.address,
      status: 'active',
    };
    await User.create(data);
  });
  const list = await User.find();
  return list;
};

module.exports = {
  createUser,
  addService,
  getUserByFilter,
  updateUser,
  addToCart,
  addReview,
  getAllUsers,
  hardDeleteUser,
  findUserById,
  seedUsers,
};
