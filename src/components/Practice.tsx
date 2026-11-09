import { practice, toolkit } from "@/content/site";
import { isDev, Pending } from "./Pending";
import { SectionHeader } from "./SectionHeader";

export function Practice() {
  return (
    <section
      id="practice"
      aria-labelledby="practice-title"
      className="shell section-y"
    >
      <SectionHeader
        id="practice"
        index="03"
        title="Practice"
        aside="Disciplines & tools"
      />

      <ol className="reveal border-t border-line">
        {practice.map((item, i) => (
          <li
            key={item.name}
            className="group relative grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-b border-line py-6 md:grid-cols-12 md:gap-6 md:py-8"
          >
            {/* Hover sweep */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-signal-dim transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 motion-reduce:hidden"
            />
            <span className="label relative tabular-nums md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display relative text-[clamp(1.75rem,3.6vw,3rem)] tracking-[-0.035em] transition-transform duration-500 ease-[var(--ease-out-expo)] md:col-span-5 md:group-hover:translate-x-3">
              {item.name}
            </h3>
            <p className="relative col-start-2 max-w-[44ch] text-paper-dim md:col-span-5 md:col-start-8">
              {item.line}
            </p>
          </li>
        ))}
      </ol>

      {(toolkit.length > 0 || isDev) && (
        <div className="reveal mt-20 grid gap-6 md:grid-cols-12">
          <h3 className="label md:col-span-3">Toolkit</h3>
          <div className="md:col-span-9">
            {toolkit.length > 0 ? (
              <dl className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {toolkit.map((g) => (
                  <div key={g.group}>
                    <dt className="label mb-3 text-paper-dim">{g.group}</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-2">
                        {g.items.map((t) => (
                          <li
                            key={t}
                            className="border border-line px-2.5 py-1 font-mono text-xs text-paper-dim transition-colors hover:border-signal/60 hover:text-paper"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <Pending>technologies you actually use</Pending>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
