"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="label border border-line px-3 py-2 transition-colors hover:border-paper-dim hover:text-paper"
    >
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy address"}</span>
    </button>
  );
}
