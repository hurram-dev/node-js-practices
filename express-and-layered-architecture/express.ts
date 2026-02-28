import express from 'express';
import type { NextFunction, Request, Response } from 'express';


const app = express();

// Middleware to log incoming requests
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Request Body: ', req.body)

    next();
}

// Error handler middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message, stack: err.stack });
}

app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server is running on port: 8080')
})

