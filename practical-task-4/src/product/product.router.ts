import express from 'express'

const router = express.Router();

import { getAllProductsHandler } from './product.controller';

router.get('/', getAllProductsHandler);

export default router;