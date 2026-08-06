import { Router } from 'express';
import { listProducts, getProduct, createProduct } from '../controllers/products.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', requireAuth, requireAdmin, createProduct);

export default router;
