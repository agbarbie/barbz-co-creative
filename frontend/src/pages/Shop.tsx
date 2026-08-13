import { useMemo, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Motion/Reveal';
import RevealGroup from '../components/Motion/RevealGroup';
import BackgroundReveal from '../components/Motion/BackgroundReveal';
import FloatingAccent from '../components/Motion/FloatingAccent';
import { products } from '../api/seedData';
import type { Product } from '../types';

// TODO: swap for real product photography — see Home.tsx for the asset-folder convention.
const bg = {
  hero: 'https://picsum.photos/seed/barbz-shop-hero/1800/1000',
  accentA: 'https://picsum.photos/seed/barbz-shop-a/400/400',
  accentB: 'https://picsum.photos/seed/barbz-shop-b/400/400',
};

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
      <section className="relative overflow-hidden bg-brand-gradient pb-16 pt-40 text-center text-white dark:bg-[#07040D]">
        <BackgroundReveal image={bg.hero} overlay="brand" />
        <FloatingAccent image={bg.accentA} className="left-8 top-14 hidden xl:block" size={100} />
        <FloatingAccent image={bg.accentB} className="right-14 bottom-4 hidden xl:block" size={80} />
        <div className="glow-orb -right-20 top-10 h-64 w-64 bg-gold-400/10" />
        <div className="container-xl relative">
          <Reveal>
            <p className="section-eyebrow">The Shop</p>
            <h1 className="mt-4 text-4xl text-white sm:text-5xl">Premium Apparel &amp; Merchandise</h1>
            <p className="mx-auto mt-6 max-w-2xl font-secondary text-sky-100">
              Buy plain pieces or turn any product into a fully custom-branded item for your
              business, team, school, or event.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-xl py-16">
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setActive(c.value)}
                className={`rounded-full px-5 py-2 font-secondary text-sm font-medium transition ${
                  active === c.value
                    ? 'bg-royal-600 text-white shadow-gold dark:bg-gold-400 dark:text-royal-800'
                    : 'bg-royal-50 text-royal-600 hover:bg-royal-100 dark:bg-white/5 dark:text-sky-100 dark:hover:bg-white/10'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" key={active}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </RevealGroup>
      </section>

      <section className="bg-royal-50/60 dark:bg-white/[0.02] py-20 dark:bg-white/[0.02]">
        <div className="container-xl">
          <Reveal>
            <SectionHeading
              eyebrow="Not Finding What You Need?"
              title="Build a Fully Custom Piece"
              subtitle="Upload your own artwork, choose your colours and placement, and we'll bring it to life."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
