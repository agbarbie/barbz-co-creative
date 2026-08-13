import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || theme === 'dark';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur dark:bg-[#0A0614]/90 dark:shadow-[0_1px_0_rgba(201,162,39,0.15)]'
          : 'bg-transparent dark:bg-[#0A0614]/40 dark:backdrop-blur-sm'
      }`}
    >
      <div className="container-xl flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span
            className={`font-primary text-xl font-extrabold tracking-tight ${
              solid ? 'text-royal-600 dark:text-white dark:logo-glow' : 'text-white'
            }`}
          >
            BARBZ <span className="text-gold-500">&amp;</span> CO.
          </span>
          <span
            className={`hidden text-xs font-secondary uppercase tracking-widest sm:inline ${
              solid ? 'text-royal-400 dark:text-sky-200' : 'text-sky-100'
            }`}
          >
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
                  solid ? 'text-royal-700 dark:text-sky-100' : 'text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => setSearchOpen((s) => !s)}
            aria-label="Search"
            className={`icon-btn ${solid ? 'text-royal-500 hover:bg-royal-50 dark:text-sky-200 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={`icon-btn ${solid ? 'text-royal-500 hover:bg-royal-50 dark:text-gold-300 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            )}
          </button>

          <div className={`hidden items-center gap-1 border-l pl-3 xl:flex ${solid ? 'border-royal-100 dark:border-white/10' : 'border-white/30'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={solid ? 'text-gold-500' : 'text-gold-300'}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <span className={`font-secondary text-xs ${solid ? 'text-royal-500 dark:text-sky-200' : 'text-sky-100'}`}>
              +254 705524140
            </span>
          </div>

          <Link to="/quote" className="btn-gold ml-2">
            Get a Quote
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className={`icon-btn ${solid ? 'text-royal-500 dark:text-gold-300' : 'text-white'}`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
              </svg>
            )}
          </button>
          <button
            className={solid ? 'text-royal-600 dark:text-white' : 'text-white'}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="mobile-menu-enter border-t border-royal-100 bg-white py-4 dark:border-white/10 dark:bg-[#0A0614]">
          <div className="container-xl">
            <input
              autoFocus
              placeholder="Search products, services, blog posts..."
              className="w-full rounded-lg border border-royal-100 bg-transparent px-4 py-3 font-secondary text-sm text-royal-700 focus:border-gold-400 focus:outline-none dark:border-white/10 dark:text-white"
            />
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu-enter border-t border-royal-100 bg-white dark:border-white/10 dark:bg-[#0A0614] lg:hidden">
          <nav className="container-xl flex flex-col gap-4 py-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="font-secondary text-sm font-medium text-royal-700 dark:text-sky-100"
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/quote" onClick={() => setMenuOpen(false)} className="btn-gold w-fit">
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
