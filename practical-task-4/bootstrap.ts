import express from 'express';

import productRouter from './src/product/product.router';
import { errorHandler } from './src/middleware/error-handler.middleware';

const PORT = 8080;

const app = express();

app.use(express.json());

app.use('/products', productRouter);

app.use(errorHandler);

export function bootstrap() {

    const server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

    return server;

}
