import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FloatingAccentProps {
  image: string;
  /** Position it with absolute-positioning utility classes, e.g. "right-8 top-16 hidden lg:block" */
  className?: string;
  size?: number;
  /** Fix the delay/rotation instead of randomizing (useful for visual regression / storybook). */
  delay?: number;
  rotate?: number;
}

/**
 * Small decorative photo that fades, scales, and rotates into place at a
 * randomized delay and tilt each time it scrolls into view — used to
 * scatter a handful of accent images around a section so they don't all
 * "arrive" in lockstep. Purely decorative: aria-hidden, no interaction.
 */
export default function FloatingAccent({ image, className = '', size = 120, delay, rotate }: FloatingAccentProps) {
  const random = useMemo(
    () => ({
      delay: delay ?? Number((Math.random() * 1.4).toFixed(2)),
      rotate: rotate ?? Number((Math.random() * 14 - 7).toFixed(1)),
      duration: Number((0.8 + Math.random() * 0.6).toFixed(2)),
    }),
    [delay, rotate],
  );

  return (
    <motion.img
      src={image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none absolute z-10 rounded-2xl object-cover shadow-premium ring-1 ring-white/20 ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.55, rotate: random.rotate * 2.2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: random.rotate }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: random.duration, delay: random.delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
