/**
 * Development-only marker for content that has not been confirmed yet.
 * Renders nothing in production, so unverified gaps never ship as filler.
 */
export function Pending({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="inline-flex items-center gap-1.5 border border-dashed border-signal/60 px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-wide text-signal uppercase">
      <span aria-hidden>●</span> TODO · {children}
    </span>
  );
}

export const isDev = process.env.NODE_ENV !== "production";
