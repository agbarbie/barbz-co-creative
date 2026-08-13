import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  /** Replay every time it scrolls into view instead of once */
  repeat?: boolean;
  as?: 'div' | 'section' | 'li';
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 64 },
  right: { x: -64 },
  none: {},
};

/**
 * Wraps content and animates it in (fade + slide) the moment it scrolls
 * into the viewport. Works for both vertical and horizontal entrances —
 * pick `direction="left"` / `"right"` for elements that should glide in
 * sideways as the page is scrolled vertically past them.
 */
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance,
  className,
  repeat = false,
  as = 'div',
}: RevealProps) {
  const offset = offsets[direction];
  const initial = {
    opacity: 0,
    x: offset.x !== undefined ? (distance ?? offset.x) : 0,
    y: offset.y !== undefined ? (distance ?? offset.y) : 0,
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, amount: 0.2, margin: '0px 0px -80px 0px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}