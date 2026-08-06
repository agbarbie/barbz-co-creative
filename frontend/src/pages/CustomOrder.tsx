import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { api } from '../api/client';
import { products } from '../api/seedData';
import type { CustomOrderPayload } from '../types';

const apparelTypes = ['Hoodie', 'T-Shirt', 'Sweatshirt', 'Polo', 'Cap', 'Tote Bag'];
const placements = ['Front Chest', 'Back (Full)', 'Sleeve', 'Front & Back'];
const sizeKeys = ['S', 'M', 'L', 'XL', 'XXL'];

export default function CustomOrder() {
  const [searchParams] = useSearchParams();
  const presetProduct = products.find((p) => p.id === searchParams.get('product'));

  const [form, setForm] = useState<Omit<CustomOrderPayload, 'sizes'>>({
    apparelType: presetProduct?.name.split(' ').pop() || apparelTypes[0],
    colors: '',
    quantity: 1,
    placement: placements[0],
    notes: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [sizes, setSizes] = useState<Record<string, number>>(
    Object.fromEntries(sizeKeys.map((s) => [s, 0]))
  );
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const totalUnits = Object.values(sizes).reduce((a, b) => a + b, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.post('/custom-orders', {
        ...form,
        sizes,
        quantity: totalUnits || form.quantity,
        fileName: file?.name,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section className="bg-brand-gradient pb-16 pt-40 text-center text-white">
        <div className="container-xl">
          <p className="section-eyebrow">Custom Order</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Build Your Branded Apparel</h1>
          <p className="mx-auto mt-6 max-w-2xl font-secondary text-sky-100">
            Choose your apparel, upload your artwork, and tell us how you want it to look. We'll
            send a mockup for your approval before production begins.
          </p>
        </div>
      </section>

      <section className="container-xl py-20">
        <div className="mx-auto max-w-3xl">
          {status === 'success' ? (
            <div className="card-premium text-center">
              <h2 className="text-2xl text-royal-600">Request Received 🎉</h2>
              <p className="mt-3 font-secondary text-royal-400">
                Thank you! Our team will review your custom order and send a mockup and quotation
                to your email or WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium space-y-8">
              <div>
                <SectionHeading eyebrow="Step 1" title="Apparel & Style" align="left" />
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-secondary text-sm font-medium text-royal-600">Apparel Type</span>
                    <select
                      value={form.apparelType}
                      onChange={(e) => setForm({ ...form, apparelType: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
                    >
                      {apparelTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="font-secondary text-sm font-medium text-royal-600">Colours</span>
                    <input
                      value={form.colors}
                      onChange={(e) => setForm({ ...form, colors: e.target.value })}
                      placeholder="e.g. Royal Purple with Gold print"
                      className="mt-2 w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
                      required
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="font-secondary text-sm font-medium text-royal-600">Branding Placement</span>
                    <select
                      value={form.placement}
                      onChange={(e) => setForm({ ...form, placement: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
                    >
                      {placements.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div>
                <SectionHeading eyebrow="Step 2" title="Sizes & Quantities" align="left" />
                <div className="mt-6 grid grid-cols-5 gap-3">
                  {sizeKeys.map((s) => (
                    <label key={s} className="text-center">
                      <span className="font-secondary text-xs font-medium text-royal-500">{s}</span>
                      <input
                        type="number"
                        min={0}
                        value={sizes[s]}
                        onChange={(e) => setSizes({ ...sizes, [s]: Number(e.target.value) })}
                        className="mt-2 w-full rounded-lg border border-royal-100 px-2 py-2 text-center font-secondary text-sm focus:border-gold-400 focus:outline-none"
                      />
                    </label>
                  ))}
                </div>
                <p className="mt-3 font-secondary text-xs text-royal-400">Total units: {totalUnits}</p>
              </div>

              <div>
                <SectionHeading eyebrow="Step 3" title="Upload Your Artwork" align="left" />
                <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-royal-200 px-6 py-10 text-center hover:border-gold-400">
                  <input
                    type="file"
                    accept="image/*,.pdf,.ai,.eps"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />
                  <span className="font-secondary text-sm text-royal-500">
                    {file ? file.name : 'Click to upload your logo or artwork (PNG, JPG, PDF, AI, EPS)'}
                  </span>
                </label>
              </div>

              <div>
                <SectionHeading eyebrow="Step 4" title="Notes & Contact" align="left" />
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    className="rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp number"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className="rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
                  />
                  <textarea
                    placeholder="Anything else we should know?"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={4}
                    className="rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none sm:col-span-2"
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="font-secondary text-sm text-red-500">
                  Something went wrong submitting your request. Please try again.
                </p>
              )}

              <button type="submit" disabled={status === 'submitting'} className="btn-gold w-full">
                {status === 'submitting' ? 'Submitting…' : 'Request My Mockup'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
