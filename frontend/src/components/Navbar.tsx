import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/shop', label: 'Shop' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/custom-order', label: 'Custom Order' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container-xl flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className={`font-primary text-xl font-extrabold tracking-tight ${scrolled ? 'text-royal-600' : 'text-white'}`}>
            BARBZ <span className="text-gold-500">&amp;</span> CO.
          </span>
          <span className={`hidden text-xs font-secondary uppercase tracking-widest sm:inline ${scrolled ? 'text-royal-400' : 'text-sky-100'}`}>
            Creative
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav-link font-secondary text-sm font-medium ${isActive ? 'active' : ''} ${
                  scrolled ? 'text-royal-700' : 'text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/booking" className="btn-gold">
            Book a Consultation
          </Link>
        </div>

        <button
          className={`lg:hidden ${scrolled ? 'text-royal-600' : 'text-white'}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu-enter border-t border-royal-100 bg-white lg:hidden">
          <nav className="container-xl flex flex-col gap-4 py-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="font-secondary text-sm font-medium text-royal-700"
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/booking" onClick={() => setMenuOpen(false)} className="btn-gold w-fit">
              Book a Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
