"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Compact header once the hero has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section crossing the upper third of the viewport wins.
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const top = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(null),
      { rootMargin: "0px 0px -70% 0px" },
    );
    const hero = document.getElementById("top");
    if (hero) top.observe(hero);
    return () => {
      io.disconnect();
      top.disconnect();
    };
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menu: lock scroll, close on Escape, move focus in.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, close]);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 bg-paper px-3 py-2 font-mono text-xs text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled || open
            ? "border-b border-line bg-ink/92 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between">
          <a
            href="#top"
            onClick={() => open && close(false)}
            className="group flex items-baseline gap-3"
            aria-label={`${site.name} — back to top`}
          >
            <span className="display text-[1.375rem] tracking-[-0.04em]">
              Alp Cihan
              <span className="text-signal">.</span>
            </span>
            <span className="label hidden transition-colors group-hover:text-paper-dim sm:inline">
              {site.domain}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`group relative flex items-baseline gap-1.5 px-3 py-2 text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-paper"
                          : "text-paper-dim hover:text-paper"
                      }`}
                    >
                      <span className="font-mono text-[0.625rem] text-paper-faint transition-colors group-hover:text-signal">
                        0{i + 1}
                      </span>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-3 -bottom-px h-px bg-signal"
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { duration: 0.5, ease: EASE }
                          }
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex items-center gap-3 px-2 py-3 font-mono text-xs tracking-[0.08em] uppercase md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative block h-2.5 w-5">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-[var(--header-h)] md:hidden"
            initial={
              reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }
            }
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.15 : 0.7, ease: EASE }}
          >
            <nav
              aria-label="Mobile"
              className="shell flex flex-1 flex-col justify-center"
            >
              <ul className="border-t border-line">
                {nav.map((item, i) => (
                  <li
                    key={item.id}
                    className="overflow-hidden border-b border-line"
                  >
                    <motion.a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={`#${item.id}`}
                      onClick={() => close(false)}
                      className="flex items-baseline justify-between py-5"
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: EASE,
                        delay: 0.12 + i * 0.06,
                      }}
                    >
                      <span className="display text-[clamp(2.75rem,13vw,4.5rem)]">
                        {item.label}
                      </span>
                      <span className="label">0{i + 1}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="shell flex justify-between pb-8">
              <span className="label">{site.name}</span>
              <span className="label">{site.domain}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
