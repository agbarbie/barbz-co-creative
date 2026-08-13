import { Router } from 'express';
import { createQuote, listQuotes, updateQuote } from '../controllers/quotes.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', createQuote);
router.get('/', requireAuth, requireAdmin, listQuotes);
router.patch('/:id', requireAuth, requireAdmin, updateQuote);

export default router;
