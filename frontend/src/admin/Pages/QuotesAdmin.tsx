import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';

interface QuoteRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  budget_range: string | null;
  details: string;
  status: string;
  created_at: string;
  quantity: number | null;
  unit_price_kes: string | null;
  production_cost_kes: string;
  delivery_cost_kes: string;
  discount_percent: string;
  total_kes: string | null;
  validity_days: number;
  terms: string | null;
}

const statuses = ['new', 'quoted', 'won', 'lost'];

type PricingForm = {
  quantity: string;
  unit_price_kes: string;
  production_cost_kes: string;
  delivery_cost_kes: string;
  discount_percent: string;
  validity_days: string;
  terms: string;
};

function emptyForm(q: QuoteRow): PricingForm {
  return {
    quantity: q.quantity?.toString() ?? '',
    unit_price_kes: q.unit_price_kes ?? '',
    production_cost_kes: q.production_cost_kes ?? '0',
    delivery_cost_kes: q.delivery_cost_kes ?? '0',
    discount_percent: q.discount_percent ?? '0',
    validity_days: q.validity_days?.toString() ?? '14',
    terms: q.terms ?? '',
  };
}

export default function QuotesAdmin() {
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, PricingForm>>({});
  const [saving, setSaving] = useState<string | null>(null);

  function load() {
    api
      .get<QuoteRow[]>('/quotes')
      .then((rows) => {
        setQuotes(rows);
        const initial: Record<string, PricingForm> = {};
        rows.forEach((q) => { initial[q.id] = emptyForm(q); });
        setForms(initial);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load quotes'))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  function updateForm(id: string, patch: Partial<PricingForm>) {
    setForms((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));
  }

  async function savePricing(id: string, statusOverride?: string) {
    const f = forms[id];
    setSaving(id);
    try {
      const updated = await api.patch<QuoteRow>(`/quotes/${id}`, {
        ...(statusOverride ? { status: statusOverride } : {}),
        quantity: f.quantity ? Number(f.quantity) : undefined,
        unit_price_kes: f.unit_price_kes ? Number(f.unit_price_kes) : undefined,
        production_cost_kes: Number(f.production_cost_kes || 0),
        delivery_cost_kes: Number(f.delivery_cost_kes || 0),
        discount_percent: Number(f.discount_percent || 0),
        validity_days: Number(f.validity_days || 14),
        terms: f.terms || undefined,
      });
      setQuotes((prev) => prev.map((q) => (q.id === id ? updated : q)));
      setForms((prev) => ({ ...prev, [id]: emptyForm(updated) }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save quote');
    } finally {
      setSaving(null);
    }
  }

  return (
    <>
      <AdminPageHeader title="Quote Requests" subtitle="Project inquiries — price them and track approval." />

      {error && <p className="mb-4 font-secondary text-sm text-red-400">{error}</p>}
      {loading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}

      <div className="space-y-3">
        {quotes.map((q) => {
          const f = forms[q.id];
          return (
            <div key={q.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-secondary text-sm font-semibold text-white">{q.name}</p>
                  <p className="font-secondary text-xs text-sky-400">
                    {q.email} · {q.phone}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {q.total_kes && (
                    <span className="font-secondary text-sm font-semibold text-gold-300">
                      KSh {Number(q.total_kes).toLocaleString()}
                    </span>
                  )}
                  <StatusBadge status={q.status} />
                  <button
                    onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                    className="font-secondary text-xs text-gold-300 hover:underline"
                  >
                    {expanded === q.id ? 'Hide details' : 'Price this quote'}
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-royal-600/30 px-3 py-1 font-secondary text-xs text-sky-200">
                  {q.service_type}
                </span>
                {q.budget_range && (
                  <span className="rounded-full bg-white/5 px-3 py-1 font-secondary text-xs text-sky-300">
                    {q.budget_range}
                  </span>
                )}
              </div>

              {expanded === q.id && f && (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="mb-4 font-secondary text-sm leading-relaxed text-sky-200">{q.details}</p>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <label className="font-secondary text-xs text-sky-400">
                      Quantity
                      <input
                        type="number"
                        value={f.quantity}
                        onChange={(e) => updateForm(q.id, { quantity: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                    <label className="font-secondary text-xs text-sky-400">
                      Unit price (KES)
                      <input
                        type="number"
                        value={f.unit_price_kes}
                        onChange={(e) => updateForm(q.id, { unit_price_kes: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                    <label className="font-secondary text-xs text-sky-400">
                      Discount %
                      <input
                        type="number"
                        value={f.discount_percent}
                        onChange={(e) => updateForm(q.id, { discount_percent: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                    <label className="font-secondary text-xs text-sky-400">
                      Production cost (KES)
                      <input
                        type="number"
                        value={f.production_cost_kes}
                        onChange={(e) => updateForm(q.id, { production_cost_kes: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                    <label className="font-secondary text-xs text-sky-400">
                      Delivery cost (KES)
                      <input
                        type="number"
                        value={f.delivery_cost_kes}
                        onChange={(e) => updateForm(q.id, { delivery_cost_kes: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                    <label className="font-secondary text-xs text-sky-400">
                      Validity (days)
                      <input
                        type="number"
                        value={f.validity_days}
                        onChange={(e) => updateForm(q.id, { validity_days: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                    <label className="font-secondary text-xs text-sky-400 sm:col-span-3">
                      Terms
                      <textarea
                        rows={2}
                        value={f.terms}
                        onChange={(e) => updateForm(q.id, { terms: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => savePricing(q.id, 'quoted')}
                      disabled={saving === q.id}
                      className="btn-gold"
                    >
                      {saving === q.id ? 'Saving…' : 'Save & Mark Quoted'}
                    </button>
                    <button
                      onClick={() => savePricing(q.id, 'won')}
                      disabled={saving === q.id}
                      className="rounded-lg border border-emerald-400/40 px-4 py-2 font-secondary text-xs font-semibold uppercase tracking-wide text-emerald-300 hover:bg-emerald-400/10"
                    >
                      Mark Won
                    </button>
                    <button
                      onClick={() => savePricing(q.id, 'lost')}
                      disabled={saving === q.id}
                      className="rounded-lg border border-red-400/40 px-4 py-2 font-secondary text-xs font-semibold uppercase tracking-wide text-red-300 hover:bg-red-400/10"
                    >
                      Mark Lost
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {!loading && quotes.length === 0 && (
          <p className="rounded-2xl border border-white/10 px-4 py-8 text-center font-secondary text-sm text-sky-400">
            No quote requests yet.
          </p>
        )}
      </div>
    </>
  );
}
