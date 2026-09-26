import { motion } from 'framer-motion';

type ApparelKind = 'hoodies' | 'tshirts' | 'sweatshirts' | 'accessories';

interface ApparelArtProps {
  kind: ApparelKind;
  className?: string;
  animated?: boolean;
}

/**
 * Original brand-colored line-art illustrations used wherever a real product
 * photo hasn't been uploaded yet. Swap these out per-product once real
 * photography lands in `public/assets/products/` — see that folder's README.
 */
function HoodieShape() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
      <path
        d="M60 40c0-14 18-24 40-24s40 10 40 24v10l24 14-10 22-14-8v78a8 8 0 01-8 8H68a8 8 0 01-8-8v-78l-14 8-10-22 24-14V40z"
        fill="url(#hoodieGrad)"
        stroke="#C9A227"
        strokeWidth="2.5"
      />
      <path d="M78 40c0 14 10 24 22 24s22-10 22-24" stroke="#C9A227" strokeWidth="2.5" fill="none" />
      <circle cx="100" cy="96" r="10" stroke="#C9A227" strokeWidth="2" fill="none" />
      <defs>
        <linearGradient id="hoodieGrad" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#5B1F91" />
          <stop offset="100%" stopColor="#2E0550" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TeeShape() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
      <path
        d="M70 36l30-10 30 10 26 22-14 20-12-8v92a6 6 0 01-6 6H76a6 6 0 01-6-6v-92l-12 8-14-20 26-22z"
        fill="url(#teeGrad)"
        stroke="#4FB6E8"
        strokeWidth="2.5"
      />
      <defs>
        <linearGradient id="teeGrad" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#2C93C7" />
          <stop offset="100%" stopColor="#164E6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SweatshirtShape() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
      <path
        d="M62 44c0-16 17-28 38-28s38 12 38 28v8l26 16-11 21-15-9v82a7 7 0 01-7 7H69a7 7 0 01-7-7v-82l-15 9-11-21 26-16v-8z"
        fill="url(#sweatGrad)"
        stroke="#EAD289"
        strokeWidth="2.5"
      />
      <rect x="82" y="150" width="36" height="10" rx="5" stroke="#EAD289" strokeWidth="2" fill="none" />
      <defs>
        <linearGradient id="sweatGrad" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#876A17" />
          <stop offset="100%" stopColor="#43350B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AccessoryShape() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
      <rect x="50" y="70" width="100" height="80" rx="10" fill="url(#accGrad)" stroke="#C9A227" strokeWidth="2.5" />
      <path d="M75 70v-14a25 25 0 0150 0v14" stroke="#C9A227" strokeWidth="2.5" fill="none" />
      <defs>
        <linearGradient id="accGrad" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#5B1F91" />
          <stop offset="100%" stopColor="#164E6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const shapes: Record<ApparelKind, () => JSX.Element> = {
  hoodies: HoodieShape,
  tshirts: TeeShape,
  sweatshirts: SweatshirtShape,
  accessories: AccessoryShape,
};

export default function ApparelArt({ kind, className = '', animated = true }: ApparelArtProps) {
  const Shape = shapes[kind] ?? shapes.hoodies;
  const content = (
    <div className={`flex items-center justify-center bg-gradient-to-br from-royal-50 to-sky-50 dark:from-white/[0.03] dark:to-white/[0.01] ${className}`}>
      <div className="w-2/3 max-w-[180px]">
        <Shape />
      </div>
    </div>
  );

  if (!animated) return content;

  return (
    <motion.div
      className="h-full w-full"
      whileHover={{ scale: 1.04, rotate: -1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {content}
    </motion.div>
  );
}