/* ============================================================================
   VERROUIA — Moteur de scoring pondéré + plan d'action 30 jours
   100 % côté client. Zéro backend, zéro serveur.
   ========================================================================== */

window.VERROUIA = (function () {
  "use strict";

  var ACTIONS = {
    a1: { sev: 1, week: 1, time: "60 min", text: "Mettre en place un gestionnaire de mots de passe (Bitwarden, 1Password, KeePass) et générer un mot de passe long et unique pour chaque compte professionnel." },
    a2: { sev: 1, week: 1, time: "90 min", text: "Activer la double authentification sur la messagerie, le compte bancaire professionnel et les outils de gestion. Commencer par les comptes les plus sensibles." },
    a3: { sev: 1, week: 1, time: "120 min", text: "Créer un compte individuel pour chaque personne et réserver les droits administrateur. Supprimer les comptes partagés à droits élevés." },
    a4: { sev: 2, week: 4, time: "45 min", text: "Rédiger une procédure de départ : liste des accès à couper (email, logiciels, badges, comptes fournisseurs) et responsable de la coupure le jour même." },
    a5: { sev: 2, week: 4, time: "90 min", text: "Faire un état des lieux des accès : qui a accès à quoi, et retirer les droits devenus inutiles. Planifier une revue annuelle." },
    b1: { sev: 1, week: 2, time: "120 min", text: "Mettre en place une sauvegarde automatique quotidienne des données vitales (devis, factures, fichiers clients) vers un disque dédié ou un service de sauvegarde chiffré." },
    b2: { sev: 1, week: 2, time: "120 min", text: "Appliquer la règle 3-2-1 : 3 copies des données, sur 2 supports différents, dont 1 copie conservée hors de l'entreprise (disque externe à domicile ou sauvegarde cloud chiffrée)." },
    b3: { sev: 1, week: 2, time: "60 min", text: "Tester une restauration : ouvrir la sauvegarde et vérifier que les fichiers vitaux sont lisibles et complets. Planifier un test au moins une fois par an." },
    b4: { sev: 2, week: 2, time: "45 min", text: "Documenter le périmètre de sauvegarde : la liste des dossiers et outils couverts, et celle des données qui ne le sont pas encore." },
    c1: { sev: 1, week: 3, time: "60 min", text: "Organiser une sensibilisation au phishing pour tous les salariés : faux email du dirigeant, faux fournisseur, lien inattendu. À renouveler chaque année." },
    c2: { sev: 1, week: 3, time: "30 min", text: "Écrire la procédure du doute : ne pas cliquer, ne pas répondre, prévenir immédiatement le dirigeant ou la personne référente. L'afficher près des postes de travail." },
    c3: { sev: 1, week: 3, time: "30 min", text: "Instaurer la règle du second canal : tout changement d'IBAN ou virement inhabituel est confirmé par téléphone sur un numéro connu ou en visio." },
    c4: { sev: 2, week: 3, time: "30 min", text: "Imposer une session individuelle sur chaque poste et le verrouillage de l'écran (touche Windows+L ou Ctrl+Cmd+Q) dès qu'on quitte son poste." },
    c5: { sev: 3, week: 3, time: "45 min", text: "Mettre en place un registre des tentatives signalées : chaque salarié sait à qui s'adresser, et chaque signalement est noté et analysé." },
    d1: { sev: 2, week: 4, time: "30 min", text: "Faire le point sur les IA utilisées par les salariés : poser la question simplement, sans sanction, pour connaître la réalité des usages." },
    d2: { sev: 1, week: 4, time: "30 min", text: "Interdire par écrit le dépôt de données sensibles (clients, contrats, salaires, santé) dans les IA publiques, et l'expliquer aux salariés." },
    d3: { sev: 2, week: 4, time: "30 min", text: "Vérifier la transparence IA : si un chatbot ou une IA est en contact avec vos clients, ajouter la mention obligatoire prévue par l'article 50 de l'AI Act." },
    d4: { sev: 2, week: 4, time: "60 min", text: "Établir la liste des outils IA autorisés et faire signer une charte d'usage alignée sur l'AI Act et la confidentialité (modèle inclus dans le kit)." }
  };

  function scoreFor(answers, qid) {
    var a = answers[qid];
    if (a === undefined || a === null || a === "") return null;
    return a;
  }

  function compute(answers) {
    var pillars = window.VERROUIA_QUESTIONS.map(function (p) {
      var qs = p.questions;
      var totalW = 0, acc = 0, details = [];
      qs.forEach(function (q) {
        var s = scoreFor(answers, q.id);
        details.push({ id: q.id, text: q.text, score: s, max: 100 });
        if (s !== null) { acc += s; totalW += 1; }
      });
      return {
        id: p.id, name: p.name, tag: p.tag, weight: p.weight,
        blurb: p.blurb,
        score: totalW ? Math.round(acc / totalW) : 0,
        answered: totalW, total: qs.length, details: details
      };
    });

    var global = Math.round(pillars.reduce(function (acc, p) {
      return acc + p.score * p.weight;
    }, 0));

    var face, verdict, color;
    if (global >= 75) { face = "🟢"; verdict = "Posture correcte, points de vigilance à verrouiller"; color = "ok"; }
    else if (global >= 50) { face = "🟠"; verdict = "Des failles sérieuses existent : agissez dans les 30 jours"; color = "warn"; }
    else { face = "🔴"; verdict = "Votre entreprise est exposée : priorité absolue"; color = "danger"; }

    return { pillars: pillars, global: global, face: face, verdict: verdict, color: color };
  }

  function buildPlan(pillars) {
    var plan = [];
    // Règle : pour chaque pilier, chaque question dont la réponse est sous 100
    // déclenche l'action associée. Les piliers faibles (< 60) remontent toutes
    // leurs actions ; un pilier solide ne garde que les actions critiques.
    pillars.forEach(function (p) {
      var pillarWeak = p.score < 60;
      p.details.forEach(function (d) {
        var act = ACTIONS[d.id];
        if (!act) return;
        if (d.score === null) return;
        var include = false;
        if (pillarWeak && d.score < 100) include = true;
        else if (d.score < 66) include = true;
        else if (d.score < 100 && act.sev === 1) include = true;
        if (include) {
          plan.push({
            qid: d.id,
            pillar: p.name,
            pillarId: p.id,
            sev: act.sev,
            week: act.week,
            time: act.time,
            text: act.text
          });
        }
      });
    });

    // Tri : sévérité croissante, puis semaine
    plan.sort(function (a, b) { return a.sev - b.sev || a.week - b.week; });

    // Découpage en 4 semaines
    var weeks = [[], [], [], []];
    plan.forEach(function (a) { if (weeks[a.week - 1]) weeks[a.week - 1].push(a); });
    weeks = weeks.filter(function (w) { return w.length; });

    return { all: plan, weeks: weeks };
  }

  function pillColor(score) {
    return score >= 75 ? "ok" : (score >= 50 ? "warn" : "danger");
  }

  return {
    compute: compute,
    buildPlan: buildPlan,
    pillColor: pillColor,
    ACTIONS: ACTIONS
  };
})();
