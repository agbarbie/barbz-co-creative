import { Router } from 'express';
import { createBooking, listBookings, updateBookingStatus } from '../controllers/bookings.controller.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', createBooking);
router.get('/', requireAuth, listBookings);
router.patch('/:id/status', requireAuth, requireAdmin, updateBookingStatus);

export default router;
