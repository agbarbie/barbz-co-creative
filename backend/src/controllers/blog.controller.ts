import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import type { AuthedRequest } from '../middleware/auth.js';

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  category: z.string().optional(),
  image_url: z.string().url().optional(),
  publish: z.boolean().optional(),
});

export async function listPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE published_at IS NOT NULL ORDER BY published_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function listAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function getPostBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE slug = $1', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function createPost(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const data = postSchema.parse(req.body);
    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, author_id, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        data.title,
        data.slug,
        data.excerpt ?? null,
        data.content,
        data.category ?? null,
        data.image_url ?? null,
        req.user?.userId ?? null,
        data.publish ? new Date() : null,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
