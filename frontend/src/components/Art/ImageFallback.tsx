import { useState } from 'react';

interface ImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}

export default function ImageFallback({ src, alt, className = '', label }: ImageFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-royal-600 via-royal-700 to-[#0B2C40] ${className}`}>
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EAD289" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="M21 15l-5-5-7 7" />
          </svg>
          {label && <p className="font-secondary text-xs text-sky-200/70">{label}</p>}
        </div>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}