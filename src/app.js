const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler.middleware');
require('./utils/loggers');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middlewares/auth.middleware');

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');
const testRoutes = require('./routes/test.route');
const userRoutes = require('./routes/user.route');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/test', requireAuth, testRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

module.exports = app;
