import { Router } from 'express';
import {
  listTestimonials,
  listAllTestimonials,
  createTestimonial,
  publishTestimonial,
} from '../controllers/testimonials.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', listTestimonials);
router.get('/all', requireAuth, requireAdmin, listAllTestimonials);
router.post('/', createTestimonial);
router.patch('/:id/publish', requireAuth, requireAdmin, publishTestimonial);

export default router;
