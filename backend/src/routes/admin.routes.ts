import { Router } from 'express';
import { getDashboardSummary, listCustomers, getCustomer } from '../controllers/admin.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/summary', requireAuth, requireAdmin, getDashboardSummary);
router.get('/customers', requireAuth, requireAdmin, listCustomers);
router.get('/customers/:id', requireAuth, requireAdmin, getCustomer);

export default router;
