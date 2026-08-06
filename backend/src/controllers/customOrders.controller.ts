import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import type { AuthedRequest } from '../middleware/auth.js';

const customOrderSchema = z.object({
  apparelType: z.string().min(1),
  colors: z.string().min(1),
  placement: z.string().min(1),
  sizes: z.record(z.number().nonnegative()).default({}),
  quantity: z.number().int().positive().default(1),
  notes: z.string().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(6),
});

export async function createCustomOrder(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const data = customOrderSchema.parse(req.body);
    // req.file is populated by multer when the client sends multipart/form-data with an "artwork" field
    const artworkUrl = (req as Request & { file?: Express.Multer.File }).file?.path;

    const result = await pool.query(
      `INSERT INTO custom_orders
        (user_id, apparel_type, colors, placement, sizes, quantity, artwork_url, notes, contact_email, contact_phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        req.user?.userId ?? null,
        data.apparelType,
        data.colors,
        data.placement,
        JSON.stringify(data.sizes),
        data.quantity,
        artworkUrl ?? null,
        data.notes ?? null,
        data.contactEmail,
        data.contactPhone,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function listCustomOrders(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    // Admins see everything; customers see only their own orders
    const query =
      req.user?.role === 'admin'
        ? 'SELECT * FROM custom_orders ORDER BY created_at DESC'
        : 'SELECT * FROM custom_orders WHERE user_id = $1 ORDER BY created_at DESC';
    const params = req.user?.role === 'admin' ? [] : [req.user?.userId];
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function updateCustomOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const status = z
      .enum(['pending_review', 'mockup_sent', 'approved', 'in_production', 'completed', 'cancelled'])
      .parse(req.body.status);
    const result = await pool.query(
      'UPDATE custom_orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Order not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
