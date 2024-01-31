class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class DatabaseError extends CustomError {
    constructor(message) {
        super(message);
    }
}

class ValidationError extends CustomError {
    constructor(message) {
        super(message);
    }
}

class NotFoundException extends CustomError {
    constructor(message) {
        super(message);
    }
}

class UnauthorizedException extends CustomError {
    constructor(message) {
        super(message);
    }
}

class ForbiddenException extends CustomError {
    constructor(message) {
        super(message);
    }
}

class BadRequestException extends CustomError {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    CustomError,
    DatabaseError,
    ValidationError,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
    BadRequestException,
};
