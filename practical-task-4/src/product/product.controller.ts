import { update } from './product.repository';
import type { Request, Response } from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from './product.service';
import { ProductEntity } from './product.model';

export const getAllProductsHandler = async (req: Request, res: Response) => {
    const products = await getAllProducts();

    res.status(200).json({ data: products})
}

export const createProductHandler = async (req: Request<any, any, ProductEntity, any>, res: Response) => {
    const product = await createProduct(req.body);

    res.status(201).json({ data: product})
}

export const updateProductHandler = async (req: Request<{ id: string }, any, ProductEntity, any>, res: Response) => {
    const { id } = req.params;

    const updatedProduct = await updateProduct(id, req.body);

    res.status(200).json({ data: updatedProduct})
}

export const deleteProductHandler = async (req: Request<{ id: string }, any, any, any>, res: Response) => {
    const { id } = req.params;

    await deleteProduct(id);

    res.status(204).send();
}
