// Pages « préparer une course » : une entrée = une page /<slug>.
// Les paragraphes de `sections` acceptent des liens HTML (contenu maîtrisé).

export interface Bloc {
  titre: string;
  texte: string;
}

export interface Epreuve {
  slug: string;
  /** Libellé court (footer, lien « page suivante ») */
  court: string;
  title: string;
  description: string;
  /** H1 visuel : lignes, la dernière se termine par `accent` */
  lignes: string[];
  accent: string;
  /** H1 lisible par Google et les lecteurs d'écran */
  h1: string;
  lead: string;
  /** Paragraphe « Ce que change un suivi », propre à l'épreuve (HTML) */
  suivi: string;
  photo: string;
  og: string;
  ogAlt: string;
  sections: { titre: string; paragraphes: string[] }[];
  seances: { titre: string; intro?: string; items: Bloc[]; note: Bloc };
  erreurs: Bloc[];
  faq: { q: string; r: string }[];
  suivante: string;
}

/** Date de mise en ligne des pages (JSON-LD Article), à mettre à jour au merge */
export const PUBLIE = "2026-11-02";

export const EPREUVES: Epreuve[] = [
  {
    slug: "preparer-10-km",
    court: "10 km",
    title: "Préparer un 10 km : plan d'entraînement et coaching running",
    description:
      "Comment préparer un 10 km, du premier dossard au record : durée de préparation, semaine type, erreurs à éviter. Plan sur mesure avec un entraîneur FFA.",
    lignes: ["Préparer", "un "],
    accent: "10 km.",
    h1: "Préparer un 10 km",
    lead:
      "Un premier dossard ou un chrono à battre : le 10 km se prépare en 8 à 10 semaines, avec 3 ou 4 séances bien choisies. Voici comment je m'y prends avec les coureurs que j'accompagne.",
    suivi:
      "Sur 10 km, tout se joue sur le dosage entre vitesse et récupération. Un plan trouvé en ligne ne sait pas que votre semaine a sauté ou que vos mollets tirent après le fractionné. Avec mon suivi en ligne, vos séances sont analysées et le plan est ajusté chaque semaine sur Nolio, où que vous viviez.",
    photo: "season-ete",
    og: "/assets/og-preparer-10-km.jpg",
    ogAlt: "Préparer un 10 km avec Olivier Gaillard, coach running",
    sections: [
      {
        titre: "Combien de temps pour préparer un 10 km",
        paragraphes: [
          "Si vous courez déjà 30 à 40 minutes sans vous arrêter, comptez 8 à 10 semaines de préparation. C'est le temps qu'il faut pour installer une vraie progression, sans brûler les étapes.",
          "Si vous partez de zéro, on commence par une phase de mise en route : alterner marche et course, puis courir en continu. Le plan 10 km démarre ensuite, quand le corps est prêt à encaisser un travail plus rapide.",
          "Trois séances par semaine suffisent pour finir un premier 10 km dans de bonnes conditions. Pour viser un chrono, je passe souvent à quatre, en gardant toujours au moins un jour de repos complet.",
        ],
      },
    ],
    seances: {
      titre: "Une semaine type",
      items: [
        { titre: "Footing facile", texte: "40 à 50 minutes à allure de conversation. C'est la base de tout : on développe l'endurance sans s'épuiser, et on récupère des séances plus dures." },
        { titre: "Fractionné", texte: "Des répétitions courtes et rapides, par exemple 8 à 10 fois 400 m avec une récupération en trottinant. C'est la séance qui fait gagner de la vitesse." },
        { titre: "Allure 10 km", texte: "Des blocs de 1 à 2 km à l'allure visée le jour de la course. Le corps apprend ce rythme, et vous apprenez à le tenir sans regarder la montre toutes les 30 secondes." },
        { titre: "Sortie plus longue", texte: "Une heure en endurance, le week-end. Rien d'une épreuve : elle construit le fond qui vous fera tenir les derniers kilomètres." },
      ],
      note: { titre: "Exemple", texte: "les séances, les allures et les volumes sont ensuite adaptés à votre niveau, à vos chronos et à votre semaine." },
    },
    erreurs: [
      { titre: "Courir tous les footings trop vite.", texte: "Beaucoup de coureurs font toutes leurs sorties au même rythme, un peu trop rapide. Résultat : trop fatigués pour le fractionné, pas assez reposés pour progresser. Un footing facile doit vraiment être facile." },
      { titre: "Partir trop vite le jour J.", texte: "Porté par le départ, on passe le premier kilomètre 15 secondes trop vite, et on le paie à partir du sixième. Un 10 km réussi se court de façon régulière, voire un peu plus vite sur la fin." },
      { titre: "Ajouter des séances au lieu de récupérer.", texte: "La forme vient pendant la récupération, pas pendant la séance. Ajouter un fractionné parce qu'on se sent bien est le plus court chemin vers la blessure." },
      { titre: "Oublier le renforcement.", texte: "Dix minutes de gainage et de renforcement deux fois par semaine protègent les tendons et les mollets, très sollicités par les séances rapides." },
    ],
    faq: [
      { q: "Combien de séances par semaine pour préparer un 10 km ?", r: "Trois séances suffisent pour finir un premier 10 km. Pour viser un chrono, quatre séances permettent d'ajouter du travail de vitesse sans sacrifier l'endurance. Au-delà, le gain dépend surtout de votre récupération." },
      { q: "Peut-on préparer un 10 km en 4 semaines ?", r: "Pour finir la course si vous courez déjà régulièrement, oui. Pour progresser vraiment sur le chrono, c'est court : il faut plutôt 6 à 8 semaines pour assimiler le travail de vitesse." },
      { q: "Comment connaître mon allure 10 km ?", r: "Un test de VMA ou un chrono récent sur 5 km donne une bonne estimation. Je l'affine ensuite au fil des séances, à partir de vos sensations et des données de votre montre." },
      { q: "Que faire la dernière semaine avant la course ?", r: "On réduit le volume d'environ un tiers, on garde une courte séance à allure course pour rester vif, on dort bien et on ne teste rien de nouveau : ni chaussures, ni petit-déjeuner." },
      { q: "Le suivi à distance convient-il pour un premier 10 km ?", r: "Oui. Le plan démarre là où vous en êtes, et l'ajustement chaque semaine évite de vous en demander trop au début, là où les débutants se blessent ou se découragent le plus souvent." },
    ],
    suivante: "preparer-semi-marathon",
  },
  {
    slug: "preparer-semi-marathon",
    court: "Semi-marathon",
    title: "Préparer un semi-marathon : plan d'entraînement sur mesure",
    description:
      "Préparer un semi-marathon : combien de semaines, quelles séances, quelle sortie longue, quelles erreurs éviter. Plan personnalisé avec un entraîneur FFA.",
    lignes: ["Préparer un", ""],
    accent: "semi-marathon.",
    h1: "Préparer un semi-marathon",
    lead:
      "Sur 21,1 km, l'endurance devient la clé. Je prépare un semi en 10 à 12 semaines, autour de trois séances qui comptent : la sortie longue, le seuil et l'allure spécifique.",
    suivi:
      "Sur semi, le piège est d'allonger trop vite. Je regarde chaque sortie longue et chaque séance au seuil, et je règle la suivante en fonction de votre forme réelle, pas d'un tableau écrit à l'avance. Tout se passe en ligne sur Nolio : vous pouvez préparer votre semi depuis n'importe quelle ville.",
    photo: "season-printemps",
    og: "/assets/og-preparer-semi-marathon.jpg",
    ogAlt: "Préparer un semi-marathon avec Olivier Gaillard, coach running",
    sections: [
      {
        titre: "Combien de temps pour préparer un semi-marathon",
        paragraphes: [
          "Avec une base régulière (courir trois fois par semaine depuis quelques mois, ou avoir déjà couru un <a href=\"/preparer-10-km\">10 km</a>), comptez 10 à 12 semaines. Si le semi est votre première course, on prévoit d'abord une phase de mise en route.",
          "Trois séances par semaine permettent de le terminer sereinement. Pour un objectif chrono, quatre séances donnent la place de travailler le seuil et l'allure semi sans rogner sur la récupération.",
          "Les deux dernières semaines servent à l'affûtage : on garde l'intensité, on réduit le volume, et vous arrivez frais sur la ligne de départ.",
        ],
      },
    ],
    seances: {
      titre: "Une semaine type",
      items: [
        { titre: "Footing facile", texte: "45 minutes à allure de conversation, pour récupérer et accumuler de l'endurance sans fatigue." },
        { titre: "Seuil", texte: "Des blocs de 8 à 10 minutes à une allure soutenue mais contrôlée. C'est la séance qui repousse le moment où les jambes se durcissent." },
        { titre: "Allure semi", texte: "Des portions à l'allure visée le jour J, de plus en plus longues au fil de la préparation, jusqu'à 8 ou 10 km en continu." },
        { titre: "Sortie longue", texte: "De 1 h à 1 h 30 en endurance, parfois avec un final à allure semi. Elle habitue le corps à durer et sert de répétition pour la boisson et les gels." },
      ],
      note: { titre: "Exemple", texte: "les séances, les allures et les volumes sont ensuite adaptés à votre niveau, à vos chronos et à votre semaine." },
    },
    erreurs: [
      { titre: "Courir la sortie longue trop vite.", texte: "Elle doit rester confortable. Une sortie longue trop rapide coûte deux ou trois jours de fatigue, et c'est toute la semaine suivante qui en pâtit." },
      { titre: "Ne rien tester avant la course.", texte: "Gel, boisson, chaussures, petit-déjeuner : tout se teste à l'entraînement, surtout lors des sorties longues. Le jour J, on ne change rien." },
      { titre: "Partir à son allure 10 km.", texte: "L'allure semi est plus lente que l'allure 10 km. La deviner au feeling mène souvent à exploser après le 15e kilomètre : elle se construit à partir des séances au seuil et des sorties longues." },
      { titre: "Arriver fatigué au départ.", texte: "La tentation d'une dernière grosse séance la semaine de la course est forte. C'est pourtant l'affûtage qui transforme le travail en performance." },
    ],
    faq: [
      { q: "Combien de kilomètres par semaine pour préparer un semi-marathon ?", r: "Ça dépend de votre niveau. Je raisonne d'abord en temps et en séances plutôt qu'en kilomètres : 3 à 4 séances par semaine, dont une sortie longue qui monte progressivement vers 1 h 30." },
      { q: "Quelle sortie longue avant un semi-marathon ?", r: "Je fais rarement courir la distance complète à l'entraînement. Une sortie de 1 h 15 à 1 h 30 suffit à préparer le corps sans le fatiguer inutilement." },
      { q: "Peut-on courir un semi sans avoir fait de 10 km ?", r: "Oui, si vous courez régulièrement. Un 10 km en cours de préparation reste un bon test pour caler votre allure semi." },
      { q: "Faut-il prendre des gels pendant un semi-marathon ?", r: "Au-delà d'1 h 30 de course, un gel vers la mi-course aide souvent. En dessous, c'est moins utile. Dans tous les cas, il se teste à l'entraînement avant." },
      { q: "Le suivi à distance convient-il pour un premier semi ?", r: "Oui. Le plan part de votre niveau actuel et s'ajuste chaque semaine à vos retours : c'est ce qui permet d'allonger les sorties sans se blesser." },
    ],
    suivante: "preparer-marathon",
  },
  {
    slug: "preparer-marathon",
    court: "Marathon",
    title: "Préparer un marathon : plan d'entraînement avec un coach running",
    description:
      "Préparer un marathon : 12 à 16 semaines, sorties longues, allure marathon, ravitaillement, affûtage. Plan ajusté chaque semaine par un entraîneur FFA.",
    lignes: ["Préparer", "un "],
    accent: "marathon.",
    h1: "Préparer un marathon",
    lead:
      "Un marathon ne s'improvise pas. La préparation dure 12 à 16 semaines et se joue autant sur la régularité que sur la gestion de la fatigue. C'est là qu'un plan ajusté chaque semaine fait la différence.",
    suivi:
      "Douze à seize semaines, c'est long : il y aura de la fatigue, des déplacements, une petite douleur. C'est là qu'un plan figé lâche et qu'un suivi fait la différence. Chaque semaine, j'analyse vos séances sur Nolio et j'ajuste la suivante, pour arriver au départ en forme plutôt qu'usé.",
    photo: "season-hiver",
    og: "/assets/og-preparer-marathon.jpg",
    ogAlt: "Préparer un marathon avec Olivier Gaillard, coach running",
    sections: [
      {
        titre: "Combien de temps pour préparer un marathon",
        paragraphes: [
          "Je conseille d'avoir au moins un an de course régulière, et idéalement un <a href=\"/preparer-semi-marathon\">semi-marathon</a>, avant de se lancer. La préparation spécifique dure ensuite 12 à 16 semaines selon votre niveau de départ.",
          "Comptez 4 séances par semaine, 5 pour les coureurs expérimentés qui visent un chrono. Le volume monte progressivement, avec une semaine plus légère toutes les trois ou quatre semaines pour assimiler.",
          "Les trois dernières semaines sont consacrées à l'affûtage. C'est souvent la période la plus difficile à vivre : on court moins, on doute, et pourtant c'est là que la forme arrive.",
        ],
      },
    ],
    seances: {
      titre: "Une semaine type",
      items: [
        { titre: "Footings", texte: "Deux footings faciles de 45 minutes à 1 h. Ils construisent l'endurance et font récupérer des séances clés." },
        { titre: "Seuil", texte: "Des blocs au seuil ou des répétitions de 1 000 à 2 000 m. Ils améliorent l'efficacité de la foulée et rendent l'allure marathon plus facile." },
        { titre: "Allure marathon", texte: "Des blocs à l'allure visée, placés en milieu ou en fin de sortie, pour apprendre à tenir ce rythme avec de la fatigue dans les jambes." },
        { titre: "Sortie longue", texte: "Elle monte progressivement jusqu'à 2 h ou 2 h 30, pas plus. C'est aussi là qu'on teste la stratégie de ravitaillement." },
      ],
      note: { titre: "Exemple", texte: "les séances, les allures et les volumes sont ensuite adaptés à votre niveau, à vos chronos et à votre semaine." },
    },
    erreurs: [
      { titre: "Augmenter le volume trop vite.", texte: "Les tendons et les os s'adaptent plus lentement que le souffle. Monter le kilométrage trop vite est l'une des causes de blessure que je vois le plus en préparation marathon." },
      { titre: "Courir des sorties longues de 35 km.", texte: "Plus long n'est pas mieux. Au-delà de 2 h 30, chaque minute supplémentaire coûte des jours de récupération. Le jour J, l'affûtage et l'ambiance font le reste." },
      { titre: "Négliger le ravitaillement.", texte: "Le fameux mur du 30e kilomètre est souvent un problème d'énergie autant que d'entraînement. Une stratégie de gels et de boisson se construit et se teste pendant les sorties longues." },
      { titre: "Fixer un objectif sur un coup de tête.", texte: "Un chrono trop ambitieux se paie dans la deuxième moitié. L'objectif se valide au fil de la préparation, avec les séances à allure marathon et un semi de préparation." },
    ],
    faq: [
      { q: "Combien de semaines pour préparer un marathon ?", r: "12 à 16 semaines de préparation spécifique, après au moins un an de course régulière. Pour un premier marathon, je préfère la fourchette haute." },
      { q: "Quelle est la plus longue sortie avant un marathon ?", r: "Je la limite à 2 h ou 2 h 30 selon le niveau, généralement trois à quatre semaines avant la course. Courir 42 km à l'entraînement n'apporte rien de plus et coûte beaucoup de récupération." },
      { q: "Faut-il courir un semi pendant la préparation ?", r: "C'est un excellent test, placé quatre à six semaines avant le marathon. Il valide l'objectif et fait répéter le jour de course : réveil, petit-déjeuner, échauffement, ravitaillement." },
      { q: "Combien de gels pendant un marathon ?", r: "La plupart des coureurs en prennent un toutes les 30 à 45 minutes. La bonne stratégie dépend de votre allure et de votre tolérance, elle se teste à l'entraînement. Avec la formule premium, l'accompagnement nutritionnel est assuré par Deborah Maurice, diététicienne nutritionniste diplômée." },
      { q: "Peut-on préparer un marathon avec un coach à distance ?", r: "Oui. Sur 12 à 16 semaines, il y a forcément des imprévus : fatigue, déplacement, petite douleur. Le plan s'ajuste chaque semaine sur Nolio, c'est tout l'intérêt d'un suivi plutôt que d'un plan figé." },
    ],
    suivante: "marathon-de-lyon",
  },
  {
    slug: "marathon-de-lyon",
    court: "Marathon de Lyon",
    title: "Préparer le marathon de Lyon (Run in Lyon) avec un coach running",
    description:
      "Préparer le marathon de Lyon : plan d'entraînement sur l'été, séances dans Lyon, chaleur et jour J. Suivi par un entraîneur FFA lyonnais, ou à distance.",
    lignes: ["Préparer le", "marathon", "de "],
    accent: "Lyon.",
    h1: "Préparer le marathon de Lyon",
    lead:
      "Le marathon de Run in Lyon se court début octobre, ce qui veut dire une préparation en plein été. Je suis entraîneur à Lyon : voici comment je prépare les coureurs qui visent cette course.",
    suivi:
      "J'entraîne à Lyon depuis 2009, en club à l'Athletic Club du Lyonnais et avec le groupe <a href=\"/athlete-project\">Athlete Project</a> : je connais les parcours, la chaleur de l'été lyonnais et le rythme de la rentrée. Mais pas besoin d'habiter ici : votre préparation est publiée sur Nolio et ajustée chaque semaine, où que vous viviez.",
    photo: "season-automne",
    og: "/assets/og-marathon-de-lyon.jpg",
    ogAlt: "Préparer le marathon de Lyon avec Olivier Gaillard, coach running à Lyon",
    sections: [
      {
        titre: "La course",
        paragraphes: [
          "Run in Lyon réunit chaque automne un marathon, un <a href=\"/preparer-semi-marathon\">semi-marathon</a>, un <a href=\"/preparer-10-km\">10 km</a> et un 5 km solidaire non chronométré, dans les rues de Lyon. L'édition 2026 a rassemblé 36 000 coureurs, et l'épreuve est labellisée par la Fédération Française d'Athlétisme.",
          "Le parcours, la date et les conditions d'inscription changent d'une année à l'autre : vérifiez-les sur le <a href=\"https://www.runinlyon.com/fr\" rel=\"noopener\">site officiel de Run in Lyon</a>.",
        ],
      },
      {
        titre: "Une préparation en plein été",
        paragraphes: [
          "Pour un marathon début octobre, la <a href=\"/preparer-marathon\">préparation spécifique</a> commence entre mi-juin et mi-juillet, selon votre niveau. Les grosses semaines tombent donc en juillet et en août, avec la chaleur et les vacances.",
          "On s'adapte : séances tôt le matin ou en soirée, allures revues à la baisse quand il fait chaud (on court aux sensations, pas au chrono), hydratation travaillée. Les vacances se placent dans le plan au lieu de le casser : une semaine plus légère au bon moment n'est pas une semaine perdue.",
          "Septembre est le mois clé : la chaleur retombe, les séances à allure marathon retrouvent leur vrai rythme, et on peut caler un semi de préparation pour valider l'objectif.",
        ],
      },
    ],
    seances: {
      titre: "S'entraîner à Lyon",
      items: [
        { titre: "Parc de la Tête d'Or", texte: "Le tour du parc est un classique des footings lyonnais : plat, en partie ombragé, idéal pour les séances à allure régulière." },
        { titre: "Berges du Rhône et de la Saône", texte: "Des kilomètres de quais pour les sorties longues, avec de quoi varier les parcours d'une semaine à l'autre." },
        { titre: "La piste", texte: "Pour le fractionné, la piste permet de travailler à l'allure exacte, sans se soucier du terrain ni du dénivelé." },
        { titre: "Les collines", texte: "Fourvière et la Croix-Rousse offrent des côtes courtes et raides : parfaites pour renforcer les jambes en courant." },
      ],
      note: { titre: "Hors de Lyon", texte: "le suivi se fait à distance, et le plan s'adapte à vos propres parcours." },
    },
    erreurs: [
      { titre: "Arriver épuisé à la rentrée.", texte: "Enchaîner les grosses semaines en pleine chaleur fatigue bien plus que les chiffres ne le montrent. Mieux vaut un été un peu plus prudent et un mois de septembre solide." },
      { titre: "Partir trop vite dans l'ambiance.", texte: "Avec des milliers de coureurs au départ, il est facile de passer les premiers kilomètres trop vite. Le marathon se joue dans la deuxième moitié." },
      { titre: "Laisser les démarches au dernier moment.", texte: "Licence ou Parcours Prévention Santé, retrait du dossard, accès au départ : on s'en occupe avant la dernière semaine pour arriver l'esprit libre." },
      { titre: "Ne pas se projeter sur le parcours.", texte: "Courir une partie du parcours pendant la préparation, quand c'est possible, aide à se projeter et à repérer les endroits où gérer son effort." },
    ],
    faq: [
      { q: "Quand commencer la préparation du marathon de Lyon ?", r: "12 à 16 semaines avant la course, donc entre mi-juin et mi-juillet pour une course début octobre. Si vous partez de plus loin, on prévoit une phase de reprise au printemps." },
      { q: "Comment s'entraîner pendant les fortes chaleurs à Lyon ?", r: "Tôt le matin, à l'ombre des parcs et des berges, en ralentissant l'allure et en courant aux sensations. Les séances clés se décalent si une canicule est annoncée : c'est l'intérêt d'un plan ajusté chaque semaine." },
      { q: "Faut-il une licence pour courir Run in Lyon ?", r: "Une licence FFA ou le Parcours Prévention Santé (PPS) est demandée à l'inscription. Les conditions exactes sont précisées chaque année par l'organisation." },
      { q: "Préparez-vous aussi au semi et au 10 km de Run in Lyon ?", r: "Oui, la préparation suit la même logique avec des volumes adaptés à la distance." },
      { q: "Peut-on être suivi si l'on n'habite pas à Lyon ?", r: "Oui. Le plan est publié sur Nolio et ajusté chaque semaine, où que vous viviez. Vous pouvez préparer Run in Lyon depuis n'importe quelle ville." },
    ],
    suivante: "preparer-10-km",
  },
];

export const epreuve = (slug: string) => EPREUVES.find((e) => e.slug === slug)!;
