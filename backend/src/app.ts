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
import { notFound, errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
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

app.use(notFound);
app.use(errorHandler);
