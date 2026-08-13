import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function createContactMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const data = contactSchema.parse(req.body);
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *`,
      [data.name, data.email, data.message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function listContactMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}
