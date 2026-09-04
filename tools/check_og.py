from PIL import ImageFont
FD = "/System/Library/Fonts/Supplemental/"
t46 = ImageFont.truetype(FD + "Arial Bold.ttf", 46)
s27 = ImageFont.truetype(FD + "Arial.ttf", 27)
for txt, f in [
    ("La faille de votre entreprise n'est pas votre firewall.", t46),
    ("VerrouIA : auto-diagnostic cyber des TPE/PME en 18 questions", s27),
    ("Note rouge, orange ou verte + plan d'action 30 jours", s27),
    ("Offre : 29 euros au lieu de 49. Paiement securise Stripe.", s27),
]:
    w = f.getlength(txt)
    print(round(w), "fin_x=", round(92 + w), "|", txt[:40])
