import { Router } from 'express';
import { createQuote, listQuotes } from '../controllers/quotes.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', createQuote);
router.get('/', requireAuth, requireAdmin, listQuotes);

export default router;
