#!/usr/bin/env python3
"""Convertit un fichier Markdown en PDF propre (fpdf2 + polices macOS, accents FR OK).
Usage: python3 md2pdf.py <entree.md> <sortie.pdf>
"""
import sys, re, os
from fpdf import FPDF
from fpdf.enums import XPos, YPos

FONT_DIR = "/System/Library/Fonts/Supplemental"
REG = os.path.join(FONT_DIR, "Arial.ttf")
BOLD = os.path.join(FONT_DIR, "Arial Bold.ttf")
ITAL = os.path.join(FONT_DIR, "Arial Italic.ttf")
BOLDITAL = os.path.join(FONT_DIR, "Arial Bold Italic.ttf")
COURIER = os.path.join(FONT_DIR, "Courier New.ttf")

class PDF(FPDF):
    def header(self):
        if self.page_no() > 1:
            self.set_font("arial", "B", 8)
            self.set_text_color(140, 150, 165)
            self.cell(0, 6, "VerrouIA — Kit de protection", align="R")
            self.ln(3)
    def footer(self):
        self.set_y(-14)
        self.set_font("arial", "", 8)
        self.set_text_color(140, 150, 165)
        self.cell(0, 8, f"Page {self.page_no()}", align="C")

EMOJI = re.compile(r"[\U0001F000-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F]")
def clean(txt):
    txt = EMOJI.sub("", txt)
    txt = re.sub(r"\*\*(.+?)\*\*", r"\1", txt)
    txt = re.sub(r"[*_`]", "", txt)
    return txt

def render(pdf, md_text):
    pdf.add_font("arial", "", REG)
    pdf.add_font("arial", "B", BOLD)
    pdf.add_font("arial", "I", ITAL)
    pdf.add_font("arial", "BI", BOLDITAL)
    pdf.add_font("mono", "", COURIER)
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_margins(18, 18, 18)

    lines = md_text.split("\n")
    i = 0
    in_code = False
    code_buf = []
    list_mode = False
    while i < len(lines):
        ln = lines[i].rstrip()
        # blocs de code
        if ln.strip().startswith("```"):
            if not in_code:
                in_code = True; code_buf = []
            else:
                in_code = False
                pdf.set_font("mono", "", 8.5)
                pdf.set_fill_color(240, 244, 250)
                for cl in code_buf:
                    pdf.cell(0, 4.4, cl[:110] if cl else " ", fill=True)
                    pdf.ln(4.4)
                pdf.ln(2)
            i += 1; continue
        if in_code:
            code_buf.append(ln); i += 1; continue
        # titres
        m = re.match(r"^(#{1,4})\s+(.*)", ln)
        if m:
            level, txt = len(m.group(1)), m.group(2).strip()
            size = {1: 20, 2: 15, 3: 12.5, 4: 11}[level]
            col = {1: (10, 30, 70), 2: (20, 60, 110), 3: (45, 75, 120)}.get(level, (60, 60, 60))
            pdf.ln(3 if level > 2 else 5)
            pdf.set_font("arial", "B", size)
            pdf.set_text_color(*col)
            txt = re.sub(r"[*_`]", "", txt)
            pdf.multi_cell(0, size * 0.55, txt, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            pdf.ln(1 if level > 2 else 3)
            if level == 1:
                pdf.set_draw_color(10, 30, 70); pdf.set_line_width(0.6)
                pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
                pdf.ln(3)
            i += 1; continue
        # séparateur
        if re.match(r"^---+\s*$", ln):
            pdf.ln(2); i += 1; continue
        # liste
        m = re.match(r"^\s*[-*]\s+(.*)", ln)
        if m:
            txt = clean(m.group(1))
            pdf.set_font("arial", "", 10.5)
            pdf.set_text_color(35, 35, 35)
            bullet = "\u2022"
            pdf.cell(8, 5.6, bullet)
            pdf.multi_cell(0, 5.6, txt, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            i += 1; continue
        # liste numérotée
        m = re.match(r"^\s*(\d+)[.)]\s+(.*)", ln)
        if m:
            txt = clean(m.group(2))
            pdf.set_font("arial", "", 10.5)
            pdf.set_text_color(35, 35, 35)
            pdf.cell(8, 5.6, m.group(1) + ".")
            pdf.multi_cell(0, 5.6, txt, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            i += 1; continue
        # tableau simple | a | b |
        if ln.strip().startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|[\s:-|]+\|?\s*$", lines[i+1]):
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not re.match(r"^[\s:|-]+$", "|".join(cells)):
                    rows.append(cells)
                i += 1
            if rows:
                ncols = max(len(r) for r in rows)
                colw = (pdf.w - pdf.l_margin - pdf.r_margin) / ncols
                for ri, row in enumerate(rows):
                    pdf.set_font("arial", "B" if ri == 0 else "", 8.5)
                    pdf.set_fill_color(235, 240, 250) if ri == 0 else pdf.set_fill_color(250, 250, 252)
                    for c in row[:ncols]:
                        cell = re.sub(r"[\U0001F000-\U0001FAFF\u2600-\u27BF]", "", c)
                        cell = re.sub(r"[*_`]", "", cell).strip()
                        maxlen = max(1, int(colw / 1.6))
                        if len(cell) > maxlen:
                            cell = cell[:maxlen-1] + "\u2026"
                        pdf.cell(colw, 6, cell, border=1, fill=True)
                    pdf.ln(6)
                pdf.ln(2)
            continue
        # paragraphe
        if ln.strip():
            txt = clean(ln)
            pdf.set_font("arial", "", 10.5)
            pdf.set_text_color(35, 35, 35)
            pdf.multi_cell(0, 5.6, txt, new_x=XPos.LMARGIN, new_y=YPos.NEXT)
            pdf.ln(1.5)
        else:
            pdf.ln(2)
        i += 1

if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    md = open(src, encoding="utf-8").read()
    pdf = PDF("P", "mm", "A4")
    render(pdf, md)
    pdf.output(dst)
    print(f"✅ {os.path.basename(dst)} ({os.path.getsize(dst)//1024} Ko)")
