const winston = require('winston');
const { combine, timestamp, json, prettyPrint, errors } = winston.format;

winston.loggers.add('testLogger', {
  level: 'debug',
  format: combine(errors({ stack: true }), timestamp(), json(), prettyPrint()),
  transports: [new winston.transports.Console()],
  defaultMeta: { service: 'Test Service' },
});

winston.loggers.add('simpleLogger', {
  level: 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});
