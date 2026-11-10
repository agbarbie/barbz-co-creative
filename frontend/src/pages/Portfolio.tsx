import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../components/Motion/Reveal';
import RevealGroup from '../components/Motion/RevealGroup';
import ImageFallback from '../components/Art/ImageFallback';
import { portfolio } from '../api/seedData';
import type { PortfolioItem } from '../types';

type Category = PortfolioItem['category'];

interface Section {
  value: Category;
  short: string; // label on the filter pill
  label: string; // section heading
  blurb: string;
  panel: string; // aspect ratio of each card's frame
  frame: string; // frame colour behind the artwork
  grid: string; // grid columns for this section
}

// Add a section here (and a matching value in types/index.ts) to create a new group.
const sections: Section[] = [
  {
    value: 'logos',
    short: 'Logos',
    label: 'Logos',
    blurb: 'Marks and identities designed to be remembered.',
    panel: 'aspect-square',
    frame: 'bg-white dark:bg-white',
    grid: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  },
  {
    value: 'banners',
    short: 'Banners',
    label: 'Banners',
    blurb: 'Wide-format designs for brands, events and campaigns.',
    panel: 'aspect-[16/9]',
    frame: 'bg-white dark:bg-white/[0.04]',
    grid: 'grid-cols-1 md:grid-cols-2',
  },
  {
    value: 'posters',
    short: 'Posters',
    label: 'Posters & Flyers',
    blurb: 'Posters and flyers for webinars, events and promotions.',
    panel: 'aspect-[4/5]',
    frame: 'bg-white dark:bg-white/[0.04]',
    grid: 'grid-cols-2 lg:grid-cols-3',
  },
  {
    value: 'adverts',
    short: 'Adverts',
    label: 'Adverts & Product Design',
    blurb: 'Adverts and product designs that put the brand first.',
    panel: 'aspect-square',
    frame: 'bg-white dark:bg-white/[0.04]',
    grid: 'grid-cols-2 lg:grid-cols-4',
  },
];

export default function Portfolio() {
  const [active, setActive] = useState<Category | 'all'>('all');
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const visibleSections = useMemo(
    () =>
      sections
        .filter((s) => active === 'all' || s.value === active)
        .map((s) => ({ section: s, items: portfolio.filter((p) => p.category === s.value) }))
        .filter((g) => g.items.length > 0),
    [active]
  );

  // Close the lightbox with Esc and stop the page scrolling behind it.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [selected]);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient pb-20 pt-40 text-center text-white dark:bg-[#07040D]">
        <div className="glow-orb -left-20 top-4 h-64 w-64 bg-sky-400/10" />
        <div className="container-xl relative">
          <Reveal>
            <p className="section-eyebrow justify-center">Our Portfolio</p>
            <h1 className="mt-5 font-accent text-4xl italic leading-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Stories We've Helped Tell
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="container-xl py-20">
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {[{ value: 'all' as const, short: 'All Work' }, ...sections].map((c) => (
              <button
                key={c.value}
                onClick={() => setActive(c.value)}
                className={`rounded-full px-5 py-2 font-secondary text-sm font-medium tracking-wide transition ${
                  active === c.value
                    ? 'bg-royal-600 text-white shadow-gold dark:bg-gold-400 dark:text-royal-800'
                    : 'bg-royal-50 text-royal-600 hover:bg-royal-100 dark:bg-white/5 dark:text-sky-100 dark:hover:bg-white/10'
                }`}
              >
                {c.short}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={active}>
          {visibleSections.map(({ section, items }) => (
            <div key={section.value} className="mt-20 first:mt-14">
              <Reveal>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-royal-100/70 pb-4 dark:border-white/10">
                  <div>
                    <h2 className="font-accent text-3xl italic text-royal-600 dark:text-white">{section.label}</h2>
                    <p className="mt-1 font-secondary text-sm font-light text-royal-400 dark:text-sky-200/70">
                      {section.blurb}
                    </p>
                  </div>
                  <span className="font-secondary text-xs uppercase tracking-[0.25em] text-gold-500">
                    {items.length} {items.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
              </Reveal>

              <RevealGroup className={`grid gap-6 ${section.grid}`}>
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelected(item)}
                    aria-label={`View ${item.title}`}
                    className="group block w-full text-left"
                  >
                    <div
                      className={`${section.panel} ${section.frame} relative overflow-hidden rounded-[24px] border border-royal-100/70 p-3 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-gold-300/60 group-hover:shadow-premium dark:border-white/10`}
                    >
                      <ImageFallback
                        src={item.image}
                        alt={item.title}
                        label={item.title}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-3 font-accent text-lg italic font-medium text-royal-700 dark:text-sky-50">{item.title}</p>
                    {item.client && item.client !== item.title && (
                      <p className="font-secondary text-xs font-light text-royal-400 dark:text-sky-200/70">{item.client}</p>
                    )}
                  </button>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#07040D]/90 p-4 backdrop-blur-sm sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-gold-300 hover:text-gold-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
            <motion.figure
              className="flex max-h-full max-w-5xl flex-col items-center"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selected.image}
                alt={selected.title}
                className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-premium"
              />
              <figcaption className="mt-4 text-center">
                <p className="font-accent text-xl italic text-white">{selected.title}</p>
                {selected.client && selected.client !== selected.title && (
                  <p className="font-secondary text-xs font-light text-sky-200">{selected.client}</p>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}