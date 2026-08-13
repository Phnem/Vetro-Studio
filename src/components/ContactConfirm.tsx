"use client";

import { useState, type AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function ContactConfirm({
  href,
  children,
  onClick,
  ...anchorProps
}: Props) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    setConfirming(true);
  };

  const open = () => {
    window.open(href, "_blank", "noopener,noreferrer");
    setConfirming(false);
  };

  return (
    <>
      <a href={href} onClick={handleClick} {...anchorProps}>
        {children}
      </a>
      {confirming && (
        <div className="modal-overlay" onClick={() => setConfirming(false)}>
          <div className="modal-sheet confirm-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Leave Vetro?</h2>
              <button
                className="modal-close"
                onClick={() => setConfirming(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p>
                This link opens Telegram in a new tab. You&apos;ll leave the
                Vetro website to continue the conversation there.
              </p>
              <p className="confirm-url">{href}</p>
              <div className="confirm-actions">
                <button
                  className="confirm-btn ghost"
                  onClick={() => setConfirming(false)}
                >
                  Cancel
                </button>
                <button className="confirm-btn primary" onClick={open}>
                  Open Telegram
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}