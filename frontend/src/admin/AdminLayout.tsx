import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/admin/custom-orders', label: 'Custom Orders', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { to: '/admin/bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { to: '/admin/quotes', label: 'Quote Requests', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { to: '/admin/products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { to: '/admin/blog', label: 'Blog', icon: 'M4 6h16M4 12h16M4 18h7' },
  { to: '/admin/testimonials', label: 'Testimonials', icon: 'M17.8 19.8L16 18l-1.8 1.8M12 22a10 10 0 100-20 10 10 0 000 20z' },
  { to: '/admin/messages', label: 'Messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-[#0A0614] text-sky-100">
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#0D0819] lg:flex">
        <div className="border-b border-white/10 px-6 py-6">
          <p className="font-primary text-base font-extrabold text-white">
            BARBZ <span className="text-gold-400">&amp;</span> CO.
          </p>
          <p className="mt-1 font-secondary text-[11px] uppercase tracking-widest text-sky-400">
            Admin Dashboard
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 font-secondary text-sm transition ${
                  isActive
                    ? 'bg-gold-400/10 text-gold-300 shadow-[inset_0_0_0_1px_rgba(201,162,39,0.3)]'
                    : 'text-sky-200 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="font-secondary text-xs text-sky-400">Signed in as</p>
          <p className="mt-0.5 truncate font-secondary text-sm text-white">{user?.name}</p>
          <button
            onClick={handleLogout}
            className="mt-3 w-full rounded-lg border border-white/10 px-3 py-2 font-secondary text-xs text-sky-200 transition hover:border-gold-400/40 hover:text-gold-300"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#0D0819] px-6 py-4 lg:hidden">
          <p className="font-primary text-sm font-extrabold text-white">
            BARBZ <span className="text-gold-400">&amp;</span> CO. Admin
          </p>
          <button onClick={handleLogout} className="font-secondary text-xs text-sky-300">
            Sign Out
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
