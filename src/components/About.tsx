import { now } from "@/content/site";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="shell section-y"
    >
      <SectionHeader id="about" index="02" title="About" />

      <div className="grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="reveal lg:col-span-7">
          <p className="display max-w-[20ch] text-[clamp(1.875rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
            I&apos;m an AI Engineering student who cares about the whole path —{" "}
            <span className="text-paper-dim">
              from a model that works to a product people use.
            </span>
          </p>
        </div>

        <div className="reveal space-y-5 text-[1.0625rem] leading-[1.65] text-paper-dim lg:col-span-4 lg:col-start-9 lg:pt-3">
          <p>
            My work sits where machine learning meets software engineering.
            I&apos;m drawn to computer vision — teaching systems to make sense
            of images, documents and the physical world — and to the engineering
            it takes to make those systems dependable outside a notebook.
          </p>
          <p>
            I build applications end to end, mobile included, and treat the
            model as one component of a product rather than the product itself.
            KONTAK is the clearest example: OCR is the clever part, but it only
            matters because the rest of the app makes it useful.
          </p>
        </div>
      </div>

      <dl className="reveal mt-20 grid border-t border-line sm:grid-cols-3 md:mt-28">
        {now.map((n, i) => (
          <div
            key={n.label}
            className={`border-b border-line py-5 sm:border-b-0 sm:py-6 ${
              i > 0 ? "sm:border-l sm:pl-6" : ""
            }`}
          >
            <dt className="label">
              <span className="text-signal">→</span> {n.label}
            </dt>
            <dd className="mt-2 text-paper">{n.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
