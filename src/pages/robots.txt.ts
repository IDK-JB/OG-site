import type { APIRoute } from "astro";
import { INDEXABLE } from "../seo";

// Hors indexation, on laisse les robots lire les pages pour qu'ils voient
// la consigne noindex (un Disallow les empêcherait de la lire).
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://oliviergaillard.fr");
  const body = INDEXABLE
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", base).href}\n`
    : `User-agent: *\nAllow: /\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
