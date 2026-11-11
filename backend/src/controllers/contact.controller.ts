import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { notifyOwner } from '../utils/notify.js';

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
    // fire-and-forget: the visitor gets their response even if email fails
    void notifyOwner(
      `New contact message from ${data.name}`,
      [`Name: ${data.name}`, `Email: ${data.email}`, '', data.message],
      data.email
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