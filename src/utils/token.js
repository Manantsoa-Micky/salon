const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createToken = (id, duration) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: duration,
    });
    return token;
};

module.exports = createToken;
