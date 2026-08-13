import { useEffect, useState, Fragment } from 'react';
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

interface VariantRow {
  id: string;
  size: string | null;
  colour: string | null;
  sku: string | null;
  stock_quantity: number;
  price_override_kes: string | null;
  low_stock_threshold: number;
}

const categories = ['hoodies', 'tshirts', 'sweatshirts', 'accessories'];

export default function ProductsAdmin() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', category: categories[0], price_kes: '', image_url: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AI Product Copy Assistant (Blueprint Vol. IV, Section 7)
  const [aiKeyDetails, setAiKeyDetails] = useState('');
  const [aiTone, setAiTone] = useState<'warm' | 'bold' | 'minimal' | 'playful'>('warm');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Product variants (Blueprint Vol. IV, Section 8)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [variants, setVariants] = useState<VariantRow[]>([]);
  const [variantsLoading, setVariantsLoading] = useState(false);
  const [variantForm, setVariantForm] = useState({ size: '', colour: '', stock_quantity: '', price_override_kes: '' });
  const [variantSubmitting, setVariantSubmitting] = useState(false);
  const [variantError, setVariantError] = useState<string | null>(null);

  async function handleAiGenerate() {
    if (!form.name || !aiKeyDetails) {
      setAiError('Add the product name above and a few key details, then generate.');
      return;
    }
    setAiLoading(true);
    setAiError(null);
    try {
      const result = await api.post<{ text: string }>('/products/ai/generate-copy', {
        name: form.name,
        category: form.category,
        keyDetails: aiKeyDetails,
        tone: aiTone,
        mode: 'description',
      });
      setForm((f) => ({ ...f, description: result.text }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : 'AI generation failed');
    } finally {
      setAiLoading(false);
    }
  }

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

  async function toggleVariants(productId: string) {
    if (expandedId === productId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(productId);
    setVariantsLoading(true);
    setVariantError(null);
    try {
      const detail = await api.get<{ variants: VariantRow[] }>(`/products/${productId}`);
      setVariants(detail.variants);
    } catch (err) {
      setVariantError(err instanceof Error ? err.message : 'Failed to load variants');
    } finally {
      setVariantsLoading(false);
    }
  }

  async function addVariant(productId: string, e: React.FormEvent) {
    e.preventDefault();
    setVariantSubmitting(true);
    setVariantError(null);
    try {
      const created = await api.post<VariantRow>(`/products/${productId}/variants`, {
        size: variantForm.size || undefined,
        colour: variantForm.colour || undefined,
        stock_quantity: Number(variantForm.stock_quantity || 0),
        price_override_kes: variantForm.price_override_kes ? Number(variantForm.price_override_kes) : undefined,
      });
      setVariants((prev) => [...prev, created]);
      setVariantForm({ size: '', colour: '', stock_quantity: '', price_override_kes: '' });
    } catch (err) {
      setVariantError(err instanceof Error ? err.message : 'Failed to add variant');
    } finally {
      setVariantSubmitting(false);
    }
  }

  async function removeVariant(variantId: string) {
    await api.del(`/products/variants/${variantId}`);
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
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
          <div className="sm:col-span-2 rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
            <p className="mb-2 font-secondary text-xs font-semibold uppercase tracking-wide text-gold-400">
              ✨ AI Description Assistant
            </p>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                placeholder="Key details: fabric, fit, colours, use-case…"
                value={aiKeyDetails}
                onChange={(e) => setAiKeyDetails(e.target.value)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
              />
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value as typeof aiTone)}
                className="rounded-lg border border-white/10 bg-[#0D0819] px-4 py-2.5 font-secondary text-sm text-white focus:border-gold-400 focus:outline-none"
              >
                <option value="warm">Warm</option>
                <option value="bold">Bold</option>
                <option value="minimal">Minimal</option>
                <option value="playful">Playful</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={aiLoading}
              className="mt-3 rounded-lg border border-gold-400/40 px-4 py-2 font-secondary text-xs font-semibold uppercase tracking-wide text-gold-400 transition hover:bg-gold-400/10 disabled:opacity-50"
            >
              {aiLoading ? 'Generating…' : 'Generate Description'}
            </button>
            {aiError && <p className="mt-2 font-secondary text-xs text-red-400">{aiError}</p>}
            <p className="mt-2 font-secondary text-xs text-sky-400/70">
              Generated text fills the description field below — review and edit before saving.
            </p>
          </div>

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
              <th className="px-4 py-3">Variants</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <Fragment key={p.id}>
                <tr key={p.id} className="font-secondary text-sm text-sky-100">
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3">KSh {Number(p.price_kes).toLocaleString()}</td>
                  <td className="px-4 py-3">{p.customizable ? 'Yes' : 'No'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVariants(p.id)}
                      className="font-secondary text-xs text-gold-300 hover:underline"
                    >
                      {expandedId === p.id ? 'Hide' : 'Manage'}
                    </button>
                  </td>
                </tr>
                {expandedId === p.id && (
                  <tr key={`${p.id}-variants`}>
                    <td colSpan={5} className="bg-white/[0.02] px-4 py-4">
                      {variantsLoading ? (
                        <p className="font-secondary text-xs text-sky-400">Loading variants…</p>
                      ) : (
                        <div className="space-y-3">
                          {variants.length > 0 && (
                            <table className="w-full text-left">
                              <thead>
                                <tr className="font-secondary text-xs uppercase tracking-wide text-sky-500">
                                  <th className="py-1 pr-4">Size</th>
                                  <th className="py-1 pr-4">Colour</th>
                                  <th className="py-1 pr-4">Stock</th>
                                  <th className="py-1 pr-4">Price override</th>
                                  <th className="py-1"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {variants.map((v) => (
                                  <tr key={v.id} className="font-secondary text-xs text-sky-200">
                                    <td className="py-1 pr-4">{v.size || '—'}</td>
                                    <td className="py-1 pr-4">{v.colour || '—'}</td>
                                    <td className={`py-1 pr-4 ${v.stock_quantity <= v.low_stock_threshold ? 'text-amber-300' : ''}`}>
                                      {v.stock_quantity}
                                      {v.stock_quantity <= v.low_stock_threshold && ' (low)'}
                                    </td>
                                    <td className="py-1 pr-4">
                                      {v.price_override_kes ? `KSh ${Number(v.price_override_kes).toLocaleString()}` : '—'}
                                    </td>
                                    <td className="py-1">
                                      <button onClick={() => removeVariant(v.id)} className="text-red-400 hover:underline">
                                        Remove
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          <form onSubmit={(e) => addVariant(p.id, e)} className="grid gap-2 sm:grid-cols-5">
                            <input
                              placeholder="Size (e.g. M)"
                              value={variantForm.size}
                              onChange={(e) => setVariantForm({ ...variantForm, size: e.target.value })}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-secondary text-xs text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
                            />
                            <input
                              placeholder="Colour"
                              value={variantForm.colour}
                              onChange={(e) => setVariantForm({ ...variantForm, colour: e.target.value })}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-secondary text-xs text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
                            />
                            <input
                              type="number"
                              placeholder="Stock qty"
                              value={variantForm.stock_quantity}
                              onChange={(e) => setVariantForm({ ...variantForm, stock_quantity: e.target.value })}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-secondary text-xs text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
                            />
                            <input
                              type="number"
                              placeholder="Price override (KES)"
                              value={variantForm.price_override_kes}
                              onChange={(e) => setVariantForm({ ...variantForm, price_override_kes: e.target.value })}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-secondary text-xs text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
                            />
                            <button type="submit" disabled={variantSubmitting} className="btn-gold text-xs">
                              {variantSubmitting ? 'Adding…' : '+ Add Variant'}
                            </button>
                          </form>
                          {variantError && <p className="font-secondary text-xs text-red-400">{variantError}</p>}
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-secondary text-sm text-sky-400">
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
