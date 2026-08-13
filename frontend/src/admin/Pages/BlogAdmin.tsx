import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AdminPageHeader from '../components/AdminPageHeader';

interface PostRow {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: '', image_url: '', publish: true });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setLoading(true);
    api.get<PostRow[]>('/blog/all').then(setPosts).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.post('/blog', { ...form, slug: slugify(form.title) });
      setForm({ title: '', excerpt: '', content: '', category: '', image_url: '', publish: true });
      setShowForm(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <AdminPageHeader title="Blog" subtitle="Branding and design insights published to the site." />
        <button onClick={() => setShowForm((s) => !s)} className="btn-gold">
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <input
            required
            placeholder="Post title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Category (e.g. Branding)"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
            />
            <input
              placeholder="/assets/blog/your-image.jpg"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Short excerpt for the blog listing"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
          />
          <textarea
            required
            placeholder="Full post content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-secondary text-sm text-white placeholder-sky-400/50 focus:border-gold-400 focus:outline-none"
          />
          <label className="flex items-center gap-2 font-secondary text-sm text-sky-200">
            <input
              type="checkbox"
              checked={form.publish}
              onChange={(e) => setForm({ ...form, publish: e.target.checked })}
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-gold-400"
            />
            Publish immediately
          </label>
          {error && <p className="font-secondary text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-gold">
            {submitting ? 'Saving…' : 'Save Post'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left">
          <thead className="bg-white/[0.03]">
            <tr className="font-secondary text-xs uppercase tracking-wide text-sky-400">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.map((p) => (
              <tr key={p.id} className="font-secondary text-sm text-sky-100">
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3">{p.category || '—'}</td>
                <td className="px-4 py-3">
                  {p.published_at ? (
                    <span className="text-emerald-300">Published</span>
                  ) : (
                    <span className="text-sky-400">Draft</span>
                  )}
                </td>
              </tr>
            ))}
            {!loading && posts.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center font-secondary text-sm text-sky-400">
                  No posts yet — write your first one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
