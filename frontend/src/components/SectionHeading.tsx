interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, subtitle, light, align = 'center' }: Props) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} animate-fadeUp`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl sm:text-4xl ${light ? 'text-white' : 'text-royal-600'}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 font-secondary text-base leading-relaxed ${light ? 'text-sky-100' : 'text-royal-400 dark:text-sky-200/70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
