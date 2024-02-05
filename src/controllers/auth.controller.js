const winston = require('winston');
const User = require('../models/User.schema');
const bcrypt = require('bcrypt');
const createToken = require('../utils/token');

const {
  BadRequestException,
  ValidationError,
} = require('../utils/customErrors');

const userService = require('../services/user.service');

const logger = winston.loggers.get('simpleLogger');

const maxAge = 7 * 24 * 60 * 60;

const signup = async (req, res, next) => {
  try {
    logger.info(req.body.email);
    const user = await userService.createUser(req.body);
    const token = createToken(user._id, maxAge);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    return next(error);
  }
};
const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new BadRequestException('User not found');

    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      const token = createToken(user._id, maxAge);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });
    } else {
      throw new BadRequestException('Incorrect password');
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
};

module.exports = { signup, login, logout };
