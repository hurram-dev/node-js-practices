const enum ErrorType {
    NotFoundError = 'NotFoundError',
    ValidationError = 'ValidationError',
    BadRequestError = 'BadRequestError',
}

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ErrorType.NotFoundError;
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ErrorType.ValidationError;
    }
}

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = ErrorType.BadRequestError;
    }
}