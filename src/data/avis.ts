// Avis affichés sur la landing (section #avis), textes validés par le client.
// Pas de Review/AggregateRating en JSON-LD : avis auto-publiés, non éligibles.

export interface Avis {
  /** Nom public de l'auteur, ex. "Camille R." */
  nom: string;
  /** Contexte affiché sous le nom */
  meta: string;
  /** Paragraphes séparés par une ligne vide */
  texte: string;
  /** Note entière de 1 à 5, absente si l'auteur n'en a pas donné */
  note?: 1 | 2 | 3 | 4 | 5;
}

export const AVIS_PUBLIES: Avis[] = [
  {
    nom: "Clémence D.",
    meta: "Nice, coaching à distance",
    texte:
      "Je m’entraine avec Olivier depuis 2019. Il a su me faire progresser sur toutes les distances du 5km au marathon grâce à ses compétences, son expérience et surtout sa bienveillance. Il a toujours su adapter mes reprises progressives post-partum pour me permettre de retrouver l’envie sans jamais brûler les étapes. Aujourd’hui encore je continue de progresser et repousser mes limites à ses côtés, je ne peux que recommander ce coach en OR",
  },
  {
    nom: "Mathieu G.",
    meta: "Le Mans, coaching à distance",
    texte:
      "Un coach à l’écoute qui s’adapte en toutes circonstance, et m’a fait énormément progresser (de 2h41 à 2h27 au marathon)",
  },
  {
    nom: "Charlotte L.",
    meta: "Lyon, groupe AP",
    texte:
      "Olivier est un coach particulièrement investi dans ma progression et très à l’écoute de mon ressenti et mes sensations. Il sait adapter les entraînements au contexte. Etant lui-même coureur d’expérience, il comprend parfaitement les enjeux et les ressentis d’un athlète. Pratiquant la course à pied depuis 16 années, il m’a amené au niveau national, et c’est de loin le meilleur coach que j’ai pu avoir.",
  },
  {
    nom: "Matis B",
    meta: "Lyon, groupe AP",
    texte:
      "Je suis entraîné par Olivier depuis 2024. Entraîneur passionné, à l’écoute et surtout acteur dans la progression et le suivi de ses athlètes. Mes records 1500m, 5000m, 10km, semi-marathon ont été battus pendant cette période. Une personnalisation et une gestion des entraînements de ses athlètes, à la perfection. Olivier s’adapte au profil de chacun, en tenant compte de nombreux paramètres souvent négligés.",
  },
  {
    nom: "Aurélie T.",
    meta: "Bordeaux, coaching à distance",
    texte:
      "Olivier ne regarde pas uniquement les résultats des séances, il prend en compte tous les à-côtés : travail, contraintes persos, imprévus... Et sait adapter sans perdre le fil de l’objectif. Il a aussi un regard très juste sur la gestion du mental, sait quand calmer le jeu, quand rassurer, ou simplement écouter.\n\nToujours disponible, réactif et présent, son accompagnement est global, cette capacité d’adaptation et de compréhension de l’athlète font toute la différence",
  },
  {
    nom: "Pierre L.",
    meta: "Mâcon, coaching à distance",
    texte:
      "Coach réactif et à l’écoute, qui en 3 mois, m’a amené à battre mon record sur 10km (39min à 54 ans) sans blessure (ce qui était mon problème ces dernières années). Le tout en m’entrainant moins que ce que je pouvais faire seul, donc avec un entraînement mieux calibré !",
  },
  {
    nom: "Audrey G.",
    meta: "Paris, coaching à distance",
    texte:
      "Même à distance, Olivier est hyper à l’écoute, attentif au moindre détail, et on se sent vraiment soutenu. J’ai couru mon 1er marathon en 3h24 avec son coaching. Il est toujours très encourageant et plein d’humour. Je lui fais entièrement confiance.",
  },
  {
    nom: "Jorge G.",
    meta: "Paris, coaching à distance",
    texte:
      "Un coaching personnalisé s’adaptant à la forme du moment et aux objectifs. Des plans toujours différents, mais qui suivent un vrai fil conducteur. On ne s’ennuie jamais ! J’ai battu tous mes records personnels du 5km au marathon, mais Olivier m’a surtout appris à me faire confiance, alors que je sortais d’un cycle de blessures.",
  },
];
