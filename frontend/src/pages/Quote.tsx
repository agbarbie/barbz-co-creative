import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { api } from '../api/client';
import type { QuotePayload } from '../types';

const serviceTypes = [
  'Brand Identity Design',
  'Website Design & Development',
  'Custom Apparel & Merchandise',
  'Event Branding',
  'Multiple Services',
];
const budgetRanges = ['Under KSh 50,000', 'KSh 50,000 – 150,000', 'KSh 150,000 – 500,000', 'KSh 500,000+'];

export default function Quote() {
  const [form, setForm] = useState<QuotePayload>({
    name: '',
    email: '',
    phone: '',
    serviceType: serviceTypes[0],
    budgetRange: budgetRanges[0],
    details: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.post('/quotes', form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-royal-50/60 dark:bg-white/[0.02] py-24">
      <div className="container-xl">
        <SectionHeading eyebrow="Request a Quote" title="Tell Us About Your Project" />
        <div className="mx-auto mt-14 max-w-2xl">
          {status === 'success' ? (
            <div className="card-premium text-center">
              <h2 className="text-2xl text-royal-600 dark:text-white">Request Sent 🎉</h2>
              <p className="mt-3 font-secondary text-royal-400 dark:text-sky-200/70">
                We'll review your project details and get back to you with a tailored quotation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone / WhatsApp"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
                />
              </div>
              <input
                type="email"
                required
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
              />
              <div className="grid gap-6 sm:grid-cols-2">
                <select
                  value={form.serviceType}
                  onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                  className="rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
                >
                  {serviceTypes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <select
                  value={form.budgetRange}
                  onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                  className="rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
                >
                  {budgetRanges.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <textarea
                required
                placeholder="Describe your project — goals, scope, timeline"
                rows={5}
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
              />

              {status === 'error' && (
                <p className="font-secondary text-sm text-red-500">Could not send your request. Please try again.</p>
              )}

              <button type="submit" disabled={status === 'submitting'} className="btn-gold w-full">
                {status === 'submitting' ? 'Sending…' : 'Request My Quote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
