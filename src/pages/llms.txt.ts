import type { APIRoute } from "astro";
import { EPREUVES } from "@/data/epreuves";
import { CONTACT_EMAIL } from "@/seo";

// Résumé du site pour les assistants IA (format llmstxt.org). Google Search ne s'en sert pas.
const pages = [
  { path: "/", titre: "Accueil", desc: "Coach running à distance : plan d'entraînement sur mesure sur Nolio, ajusté chaque semaine, du 10 km au marathon." },
  { path: "/coaching-a-distance", titre: "Suivi running en ligne", desc: "Fonctionnement du suivi, formules à 80 et 130 € par mois, questions fréquentes." },
  { path: "/coach", titre: "Le coach", desc: "Parcours, diplômes et vision d'Olivier Gaillard, entraîneur d'athlétisme FFA depuis 2009." },
  { path: "/athlete-project", titre: "Athlete Project", desc: "Groupe de demi-fond fondé par Olivier Gaillard à l'Athletic Club du Lyonnais : saison, résultats, records." },
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("https://olivier-gaillard.fr");
  const lien = (p: { path: string; titre: string; desc: string }) =>
    `- [${p.titre}](${new URL(p.path, base).href}): ${p.desc}`;

  const texte = [
    "# Olivier Gaillard, coach running",
    "",
    "> Olivier Gaillard est entraîneur d'athlétisme diplômé de la Fédération Française d'Athlétisme, basé à Lyon. Il propose un coaching running à distance partout en France : plan d'entraînement personnalisé sur Nolio, séances analysées et ajustements chaque semaine, du premier 10 km au marathon.",
    "",
    `Fondateur du groupe de demi-fond Athlete Project à l'Athletic Club du Lyonnais. Premier échange gratuit, contact : ${CONTACT_EMAIL}.`,
    "",
    "## Pages",
    "",
    ...pages.map(lien),
    "",
    "## Préparer une course",
    "",
    ...EPREUVES.map((e) => lien({ path: `/${e.slug}`, titre: e.h1, desc: e.description })),
    "",
    "## Informations légales",
    "",
    lien({ path: "/cgv", titre: "Conditions générales de vente", desc: "Formules, prix, résiliation, rétractation de 14 jours." }),
    lien({ path: "/mentions-legales", titre: "Mentions légales", desc: "Éditeur, hébergeur, données personnelles, mesure d'audience." }),
    "",
  ].join("\n");

  return new Response(texte, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
