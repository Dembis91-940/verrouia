/* ============================================================================
   VERROUIA — Questions du diagnostic (18 questions, 4 piliers)
   100 % statique. Pondérations : A 30 %, B 25 %, C 25 %, D 20 %.
   Chaque option porte un score 0-100 (100 = bonne pratique).
   ========================================================================== */

window.VERROUIA_QUESTIONS = [
  {
    id: "acc",
    name: "Identifiants & accès",
    tag: "Pilier 1",
    weight: 0.30,
    blurb: "Ce que vos mots de passe et vos comptes laissent passer.",
    questions: [
      {
        id: "a1",
        text: "Comment gérez-vous vos mots de passe professionnels (email, banque, logiciels, comptes fournisseurs) ?",
        options: [
          { score: 0, label: "J'utilise le même mot de passe pour presque tout", hint: "Un seul vol donne accès à tous vos comptes." },
          { score: 33, label: "Des mots de passe différents, mais simples et notés sur un document", hint: "Mieux, mais fragile si le document circule." },
          { score: 66, label: "Des mots de passe longs et différents pour les comptes sensibles uniquement", hint: "Bien. L'objectif est de couvrir tous les comptes." },
          { score: 100, label: "Des mots de passe longs et uniques partout, rangés dans un gestionnaire de mots de passe", hint: "La bonne pratique de référence en 2026." }
        ]
      },
      {
        id: "a2",
        text: "La double authentification (MFA) est-elle activée sur vos comptes ?",
        options: [
          { score: 0, label: "Non, sur aucun compte", hint: "Un mot de passe volé suffit alors à entrer." },
          { score: 40, label: "Sur ma messagerie professionnelle uniquement", hint: "C'est le premier compte à protéger, mais pas le seul." },
          { score: 70, label: "Sur la messagerie et la banque", hint: "Très bien. Étendez aux outils de gestion et aux comptes administrateurs." },
          { score: 100, label: "Sur la messagerie, la banque, les comptes administrateurs et les outils sensibles", hint: "C'est le niveau attendu d'une PME protégée." }
        ]
      },
      {
        id: "a3",
        text: "Comment sont gérés les comptes administrateurs de vos outils (Windows, logiciels de gestion, hébergement) ?",
        options: [
          { score: 0, label: "Tout le monde utilise le même compte, avec les droits administrateur", hint: "Un seul mot de passe partagé protège tout. Et il ne protège rien." },
          { score: 50, label: "Un compte administrateur séparé, mais partagé entre plusieurs personnes", hint: "Impossible de savoir qui a fait quoi en cas d'incident." },
          { score: 100, label: "Chaque personne a son compte, et les droits administrateur sont réservés et individuels", hint: "Vous pouvez tracer chaque action et couper un accès proprement." }
        ]
      },
      {
        id: "a4",
        text: "Que se passe-t-il quand un salarié quitte l'entreprise ou qu'un prestataire termine sa mission ?",
        options: [
          { score: 0, label: "Ses accès restent souvent actifs, on n'y pense pas", hint: "Un ancien accès est une porte ouverte que vous ne voyez plus." },
          { score: 50, label: "On coupe ses accès quand on y pense, sans procédure fixe", hint: "Une case à cocher systématique évite l'oubli." },
          { score: 100, label: "La coupure des accès fait partie du départ, le jour même", hint: "C'est la règle qui évite 90 % des incidents liés aux départs." }
        ]
      },
      {
        id: "a5",
        text: "Savez-vous précisément qui peut accéder à quoi dans votre entreprise ?",
        options: [
          { score: 0, label: "Non, tout le monde a accès à presque tout", hint: "Plus les accès sont larges, plus une erreur coûte cher." },
          { score: 50, label: "À peu près, mais les droits n'ont jamais été revus", hint: "Les besoins changent, les droits, eux, restent." },
          { score: 100, label: "Oui, chaque personne n'a accès qu'à ce dont elle a besoin, et c'est revu au moins une fois par an", hint: "Le principe du moindre privilège : la base de la sécurité." }
        ]
      }
    ]
  },
  {
    id: "backup",
    name: "Sauvegardes",
    tag: "Pilier 2",
    weight: 0.25,
    blurb: "Ce qui vous reste quand le pire arrive : vos données.",
    questions: [
      {
        id: "b1",
        text: "Vos données importantes (devis, factures, fichiers clients, tableurs) sont-elles sauvegardées ?",
        options: [
          { score: 0, label: "Non, tout est sur les postes de travail", hint: "Un vol, un incendie ou un rançongiciel et tout disparaît." },
          { score: 33, label: "Oui, mais de façon irrégulière, quand on y pense", hint: "Une sauvegarde de la semaine dernière vaut mieux que rien, mais pas beaucoup plus." },
          { score: 66, label: "Oui, automatiquement chaque semaine", hint: "C'est bien. Passez au quotidien pour les données qui bougent." },
          { score: 100, label: "Oui, automatiquement chaque jour (ou en continu)", hint: "En cas de sinistre, vous perdez au plus une journée de travail." }
        ]
      },
      {
        id: "b2",
        text: "Connaissez-vous et appliquez-vous la règle de sauvegarde 3-2-1 ?",
        options: [
          { score: 0, label: "Je ne connais pas cette règle", hint: "3 copies, 2 supports différents, 1 copie hors de l'entreprise." },
          { score: 33, label: "J'ai une copie sur un disque externe, dans les locaux", hint: "Un incendie ou un vol emporte la copie en même temps que l'original." },
          { score: 66, label: "J'ai plusieurs copies, dont une hors de l'entreprise", hint: "Il manque souvent la troisième copie ou le support distinct." },
          { score: 100, label: "J'applique la règle 3-2-1 : 3 copies, 2 supports, 1 copie hors site", hint: "La référence des assureurs et des experts cyber." }
        ]
      },
      {
        id: "b3",
        text: "Avez-vous déjà testé la restauration de vos sauvegardes ?",
        options: [
          { score: 0, label: "Jamais. Je ne saurais pas par où commencer", hint: "Une sauvegarde jamais testée est une sauvegarde hypothétique." },
          { score: 50, label: "Une fois, il y a longtemps", hint: "Les fichiers ont changé depuis. Re-testez régulièrement." },
          { score: 100, label: "Oui, au moins une fois par an, et ça fonctionne", hint: "C'est le test qui transforme une sauvegarde en assurance." }
        ]
      },
      {
        id: "b4",
        text: "Savez-vous exactement ce que couvre votre sauvegarde ?",
        options: [
          { score: 0, label: "Non, je n'ai jamais vérifié ce qui était inclus", hint: "Certains dossiers vitaux sont peut-être hors périmètre sans que vous le sachiez." },
          { score: 50, label: "À peu près, mais rien n'est écrit ni documenté", hint: "Le jour du sinistre, c'est trop tard pour découvrir l'oubli." },
          { score: 100, label: "Oui, tout ce qui est vital est couvert, et la liste est documentée", hint: "Vous savez ce que vous pouvez perdre : et ce que vous ne perdrez pas." }
        ]
      }
    ]
  },
  {
    id: "humain",
    name: "Phishing & facteur humain",
    tag: "Pilier 3",
    weight: 0.25,
    blurb: "La faille préférée des attaquants, c'est l'humain, pas le firewall.",
    questions: [
      {
        id: "c1",
        text: "Vos salariés savent-ils reconnaître un email piégé ?",
        options: [
          { score: 0, label: "Non, ils n'ont jamais eu de sensibilisation", hint: "Un clic malheureux suffit pour ouvrir la porte." },
          { score: 40, label: "On en parle de façon informelle, à l'embauche", hint: "Bien, mais les techniques évoluent vite : il faut rafraîchir." },
          { score: 80, label: "Ils ont suivi une sensibilisation il y a moins d'un an", hint: "C'est la bonne cadence : les menaces changent chaque année." },
          { score: 100, label: "Sensibilisation récente + procédure écrite si un doute apparaît", hint: "La sensibilisation sans procédure de signalement perd la moitié de son efficacité." }
        ]
      },
      {
        id: "c2",
        text: "Que fait un salarié qui reçoit un message suspect (urgence, lien inattendu, pièce jointe) ?",
        options: [
          { score: 0, label: "Il répond ou clique, surtout si le message semble venir du dirigeant", hint: "C'est exactement le scénario que les attaquants exploitent." },
          { score: 50, label: "Il demande à un collègue ou à son responsable", hint: "Mieux. Encadrez-le avec une procédure connue de tous." },
          { score: 100, label: "Il ne clique pas et suit une procédure : prévenir immédiatement la personne référente", hint: "Chaque signalement devient une alerte qui protège toute l'entreprise." }
        ]
      },
      {
        id: "c3",
        text: "Comment vos virements et changements d'IBAN sont-ils confirmés ?",
        options: [
          { score: 0, label: "Un email du dirigeant ou du fournisseur suffit pour changer un IBAN", hint: "L'arnaque au faux fournisseur et au faux dirigeant commence toujours par un email." },
          { score: 50, label: "On vérifie parfois, quand le montant paraît inhabituel", hint: "Les attaquants choisissent des montants qui ne paraissent pas inhabituels." },
          { score: 100, label: "Tout changement d'IBAN est confirmé par un second canal (appel sur un numéro connu, visio)", hint: "La règle qui a évité des centaines de milliers d'euros de fraude aux PME." }
        ]
      },
      {
        id: "c4",
        text: "Comment sont utilisés les postes de travail partagés (accueil, atelier, salle commune) ?",
        options: [
          { score: 0, label: "Session commune, sans mot de passe individuel", hint: "Chaque passage laisse une trace que n'importe qui peut utiliser." },
          { score: 50, label: "Une session par personne, mais l'écran reste ouvert en cas d'absence", hint: "Une session ouverte, c'est un compte ouvert." },
          { score: 100, label: "Session par personne, écran verrouillé dès qu'on quitte le poste", hint: "Une habitude simple qui ferme des dizaines de portes." }
        ]
      },
      {
        id: "c5",
        text: "Si un salarié tombait sur une tentative de phishing, le sauriez-vous ?",
        options: [
          { score: 0, label: "Non, et il n'y aurait probablement aucune suite", hint: "Les tentatives passent inaperçues jusqu'au jour où l'une d'elles réussit." },
          { score: 50, label: "Peut-être, si le salarié pense à en parler", hint: "Il faut un réflexe, pas une bonne volonté." },
          { score: 100, label: "Oui : chaque tentative est signalée, notée et analysée", hint: "Une entreprise qui voit ses tentatives sait où elle est vulnérable." }
        ]
      }
    ]
  },
  {
    id: "ia",
    name: "Usages IA des salariés",
    tag: "Pilier 4",
    weight: 0.20,
    blurb: "Le nouveau vecteur de risque, entré dans l'entreprise sans prévenir.",
    questions: [
      {
        id: "d1",
        text: "Vos salariés utilisent-ils ChatGPT ou d'autres IA génératives dans le cadre du travail ?",
        options: [
          { score: 0, label: "Je ne sais pas. Personne ne me l'a dit", hint: "Si vous ne le savez pas, c'est que rien n'est cadré." },
          { score: 33, label: "Oui, probablement, mais sans cadre ni règles", hint: "L'usage existe déjà. Il ne reste plus qu'à l'encadrer." },
          { score: 66, label: "Oui, certains outils sont utilisés et je le sais", hint: "Bien. Il manque les règles d'usage écrites." },
          { score: 100, label: "Oui, et l'usage est encadré par une charte claire", hint: "Vous êtes en avance sur la majorité des PME françaises." }
        ]
      },
      {
        id: "d2",
        text: "Des données sensibles (fichiers clients, contrats, salaires, données de santé) pourraient-elles être collées dans une IA publique ?",
        options: [
          { score: 0, label: "Oui, probablement, et rien ne l'interdit aujourd'hui", hint: "Chaque donnée collée dans une IA publique sort de votre contrôle." },
          { score: 40, label: "Je ne sais pas ce que les salariés y mettent", hint: "Sans règle, les bonnes intentions ne suffisent pas." },
          { score: 100, label: "Non : c'est interdit par écrit, expliqué et rappelé", hint: "Une interdiction écrite protège l'entreprise et le salarié." }
        ]
      },
      {
        id: "d3",
        text: "Vos clients ou visiteurs sont-ils informés quand ils interagissent avec une IA ?",
        options: [
          { score: 0, label: "Nous avons un chatbot ou une IA en contact client, sans mention de transparence", hint: "L'AI Act (article 50) impose d'informer les personnes de leur interaction avec une IA." },
          { score: 70, label: "Nous n'utilisons pas d'IA en contact direct avec les clients", hint: "Si un jour vous en mettez une, la mention de transparence sera obligatoire." },
          { score: 100, label: "Oui, nous informons systématiquement (mention claire, conforme à l'AI Act)", hint: "Conforme à l'article 50 du règlement européen sur l'IA." }
        ]
      },
      {
        id: "d4",
        text: "Qui décide des outils et services IA utilisés dans l'entreprise ?",
        options: [
          { score: 0, label: "Chacun installe et utilise ce qu'il veut", hint: "Un outil choisi par un salarié peut envoyer vos données à l'autre bout du monde." },
          { score: 50, label: "Quelques outils sont choisis, mais sans règles d'usage écrites", hint: "Le choix est là. Il manque la charte et la liste officielle." },
          { score: 100, label: "Une liste d'outils autorisés existe, avec des règles écrites (confidentialité, AI Act)", hint: "Le cadre idéal : liberté encadrée, risque maîtrisé." }
        ]
      }
    ]
  }
];
