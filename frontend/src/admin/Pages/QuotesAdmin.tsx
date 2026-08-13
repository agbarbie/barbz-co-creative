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
}

export default function QuotesAdmin() {
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<QuoteRow[]>('/quotes')
      .then(setQuotes)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load quotes'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Quote Requests" subtitle="Project inquiries awaiting a quotation." />

      {error && <p className="mb-4 font-secondary text-sm text-red-400">{error}</p>}
      {loading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}

      <div className="space-y-3">
        {quotes.map((q) => (
          <div key={q.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-secondary text-sm font-semibold text-white">{q.name}</p>
                <p className="font-secondary text-xs text-sky-400">
                  {q.email} · {q.phone}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={q.status} />
                <button
                  onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                  className="font-secondary text-xs text-gold-300 hover:underline"
                >
                  {expanded === q.id ? 'Hide details' : 'View details'}
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
            {expanded === q.id && (
              <p className="mt-4 border-t border-white/10 pt-4 font-secondary text-sm leading-relaxed text-sky-200">
                {q.details}
              </p>
            )}
          </div>
        ))}
        {!loading && quotes.length === 0 && (
          <p className="rounded-2xl border border-white/10 px-4 py-8 text-center font-secondary text-sm text-sky-400">
            No quote requests yet.
          </p>
        )}
      </div>
    </>
  );
}
