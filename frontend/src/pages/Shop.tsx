import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { products } from '../api/seedData';
import type { Product } from '../types';

const categories: { label: string; value: Product['category'] | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Hoodies', value: 'hoodies' },
  { label: 'T-Shirts', value: 'tshirts' },
  { label: 'Sweatshirts', value: 'sweatshirts' },
  { label: 'Accessories', value: 'accessories' },
];

export default function Shop() {
  const [active, setActive] = useState<Product['category'] | 'all'>('all');

  const filtered = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <>
      <section className="bg-brand-gradient pb-16 pt-40 text-center text-white">
        <div className="container-xl">
          <p className="section-eyebrow">The Shop</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Premium Apparel &amp; Merchandise</h1>
          <p className="mx-auto mt-6 max-w-2xl font-secondary text-sky-100">
            Buy plain pieces or turn any product into a fully custom-branded item for your
            business, team, school, or event.
          </p>
        </div>
      </section>

      <section className="container-xl py-16">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={`rounded-full px-5 py-2 font-secondary text-sm font-medium transition ${
                active === c.value
                  ? 'bg-royal-600 text-white shadow-gold'
                  : 'bg-royal-50 text-royal-600 hover:bg-royal-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-royal-50/60 py-20">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Not Finding What You Need?"
            title="Build a Fully Custom Piece"
            subtitle="Upload your own artwork, choose your colours and placement, and we'll bring it to life."
          />
        </div>
      </section>
    </>
  );
}
