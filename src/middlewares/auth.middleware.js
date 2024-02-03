const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ForbiddenException } = require('../utils/customErrors');

dotenv.config();

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error) {
                return next(error);
            }
            next();
        });
    } else {
        return next(new ForbiddenException('Unauthorized'));
    }
};

module.exports = { requireAuth };
