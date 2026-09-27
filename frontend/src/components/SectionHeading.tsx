import Flourish from './Flourish';

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, subtitle, light, align = 'center' }: Props) {
  const centered = align === 'center';
  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} animate-fadeUp`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <Flourish light={light} className={`mt-2 ${centered ? 'mx-auto' : ''}`} />
      <h2
        className={`mt-4 font-accent text-[2.1rem] italic leading-tight sm:text-[2.6rem] ${
          light ? 'text-white' : 'text-royal-600 dark:text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 font-secondary text-base font-light leading-relaxed ${light ? 'text-sky-100' : 'text-royal-400 dark:text-sky-200/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}