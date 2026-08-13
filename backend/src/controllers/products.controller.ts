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
    const variants = await pool.query(
      'SELECT * FROM product_variants WHERE product_id = $1 ORDER BY size, colour',
      [req.params.id]
    );
    res.json({ ...result.rows[0], variants: variants.rows });
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

// --- Product variants (Blueprint Vol. IV, Section 8) ---

const variantSchema = z.object({
  size: z.string().optional(),
  colour: z.string().optional(),
  sku: z.string().optional(),
  stock_quantity: z.number().int().nonnegative().default(0),
  price_override_kes: z.number().positive().optional(),
  low_stock_threshold: z.number().int().nonnegative().default(5),
});

export async function createVariant(req: Request, res: Response, next: NextFunction) {
  try {
    const data = variantSchema.parse(req.body);
    const product = await pool.query('SELECT id FROM products WHERE id = $1', [req.params.id]);
    if (product.rows.length === 0) return res.status(404).json({ message: 'Product not found' });

    const result = await pool.query(
      `INSERT INTO product_variants (product_id, size, colour, sku, stock_quantity, price_override_kes, low_stock_threshold)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        req.params.id,
        data.size ?? null,
        data.colour ?? null,
        data.sku ?? null,
        data.stock_quantity,
        data.price_override_kes ?? null,
        data.low_stock_threshold,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

const variantUpdateSchema = variantSchema.partial();

export async function updateVariant(req: Request, res: Response, next: NextFunction) {
  try {
    const data = variantUpdateSchema.parse(req.body);
    const existing = await pool.query('SELECT * FROM product_variants WHERE id = $1', [req.params.variantId]);
    if (existing.rows.length === 0) return res.status(404).json({ message: 'Variant not found' });

    const merged = { ...existing.rows[0], ...data };
    const result = await pool.query(
      `UPDATE product_variants
       SET size = $1, colour = $2, sku = $3, stock_quantity = $4, price_override_kes = $5, low_stock_threshold = $6
       WHERE id = $7 RETURNING *`,
      [
        merged.size,
        merged.colour,
        merged.sku,
        merged.stock_quantity,
        merged.price_override_kes,
        merged.low_stock_threshold,
        req.params.variantId,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

export async function deleteVariant(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await pool.query('DELETE FROM product_variants WHERE id = $1 RETURNING id', [req.params.variantId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Variant not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

const aiDescriptionSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  keyDetails: z.string().min(2), // materials, fit, colours, use-case — whatever the admin knows
  tone: z.enum(['warm', 'bold', 'minimal', 'playful']).default('warm'),
  mode: z.enum(['description', 'summary', 'social_caption', 'seo_title']).default('description'),
});

// Section 7 — AI Product Description Assistant.
// Admin supplies structured product info; Claude drafts copy for review.
// The admin always reviews/edits before publishing — this endpoint never
// writes directly to the products table.
export async function generateProductCopy(req: Request, res: Response, next: NextFunction) {
  try {
    const data = aiDescriptionSchema.parse(req.body);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        message: 'AI copy assistant is not configured. Set ANTHROPIC_API_KEY in the backend .env to enable it.',
      });
    }

    const modeInstructions: Record<string, string> = {
      description: 'Write a compelling e-commerce product description, 2-3 short paragraphs.',
      summary: 'Write a punchy one-sentence product summary, under 20 words.',
      social_caption: 'Write an Instagram-style caption for this product, under 280 characters, with 3-5 relevant hashtags at the end.',
      seo_title: 'Write an SEO-friendly product title, under 60 characters, no hashtags.',
    };

    const prompt = `You are writing e-commerce copy for Barbz & Co. Creative, a Kenyan custom apparel and branding studio.

Product name: ${data.name}
Category: ${data.category}
Key details from the admin: ${data.keyDetails}
Tone: ${data.tone}

Task: ${modeInstructions[data.mode]}

Return ONLY the copy itself, no preamble, no quotation marks, no labels.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error', response.status, errText);
      return res.status(502).json({ message: 'AI copy assistant failed to generate a response. Please try again.' });
    }

    const result = (await response.json()) as { content: Array<{ type: string; text?: string }> };
    const text = result.content.find((block) => block.type === 'text')?.text?.trim() ?? '';

    res.json({ mode: data.mode, text });
  } catch (err) {
    next(err);
  }
}
