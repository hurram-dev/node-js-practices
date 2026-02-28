import { ProductEntity } from "../entities/product.entity";
import { BadRequestError, NotFoundError } from "../shared/errors";
import {create, findAll, findById, remove, update} from "./product.repository";

export const getAllProducts = async (): Promise<ProductEntity[]> => {
    return await findAll();
}

export const getProductById = async (id: string): Promise<ProductEntity | null> => {
    const product = await findById(id)

    if (!product) {
        throw new NotFoundError(`Product with id ${id} not found`);
    }

    return product;
}

export const createProduct = async (product: ProductEntity): Promise<ProductEntity | null> => {
    const newProduct = await create(product);

    if (!newProduct) {
        throw new BadRequestError('Failed to create product');
    }

    return newProduct;
}

export const updateProduct = async (id: string, product: Partial<ProductEntity>): Promise<ProductEntity | null> => {
    const updatedProduct = await update(id, product);

    if (!updatedProduct) {
        throw new NotFoundError(`Product with id ${id} not found`);
    }

    return updatedProduct;
}

export const deleteProduct = async (id: string): Promise<void> => {
    const isDeleted = await remove(id);

    if (!isDeleted) {
        throw new NotFoundError(`Product with id ${id} not found`);
    }
}