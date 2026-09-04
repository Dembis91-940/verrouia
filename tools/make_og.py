#!/usr/bin/env python3
"""Génère l'image Open Graph 1200x630 de VerrouIA (PNG) — composition mesurée."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new("RGB", (W, H), "#06090F")
d = ImageDraw.Draw(img)

# Grille technique discrète
for x in range(0, W, 60):
    d.line([(x, 0), (x, H)], fill="#0C1320", width=1)
for y in range(0, H, 60):
    d.line([(0, y), (W, y)], fill="#0C1320", width=1)

# Halo vert côté cadenas
halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
hd = ImageDraw.Draw(halo)
hd.ellipse([760, -240, 1500, 500], fill=(61, 214, 140, 30))
img = Image.alpha_composite(img.convert("RGBA"), halo).convert("RGB")
d = ImageDraw.Draw(img)

FONT_DIR = "/System/Library/Fonts/Supplemental"
def font(size, bold=True):
    return ImageFont.truetype(FONT_DIR + ("/Arial Bold.ttf" if bold else "/Arial.ttf"), size)

TEXT_X = 92
TEXT_MAX = 640   # zone texte à gauche

# Cadenas vert à droite (an­se qui plonge dans le corps : verrou fermé)
cx, cy = 975, 300
# anse : arc supérieur d'un cercle centré (cx, cy-8), rayon 84 -> extrémités sous le top du corps
d.arc([cx - 84, cy - 100, cx + 84, cy + 68], start=180, end=360, fill="#3DD68C", width=24)
# corps : rounded rect, top au-dessus des extrémités de l'anse
d.rounded_rectangle([cx - 72, cy - 14, cx + 72, cy + 182], radius=24, fill="#3DD68C")
# serrure
d.ellipse([cx - 27, cy + 50, cx + 27, cy + 104], fill="#06090F")
d.rounded_rectangle([cx - 11, cy + 96, cx + 11, cy + 154], radius=5, fill="#06090F")

# Titre : trois lignes nettes, mesurées sous la zone du cadenas
f_title = font(44)
f_clic = font(54)
d.text((TEXT_X, 286), "La faille de votre entreprise", font=f_title, fill="#E8EEF6")
d.text((TEXT_X, 348), "n'est pas votre firewall.", font=f_title, fill="#E8EEF6")
d.text((TEXT_X, 416), "C'est un clic.", font=f_clic, fill="#3DD68C")

# Textes secondaires (sous le cadenas, sans chevauchement)
f_sub = font(27, False)
d.text((TEXT_X, 506), "VerrouIA : auto-diagnostic cyber des TPE/PME en 18 questions", font=f_sub, fill="#8B99AD")
d.text((TEXT_X, 548), "Note rouge, orange ou verte + plan d'action 30 jours", font=f_sub, fill="#8B99AD")
d.text((TEXT_X, 588), "Offre : 29 euros au lieu de 49. Paiement securise Stripe.", font=f_sub, fill="#8B99AD")

img.save("/Users/demba.koita-laha/Documents/livrables/verrouia/assets/og-verrouia.png")
print("ok")
