import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';

interface BookingRow {
  id: string;
  service: string;
  booking_date: string;
  booking_time: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  status: string;
}

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<BookingRow[]>('/bookings')
      .then(setBookings)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load bookings'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Bookings" subtitle="Consultation requests from clients." />

      {error && <p className="mb-4 font-secondary text-sm text-red-400">{error}</p>}
      {loading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="font-secondary text-xs uppercase tracking-wide text-sky-400">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date &amp; Time</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {bookings.map((b) => (
              <tr key={b.id} className="font-secondary text-sm text-sky-100">
                <td className="px-4 py-3">{b.name}</td>
                <td className="px-4 py-3">{b.service}</td>
                <td className="px-4 py-3">
                  {new Date(b.booking_date).toLocaleDateString()} · {b.booking_time}
                </td>
                <td className="px-4 py-3">
                  {b.email}
                  <p className="text-xs text-sky-400">{b.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
            {!loading && bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-secondary text-sm text-sky-400">
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
