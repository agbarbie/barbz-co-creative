import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import type { AuthedRequest } from '../middleware/auth.js';

const bookingSchema = z.object({
  service: z.string().min(1),
  date: z.string(), // ISO date, e.g. "2026-08-20"
  time: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  notes: z.string().optional(),
});

export async function createBooking(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const data = bookingSchema.parse(req.body);
    const result = await pool.query(
      `INSERT INTO bookings (user_id, service, booking_date, booking_time, name, email, phone, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [req.user?.userId ?? null, data.service, data.date, data.time, data.name, data.email, data.phone, data.notes ?? null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function listBookings(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const query =
      req.user?.role === 'admin'
        ? 'SELECT * FROM bookings ORDER BY booking_date ASC'
        : 'SELECT * FROM bookings WHERE user_id = $1 ORDER BY booking_date ASC';
    const params = req.user?.role === 'admin' ? [] : [req.user?.userId];
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function updateBookingStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const status = z.enum(['requested', 'confirmed', 'completed', 'cancelled']).parse(req.body.status);
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Booking not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
