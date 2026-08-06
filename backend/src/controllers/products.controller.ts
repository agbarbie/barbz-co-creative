import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';

const productSchema = z.object({
  name: z.string().min(2),
  category: z.enum(['hoodies', 'tshirts', 'sweatshirts', 'accessories']),
  price_kes: z.number().positive(),
  image_url: z.string().url().optional(),
  description: z.string().optional(),
  customizable: z.boolean().optional(),
});

export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const { category } = req.query;
    const params: unknown[] = [];
    let query = 'SELECT * FROM products WHERE is_active = true';
    if (category && category !== 'all') {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const data = productSchema.parse(req.body);
    const result = await pool.query(
      `INSERT INTO products (name, category, price_kes, image_url, description, customizable)
       VALUES ($1, $2, $3, $4, $5, COALESCE($6, true)) RETURNING *`,
      [data.name, data.category, data.price_kes, data.image_url, data.description, data.customizable]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
