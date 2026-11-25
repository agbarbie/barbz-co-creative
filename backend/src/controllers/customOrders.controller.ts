import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import type { AuthedRequest } from '../middleware/auth.js';
import { notifyOwner } from '../utils/notify.js';

const customOrderSchema = z.object({
  apparelType: z.string().min(1),
  colors: z.string().min(1),
  placement: z.string().min(1),
  // Multipart form submissions send every field as a string, so accept a JSON string too
  sizes: z.preprocess(
    (v) => {
      if (typeof v !== 'string') return v;
      try {
        return JSON.parse(v);
      } catch {
        return {};
      }
    },
    z.record(z.coerce.number().nonnegative()).default({})
  ),
  quantity: z.coerce.number().int().positive().default(1),
  notes: z.string().optional(),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(6),
});

export async function createCustomOrder(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const data = customOrderSchema.parse(req.body);
    // req.file is populated by multer when the client sends multipart/form-data with an "artwork" field
    const file = (req as Request & { file?: Express.Multer.File }).file;
    // On Vercel the disk is temporary, so an uploaded file cannot be kept (needs cloud storage).
    const artworkUrl = file && !process.env.VERCEL ? `/uploads/${file.filename}` : undefined;

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

    const sizesSummary =
      Object.entries(data.sizes)
        .filter(([, qty]) => Number(qty) > 0)
        .map(([size, qty]) => `${size}: ${qty}`)
        .join(', ') || '-';

    // Wait for the email before replying (required on Vercel serverless).
    await notifyOwner(
      `New custom order request from ${data.contactEmail}`,
      [
        `Apparel: ${data.apparelType}`,
        `Colours: ${data.colors}`,
        `Placement: ${data.placement}`,
        `Quantity: ${data.quantity}`,
        `Sizes: ${sizesSummary}`,
        `Email: ${data.contactEmail}`,
        `Phone: ${data.contactPhone}`,
        `Notes: ${data.notes ?? '-'}`,
        file && !artworkUrl
          ? `Artwork: customer attached "${file.originalname}" but it could not be stored - ask them to send it by email or WhatsApp.`
          : `Artwork: ${artworkUrl ?? 'none attached'}`,
      ],
      data.contactEmail
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
      .enum([
        'pending_review', 'in_design', 'mockup_sent', 'approved',
        'in_production', 'quality_check', 'ready', 'delivered', 'cancelled',
      ])
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