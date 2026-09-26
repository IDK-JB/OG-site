// Interrupteur d'indexation du site.
// false = le site n'apparaît dans aucun moteur de recherche (préproduction).
// Mise en ligne officielle : passer à true ET retirer le bloc "headers" X-Robots-Tag de vercel.json.
export const INDEXABLE = false;
