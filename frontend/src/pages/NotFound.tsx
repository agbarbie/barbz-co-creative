import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-accent text-6xl italic text-gold-400">404</p>
      <h1 className="mt-4 text-3xl text-royal-600">This story hasn't been written yet</h1>
      <Link to="/" className="btn-gold mt-8">Back to Home</Link>
    </section>
  );
}
