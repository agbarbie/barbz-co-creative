import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-gradient text-white dark:bg-[#07040D]">
      <div className="glow-orb -right-24 -top-24 h-72 w-72 bg-gold-400/10" />
      <div className="glow-orb -left-24 bottom-0 h-72 w-72 bg-sky-400/10" />

      <div className="container-xl relative grid gap-10 py-16 md:grid-cols-4">
        <div>
          <p className="font-primary text-lg font-extrabold">
            BARBZ <span className="text-gold-400">&amp;</span> CO. CREATIVE
          </p>
          <p className="mt-3 font-accent text-lg italic text-sky-100">
            Your Vision. My Design. One Impactful Story.
          </p>
        </div>

        <div>
          <p className="section-eyebrow text-gold-400">Explore</p>
          <ul className="mt-4 space-y-2 font-secondary text-sm text-sky-100">
            <li><Link to="/services" className="transition hover:text-white">Services</Link></li>
            <li><Link to="/shop" className="transition hover:text-white">Shop</Link></li>
            <li><Link to="/portfolio" className="transition hover:text-white">Portfolio</Link></li>
            <li><Link to="/custom-order" className="transition hover:text-white">Custom Order</Link></li>
            <li><Link to="/blog" className="transition hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="section-eyebrow text-gold-400">Company</p>
          <ul className="mt-4 space-y-2 font-secondary text-sm text-sky-100">
            <li><Link to="/about" className="transition hover:text-white">About Us</Link></li>
            <li><Link to="/faqs" className="transition hover:text-white">FAQs</Link></li>
            <li><Link to="/booking" className="transition hover:text-white">Book a Consultation</Link></li>
            <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="section-eyebrow text-gold-400">Get in Touch</p>
          <ul className="mt-4 space-y-2 font-secondary text-sm text-sky-100">
            <li>hello@barbzandco.com</li>
            <li>WhatsApp: +254 705524140</li>
            <li>Nairobi, Kenya</li>
          </ul>
          <div className="mt-4 flex gap-3">
            {['Instagram', 'TikTok', 'LinkedIn'].map((s) => (
              <a
                key={s}
                href="#"
                className="rounded-full border border-white/30 px-3 py-1 font-secondary text-xs text-sky-100 transition hover:border-gold-400 hover:text-gold-300"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center font-secondary text-xs text-sky-200">
        © {new Date().getFullYear()} Barbz &amp; Co. Creative. All rights reserved.
      </div>
    </footer>
  );
}
