import './WhatsAppButton.css';

const WHATSAPP_NUMBER = '254700000000';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Barbz%20%26%20Co.%20Creative%2C%20I%27d%20like%20to%20find%20out%20more.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-pulse" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.4 5.13L2 22l5.13-1.5a9.9 9.9 0 0 0 4.9 1.29h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.8-.11a15 15 0 0 1-1.63-.6c-2.87-1.24-4.74-4.12-4.89-4.31-.14-.2-1.17-1.55-1.17-2.95s.72-2.09.98-2.37c.24-.28.53-.35.71-.35h.51c.16 0 .38-.06.6.45.24.56.8 1.93.87 2.07.07.14.11.3.02.49-.08.19-.13.3-.26.46-.13.16-.27.36-.39.48-.13.13-.26.27-.11.53.14.26.65 1.07 1.4 1.73.96.85 1.77 1.12 2.03 1.24.26.13.41.11.56-.06.16-.18.65-.76.83-1.02.17-.26.35-.22.58-.13.24.08 1.51.71 1.77.84.26.13.43.19.5.3.06.11.06.63-.18 1.3Z" />
        </svg>
      </span>
    </a>
  );
}
