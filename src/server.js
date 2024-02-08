const http = require('http');
const dotenv = require('dotenv');
const winston = require('winston');
const db = require('./database/db');
const app = require('./app');
dotenv.config();

const logger = winston.loggers.get('simpleLogger');

const PORT = process.env.PORT;

const server = http.createServer(app);

db.on('open', () => {
  logger.info('⚡ Connected to DB...');
});

server.listen(PORT, () => {
  logger.info(`⚡ Server started, listening to port: ${PORT}`);
});
