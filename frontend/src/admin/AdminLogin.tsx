import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminAuth } from './AdminAuthContext';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0614] px-4">
      <div className="glow-orb -right-24 -top-24 h-80 w-80 bg-gold-400/10" />
      <div className="glow-orb -left-24 bottom-0 h-80 w-80 bg-sky-400/10" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
      >
        <p className="font-primary text-lg font-extrabold text-white">
          BARBZ <span className="text-gold-400">&amp;</span> CO.
        </p>
        <p className="mt-1 font-secondary text-xs uppercase tracking-widest text-sky-300">
          Admin &amp; Backoffice
        </p>

        <h1 className="mt-6 text-2xl text-white">Sign in to manage the studio</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            type="email"
            required
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-secondary text-sm text-white placeholder-sky-300/50 focus:border-gold-400 focus:outline-none"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-secondary text-sm text-white placeholder-sky-300/50 focus:border-gold-400 focus:outline-none"
          />

          {error && <p className="font-secondary text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center font-secondary text-xs text-sky-300/60">
          Access is restricted to Barbz &amp; Co. staff accounts.
        </p>
      </motion.div>
    </div>
  );
}
