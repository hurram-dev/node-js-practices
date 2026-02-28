import z from "zod";
import type { Request, Response, NextFunction } from 'express';

export const validate = <T extends z.ZodTypeAny>(schema: T) => (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
        const errors = validationResult.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
        }))

        return res.status(400).json({ errors});
    }

    req.body = validationResult.data;

    next();
}