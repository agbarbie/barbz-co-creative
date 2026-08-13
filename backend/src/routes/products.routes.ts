import { Router } from 'express';
import { listProducts, getProduct, createProduct, generateProductCopy, createVariant, updateVariant, deleteVariant } from '../controllers/products.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listProducts);
// Must come before '/:id' so 'ai' isn't captured as a product id param.
router.post('/ai/generate-copy', requireAuth, requireAdmin, generateProductCopy);
router.get('/:id', getProduct);
router.post('/', requireAuth, requireAdmin, createProduct);
router.post('/:id/variants', requireAuth, requireAdmin, createVariant);
router.patch('/variants/:variantId', requireAuth, requireAdmin, updateVariant);
router.delete('/variants/:variantId', requireAuth, requireAdmin, deleteVariant);

export default router;
