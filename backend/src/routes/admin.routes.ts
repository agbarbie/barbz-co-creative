import { Router } from 'express';
import { getDashboardSummary } from '../controllers/admin.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/summary', requireAuth, requireAdmin, getDashboardSummary);

export default router;
