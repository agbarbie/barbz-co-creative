interface FlourishProps {
  className?: string;
  light?: boolean;
}

/**
 * A small ornamental line-and-diamond flourish used under eyebrows and
 * between sections — the soft, boutique alternative to a bold divider rule.
 */
export default function Flourish({ className = '', light = false }: FlourishProps) {
  const stroke = light ? '#EAD289' : '#C9A227';
  return (
    <svg
      viewBox="0 0 120 16"
      className={`h-4 w-24 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="8" x2="48" y2="8" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <rect x="56" y="4" width="8" height="8" transform="rotate(45 60 8)" stroke={stroke} strokeWidth="1.2" fill="none" />
      <line x1="72" y1="8" x2="120" y2="8" stroke={stroke} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}