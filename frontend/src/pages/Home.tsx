import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import { services, products, portfolio, testimonials } from '../api/seedData';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-gradient pb-28 pt-40 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="container-xl relative grid items-center gap-14 lg:grid-cols-2">
          <div className="animate-fadeUp">
            <p className="section-eyebrow">Creative Branding Studio</p>
            <h1 className="mt-4 text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Your Vision. <span className="text-gold-400">My Design.</span>
              <br /> One Impactful Story.
            </h1>
            <p className="mt-6 max-w-lg font-secondary text-base leading-relaxed text-sky-100">
              Barbz &amp; Co. Creative brings branding, web design, and premium custom apparel
              together — so your business, school, church, or event tells one unforgettable story.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/custom-order" className="btn-gold">Start a Custom Order</Link>
              <Link to="/booking" className="btn-outline">Book a Consultation</Link>
            </div>
          </div>
          <div className="relative animate-fadeUp">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-premium backdrop-blur">
              <img
                src="/assets/hero/hero-mockup.jpg"
                alt="Barbz & Co. Creative branded hoodie mockup"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-6 py-4 shadow-lg">
              <p className="font-primary text-2xl font-extrabold text-royal-600">200+</p>
              <p className="font-secondary text-xs text-royal-400">Brands built &amp; dressed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-xl py-24">
        <SectionHeading
          eyebrow="What We Do"
          title="One Studio. Every Piece of Your Brand."
          subtitle="From identity to apparel, every service is designed to work together as one seamless creative experience."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="font-secondary text-sm font-semibold text-royal-600 hover:text-gold-500">
            View all services →
          </Link>
        </div>
      </section>

      {/* Shop teaser */}
      <section className="bg-royal-50/60 py-24">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Shop the Collection"
            title="Premium Apparel, Plain or Fully Branded"
            subtitle="Hoodies, tees, sweatshirts and merch — order as-is or customize with your logo, colours and story."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/shop" className="btn-gold">Explore the Shop</Link>
          </div>
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="container-xl py-24">
        <SectionHeading
          eyebrow="Our Work"
          title="Stories We've Helped Bring to Life"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {portfolio.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              to="/portfolio"
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-royal-100"
            >
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-royal-900/80 via-royal-900/10 to-transparent p-5">
                <p className="font-secondary text-xs uppercase tracking-wide text-gold-300">{item.category}</p>
                <p className="font-primary text-lg font-semibold text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-gradient py-24">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Client Stories"
            title="Trusted by Businesses, Churches, and Schools"
            light
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-xl py-24 text-center">
        <SectionHeading
          eyebrow="Let's Build Something Impactful"
          title="Ready to Turn Your Vision Into a Story?"
          subtitle="Whether it's a full brand identity, a website, or 500 branded hoodies for your next event — we're ready when you are."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/quote" className="btn-gold">Request a Quote</Link>
          <Link to="/booking" className="rounded-full border border-royal-200 px-7 py-3 font-primary text-sm font-semibold uppercase tracking-wide text-royal-600 transition hover:border-royal-600">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
