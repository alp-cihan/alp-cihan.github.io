"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Crosshair } from "./Crosshair";

/**
 * The hero name doubles as a computer-vision demo: a region-of-interest
 * window follows the pointer and shows the name the way a model "sees" it
 * (halftone samples on a pixel grid). With no pointer it drifts on its own;
 * with reduced motion it stays still.
 */
export function Hero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scopeRef.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let rect = el.getBoundingClientRect();
    const pos = { x: rect.width * 0.62, y: rect.height * 0.7 };
    const target = { ...pos };
    let pointerActive = false;
    let visible = true;
    let raf = 0;
    let t0 = performance.now();

    const write = () => {
      el.style.setProperty("--lx", `${pos.x}px`);
      el.style.setProperty("--ly", `${pos.y}px`);
      if (readoutRef.current) {
        const x = String(Math.round(pos.x)).padStart(4, "0");
        const y = String(Math.round(pos.y)).padStart(4, "0");
        readoutRef.current.textContent = `x ${x}  y ${y}`;
      }
    };

    const onResize = () => {
      rect = el.getBoundingClientRect();
      if (reduce) {
        pos.x = rect.width * 0.62;
        pos.y = rect.height * 0.7;
        write();
      }
    };

    write();
    if (reduce) {
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const onMove = (e: PointerEvent) => {
      rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only follow while the pointer is near the name block.
      const inside =
        x > -80 && y > -80 && x < rect.width + 80 && y < rect.height + 80;
      pointerActive = inside;
      if (inside) {
        target.x = Math.min(Math.max(x, 0), rect.width);
        target.y = Math.min(Math.max(y, 0), rect.height);
      } else {
        t0 = performance.now();
      }
    };
    const onLeave = () => {
      pointerActive = false;
      t0 = performance.now();
    };

    const tick = (now: number) => {
      if (!pointerActive) {
        // Slow Lissajous drift across the name.
        const t = (now - t0) / 1000;
        // Keep the whole frame inside the name block while idling.
        const hw = (frameRef.current?.offsetWidth ?? 0) / 2;
        const hh = (frameRef.current?.offsetHeight ?? 0) / 2;
        const ax = Math.max(rect.width / 2 - hw, 0);
        const ay = Math.max(rect.height / 2 - hh, 0);
        target.x = rect.width / 2 + ax * Math.sin(t * 0.32 + 1.2);
        target.y = rect.height / 2 + ay * Math.sin(t * 0.51);
      }
      const k = pointerActive ? 0.16 : 0.04;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      write();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col pt-[var(--header-h)]"
    >
      {/* Column grid — the page's underlying structure, barely visible */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="shell grid h-full grid-cols-4 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`border-l border-line/50 ${i >= 4 ? "hidden md:block" : ""} ${
                i === 11 || i === 3 ? "border-r md:border-r-0" : ""
              } ${i === 11 ? "md:border-r" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="shell flex flex-1 flex-col">
        {/* Instrument strip */}
        <div className="flex items-start justify-between gap-6 pt-6 md:pt-10">
          <p className="label animate-fade [animation-delay:600ms]">
            Portfolio — {site.year}
            <br />
            <span className="text-paper-dim md:hidden">{site.role}</span>
            <span className="hidden text-paper-dim md:inline">Index</span>
          </p>
          <p className="label hidden text-right animate-fade [animation-delay:700ms] sm:block">
            Machine learning
            <br />
            Computer vision · Software
          </p>
        </div>

        {/* Name + lens */}
        <div className="flex flex-1 flex-col justify-end pt-12 pb-8 md:pb-12">
          <div
            ref={scopeRef}
            className="lens-scope relative w-fit max-w-full select-none"
            style={{ fontVariationSettings: '"opsz" 96, "wdth" 88' }}
          >
            <h1
              id="hero-title"
              className="display text-[clamp(4rem,min(28vw,24svh),19rem)] md:text-[clamp(4rem,min(24vw,25svh),19rem)]"
              style={{ fontVariationSettings: "inherit" }}
            >
              <NameLines />
            </h1>

            {/* The machine's view, clipped to the region of interest */}
            <div
              aria-hidden
              className="lens-clip pointer-events-none absolute inset-0 bg-ink"
            >
              <div className="pixel-grid absolute inset-0" />
              <div
                className="display halftone relative text-[clamp(4rem,min(28vw,24svh),19rem)] md:text-[clamp(4rem,min(24vw,25svh),19rem)]"
                style={{ fontVariationSettings: "inherit" }}
              >
                <NameLines />
              </div>
            </div>

            {/* ROI frame */}
            <div
              ref={frameRef}
              aria-hidden
              className="lens-frame pointer-events-none absolute animate-fade text-signal [animation-delay:1100ms]"
            >
              <span className="absolute inset-0 border border-signal/40" />
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((c) => (
                <span
                  key={c}
                  className={`absolute size-3.5 -m-px border-signal ${c} border-[1.5px]`}
                />
              ))}
              <span className="absolute -top-6 left-0 flex gap-3 font-mono text-[0.625rem] whitespace-nowrap uppercase tracking-[0.08em]">
                <span className="bg-signal px-1 text-ink">roi</span>
                <span
                  ref={readoutRef}
                  className="hidden bg-ink/85 px-1 tabular-nums whitespace-pre sm:inline"
                >
                  x 0000 y 0000
                </span>
              </span>
              <Crosshair className="absolute top-1/2 left-1/2 -translate-1/2 !text-signal/70" />
            </div>

            {/* Annotation in the indent of line two */}
            <p className="label absolute bottom-[1.4em] left-0 hidden max-w-[22ch] animate-fade [animation-delay:900ms] md:block md:text-[0.6875rem]">
              <span className="text-signal">↳</span> {site.role}
            </p>
          </div>
        </div>

        {/* Statement + actions */}
        <div className="grid gap-10 border-t border-line pt-6 pb-8 md:grid-cols-12 md:gap-6 md:pt-8 md:pb-10">
          <p className="max-w-[34ch] animate-fade text-[clamp(1.125rem,1.7vw,1.375rem)] leading-[1.45] text-paper [animation-delay:800ms] md:col-span-6 lg:col-span-5">
            I build software around computer vision and machine learning — and
            the products that put it to work for real people.
          </p>
          <div className="flex animate-fade flex-wrap items-end gap-x-8 gap-y-4 [animation-delay:950ms] md:col-span-6 md:justify-end lg:col-span-7">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-paper px-5 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal"
            >
              Selected work
              <span
                aria-hidden
                className="relative inline-block overflow-hidden"
              >
                <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-full">
                  ↓
                </span>
                <span className="absolute inset-0 block -translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-0">
                  ↓
                </span>
              </span>
            </a>
            <a
              href="#contact"
              className="link-wipe py-1 text-sm text-paper-dim hover:text-paper"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function NameLines() {
  const line = "block overflow-hidden pt-[0.14em] -mt-[0.14em] pb-[0.04em]";
  return (
    <>
      <span className={line}>
        <span className="block animate-rise [animation-delay:150ms]">
          Alp Cihan
        </span>
      </span>{" "}
      <span className={`${line} md:pl-[1.45em]`}>
        <span className="block animate-rise [animation-delay:260ms]">
          Öztürk
        </span>
      </span>
    </>
  );
}
