const {
    UnauthorizedException,
    ForbiddenException,
    BadRequestException,
    DatabaseError,
    ValidationError,
    NotFoundException,
} = require('../utils/customErrors');

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
    switch (error.constructor) {
        case UnauthorizedException:
            res.status(401).json({
                error: 'Unauthorized',
                code: 'UNAUTHORIZED',
            });
            break;
        case ForbiddenException:
            res.status(403).json({ error: 'Forbidden', code: 'FORBIDDEN' });
            break;
        case BadRequestException:
            res.status(400).json({ error: 'Bad request', code: 'BAD_REQUEST' });
            break;
        case DatabaseError:
            res.status(500).json({
                error: 'Database error',
                code: 'INTERNAL_ERROR',
            });
            break;
        case ValidationError:
            res.status(400).json({ error: 'Bad request', code: 'BAD_REQUEST' });
            break;
        case NotFoundException:
            res.status(404).json({ error: 'NotFound', code: 'NOT_FOUND' });
            break;
        default:
            res.status(500).json({
                error: 'Internal server error',
                code: 'INTERNAL_ERROR',
            });
    }
}

module.exports = {
    errorHandler,
};
