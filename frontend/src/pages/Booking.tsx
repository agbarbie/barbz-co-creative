import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import { api } from '../api/client';
import { services } from '../api/seedData';
import type { BookingPayload } from '../types';
import BackgroundReveal from '../components/Motion/BackgroundReveal';
import FloatingAccent from '../components/Motion/FloatingAccent';

// TODO: swap for real photography — see Home.tsx for the asset-folder convention.
const bg = {
  hero: 'https://picsum.photos/seed/barbz-booking-hero/1800/1000',
  accentA: 'https://picsum.photos/seed/barbz-booking-a/400/400',
};

const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'];

export default function Booking() {
  const [form, setForm] = useState<BookingPayload>({
    service: services[0].title,
    date: '',
    time: timeSlots[0],
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await api.post('/bookings', form);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient pb-16 pt-40 dark:bg-[#07040D] text-center text-white">
        <BackgroundReveal image={bg.hero} overlay="brand" />
        <FloatingAccent image={bg.accentA} className="left-10 bottom-6 hidden xl:block" size={90} />
        <div className="container-xl">
          <p className="section-eyebrow">Book a Consultation</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Let's Talk About Your Vision</h1>
        </div>
      </section>

      <section className="container-xl py-20">
        <div className="mx-auto max-w-2xl">
          {status === 'success' ? (
            <div className="card-premium text-center">
              <h2 className="text-2xl text-royal-600 dark:text-white">You're Booked 🎉</h2>
              <p className="mt-3 font-secondary text-royal-400 dark:text-sky-200/70">
                We've received your request and will confirm your consultation shortly by email or WhatsApp.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-premium space-y-6">
              <SectionHeading eyebrow="Consultation Details" title="Choose a Service & Time" align="left" />

              <label className="block">
                <span className="font-secondary text-sm font-medium text-royal-600 dark:text-white">Service</span>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
                >
                  {services.map((s) => (
                    <option key={s.id}>{s.title}</option>
                  ))}
                </select>
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="font-secondary text-sm font-medium text-royal-600 dark:text-white">Preferred Date</span>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
                  />
                </label>
                <label className="block">
                  <span className="font-secondary text-sm font-medium text-royal-600 dark:text-white">Preferred Time</span>
                  <select
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
                  >
                    {timeSlots.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
              </div>

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
              <textarea
                placeholder="Tell us briefly about your project"
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-lg border border-royal-100 px-4 py-3 font-secondary text-sm focus:border-gold-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-sky-300/50"
              />

              {status === 'error' && (
                <p className="font-secondary text-sm text-red-500">Could not submit your booking. Please try again.</p>
              )}

              <button type="submit" disabled={status === 'submitting'} className="btn-gold w-full">
                {status === 'submitting' ? 'Booking…' : 'Confirm Booking'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
