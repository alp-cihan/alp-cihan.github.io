import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
} from "next/font/google";
import { contact, site } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.domain,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "AI engineering",
    "machine learning",
    "computer vision",
    "software engineering",
    "mobile development",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: site.domain,
    title: site.name,
    description: site.description,
    locale: "en_US",
    firstName: "Alp Cihan",
    lastName: "Öztürk",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: "AI Engineering student and software developer",
  email: contact.email ? `mailto:${contact.email}` : undefined,
  sameAs: contact.links.flatMap((l) => (l.href ? [l.href] : [])),
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Computer Vision",
    "Software Engineering",
    "Mobile Application Development",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
