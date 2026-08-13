import { motion } from 'framer-motion';

interface BackgroundRevealProps {
  /** Still image — used as-is when no video is given, and as the video poster/fallback. */
  image: string;
  /** Optional background video (mp4/webm). Falls back to `image` if omitted or if it fails to load. */
  video?: string;
  /** Tint over the media so foreground text stays readable. */
  overlay?: 'brand' | 'dark' | 'light' | 'none';
  className?: string;
}

const overlays: Record<NonNullable<BackgroundRevealProps['overlay']>, string> = {
  brand: 'bg-gradient-to-br from-royal-600/88 via-royal-700/82 to-[#0B2C40]/88',
  dark: 'bg-black/55',
  light: 'bg-white/70 dark:bg-[#07040D]/70',
  none: '',
};

/**
 * Full-bleed decorative background (image or video) that glides in from the
 * left the moment its section scrolls into view. Sits behind the section's
 * content — drop it as the first child of any `relative overflow-hidden`
 * section. Pair with an `overlay` so text stays legible on top of it.
 */
export default function BackgroundReveal({ image, video, overlay = 'brand', className = '' }: BackgroundRevealProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      initial={{ x: '-100%', opacity: 0 }}
      whileInView={{ x: '0%', opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {video ? (
        <video
          className="h-full w-full scale-105 object-cover"
          src={video}
          poster={image}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img src={image} alt="" loading="lazy" className="h-full w-full scale-105 object-cover" />
      )}
      {overlay !== 'none' && <div className={`absolute inset-0 ${overlays[overlay]}`} />}
    </motion.div>
  );
}
