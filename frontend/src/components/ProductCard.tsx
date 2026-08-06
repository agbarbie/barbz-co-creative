import { Link } from 'react-router-dom';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-premium group overflow-hidden p-0">
      <div className="relative aspect-square overflow-hidden bg-royal-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.customizable && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-400 px-3 py-1 font-secondary text-[11px] font-semibold uppercase tracking-wide text-royal-800 shadow">
            Customizable
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-primary text-base font-semibold text-royal-700">{product.name}</h3>
        <p className="mt-1 font-secondary text-sm text-royal-400">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-primary text-lg font-bold text-royal-600">
            KSh {product.price.toLocaleString()}
          </span>
          <Link
            to={`/custom-order?product=${product.id}`}
            className="font-secondary text-sm font-semibold text-gold-500 hover:text-gold-600"
          >
            Customize →
          </Link>
        </div>
      </div>
    </div>
  );
}
