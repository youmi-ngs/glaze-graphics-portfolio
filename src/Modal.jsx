import { useEffect } from 'react';

// Reusable modal shell: dark backdrop + glass panel + close button.
// Closes on backdrop click, the ✕, or Escape; locks body scroll while open.
export default function Modal({ onClose, label, className = '', children }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className={`modal-panel ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <img src="/images/close.svg" alt="" width="28" height="28" />
        </button>
        {children}
      </div>
    </div>
  );
}
