const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
require('./utils/loggers');
const winston = require('winston');
const authRoutes = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

const logger = winston.loggers.get('simpleLogger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json());
app.use(cookieParser);

app.use(authRoutes);

app.use(errorHandler);
mongoose.connect(DATABASE_URL).then(function () {
    logger.info('⚡ Connected to DB...');
});
app.listen(PORT, () => {
    logger.info(`⚡ Server started, listening to port: ${PORT}`);
});
