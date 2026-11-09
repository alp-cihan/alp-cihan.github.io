/** Registration mark — a small "+" used to pin corners of the layout grid. */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 11 11"
      className={`pointer-events-none size-[11px] text-paper-faint ${className}`}
    >
      <path d="M5.5 0v11M0 5.5h11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Four corner brackets, the visual language of a detection box. */
export function Brackets({ className = "" }: { className?: string }) {
  const c = "absolute size-3 border-current";
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} right-0 bottom-0 border-r border-b`} />
    </span>
  );
}
