import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="shell pb-8">
      <div
        aria-hidden
        className="display overflow-hidden border-t border-line pt-8 text-[clamp(3rem,24.6vw,23.5rem)] leading-[0.78] tracking-[-0.055em] whitespace-nowrap text-paper/[0.07] select-none"
        style={{ fontVariationSettings: '"opsz" 96, "wdth" 82' }}
      >
        {site.domain}
      </div>
      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label">
          © {site.year} {site.name}
        </p>
        <p className="label">
          Built with Claude Code · Set in Bricolage &amp; Plex
        </p>
        <a
          href="#top"
          className="label link-wipe self-start hover:text-paper sm:self-auto"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
