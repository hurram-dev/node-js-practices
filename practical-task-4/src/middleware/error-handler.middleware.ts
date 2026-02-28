import type { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotFoundError, ValidationError } from '../shared/errors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BadRequestError) {
        return res.status(400).json({ error: err.message });
    }

    if (err instanceof ValidationError) {
        return res.status(422).json({ error: err.message });
    }

    if (err instanceof NotFoundError) {
        return res.status(404).json({ error: err.message });
    }

    return res.status(500).json({ error: err.message || 'Internal Server Error' });
}