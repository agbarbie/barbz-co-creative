const LOGO_SRC = '/assets/logo/barbz-logo.png';

export default function Logo({ className = 'w-40 sm:w-44' }: { className?: string }) {
  return (
    <span
      className={`relative block aspect-[743/244] overflow-hidden rounded-xl shadow-sm ring-1 ring-gold-400/40 ${className}`}
    >
      <img
        src={LOGO_SRC}
        alt="Barbz & Co. Creative — Your Vision. My Design. One Impactful Story."
        className="absolute left-0 top-0 max-w-none"
        style={{ width: '137.82%', marginLeft: '-27.46%', marginTop: '-47.51%' }}
      />
    </span>
  );
}