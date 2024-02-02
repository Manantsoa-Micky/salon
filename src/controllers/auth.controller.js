const winston = require('winston');
const User = require('../models/User');
const {
    BadRequestException,
    ValidationError,
} = require('../utils/customErrors');

const logger = winston.loggers.get('simpleLogger');

module.exports.signup_get = (req, res) => {};
module.exports.login_get = (req, res) => {};
module.exports.signup_post = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        logger.info(email);
        if (!email || !password)
            throw new ValidationError(
                'erreur dans le mail ou le mot de passe '
            );
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (error) {
        return next(error);
    }
};
module.exports.login_post = (req, res) => {};
