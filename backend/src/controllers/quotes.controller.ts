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
