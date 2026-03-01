import express from 'express'
import { createProductHandler, deleteProductHandler, getAllProductsHandler, updateProductHandler } from './product.controller';
import { validate } from '../middleware/validate.middleware';
import { productSchema } from './product.model';


const router = express.Router();

router.get('/', getAllProductsHandler);

router.post('/', validate(productSchema), createProductHandler);

router.patch('/:id', validate(productSchema), updateProductHandler);

router.delete('/:id', deleteProductHandler);

export default router;