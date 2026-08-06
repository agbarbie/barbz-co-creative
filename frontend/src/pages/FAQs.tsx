import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { faqs } from '../api/seedData';

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container-xl pt-16">
        <SectionHeading eyebrow="Need Help?" title="Frequently Asked Questions" />
        <div className="mx-auto mt-14 max-w-2xl divide-y divide-royal-100">
          {faqs.map((faq, i) => (
            <div key={faq.question} className="py-5">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="font-primary text-base font-semibold text-royal-700">{faq.question}</span>
                <span className="font-accent text-2xl text-gold-500">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <p className="mt-3 font-secondary text-sm leading-relaxed text-royal-400">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
