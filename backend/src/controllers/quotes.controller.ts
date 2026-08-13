import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';

const quoteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  serviceType: z.string().min(1),
  budgetRange: z.string().optional(),
  details: z.string().min(1),
});

export async function createQuote(req: Request, res: Response, next: NextFunction) {
  try {
    const data = quoteSchema.parse(req.body);
    const result = await pool.query(
      `INSERT INTO quotes (name, email, phone, service_type, budget_range, details)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [data.name, data.email, data.phone, data.serviceType, data.budgetRange ?? null, data.details]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function listQuotes(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

// Blueprint Vol. IV, Section 12 — Quotations & Proposals.
// Admin fills in pricing once they've scoped the job; total is computed
// server-side so the admin never has to do the arithmetic by hand.
const quotePricingSchema = z.object({
  status: z.enum(['new', 'quoted', 'won', 'lost']).optional(),
  quantity: z.number().int().positive().optional(),
  unit_price_kes: z.number().nonnegative().optional(),
  production_cost_kes: z.number().nonnegative().optional(),
  delivery_cost_kes: z.number().nonnegative().optional(),
  discount_percent: z.number().min(0).max(100).optional(),
  validity_days: z.number().int().positive().optional(),
  terms: z.string().optional(),
});

export async function updateQuote(req: Request, res: Response, next: NextFunction) {
  try {
    const data = quotePricingSchema.parse(req.body);
    const existing = await pool.query('SELECT * FROM quotes WHERE id = $1', [req.params.id]);
    if (existing.rows.length === 0) return res.status(404).json({ message: 'Quote not found' });

    const merged = { ...existing.rows[0], ...data };
    const quantity = Number(merged.quantity) || 0;
    const unitPrice = Number(merged.unit_price_kes) || 0;
    const subtotal = quantity * unitPrice + Number(merged.production_cost_kes || 0) + Number(merged.delivery_cost_kes || 0);
    const discount = Number(merged.discount_percent) || 0;
    const total = subtotal - subtotal * (discount / 100);

    const result = await pool.query(
      `UPDATE quotes SET
        status = $1, quantity = $2, unit_price_kes = $3, production_cost_kes = $4,
        delivery_cost_kes = $5, discount_percent = $6, total_kes = $7, validity_days = $8, terms = $9
       WHERE id = $10 RETURNING *`,
      [
        merged.status,
        merged.quantity,
        merged.unit_price_kes,
        merged.production_cost_kes,
        merged.delivery_cost_kes,
        merged.discount_percent,
        total,
        merged.validity_days,
        merged.terms,
        req.params.id,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
