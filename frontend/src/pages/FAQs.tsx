import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { faqs } from '../api/seedData';
import BackgroundReveal from '../components/Motion/BackgroundReveal';
import FloatingAccent from '../components/Motion/FloatingAccent';

// TODO: swap for real photography — see Home.tsx for the asset-folder convention.
const bg = {
  section: 'https://picsum.photos/seed/barbz-faqs/1800/1000',
  accentA: 'https://picsum.photos/seed/barbz-faqs-a/400/400',
};

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-24">
      <BackgroundReveal image={bg.section} overlay="light" className="opacity-20" />
      <FloatingAccent image={bg.accentA} className="right-6 top-10 hidden xl:block" size={90} />
      <div className="container-xl pt-16">
        <SectionHeading eyebrow="Need Help?" title="Frequently Asked Questions" />
        <div className="mx-auto mt-14 max-w-2xl divide-y divide-royal-100">
          {faqs.map((faq, i) => (
            <div key={faq.question} className="py-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-primary text-base font-semibold text-royal-700 dark:text-sky-50">{faq.question}</span>
                <span className="font-accent text-2xl text-gold-500">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p className="mt-3 font-secondary text-sm leading-relaxed text-royal-400 dark:text-sky-200/70">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
