import SectionHeading from '../components/SectionHeading';

const values = [
  'Purpose Before Design',
  'Excellence Without Compromise',
  'Authentic Creativity',
  'Integrity in Every Decision',
  'Continuous Innovation',
  'Meaningful Relationships',
  'Legacy Over Trends',
];

export default function About() {
  return (
    <>
      <section className="bg-brand-gradient pb-20 pt-40 text-white">
        <div className="container-xl text-center">
          <p className="section-eyebrow">Our Story</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Builders of Identities, Not Just Visuals</h1>
          <p className="mx-auto mt-6 max-w-2xl font-accent text-xl italic text-sky-100">
            "Every logo, garment, website, campaign, and brand experience exists to tell a story
            that inspires confidence and leaves a lasting impact."
          </p>
        </div>
      </section>

      <section className="container-xl grid gap-12 py-24 md:grid-cols-3">
        <div className="card-premium">
          <p className="section-eyebrow">Vision</p>
          <p className="mt-3 font-secondary text-royal-500">
            To become Africa's most trusted creative branding studio — where ideas become identities,
            businesses become memorable brands, and every creation leaves an enduring impact.
          </p>
        </div>
        <div className="card-premium">
          <p className="section-eyebrow">Mission</p>
          <p className="mt-3 font-secondary text-royal-500">
            To transform ideas into meaningful visual experiences through branding, graphic design,
            web development, custom apparel, and creative innovation — with exceptional quality and
            lasting value.
          </p>
        </div>
        <div className="card-premium">
          <p className="section-eyebrow">Purpose</p>
          <p className="mt-3 font-secondary text-royal-500">
            To help people and organizations confidently communicate who they are through thoughtful
            design, premium craftsmanship, and authentic storytelling.
          </p>
        </div>
      </section>

      <section className="bg-royal-50/60 py-24">
        <div className="container-xl">
          <SectionHeading eyebrow="What We Stand On" title="Core Values" />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v} className="card-premium text-center">
                <p className="font-primary text-sm font-semibold text-royal-700">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-xl py-24">
        <SectionHeading eyebrow="Our Palette" title="Colour Philosophy" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: 'Royal Purple', hex: '#3B0764', meaning: 'Creativity, vision & bold thinking' },
            { name: 'Sky Blue', hex: '#4FB6E8', meaning: 'Trust, clarity & professionalism' },
            { name: 'Metallic Gold', hex: '#C9A227', meaning: 'Excellence & prestige' },
            { name: 'White', hex: '#FFFFFF', meaning: 'Simplicity & elegance' },
          ].map((c) => (
            <div key={c.name} className="card-premium overflow-hidden p-0">
              <div className="h-24 border-b border-royal-100" style={{ backgroundColor: c.hex }} />
              <div className="p-4">
                <p className="font-primary text-sm font-semibold text-royal-700">{c.name}</p>
                <p className="mt-1 font-secondary text-xs text-royal-400">{c.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
