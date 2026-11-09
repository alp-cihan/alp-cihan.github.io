import { projects, type Project } from "@/content/site";
import { Brackets } from "./Crosshair";
import { Pending } from "./Pending";
import { SectionHeader } from "./SectionHeader";
import { FormetricVisual } from "./visuals/FormetricVisual";
import { KontakVisual } from "./visuals/KontakVisual";

const visuals: Record<string, React.ReactNode> = {
  kontak: <KontakVisual />,
  formetric: <FormetricVisual />,
};

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="shell section-y">
      <SectionHeader
        id="work"
        index="01"
        title="Work"
        display="Selected work"
        aside={`${String(projects.length).padStart(2, "0")} projects`}
      />
      <div className="flex flex-col gap-[clamp(6rem,12vw,10rem)]">
        {projects.map((p, i) => (
          <ProjectEntry key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectEntry({
  project: p,
  flip,
}: {
  project: Project;
  flip: boolean;
}) {
  const facts = p.facts.filter(
    (f) => f.value !== null || process.env.NODE_ENV !== "production",
  );

  return (
    <article aria-labelledby={`${p.slug}-name`} className="group reveal">
      {/* Title row */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 md:mb-10">
        <div className="flex items-end gap-5 md:gap-8">
          <span className="label pb-[0.9em] tabular-nums">{p.index}</span>
          <h3
            id={`${p.slug}-name`}
            className="display text-[clamp(3.25rem,10.5vw,9.5rem)] transition-colors duration-500"
            style={{ fontVariationSettings: '"opsz" 96, "wdth" 82' }}
          >
            {p.name}
          </h3>
        </div>
        <div className="flex items-center gap-3 pb-[0.6em]">
          {p.badge && (
            <span className="border border-signal/50 px-2 py-1 font-mono text-[0.625rem] tracking-[0.08em] text-signal uppercase">
              {p.badge}
            </span>
          )}
          {p.kicker && <span className="label">{p.kicker}</span>}
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Visual */}
        <figure
          className={`relative lg:col-span-8 ${flip ? "lg:order-2 lg:col-start-5" : ""}`}
        >
          <div className="relative border border-line transition-colors duration-500 group-hover:border-line-strong">
            {visuals[p.slug]}
          </div>
          <Brackets className="-inset-2 text-paper-faint opacity-0 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:-inset-3 group-hover:text-signal group-hover:opacity-100" />
          <figcaption className="sr-only">{p.caption}</figcaption>
        </figure>

        {/* Text */}
        <div
          className={`flex flex-col lg:col-span-4 ${flip ? "lg:order-1" : "lg:pl-6"} ${flip ? "lg:pr-6" : ""}`}
        >
          <p className="max-w-[38ch] text-[1.1875rem] leading-[1.45] text-paper">
            {p.summary}
          </p>

          {p.body.length > 0 ? (
            <div className="mt-6 max-w-[46ch] space-y-4 text-[0.9375rem] text-paper-dim">
              {p.body.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <Pending>features &amp; implementation</Pending>
            </div>
          )}

          <div aria-hidden className="hidden lg:block lg:min-h-10 lg:flex-1" />
          {facts.length > 0 && (
            <dl className="mt-10 border-t border-line text-sm lg:mt-0">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-3"
                >
                  <dt className="label pt-[0.2em]">{f.label}</dt>
                  <dd className="text-paper-dim">
                    {f.value ?? <Pending>{f.label.toLowerCase()}</Pending>}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {p.href ? (
            <a
              href={p.href}
              className="link-wipe mt-6 self-start py-1 text-sm text-paper"
              target="_blank"
              rel="noreferrer"
            >
              {p.hrefLabel ?? "View project"} <span aria-hidden>↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
