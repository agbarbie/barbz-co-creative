import type { Request, Response, NextFunction } from 'express';
import { pool } from '../db/pool.js';

export async function getDashboardSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const [customOrders, bookings, quotes, products, messages, testimonials] = await Promise.all([
      pool.query("SELECT COUNT(*)::int AS count FROM custom_orders WHERE status = 'pending_review'"),
      pool.query("SELECT COUNT(*)::int AS count FROM bookings WHERE status = 'requested'"),
      pool.query("SELECT COUNT(*)::int AS count FROM quotes WHERE status = 'new'"),
      pool.query('SELECT COUNT(*)::int AS count FROM products WHERE is_active = true'),
      pool.query('SELECT COUNT(*)::int AS count FROM contact_messages'),
      pool.query('SELECT COUNT(*)::int AS count FROM testimonials WHERE is_published = false'),
    ]);

    res.json({
      pendingCustomOrders: customOrders.rows[0].count,
      pendingBookings: bookings.rows[0].count,
      newQuotes: quotes.rows[0].count,
      activeProducts: products.rows[0].count,
      totalMessages: messages.rows[0].count,
      unpublishedTestimonials: testimonials.rows[0].count,
    });
  } catch (err) {
    next(err);
  }
}
