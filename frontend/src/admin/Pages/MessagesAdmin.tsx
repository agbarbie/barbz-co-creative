import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';

interface MessageRow {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<MessageRow[]>('/contact')
      .then(setMessages)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load messages'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Contact Messages" subtitle="Messages submitted through the contact form." />

      {error && <p className="mb-4 font-secondary text-sm text-red-400">{error}</p>}
      {loading && <p className="font-secondary text-sm text-sky-300">Loading…</p>}

      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-secondary text-sm font-semibold text-white">{m.name}</p>
              <p className="font-secondary text-xs text-sky-400">
                {new Date(m.created_at).toLocaleString()}
              </p>
            </div>
            <p className="font-secondary text-xs text-sky-400">{m.email}</p>
            <p className="mt-3 font-secondary text-sm leading-relaxed text-sky-200">{m.message}</p>
          </div>
        ))}
        {!loading && messages.length === 0 && (
          <p className="rounded-2xl border border-white/10 px-4 py-8 text-center font-secondary text-sm text-sky-400">
            No messages yet.
          </p>
        )}
      </div>
    </>
  );
}
