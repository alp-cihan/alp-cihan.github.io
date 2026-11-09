import { contact } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { Pending } from "./Pending";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const links = contact.links.filter(
    (l) => l.href || process.env.NODE_ENV !== "production",
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="shell section-y pb-16"
    >
      <SectionHeader id="contact" index="04" title="Contact" />

      <div className="reveal grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">
          <p className="display max-w-[14ch] text-[clamp(2.5rem,6.4vw,6rem)] leading-[0.95]">
            Let&apos;s build something{" "}
            <span className="text-signal">real.</span>
          </p>
          <p className="mt-8 max-w-[44ch] text-[1.0625rem] text-paper-dim">
            Internships, research collaborations, or a product that needs
            someone who can take it from model to interface — I&apos;d like to
            hear about it.
          </p>

          <div className="mt-12">
            {contact.email ? (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="link-wipe display text-[clamp(1.5rem,3.4vw,2.75rem)] tracking-[-0.03em] break-all"
                >
                  {contact.email}
                </a>
                <CopyEmail email={contact.email} />
              </div>
            ) : (
              <Pending>e-mail address</Pending>
            )}
          </div>
        </div>

        {links.length > 0 && (
          <nav
            aria-label="Elsewhere"
            className="lg:col-span-3 lg:col-start-10 lg:self-end"
          >
            <h3 className="label mb-4">Elsewhere</h3>
            <ul className="border-t border-line">
              {links.map((l) => (
                <li key={l.label} className="border-b border-line">
                  {l.href ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer me"
                      className="group flex items-center justify-between py-4 text-paper transition-colors hover:text-signal"
                    >
                      {l.label}
                      <span
                        aria-hidden
                        className="text-paper-faint transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal"
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="flex items-center justify-between py-4 text-paper-dim">
                      {l.label} <Pending>url</Pending>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}
