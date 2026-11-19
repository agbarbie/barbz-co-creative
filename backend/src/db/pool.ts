import { Pool } from 'pg';
import 'dotenv/config';

const isLocal = /localhost|127\.0\.0\.1/.test(process.env.DATABASE_URL || '');

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Hosted databases (Neon, Supabase, Render...) require SSL
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error on idle client', err);
});