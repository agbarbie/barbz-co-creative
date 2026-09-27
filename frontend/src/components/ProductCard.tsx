import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import ApparelArt from './Art/ApparelArt';

export default function ProductCard({ product }: { product: Product }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      className="card-premium group overflow-hidden p-0"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative aspect-square overflow-hidden bg-royal-50 dark:bg-white/5">
        {imageFailed ? (
          <ApparelArt kind={product.category} className="h-full w-full" />
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        {product.customizable && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-3 py-1 font-secondary text-[11px] font-semibold uppercase tracking-wide text-royal-800 shadow">
            Customizable
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-accent text-lg italic font-medium text-royal-700 dark:text-white">{product.name}</h3>
        <p className="mt-1 font-secondary text-sm text-royal-400 dark:text-sky-200/70">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-primary text-lg font-bold text-royal-600 dark:text-sky-100">
            KSh {product.price.toLocaleString()}
          </span>
          <Link
            to={`/custom-order?product=${product.id}`}
            className="font-secondary text-sm font-semibold text-gold-500 transition hover:text-gold-600"
          >
            Customize →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}