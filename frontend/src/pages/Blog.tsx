import SectionHeading from '../components/SectionHeading';
import { blogPosts } from '../api/seedData';
import BackgroundReveal from '../components/Motion/BackgroundReveal';
import FloatingAccent from '../components/Motion/FloatingAccent';

// TODO: swap for real photography — see Home.tsx for the asset-folder convention.
const bg = {
  hero: 'https://picsum.photos/seed/barbz-blog-hero/1800/1000',
  accentA: 'https://picsum.photos/seed/barbz-blog-a/400/400',
};

export default function Blog() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-gradient pb-16 pt-40 dark:bg-[#07040D] text-center text-white">
        <BackgroundReveal image={bg.hero} overlay="brand" />
        <FloatingAccent image={bg.accentA} className="left-10 top-14 hidden xl:block" size={90} />
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
                <h3 className="mt-2 font-primary text-lg font-semibold text-royal-700 dark:text-sky-50">{post.title}</h3>
                <p className="mt-2 font-secondary text-sm text-royal-400 dark:text-sky-200/70">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
