const bcrypt = require('bcrypt');
const createToken = require('../utils/token');

const { BadRequestException } = require('../utils/customErrors');

const userService = require('../services/user.service');

const maxAge = 7 * 24 * 60 * 60;

const signup = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    const token = createToken(user._id, maxAge);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(201)
      .json({ userId: user._id, userRole: user.role, userCart: user.cart });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const filter = {
      email: email,
    };
    const user = await userService.getUserByFilter(filter);
    if (!user) throw new BadRequestException('User not found');

    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      const token = createToken(user._id, maxAge);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res
        .status(201)
        .json({ userId: user._id, userRole: user.role, userCart: user.cart });
    } else {
      throw new BadRequestException('Incorrect Email or password');
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 });
};

module.exports = { signup, login, logout };
