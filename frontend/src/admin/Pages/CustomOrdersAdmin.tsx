import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';

interface CustomOrderRow {
  id: string;
  apparel_type: string;
  colors: string;
  placement: string;
  sizes: Record<string, number>;
  quantity: number;
  artwork_url: string | null;
  notes: string | null;
  contact_email: string;
  contact_phone: string;
  status: string;
  created_at: string;
}

const statuses = ['pending_review', 'in_design', 'mockup_sent', 'approved', 'in_production', 'quality_check', 'ready', 'delivered', 'cancelled'];

export default function CustomOrdersAdmin() {
  const [orders, setOrders] = useState<CustomOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    api
      .get<CustomOrderRow[]>('/custom-orders')
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load orders'))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id: string, status: string) {
    await api.patch(`/custom-orders/${id}/status`, { status });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <>
      <AdminPageHeader title="Custom Orders" subtitle="Apparel customization requests from clients." />

      {error && <p className="mb-4 font-secondary text-sm text-red-400">{error}</p>}
      {loading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="font-secondary text-xs uppercase tracking-wide text-sky-400">
              <th className="px-4 py-3">Apparel</th>
              <th className="px-4 py-3">Colours</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Artwork</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.map((o) => (
              <tr key={o.id} className="font-secondary text-sm text-sky-100">
                <td className="px-4 py-3">
                  {o.apparel_type}
                  <p className="text-xs text-sky-400">{o.placement}</p>
                </td>
                <td className="px-4 py-3">{o.colors}</td>
                <td className="px-4 py-3">{o.quantity}</td>
                <td className="px-4 py-3">
                  {o.contact_email}
                  <p className="text-xs text-sky-400">{o.contact_phone}</p>
                </td>
                <td className="px-4 py-3">
                  {o.artwork_url ? (
                    <a href={o.artwork_url} target="_blank" rel="noreferrer" className="text-gold-300 hover:underline">
                      View
                    </a>
                  ) : (
                    <span className="text-sky-500">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="rounded-lg border border-white/10 bg-[#0D0819] px-2 py-1.5 text-xs text-sky-100 focus:border-gold-400 focus:outline-none"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {!loading && orders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center font-secondary text-sm text-sky-400">
                  No custom orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
