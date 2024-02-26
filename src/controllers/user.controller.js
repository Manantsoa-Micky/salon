const userService = require('../services/user.service');
const productService = require('../services/product.service');
const winston = require('winston');
const logger = winston.loggers.get('testLogger');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users: users });
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await userService.findUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getUserServices = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = await userService.getUserByFilter({ _id: userId });
    logger.debug(user);
    res.status(200).json({ services: user.services });
  } catch (error) {
    next(error);
  }
};

const addService = async (req, res, next) => {
  try {
    const list = [];
    const { serviceName, userId } = req.body;
    const filter = { name: serviceName };
    const service = await productService.getProductByFilter(filter);
    list.push(service[0]._id);

    const user = await userService.addService(userId, list);

    res.status(200).json({ services: user });
  } catch (error) {
    next(error);
  }
};

const softDeleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const filter = { _id: userId };
    const update = { status: 'deleted' };
    await userService.updateUser(filter, update);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    next(error);
  }
};

const removeService = async (req, res, next) => {
  try {
    const { serviceName, userId } = req.body;
    const serviceToRemove = await productService.getProductByFilter({
      name: serviceName,
    });
    const filter = { _id: userId };
    const update = { $pull: { services: serviceToRemove[0]._id } };

    const user = await userService.updateUser(filter, update);

    res.status(200).json({ services: user.services });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { serviceList } = req.body;
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const cart = await userService.addToCart(decoded.id, serviceList);
    res.status(200).json({ cart: cart });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    const review = await userService.addReview(req.body, decoded.id);
    res.status(201).json({ review: review });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const deletedUser = await userService.hardDeleteUser(userID);
    res.status(200).json({ user: deletedUser });
  } catch (error) {
    next(error);
  }
};

const seedUsers = async (req, res, next) => {
  try {
    const users = await userService.seedUsers();
    res.status(201).json({ users: users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addService,
  removeService,
  getUserServices,
  addToCart,
  addReview,
  deleteUser,
  seedUsers,
  getAllUsers,
  getOneUser,
  softDeleteUser,
};
