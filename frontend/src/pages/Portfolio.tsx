import { useMemo, useState } from 'react';
import Reveal from '../components/Motion/Reveal';
import RevealGroup from '../components/Motion/RevealGroup';
import BackgroundReveal from '../components/Motion/BackgroundReveal';
import FloatingAccent from '../components/Motion/FloatingAccent';
import ImageFallback from '../components/Art/ImageFallback';
import { portfolio } from '../api/seedData';
import type { PortfolioItem } from '../types';

// TODO: swap for real project photography — see Home.tsx for the asset-folder convention.
const bg = {
  hero: 'https://picsum.photos/seed/barbz-portfolio-hero/1800/1000',
  accentA: 'https://picsum.photos/seed/barbz-portfolio-a/400/400',
  accentB: 'https://picsum.photos/seed/barbz-portfolio-b/400/400',
};

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
      <section className="relative overflow-hidden bg-brand-gradient pb-16 pt-40 text-center text-white dark:bg-[#07040D]">
        <BackgroundReveal image={bg.hero} overlay="brand" />
        <FloatingAccent image={bg.accentA} className="right-10 top-16 hidden xl:block" size={100} />
        <FloatingAccent image={bg.accentB} className="left-14 bottom-6 hidden xl:block" size={80} />
        <div className="glow-orb -left-20 top-4 h-64 w-64 bg-sky-400/10" />
        <div className="container-xl relative">
          <Reveal>
            <p className="section-eyebrow">Our Portfolio</p>
            <h1 className="mt-4 text-4xl text-white sm:text-5xl">Stories We've Helped Tell</h1>
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

        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" key={active}>
          {filtered.map((item) => (
            <div key={item.id} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-royal-100 dark:bg-white/5">
              <ImageFallback
                src={item.image}
                alt={item.title}
                label={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-royal-900/85 via-royal-900/20 to-transparent p-5">
                <p className="font-secondary text-xs uppercase tracking-wide text-gold-300">{item.category} · {item.client}</p>
                <p className="font-primary text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-1 font-secondary text-sm text-sky-100">{item.summary}</p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}