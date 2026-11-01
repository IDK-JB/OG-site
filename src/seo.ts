// Interrupteur d'indexation du site.
// true : le domaine de production (olivier-gaillard.fr) est indexable.
// Les URL Vercel (*.vercel.app) restent hors index grâce à l'en-tête X-Robots-Tag
// de vercel.json, envoyé sur tout hôte autre que olivier-gaillard.fr.
export const INDEXABLE = true;
