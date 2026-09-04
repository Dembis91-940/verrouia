# VerrouIA

**L'auto-diagnostic cyber des TPE/PME françaises.**

La faille de votre entreprise n'est pas votre firewall : c'est un clic. VerrouIA révèle en 18 questions les portes que vos mots de passe, vos sauvegardes et vos usages IA laissent ouvertes. Note 🔴🟠🟢 + plan d'action 30 jours, en 5 minutes.

- **Prix** : 29 € (prix de lancement, barré 49 €) pour le rapport PDF personnalisé + le kit de 5 documents.
- **Hébergement** : 100 % statique (GitHub Pages). Zéro backend, zéro serveur, zéro base de données.
- **Confidentialité** : tout le calcul du diagnostic se fait dans le navigateur. Aucune réponse n'est envoyée ni stockée.

## Pages

| Fichier | Rôle |
|---|---|
| `index.html` | Landing de vente (ScrollCraft : storytelling au scroll, actes pin/pan, signature du cadenas). SEO, schema.org Product + FAQ. |
| `diagnostic.html` | 18 questions en 4 piliers, moteur de scoring pondéré côté client. |
| `rapport.html` | Note globale + détail par pilier + plan d'action priorisé 30 jours + export PDF (fenêtre d'impression locale). |
| `kit.html` | Présentation des 5 documents du kit + CTA d'achat. |
| `merci.html` | Page de succès après paiement Stripe : téléchargement du kit (noindex). |
| `blog/` | 2 articles SEO sourcés (faits datés, sources officielles). |
| `legal/mentions-legales.html` | Mentions légales + CGV (éditeur : Demba KOITA LAHA, SIRET en cours). |
| `kit/*.pdf` | Les 5 livrables (générés depuis `kit-src/*.md` via `tools/md2pdf.py`). |
| `css/`, `js/` | Design system VerrouIA + engine ScrollCraft officiel (copie non modifiée). |

## Les 4 piliers du diagnostic

1. **Identifiants & accès** (30 % de la note) — 5 questions
2. **Sauvegardes** (25 %) — 4 questions
3. **Phishing & facteur humain** (25 %) — 5 questions
4. **Usages IA des salariés** (20 %) — 4 questions

Seuils : 🔴 0-49 · 🟠 50-74 · 🟢 75-100.

## Paiement

Lien de paiement Stripe réel (live) : `https://buy.stripe.com/eVqeVfgDs821bHvcCofrW0j`
Produit : « VerrouIA — Rapport complet + Kit de protection » (29,00 EUR), redirection après paiement vers `merci.html`.
Livraison : les PDF sont des fichiers statiques ; la page de succès en centralise le téléchargement (modèle « honor system » des produits numériques sans backend, identique aux autres business de l'écosystème).

## Générer les PDF du kit

```bash
~/.hermes/venv-yt/bin/python tools/md2pdf.py kit-src/01-politique-mots-de-passe.md kit/01-politique-mots-de-passe.pdf
```

## Déploiement

```bash
gh repo create verrouia --public --source . --push
# GitHub Pages : branche main, dossier / (root), puis vérifier HTTP 200
curl -sI https://dembis91-940.github.io/verrouia/
```

## Suivi

- Analytics : Umami Cloud (cloud.umami.is, website-id `e5abcaa5-b313-4845-a812-2038dceffb6d`), tag présent dans toutes les pages.

## Limites (dites clairement au client)

VerrouIA est un **auto-diagnostic de bonnes pratiques**, pas un audit certifié. Il ne remplace ni un expert (ISO 27001, Cyber Essentials), ni un conseil juridique, ni une assurance. Voir les mentions légales.

---

© 2026 VerrouIA · Demba KOITA LAHA · 29 Résidences les Avelines, 91940 Les Ulis (SIRET en cours)
