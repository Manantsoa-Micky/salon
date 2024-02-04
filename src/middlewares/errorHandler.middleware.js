const {
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  DatabaseError,
  ValidationError,
  NotFoundException,
} = require('../utils/customErrors');

function errorHandler(error, req, res, next) {
  if (error instanceof UnauthorizedException) {
    res.status(401).json({
      error: 'Unauthorized',
      code: 401,
      message: error.message,
    });
  } else if (error instanceof ForbiddenException) {
    res.status(403).json({
      error: 'Forbidden',
      code: 403,
      message: error.message,
    });
  } else if (error instanceof BadRequestException) {
    res.status(400).json({
      error: 'BadRequest',
      code: 400,
      message: error.message,
    });
  } else if (error instanceof DatabaseError) {
    res.status(500).json({
      error: 'Database error',
      code: 500,
      message: error.message,
    });
  } else if (error instanceof ValidationError) {
    res.status(400).json({
      error: 'Validation Error',
      code: 400,
      message: error.message,
    });
  } else if (error instanceof NotFoundException) {
    res.status(404).json({
      error: 'NotFoundException',
      code: 404,
      message: error.message,
    });
  } else {
    res.status(500).json({
      error: 'An error has occured',
      code: 500,
      message: error.message,
    });
  }
  return next(error);
}

module.exports = {
  errorHandler,
};
