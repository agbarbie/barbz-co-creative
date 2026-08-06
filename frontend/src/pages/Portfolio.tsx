import { useMemo, useState } from 'react';
import { portfolio } from '../api/seedData';
import type { PortfolioItem } from '../types';

const categories: { label: string; value: PortfolioItem['category'] | 'all' }[] = [
  { label: 'All Work', value: 'all' },
  { label: 'Branding', value: 'branding' },
  { label: 'Web Design', value: 'web' },
  { label: 'Apparel', value: 'apparel' },
  { label: 'Event Branding', value: 'event' },
];

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioItem['category'] | 'all'>('all');

  const filtered = useMemo(
    () => (active === 'all' ? portfolio : portfolio.filter((p) => p.category === active)),
    [active]
  );

  return (
    <>
      <section className="bg-brand-gradient pb-16 pt-40 text-center text-white">
        <div className="container-xl">
          <p className="section-eyebrow">Our Portfolio</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Stories We've Helped Tell</h1>
        </div>
      </section>

      <section className="container-xl py-16">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActive(c.value)}
              className={`rounded-full px-5 py-2 font-secondary text-sm font-medium transition ${
                active === c.value ? 'bg-royal-600 text-white shadow-gold' : 'bg-royal-50 text-royal-600 hover:bg-royal-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-royal-100">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-royal-900/85 via-royal-900/20 to-transparent p-5">
                <p className="font-secondary text-xs uppercase tracking-wide text-gold-300">{item.category} · {item.client}</p>
                <p className="font-primary text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-1 font-secondary text-sm text-sky-100">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
