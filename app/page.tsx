"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

function Shell({
  title,
  subtitle,
  badge = "Portfolio demo · local-only",
  children,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{badge}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
          Honest demo: no multi-tenant backend. State (if any) stays in this browser.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 " +
    className;
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
        : variant === "danger"
          ? "bg-red-600 text-white hover:bg-red-500"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950";

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);
  return [value, setValue] as const;
}

function uid() {
  return crypto.randomUUID();
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}


export default function Home() {
  const [url, setUrl] = useState("https://bookchaowalit.com");
  const [html, setHtml] = useState('<title>Demo Page Title That Is Long Enough</title>\n<meta name="description" content="A demo description that is long enough for SEO checks.">\n<h1>Hello</h1>\n<img src="/x.png" alt="x">\n<a href="/a">A</a>');
  const report = useMemo(() => {
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
    const desc =
      (html.match(/name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
        html.match(/content=["']([^"']*)["'][^>]*name=["']description["']/i) ||
        [])[1] || "";
    const h1 = (html.match(/<h1[^>]*>([^<]*)<\/h1>/i) || [])[1] || "";
    const imgs = (html.match(/<img\b/gi) || []).length;
    const imgsAlt = (html.match(/<img[^>]*alt=/gi) || []).length;
    const links = (html.match(/<a\b/gi) || []).length;
    const checks = [
      { name: "Title present", ok: title.length > 0, detail: title || "missing" },
      { name: "Title length 30–60", ok: title.length >= 30 && title.length <= 60, detail: title.length + " chars" },
      { name: "Meta description", ok: desc.length >= 50, detail: desc.length + " chars" },
      { name: "H1 present", ok: !!h1, detail: h1 || "missing" },
      { name: "Images have alt", ok: imgs === 0 || imgsAlt > 0, detail: imgsAlt + "/" + imgs },
      { name: "Has links", ok: links > 0, detail: String(links) },
    ];
    return { checks, score: Math.round((checks.filter((c) => c.ok).length / checks.length) * 100) };
  }, [html]);
  return (
    <Shell title="SEO Analyzer" subtitle="Score an HTML snapshot for basic on-page SEO checks. No live crawl.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <input className={inputClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL (label only)" />
          <textarea className={`${inputClass} min-h-[240px] font-mono`} value={html} onChange={(e) => setHtml(e.target.value)} />
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-3xl font-semibold">{report.score}<span className="text-base font-normal text-zinc-500">/100</span></div>
          <ul className="mt-4 space-y-2 text-sm">
            {report.checks.map((c) => (
              <li key={c.name} className="flex justify-between gap-2">
                <span>{c.ok ? "✓" : "✗"} {c.name}</span>
                <span className="max-w-[50%] truncate text-zinc-500">{c.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}
