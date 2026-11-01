import type { APIRoute } from "astro";

// Pages indexables. Priorité : l'accueil porte la requête "coach running Lyon".
const pages = [
  { path: "/", priority: "1.0" },
  { path: "/coaching-a-distance", priority: "0.9" },
  { path: "/coach", priority: "0.8" },
  { path: "/athlete-project", priority: "0.7" },
  { path: "/mentions-legales", priority: "0.1" },
  { path: "/cgv", priority: "0.1" },
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://olivier-gaillard.fr");
  // Pas de lastmod : la date du build ne reflète pas une vraie mise à jour du contenu
  const urls = pages
    .map(
      (p) =>
        `  <url><loc>${new URL(p.path, base).href}</loc><priority>${p.priority}</priority></url>`
    )
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } }
  );
};
