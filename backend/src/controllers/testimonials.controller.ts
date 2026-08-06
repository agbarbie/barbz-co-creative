import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';

const testimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  quote: z.string().min(1),
  rating: z.number().int().min(1).max(5).default(5),
});

export async function listTestimonials(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      'SELECT * FROM testimonials WHERE is_published = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function createTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const data = testimonialSchema.parse(req.body);
    const result = await pool.query(
      `INSERT INTO testimonials (name, role, quote, rating) VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.name, data.role ?? null, data.quote, data.rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function publishTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      'UPDATE testimonials SET is_published = true WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
