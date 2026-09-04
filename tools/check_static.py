import re, glob, os, sys

pages = glob.glob("*.html") + glob.glob("blog/*.html") + glob.glob("legal/*.html")
print("Pages:", len(pages))
errs = []
for p in pages:
    html = open(p, encoding="utf-8").read()
    ids_def = set(re.findall(r'id="([^"]+)"', html))
    refs = set(re.findall(r'getElementById\("([^"]+)"\)', html))
    missing = refs - ids_def
    if missing:
        errs.append(f"{p}: getElementById manquants -> {missing}")
    for m in re.findall(r'(?:href|src)="([^"]+)"', html):
        path = m.split("#")[0].split("?")[0]
        if path.startswith(("http", "data:", "mailto:", "tel:")):
            continue
        if not path.endswith((".html", ".css", ".js", ".png", ".pdf", ".svg")):
            continue
        base = os.path.dirname(p)
        candidate = os.path.normpath(os.path.join(base, path)) if base else path
        if not os.path.exists(candidate):
            errs.append(f"{p}: lien interne casse -> {path}")
print("\n".join(errs) if errs else "AUCUNE erreur statique")
