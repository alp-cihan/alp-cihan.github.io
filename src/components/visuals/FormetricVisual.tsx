/**
 * Illustration of FORMETRIC: a camera viewfinder, a repetition counter and a
 * spoken form cue. It deliberately draws no skeleton or keypoints — the
 * underlying model has not been confirmed, so the picture shows only what
 * the product does, not how.
 */

const bars = [
  0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.45, 0.65, 0.3, 0.75,
  0.5,
];

export function FormetricVisual() {
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

      {/* Viewfinder */}
      <div aria-hidden className="absolute inset-[7%] sm:inset-[8%]">
        {/* Rule of thirds */}
        <span className="absolute inset-y-0 left-1/3 w-px bg-line" />
        <span className="absolute inset-y-0 left-2/3 w-px bg-line" />
        <span className="absolute inset-x-0 top-1/3 h-px bg-line" />
        <span className="absolute inset-x-0 top-2/3 h-px bg-line" />
        {/* Corners */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((c) => (
          <span
            key={c}
            className={`absolute size-5 border-paper-dim sm:size-7 ${c}`}
          />
        ))}

        <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.08em] text-paper-dim uppercase sm:top-4 sm:left-5">
          <span className="rec-dot size-1.5 rounded-full bg-signal" />
          Live
        </div>
        <div className="absolute top-3 right-4 font-mono text-[0.625rem] tracking-[0.08em] text-paper-faint uppercase sm:top-4 sm:right-5">
          Push-ups
        </div>

        {/* Rep counter */}
        <div className="absolute top-1/2 left-[7%] -translate-y-1/2">
          <p className="label !text-[0.625rem]">Reps</p>
          <p
            className="rep-count display mt-1 text-[clamp(3.5rem,11vw,8.5rem)] text-paper tabular-nums"
            style={{ fontVariationSettings: '"opsz" 96, "wdth" 82' }}
          />
          <div className="mt-3 flex w-[clamp(7rem,18vw,13rem)] gap-[3px]">
            <span className="relative h-[3px] flex-1 overflow-hidden bg-line-strong">
              <span className="rep-fill absolute inset-0 origin-left bg-signal" />
            </span>
          </div>
        </div>

        {/* Spoken feedback */}
        <div className="absolute right-[6%] bottom-[12%] w-[46%] max-w-[17rem] sm:w-[40%]">
          <p className="label mb-2.5 !text-[0.625rem]">
            <span className="text-signal">◆</span> Voice cue
          </p>
          <div className="flex h-6 items-center gap-[3px] sm:h-8">
            {bars.map((h, i) => (
              <span
                key={i}
                className="wave-bar block w-[3px] origin-center rounded-full bg-signal"
                style={
                  {
                    height: `${h * 100}%`,
                    "--d": `${(i % 5) * -0.22}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <p className="mt-3 font-sans text-[clamp(0.8125rem,1.4vw,1.0625rem)] leading-snug text-paper">
            “Extend your arm a bit more.”
          </p>
        </div>
      </div>

      <p className="label absolute bottom-[2.2%] left-[7%] !text-[0.625rem] sm:left-[8%]">
        Fig. 02 — Illustration
      </p>
      <p className="label absolute right-[7%] bottom-[2.2%] hidden !text-[0.625rem] sm:right-[8%] sm:block">
        Team TurkAI
      </p>
    </div>
  );
}
