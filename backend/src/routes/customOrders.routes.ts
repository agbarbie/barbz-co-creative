import { Router } from 'express';
import {
  createCustomOrder,
  listCustomOrders,
  updateCustomOrderStatus,
} from '../controllers/customOrders.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Guests can submit custom orders; the artwork file arrives as multipart field "artwork"
router.post('/', upload.single('artwork'), createCustomOrder);
router.get('/', requireAuth, listCustomOrders);
router.patch('/:id/status', requireAuth, requireAdmin, updateCustomOrderStatus);

export default router;
