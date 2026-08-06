import SectionHeading from '../components/SectionHeading';
import { blogPosts } from '../api/seedData';

export default function Blog() {
  return (
    <>
      <section className="bg-brand-gradient pb-16 pt-40 text-center text-white">
        <div className="container-xl">
          <p className="section-eyebrow">The Journal</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Branding &amp; Design Insights</h1>
        </div>
      </section>

      <section className="container-xl py-20">
        <SectionHeading eyebrow="Latest Articles" title="Ideas Worth Sharing" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="card-premium overflow-hidden p-0">
              <div className="aspect-video overflow-hidden bg-royal-50">
                <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="font-secondary text-xs uppercase tracking-wide text-gold-500">
                  {post.category} · {new Date(post.date).toLocaleDateString()}
                </p>
                <h3 className="mt-2 font-primary text-lg font-semibold text-royal-700">{post.title}</h3>
                <p className="mt-2 font-secondary text-sm text-royal-400">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
