/**
 * Illustration of KONTAK's core loop: a fuel receipt is scanned on-device,
 * the date and amount are detected, and the expense form fills itself.
 * Values are deliberately redacted — this is a diagram, not a screenshot.
 */

type Field = {
  key: string;
  top: string;
  left: string;
  w: string;
  h: string;
  delay: string;
};

// Scan line sweeps top→bottom linearly between 0.31s and 3.64s of a 5.2s loop,
// so each box appears as the line crosses it.
const fields: Field[] = [
  { key: "date", top: "22%", left: "7%", w: "46%", h: "6%", delay: "1.12s" },
  {
    key: "amount",
    top: "69%",
    left: "7%",
    w: "86%",
    h: "7.5%",
    delay: "2.72s",
  },
];

type Line = {
  top: string;
  left: string;
  w: string;
  h?: string;
  strong?: boolean;
  dash?: boolean;
};

const items = ["70%", "52%", "62%", "44%", "66%", "50%", "58%"];
const receiptLines: Line[] = [
  { top: "10%", left: "10%", w: "56%", h: "2.6%", strong: true },
  { top: "14.4%", left: "10%", w: "36%", h: "1.4%" },
  { top: "24.2%", left: "10%", w: "38%", h: "1.6%", strong: true },
  { top: "31.5%", left: "10%", w: "80%", dash: true },
  ...items.flatMap((w, i): Line[] => [
    {
      top: `${35.5 + i * 4.2}%`,
      left: "10%",
      w: `calc(${w} * 0.62)`,
      h: "1.4%",
    },
    { top: `${35.5 + i * 4.2}%`, left: "78%", w: "12%", h: "1.4%" },
  ]),
  { top: "66.5%", left: "10%", w: "80%", dash: true },
  { top: "71.6%", left: "10%", w: "26%", h: "2.4%", strong: true },
  { top: "71.6%", left: "64%", w: "26%", h: "2.4%", strong: true },
  { top: "82%", left: "10%", w: "50%", h: "1.4%" },
  { top: "85.5%", left: "10%", w: "34%", h: "1.4%" },
];

function Redacted({ w }: { w: string }) {
  return (
    <span
      className="inline-block h-[0.55em] translate-y-[0.05em] bg-paper/70"
      style={{ width: w }}
    />
  );
}

export function KontakVisual() {
  return (
    <div className="relative aspect-[5/4] overflow-hidden bg-ink-raised sm:aspect-[16/10]">
      {/* Dot field */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgb(236 232 224 / 0.09) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Receipt */}
      <div className="absolute top-[11%] bottom-[9%] left-[7%] w-[44%] sm:left-[10%] sm:w-[34%]">
        <div className="receipt-edge relative h-full -rotate-[1.5deg] bg-[#e7e2d8] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-0">
          {/* Receipt content, laid out on the same % grid as the detections */}
          <div aria-hidden className="absolute inset-0">
            {receiptLines.map((l, i) => (
              <span
                key={i}
                className={`absolute block ${l.dash ? "h-0 border-t border-dashed border-ink/25" : l.strong ? "bg-ink/75" : "bg-ink/22"}`}
                style={{
                  top: l.top,
                  left: l.left,
                  width: l.w,
                  height: l.dash ? undefined : l.h,
                }}
              />
            ))}
          </div>

          {/* Detections */}
          {fields.map((f) => (
            <span
              key={f.key}
              aria-hidden
              className="scan-box absolute origin-center border-[1.5px] border-signal"
              style={
                {
                  top: f.top,
                  left: f.left,
                  width: f.w,
                  height: f.h,
                  "--box-delay": f.delay,
                } as React.CSSProperties
              }
            >
              <span className="absolute -top-[1.05rem] -left-[1.5px] bg-signal px-1 font-mono text-[0.5625rem] leading-[1rem] text-ink uppercase">
                {f.key}
              </span>
            </span>
          ))}

          {/* Scan line */}
          <span aria-hidden className="scan-line absolute inset-x-[-6%] h-0">
            <span className="absolute inset-x-0 -top-10 h-10 bg-gradient-to-b from-transparent to-signal/18" />
            <span className="absolute inset-x-0 top-0 h-px bg-signal" />
          </span>
        </div>
      </div>

      {/* Structured output */}
      <div className="absolute top-1/2 right-[6%] left-[57%] -translate-y-1/2 font-mono text-[clamp(0.5625rem,1.15vw,0.75rem)] leading-relaxed text-paper-dim sm:left-[52%] sm:right-[8%]">
        <p className="label mb-3 !text-[0.95em] sm:mb-5">
          <span className="text-signal">●</span> on-device ocr → form
        </p>
        <dl className="space-y-2 border-t border-line pt-3 sm:space-y-2.5 sm:pt-4">
          {fields.map((f, i) => (
            <div
              key={f.key}
              className="scan-out flex items-baseline justify-between gap-3 border-b border-line pb-2 sm:pb-2.5"
              style={{ "--box-delay": f.delay } as React.CSSProperties}
            >
              <dt className="text-paper-faint">{f.key}</dt>
              <dd>
                <Redacted w={["4.6em", "3.6em"][i]} />
              </dd>
            </div>
          ))}
          <div
            className="scan-out flex items-baseline justify-between gap-3 pt-1"
            style={{ "--box-delay": "3.3s" } as React.CSSProperties}
          >
            <dt className="text-paper-faint">form</dt>
            <dd className="text-signal">auto-filled ✓</dd>
          </div>
        </dl>
      </div>

      <p className="label absolute bottom-[4%] left-[7%] !text-[0.625rem] sm:left-[10%]">
        Fig. 01 — Illustration, values redacted
      </p>
    </div>
  );
}
