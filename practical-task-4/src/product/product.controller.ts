import type { Request, Response } from 'express';
import { getAllProducts } from './product.service';

export const getAllProductsHandler = async (req: Request, res: Response) => {
    const products = await getAllProducts();

    res.status(200).json({ data: products})
}

