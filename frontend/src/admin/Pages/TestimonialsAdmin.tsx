import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';

interface TestimonialRow {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
  is_published: boolean;
}

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    api
      .get<TestimonialRow[]>('/testimonials/all')
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load testimonials'))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function publish(id: string) {
    await api.patch(`/testimonials/${id}/publish`, {});
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, is_published: true } : t)));
  }

  return (
    <>
      <AdminPageHeader title="Testimonials" subtitle="Client quotes submitted for display on the homepage." />

      {error && <p className="mb-4 font-secondary text-sm text-red-400">{error}</p>}
      {loading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex text-gold-400">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="mt-3 font-accent text-base italic leading-relaxed text-sky-100">"{t.quote}"</p>
            <p className="mt-3 font-secondary text-sm font-semibold text-white">{t.name}</p>
            {t.role && <p className="font-secondary text-xs text-sky-400">{t.role}</p>}

            <div className="mt-4 flex items-center justify-between">
              {t.is_published ? (
                <span className="font-secondary text-xs text-emerald-300">Published</span>
              ) : (
                <span className="font-secondary text-xs text-amber-300">Awaiting publish</span>
              )}
              {!t.is_published && (
                <button
                  onClick={() => publish(t.id)}
                  className="rounded-full border border-gold-400/40 px-3 py-1 font-secondary text-xs text-gold-300 transition hover:bg-gold-400/10"
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        ))}
        {!loading && items.length === 0 && (
          <p className="rounded-2xl border border-white/10 px-4 py-8 text-center font-secondary text-sm text-sky-400 sm:col-span-2">
            No testimonials yet.
          </p>
        )}
      </div>
    </>
  );
}
