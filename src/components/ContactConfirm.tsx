"use client";

import { useState, type AnchorHTMLAttributes } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function ContactConfirm({
  href,
  children,
  onClick,
  ...anchorProps
}: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    setOpen(true);
  };

  return (
    <>
      <a href={href} onClick={handleClick} {...anchorProps}>
        {children}
      </a>
      <ConfirmDialog open={open} href={href} onClose={() => setOpen(false)} />
    </>
  );
}
