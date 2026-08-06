import { Router } from 'express';
import { createBooking, listBookings } from '../controllers/bookings.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', createBooking);
router.get('/', requireAuth, listBookings);

export default router;
