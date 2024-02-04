const winston = require('winston');
const User = require('../models/User.schema');
const bcrypt = require('bcrypt');
const createToken = require('../utils/token');

const {
  BadRequestException,
  ValidationError,
} = require('../utils/customErrors');

const logger = winston.loggers.get('simpleLogger');

const maxAge = 7 * 24 * 60 * 60;

module.exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    logger.info(email);
    if (!email || !password)
      throw new ValidationError('erreur dans le mail ou le mot de passe ');
    const user = await User.create({ email, password });
    const token = createToken(user._id, maxAge);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (error) {
    return next(error);
  }
};
module.exports.login = async (req, res, next) => {
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

module.exports.logout = async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
};
