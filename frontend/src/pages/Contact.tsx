import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { api } from '../api/client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.post('/contact', form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section className="bg-brand-gradient pb-16 pt-40 text-center text-white">
        <div className="container-xl">
          <p className="section-eyebrow">Get in Touch</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Let's Start the Conversation</h1>
        </div>
      </section>

      <section className="container-xl grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Reach Us Directly" title="Talk to Barbz & Co." align="left" />
          <div className="mt-8 space-y-4">
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="card-premium flex items-center gap-4"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">✆</span>
              <div>
                <p className="font-primary text-sm font-semibold text-royal-700">WhatsApp</p>
                <p className="font-secondary text-xs text-royal-400">+254 700 000 000</p>
              </div>
            </a>
            <div className="card-premium flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-royal-600 text-gold-300">@</span>
              <div>
                <p className="font-primary text-sm font-semibold text-royal-700">Email</p>
                <p className="font-secondary text-xs text-royal-400">hello@barbzandco.com</p>
              </div>
            </div>
            <div className="card-premium flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-royal-600 text-gold-300">📍</span>
              <div>
                <p className="font-primary text-sm font-semibold text-royal-700">Studio</p>
                <p className="font-secondary text-xs text-royal-400">Nairobi, Kenya</p>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {['Instagram', 'TikTok', 'LinkedIn'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-royal-200 px-4 py-2 font-secondary text-xs text-royal-600 hover:border-gold-400 hover:text-gold-500"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          {status === 'success' ? (
            <div className="card-premium text-center">
              <h2 className="text-2xl text-royal-600">Message Sent 🎉</h2>
              <p className="mt-3 font-secondary text-royal-400">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium space-y-5">
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
              />
              <textarea
                required
                placeholder="Your message"
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none"
              />
              {status === 'error' && (
                <p className="font-secondary text-sm text-red-500">Could not send your message. Please try again.</p>
              )}
              <button type="submit" disabled={status === 'submitting'} className="btn-gold w-full">
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
