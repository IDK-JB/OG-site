// Interrupteur d'indexation du site.
// true : le domaine de production (olivier-gaillard.fr) est indexable.
// Les URL Vercel (*.vercel.app) restent hors index grâce à l'en-tête X-Robots-Tag
// de vercel.json, envoyé sur tout hôte autre que olivier-gaillard.fr.
export const INDEXABLE = true;

// Adresse de contact unique du site (pages, formulaire, données structurées).
export const CONTACT_EMAIL = "olivier.gaillard27@gmail.com";

// Médiateur de la consommation : obligatoire en B2C dès que le client est
// un particulier. Renseigner nom et site dès l'adhésion, le bloc des CGV
// n'apparaît que si les deux champs sont remplis.
export const MEDIATEUR: { nom: string; site: string } | null = null;

// Formules de coaching (prix mensuels), partagées par les données structurées des pages.
const offre = (name: string, price: string, description: string) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "EUR",
  description,
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "EUR",
    unitCode: "MON",
    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
  },
});

export const OFFRES = [
  offre("Suivi performance", "80", "Plan d'entraînement running personnalisé sur Nolio, ajusté chaque semaine."),
  offre("Suivi premium", "130", "Suivi running personnalisé avec accompagnement nutritionnel et disponibilité prioritaire."),
];
