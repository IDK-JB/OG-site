// Avis affichés sur la landing (section #avis) et dans le JSON-LD.
// ATTENTION : avis de démonstration, à remplacer par de vrais avis clients
// (Google Business, Nolio, etc.) avant l'indexation du site.

export interface Avis {
  /** Nom public de l'auteur, ex. "Camille R." */
  nom: string;
  /** Contexte affiché sous le nom, séparateur maison « · » */
  meta: string;
  texte: string;
  /** Note entière de 1 à 5 */
  note: 1 | 2 | 3 | 4 | 5;
}

export const AVIS: Avis[] = [
  {
    nom: "Camille R.",
    meta: "Semi-marathon de Lyon · Suivi à distance",
    texte:
      "Deux ans à courir seule sans progresser, puis trois mois avec Olivier : 8 minutes de mieux sur mon semi à Lyon. Le plan tient compte de ma vie, pas l'inverse.",
    note: 5,
  },
  {
    nom: "Julien M.",
    meta: "Marathon de Paris · Suivi premium",
    texte:
      "Le duo entraînement et nutrition a tout changé. Aucun coup de barre au 30e kilomètre et 6 minutes de record personnel au marathon de Paris.",
    note: 5,
  },
  {
    nom: "Sophie L.",
    meta: "Reprise du sport à 45 ans",
    texte:
      "Après dix ans sans sport, j'avais peur de me blesser. Chaque semaine est dosée au plus juste : dix kilomètres sans m'arrêter aujourd'hui, et zéro bobo.",
    note: 5,
  },
  {
    nom: "Karim B.",
    meta: "10 km · Suivi à distance",
    texte:
      "Plan clair sur Nolio, allures précises, réponses rapides quand j'ai une question. Je ne cours plus au feeling : moins de 50 minutes au 10 km en six mois.",
    note: 4,
  },
  {
    nom: "Élise D.",
    meta: "Groupe AP (Athlete Project) · Lyon",
    texte:
      "Les séances AP du mardi sont devenues mon rendez-vous de la semaine. On pousse fort, on rit beaucoup, et les chronos suivent. L'émulation change tout.",
    note: 5,
  },
  {
    nom: "Thomas V.",
    meta: "Marathon · Suivi à distance",
    texte:
      "À distance mais jamais seul : chaque séance est analysée, le plan bouge quand la forme bouge. 3 h 12 au marathon, 9 minutes de mieux que mon objectif.",
    note: 5,
  },
  {
    nom: "Nathalie P.",
    meta: "Semi-marathon · Suivi à distance",
    texte:
      "Depuis Annecy, le suivi est aussi précis qu'en présentiel. Olivier ajuste tout chaque semaine. Premier semi couru à fond, sans souffrir, en 1 h 58.",
    note: 5,
  },
  {
    nom: "Romain G.",
    meta: "Trail et ultra · Suivi à distance",
    texte:
      "Venu pour le plat, resté pour la rigueur du plan. Ma prépa trail a gagné en structure : séances ciblées, montées de charge propres, aucune semaine grillée.",
    note: 4,
  },
  {
    nom: "Claire B.",
    meta: "Premier 10 km",
    texte:
      "Je partais de zéro, essoufflée au bout de deux bornes. Six mois plus tard, mon premier 10 km en course officielle, et l'envie d'aller plus loin.",
    note: 5,
  },
  {
    nom: "Marc D.",
    meta: "5 km · Athlète en club",
    texte:
      "Même en club, l'œil d'Olivier fait la différence : VMA travaillée avec méthode, séances affinées. 18 secondes de mieux sur 5 km en une saison.",
    note: 5,
  },
];

/** Moyenne affichée (format français) et valeur numérique pour le JSON-LD */
export const NOTE_MOYENNE = "4,8";
export const NOTE_MOYENNE_LD = 4.8;
export const NOMBRE_AVIS = AVIS.length;
