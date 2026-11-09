/**
 * Single source of truth for every word on alpcihan.me.
 *
 * Rule: nothing here is invented. Anything not yet confirmed by Alp is
 * `null` (or listed in `pending`). `null` fields are hidden in production
 * builds and shown as a visible TODO marker in development.
 */

export const site = {
  name: "Alp Cihan Öztürk",
  shortName: "Alp Cihan",
  domain: "alpcihan.me",
  url: "https://alpcihan.me",
  role: "AI Engineering student & software developer",
  description:
    "Alp Cihan Öztürk is an Artificial Intelligence Engineering student and software developer working across machine learning, computer vision and real-world product engineering.",
  year: 2026,
} as const;

export type Link = { label: string; href: string | null };

export const contact = {
  email: "alpcihanozturk01@gmail.com" as string | null,
  links: [
    { label: "GitHub", href: "https://github.com/alp-cihan" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/alp-cihan-%C3%B6zt%C3%BCrk/",
    },
  ] satisfies Link[],
};

export const nav = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "practice", label: "Practice" },
  { id: "contact", label: "Contact" },
] as const;

export type Project = {
  slug: string;
  index: string;
  name: string;
  kicker: string;
  summary: string;
  body: string[];
  facts: { label: string; value: string | null }[];
  /** Screen-reader description of the illustration. */
  caption: string;
  badge?: string;
  href?: string | null;
  hrefLabel?: string;
};

export const projects: Project[] = [
  {
    slug: "kontak",
    index: "01",
    name: "KONTAK",
    kicker: "Personal project · Android",
    summary:
      "A vehicle expense tracker for fuel, maintenance and running costs — with receipts read straight from the camera.",
    body: [
      "Running a vehicle produces a steady trail of receipts, and most of them end up crumpled in a glovebox. The real cost of ownership is never visible.",
      "KONTAK closes that gap. Scan a fuel receipt and on-device OCR reads the text; the app extracts the amount and the date, fills in the expense form automatically, and records it against the right vehicle.",
      "I built it solo: I defined the product, the data model and the features, and developed it with heavy use of AI coding assistants (Claude and Claude Code), reviewing and testing every change myself.",
    ],
    facts: [
      { label: "Type", value: "Personal project" },
      { label: "Platform", value: "Android · Flutter" },
      {
        label: "Stack",
        value: "Flutter / Dart · Google ML Kit text recognition (on-device)",
      },
      /** TODO(alp): local SQLite, Supabase, or both? */
      { label: "Data", value: null },
      { label: "Role", value: "Solo developer" },
    ],
    caption:
      "Diagram: a fuel receipt is scanned, its date and amount are detected, and the expense form is filled in automatically for a vehicle.",
    href: null,
  },
  {
    slug: "formetric",
    index: "02",
    name: "FORMETRIC",
    kicker: "GenAI Hackathon · Dec 2025",
    badge: "1st place",
    summary:
      "A computer-vision workout assistant that counts exercise repetitions from a camera feed and gives real-time spoken form feedback.",
    body: [
      "Point a camera at yourself, start an exercise such as push-ups, and FORMETRIC keeps count. When your form slips, it tells you — out loud, in the moment: “extend your arm a bit more.”",
      "Built by Team TurkAI (five members) at the “Fikirden Ürüne” GenAI Hackathon, where it took first place. My role was pitch presenter: I prepared and delivered the final presentation and contributed ideas during problem analysis. The application code was written by my teammates.",
    ],
    facts: [
      { label: "Result", value: "1st place" },
      {
        label: "Event",
        value:
          "“Fikirden Ürüne” GenAI Hackathon — Çukurova University Entrepreneurship Club, Adana, December 2025",
      },
      { label: "Team", value: "TurkAI · five members" },
      { label: "Role", value: "Pitch presenter" },
      /** TODO(alp): ask the team which models / libraries were used. */
      { label: "Stack", value: null },
    ],
    caption:
      "Illustration: a camera viewfinder with a repetition counter and a spoken feedback cue reading “extend your arm a bit more”.",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7408468245969534979/",
    hrefLabel: "Announcement on LinkedIn",
  },
];

export const practice = [
  {
    name: "Machine Learning",
    line: "Models that are trained, evaluated and understood — not just imported.",
  },
  {
    name: "Computer Vision",
    line: "Detection, recognition and OCR: turning images and documents into structured data.",
  },
  {
    name: "Software Engineering",
    line: "Clear architecture and maintainable code for systems that keep working after the demo.",
  },
  {
    name: "Mobile Development",
    line: "Applications that put intelligent features directly in people's hands.",
  },
  {
    name: "Product Building",
    line: "Taking an idea from a real problem to something people can actually use.",
  },
];

/** TODO(alp): languages, frameworks and tools you genuinely use. */
export const toolkit: { group: string; items: string[] }[] = [];

export const now = [
  { label: "Studying", value: "Artificial Intelligence Engineering" },
  { label: "Building", value: "KONTAK" },
  { label: "Exploring", value: "Computer vision & document understanding" },
];

/** Open items — tracked here, surfaced only in development. */
export const pending = [
  "FORMETRIC: models / libraries used (ask the team)",
  "KONTAK: data layer — SQLite, Supabase, or both?",
  "KONTAK: how amount & date are extracted from OCR text",
  "KONTAK: links / screenshots",
  "Toolkit: technologies actually used",
];
