import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { services } from '../api/seedData';

export default function Services() {
  return (
    <>
      <section className="bg-brand-gradient pb-20 pt-40 text-white text-center">
        <div className="container-xl">
          <p className="section-eyebrow">What We Offer</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Full-Service Creative Solutions</h1>
          <p className="mx-auto mt-6 max-w-2xl font-secondary text-sky-100">
            Strategy, design, technology, and branded merchandise — united into one seamless
            creative experience for your business, school, church, or event.
          </p>
        </div>
      </section>

      <section className="container-xl py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <section className="bg-royal-50/60 py-24">
        <div className="container-xl">
          <SectionHeading
            eyebrow="How It Works"
            title="Your Journey With Us"
            subtitle="A clear, guided process from first conversation to finished delivery."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['1', 'Discovery & Consultation', 'We learn your story, goals and audience.'],
              ['2', 'Proposal & Quotation', 'You receive a clear scope, timeline and price.'],
              ['3', 'Design & Mockups', 'We design, you review, we refine together.'],
              ['4', 'Production & Delivery', 'Approved work goes into production and delivery.'],
            ].map(([n, t, d]) => (
              <div key={n} className="card-premium">
                <span className="font-accent text-3xl italic text-gold-400">{n}</span>
                <p className="mt-3 font-primary text-base font-semibold text-royal-700">{t}</p>
                <p className="mt-2 font-secondary text-sm text-royal-400">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-xl py-24 text-center">
        <SectionHeading eyebrow="Ready When You Are" title="Let's Scope Your Project" />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/quote" className="btn-gold">Request a Quote</Link>
          <Link to="/booking" className="rounded-full border border-royal-200 px-7 py-3 font-primary text-sm font-semibold uppercase tracking-wide text-royal-600 hover:border-royal-600">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}