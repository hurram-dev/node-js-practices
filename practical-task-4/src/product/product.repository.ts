import fs from 'node:fs'
import { ProductEntity } from '../entities/product.entity'
import path from 'node:path'

const pathToData = path.join(process.cwd(), 'assets', 'products.json')

export const findAll = async (): Promise<ProductEntity[]> => {
    const products = fs.readFileSync(pathToData, 'utf-8')

    return JSON.parse(products)
}

export const findById = async (id: string): Promise<ProductEntity | null> => {
    const products = await findAll();

    return products.find((product) => product.id === id) ?? null;
}

export const create = async (product: ProductEntity): Promise<ProductEntity | null> => {
    const products = await findAll();

    products.push(product);

    try {
        await fs.promises.writeFile(pathToData, JSON.stringify(products), 'utf-8')
        return product;
    } catch (error) {
        return null
    }
}

export const update = async (id: string, product: Partial<ProductEntity>): Promise<ProductEntity | null> => {
    const products = await findAll();
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex === -1) {
        return null;
    }

    const updatedProduct = { ...products[productIndex], ...product } as ProductEntity;
    products[productIndex] = updatedProduct;

    try {
        await fs.promises.writeFile(pathToData, JSON.stringify(products), 'utf-8')
        return updatedProduct;
    } catch (error) {
        return null;
    }
}

export const remove = async (id: string): Promise<boolean> => {
    const products = await findAll();

    const updatedProducts = products.filter((p) => p.id !== id);

    if (updatedProducts.length === products.length) {
        return false; // No product was removed
    }

    try {
        await fs.promises.writeFile(pathToData, JSON.stringify(updatedProducts), 'utf-8')
        return true;
    } catch (error) {
        return false;
    }
}