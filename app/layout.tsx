import type { Metadata } from "next";
import { Azeret_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const seoSans = Plus_Jakarta_Sans({ variable: "--font-seo-sans", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const seoMono = Azeret_Mono({ variable: "--font-seo-mono", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
export const metadata: Metadata = { title: "SEO Analyzer | Bookchaowalit", description: "Inspect an HTML snapshot for basic on-page SEO checks without a live crawl.", authors: [{ name: "Bookchaowalit", url: "https://bookchaowalit.com" }], metadataBase: new URL("https://bookchaowalit.com"), robots: { index: true, follow: true } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${seoSans.variable} ${seoMono.variable}`}><body className="antialiased"><span hidden aria-hidden="true" dangerouslySetInnerHTML={{ __html: "<!-- THESIS: inspection bench for an HTML snapshot. OWN-WORLD: warm paper, cobalt ink, acid-green passes, diagnostic mono. STORY: paste markup, read exact checks, copy a local report. FIRST VIEWPORT: source specimen left, lint ledger right. FORM: candidate 7, browser diagnostic bench; seed key caeb4386. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance -->" }} />{/* THESIS: SEO Analyzer is an inspection bench for an HTML snapshot, not a marketing score card or a pretend crawler.
OWN-WORLD: warm paper, cobalt ink, acid green pass states, diagnostic mono labels, and a source-to-report split that reads like a bench instrument.
STORY: A visitor pastes a snapshot, sees exactly which checks passed, and copies a compact report without confusing local analysis for a live crawl.
FIRST VIEWPORT: the source specimen occupies the left and the lint ledger occupies the right; Analyze is implicit in live editing and Copy report is the explicit action.
FORM: candidate 7 of the grounded list, an inspection bench / browser diagnostic; seed key caeb4386.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance */}<Analytics /><SpeedInsights />{children}</body></html>; }
