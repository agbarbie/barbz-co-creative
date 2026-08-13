import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price_kes: string;
  image_url: string | null;
  customizable: boolean;
}

const categories = ['hoodies', 'tshirts', 'sweatshirts', 'accessories'];

export default function ProductsAdmin() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: categories[0], price_kes: '', image_url: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    api.get<ProductRow[]>('/products').then(setProducts).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/products', { ...form, price_kes: Number(form.price_kes) });
      setForm({ name: '', category: categories[0], price_kes: '', image_url: '', description: '' });
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <AdminPageHeader title="Products" subtitle="Everything listed in the shop." />
        <button onClick={() => setShowForm((s) => !s)} className="btn-gold">
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2">
          <input
            required
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="rounded-lg border border-white/10 bg-[#0D0819] px-4 py-2.5 font-secondary text-sm text-white focus:border-gold-400 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            required
            type="number"
            placeholder="Price (KES)"
            value={form.price_kes}
            onChange={(e) => setForm({ ...form, price_kes: e.target.value })}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
          />
          <input
            placeholder="/assets/products/your-image.jpg"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
          />
          <textarea
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none sm:col-span-2"
          />
          {error && <p className="font-secondary text-sm text-red-400 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-gold sm:col-span-2">
            {submitting ? 'Saving…' : 'Save Product'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="font-secondary text-xs uppercase tracking-wide text-sky-400">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Customizable</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <tr key={p.id} className="font-secondary text-sm text-sky-100">
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 capitalize">{p.category}</td>
                <td className="px-4 py-3">KSh {Number(p.price_kes).toLocaleString()}</td>
                <td className="px-4 py-3">{p.customizable ? 'Yes' : 'No'}</td>
              </tr>
            ))}
            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center font-secondary text-sm text-sky-400">
                  No products yet — add your first one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
