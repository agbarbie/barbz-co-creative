import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';

interface Summary {
  pendingCustomOrders: number;
  pendingBookings: number;
  newQuotes: number;
  activeProducts: number;
  totalMessages: number;
  unpublishedTestimonials: number;
}

const cards: { key: keyof Summary; label: string; to: string; accent: string }[] = [
  { key: 'pendingCustomOrders', label: 'Custom Orders Awaiting Review', to: '/admin/custom-orders', accent: 'from-gold-400/20' },
  { key: 'pendingBookings', label: 'Booking Requests', to: '/admin/bookings', accent: 'from-sky-400/20' },
  { key: 'newQuotes', label: 'New Quote Requests', to: '/admin/quotes', accent: 'from-purple-400/20' },
  { key: 'activeProducts', label: 'Active Products', to: '/admin/products', accent: 'from-emerald-400/20' },
  { key: 'totalMessages', label: 'Contact Messages', to: '/admin/messages', accent: 'from-sky-400/20' },
  { key: 'unpublishedTestimonials', label: 'Testimonials Awaiting Publish', to: '/admin/testimonials', accent: 'from-gold-400/20' },
];

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Summary>('/admin/summary')
      .then(setSummary)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load summary'));
  }, []);

  return (
    <>
      <AdminPageHeader title="Dashboard" subtitle="A quick overview of what needs your attention." />

      {error && (
        <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 font-secondary text-sm text-red-300">
          {error} — make sure the backend is running and you're signed in as an admin.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.key}
            to={c.to}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${c.accent} to-transparent bg-white/[0.03] p-6 transition hover:border-gold-400/40`}
          >
            <p className="font-secondary text-xs uppercase tracking-wide text-sky-300">{c.label}</p>
            <p className="mt-3 font-primary text-3xl font-bold text-white">
              {summary ? summary[c.key] : '—'}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
