"use client";

type Props = {
  open: boolean;
  href: string;
  onClose: () => void;
};

export default function ConfirmDialog({ open, href, onClose }: Props) {
  if (!open) return null;

  const confirm = () => {
    window.open(href, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet confirm-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Leave Vetro?</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p>
            This link opens Telegram in a new tab. You&apos;ll leave the Vetro
            website to continue the conversation there.
          </p>
          <p className="confirm-url">{href}</p>
          <div className="confirm-actions">
            <button className="confirm-btn ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="confirm-btn primary" onClick={confirm}>
              Open Telegram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
