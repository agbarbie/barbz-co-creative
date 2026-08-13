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

// Blueprint Vol. IV, Section 4 — Customer Management.
// Customer records aggregated from every touchpoint (orders, bookings,
// quotes) rather than a flat contact list.
export async function listCustomers(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(`
      SELECT
        u.id, u.name, u.email, u.created_at,
        (SELECT COUNT(*)::int FROM custom_orders co WHERE co.contact_email = u.email) AS custom_order_count,
        (SELECT COUNT(*)::int FROM bookings b WHERE b.email = u.email) AS booking_count,
        (SELECT COUNT(*)::int FROM quotes q WHERE q.email = u.email) AS quote_count
      FROM users u
      WHERE u.role = 'customer'
      ORDER BY u.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function getCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    const userResult = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1 AND role = $2',
      [req.params.id, 'customer']
    );
    if (userResult.rows.length === 0) return res.status(404).json({ message: 'Customer not found' });
    const customer = userResult.rows[0];

    const [customOrders, bookings, quotes] = await Promise.all([
      pool.query('SELECT * FROM custom_orders WHERE contact_email = $1 ORDER BY created_at DESC', [customer.email]),
      pool.query('SELECT * FROM bookings WHERE email = $1 ORDER BY booking_date DESC', [customer.email]),
      pool.query('SELECT * FROM quotes WHERE email = $1 ORDER BY created_at DESC', [customer.email]),
    ]);

    res.json({
      ...customer,
      customOrders: customOrders.rows,
      bookings: bookings.rows,
      quotes: quotes.rows,
    });
  } catch (err) {
    next(err);
  }
}
