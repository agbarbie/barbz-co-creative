import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';

interface CustomerRow {
  id: string;
  name: string;
  email: string;
  created_at: string;
  custom_order_count: number;
  booking_count: number;
  quote_count: number;
}

interface CustomerDetail extends CustomerRow {
  customOrders: Array<{ id: string; apparel_type: string; status: string; created_at: string }>;
  bookings: Array<{ id: string; service: string; status: string; booking_date: string }>;
  quotes: Array<{ id: string; service_type: string; status: string; total_kes: string | null; created_at: string }>;
}

export default function CustomersAdmin() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<CustomerDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    api
      .get<CustomerRow[]>('/admin/customers')
      .then(setCustomers)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load customers'))
      .finally(() => setLoading(false));
  }, []);

  async function openCustomer(id: string) {
    setDetailLoading(true);
    try {
      const detail = await api.get<CustomerDetail>(`/admin/customers/${id}`);
      setSelected(detail);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load customer');
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <>
      <AdminPageHeader title="Customers" subtitle="A relationship record, not just a contact list." />

      {error && <p className="mb-4 font-secondary text-sm text-red-400">{error}</p>}
      {loading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03]">
              <tr className="font-secondary text-xs uppercase tracking-wide text-sky-400">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">Quotes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {customers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => openCustomer(c.id)}
                  className="cursor-pointer font-secondary text-sm text-sky-100 transition hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3 text-sky-300">{c.email}</td>
                  <td className="px-4 py-3">{c.custom_order_count}</td>
                  <td className="px-4 py-3">{c.booking_count}</td>
                  <td className="px-4 py-3">{c.quote_count}</td>
                </tr>
              ))}
              {!loading && customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center font-secondary text-sm text-sky-400">
                    No registered customers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          {!selected && !detailLoading && (
            <p className="font-secondary text-sm text-sky-400">Select a customer to see their full history.</p>
          )}
          {detailLoading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}
          {selected && !detailLoading && (
            <div className="space-y-5">
              <div>
                <p className="font-secondary text-base font-semibold text-white">{selected.name}</p>
                <p className="font-secondary text-xs text-sky-400">{selected.email}</p>
                <p className="mt-1 font-secondary text-xs text-sky-500">
                  Customer since {new Date(selected.created_at).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="mb-2 font-secondary text-xs font-semibold uppercase tracking-wide text-gold-400">
                  Custom Orders ({selected.customOrders.length})
                </p>
                <div className="space-y-2">
                  {selected.customOrders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between font-secondary text-xs text-sky-200">
                      <span>{o.apparel_type}</span>
                      <StatusBadge status={o.status} />
                    </div>
                  ))}
                  {selected.customOrders.length === 0 && <p className="font-secondary text-xs text-sky-500">None yet</p>}
                </div>
              </div>

              <div>
                <p className="mb-2 font-secondary text-xs font-semibold uppercase tracking-wide text-gold-400">
                  Bookings ({selected.bookings.length})
                </p>
                <div className="space-y-2">
                  {selected.bookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between font-secondary text-xs text-sky-200">
                      <span>{b.service}</span>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                  {selected.bookings.length === 0 && <p className="font-secondary text-xs text-sky-500">None yet</p>}
                </div>
              </div>

              <div>
                <p className="mb-2 font-secondary text-xs font-semibold uppercase tracking-wide text-gold-400">
                  Quotes ({selected.quotes.length})
                </p>
                <div className="space-y-2">
                  {selected.quotes.map((q) => (
                    <div key={q.id} className="flex items-center justify-between font-secondary text-xs text-sky-200">
                      <span>{q.service_type}</span>
                      <div className="flex items-center gap-2">
                        {q.total_kes && <span className="text-gold-300">KSh {Number(q.total_kes).toLocaleString()}</span>}
                        <StatusBadge status={q.status} />
                      </div>
                    </div>
                  ))}
                  {selected.quotes.length === 0 && <p className="font-secondary text-xs text-sky-500">None yet</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
