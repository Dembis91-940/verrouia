import re, urllib.request, sys

BASE = "https://dembis91-940.github.io/verrouia/"
def get(p):
    with urllib.request.urlopen(BASE + p, timeout=30) as r:
        return r.read().decode("utf-8", "replace")

checks = []
# 1. Landing : éléments critiques de conversion
html = get("index.html")
checks.append(("landing: prix 29", "29" in html))
checks.append(("landing: prix barre 49", "49 €" in html))
checks.append(("landing: CTA Stripe", "buy.stripe.com/eVqeVfgDs821bHvcCofrW0j" in html))
checks.append(("landing: schema Product", '"@type": "Product"' in html))
checks.append(("landing: engine scrollcraft", "js/scrollcraft.js" in html))
checks.append(("landing: acts", html.count("data-sc-act=") >= 5))
checks.append(("landing: umami", "e5abcaa5-b313-4845-a812-2038dceffb6d" in html))
# coquilles : doubles espaces dans le texte visible (hors balises/indentation)
body = re.sub(r"<[^>]+>", " ", html)
body = re.sub(r"\s+", " ", body)
checks.append(("landing: pas de double espace", "  " not in body.replace("   ", "")))
# 2. Diagnostic
d = get("diagnostic.html")
checks.append(("diagnostic: 18 questions", d.count('class="q-item"') == 18))
checks.append(("diagnostic: 4 piliers", d.count('class="quiz-pillar"') == 4))
# 3. Rapport
r = get("rapport.html")
checks.append(("rapport: stripe", "buy.stripe.com/eVqeVfgDs821bHvcCofrW0j" in r))
# 4. Kit
k = get("kit.html")
checks.append(("kit: 5 docs listes", k.count("article class=\"panel\"") >= 5))
# 5. Blog 1
b1 = get("blog/failes-pme-2026.html")
checks.append(("blog1: sources", "Sources" in b1 and "ANSSI" in b1))
checks.append(("blog1: lien diag", "../diagnostic.html" in b1))
# 6. Blog 2
b2 = get("blog/salaries-chatgpt-ai-act.html")
checks.append(("blog2: AI Act 2026", "2 août 2026" in b2 or "2 ao&ucirc;t 2026" in b2))
# 7. Légales
lg = get("legal/mentions-legales.html")
checks.append(("legal: identite", "KOITA LAHA" in lg and "91940 Les Ulis" in lg))
checks.append(("legal: SIRET en cours", "en cours" in lg))
# 8. merci : liens PDF
m = get("merci.html")
checks.append(("merci: 5 liens pdf", all(("kit/0%d-" % i) in m for i in range(1, 6))))

fails = [c for c in checks if not c[1]]
for name, ok in checks:
    print(("OK  " if ok else "FAIL"), name)
print("---")
print("ECHECS:", len(fails))
sys.exit(1 if fails else 0)
