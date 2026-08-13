import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  direction?: 'up' | 'left';
}

const container = (stagger: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger },
  },
});

const item = (direction: 'up' | 'left'): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 32 : 0,
    x: direction === 'left' ? 40 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
});

/**
 * Wraps a grid/row of cards (e.g. services, products, testimonials) and
 * reveals each direct child one-by-one as the group scrolls into view.
 * Each direct child is automatically wrapped in the stagger animation —
 * no need to touch the card components themselves.
 */
export default function RevealGroup({ children, className, stagger = 0.12, direction = 'up' }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={container(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item(direction)}>
              {child}
            </motion.div>
          ))
        : (
            <motion.div variants={item(direction)}>{children}</motion.div>
          )}
    </motion.div>
  );
}