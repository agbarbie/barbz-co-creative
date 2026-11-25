import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';
import customOrdersRoutes from './routes/customOrders.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import quotesRoutes from './routes/quotes.routes.js';
import blogRoutes from './routes/blog.routes.js';
import testimonialsRoutes from './routes/testimonials.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(helmet());
// Accepts one or more comma-separated origins and ignores trailing slashes,
// so CLIENT_ORIGIN=https://site.vercel.app/ and CLIENT_ORIGIN=https://site.vercel.app both work
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'barbz-and-co-api' }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/custom-orders', customOrdersRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;