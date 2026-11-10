"""
Lager logofilene i profil/ som rene vektorer (SVG) – teksten er konvertert til kurver,
så filene ser like ut overalt og kan sendes rett til trykkeri, skiltmaker o.l.

Krever:  pip install fonttools brotli uharfbuzz
Kjør:    python scripts/generate-logo.py
"""

import io
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "src" / "assets" / "fonts"
OUT = ROOT / "profil"
OUT.mkdir(exist_ok=True)

FJORD_800 = "#0e4a43"
FJORD_900 = "#0b3833"
FJORD_600 = "#1a7468"
FJORD_300 = "#8fd3b8"
NYPE_400 = "#ee7b5b"
KALK = "#f7f3ec"


def load_instance(woff2: Path, axes: dict) -> tuple[TTFont, bytes]:
    font = TTFont(woff2)
    font.flavor = None
    inst = instantiateVariableFont(font, axes)
    buf = io.BytesIO()
    inst.save(buf)
    data = buf.getvalue()
    return TTFont(io.BytesIO(data)), data


def text_path(font: TTFont, data: bytes, text: str, size: float, x: float, baseline: float, tracking_em: float = 0.0):
    """Returnerer (svg-path, bredde) for teksten, formet med HarfBuzz (inkl. kerning)."""
    face = hb.Face(data)
    hbfont = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf, {"kern": True, "liga": True})
    upem = font["head"].unitsPerEm
    scale = size / upem
    glyph_set = font.getGlyphSet()
    order = font.getGlyphOrder()
    pen = SVGPathPen(glyph_set, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
    cursor = 0.0
    tracking = tracking_em * upem
    infos, positions = buf.glyph_infos, buf.glyph_positions
    for i, (info, pos) in enumerate(zip(infos, positions)):
        name = order[info.codepoint]
        tx = x + (cursor + pos.x_offset) * scale
        ty = baseline - pos.y_offset * scale
        glyph_set[name].draw(TransformPen(pen, (scale, 0, 0, -scale, tx, ty)))
        cursor += pos.x_advance + (tracking if i < len(infos) - 1 else 0)
    return pen.getCommands(), cursor * scale


def mark(x: float, y: float, s: float, tile: bool = True, tile_color: str = FJORD_800, cross: str = KALK) -> str:
    k = s / 64
    r = lambda *v: " ".join(f"{n * k:.2f}".rstrip("0").rstrip(".") for n in v)  # noqa: E731
    parts = []
    if tile:
        parts.append(f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="{18 * k:.2f}" fill="{tile_color}"/>')
    g = f'<g transform="translate({x} {y})">'
    g += f'<rect x="{r(25)}" y="{r(12)}" width="{r(14)}" height="{r(24)}" rx="{r(7)}" fill="{NYPE_400}"/>'
    g += f'<rect x="{r(25)}" y="{r(26)}" width="{r(14)}" height="{r(26)}" rx="{r(7)}" fill="{cross}"/>'
    g += f'<rect x="{r(12)}" y="{r(25)}" width="{r(40)}" height="{r(14)}" rx="{r(7)}" fill="{cross}"/>'
    g += "</g>"
    parts.append(g)
    return "".join(parts)


def svg(w: float, h: float, body: str, title: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.0f} {h:.0f}" width="{w:.0f}" height="{h:.0f}" role="img">'
        f"<title>{title}</title>{body}</svg>\n"
    )


fraunces, fraunces_data = load_instance(FONTS / "fraunces-latin.woff2", {"wght": 600, "opsz": 36, "SOFT": 100, "WONK": 0})
figtree, figtree_data = load_instance(FONTS / "figtree-latin.woff2", {"wght": 700})

# ── Liggende logo ───────────────────────────────────────────────
M = 88  # merke
GAP = 24
WS = 50  # skriftstørrelse ordmerke
TS = 17  # skriftstørrelse «SOKNDAL»
PAD = 4


def horizontal(word_color: str, tag_color: str, tile_color: str = FJORD_800, cross: str = KALK):
    tx = PAD + M + GAP
    word, ww = text_path(fraunces, fraunces_data, "Norges Apotek", WS, tx, PAD + 52)
    tag, tw = text_path(figtree, figtree_data, "SOKNDAL", TS, tx + 2, PAD + 82, tracking_em=0.34)
    w = tx + max(ww, tw) + PAD
    body = mark(PAD, PAD, M, tile_color=tile_color, cross=cross)
    body += f'<path d="{word}" fill="{word_color}"/><path d="{tag}" fill="{tag_color}"/>'
    return w, M + PAD * 2, body


w, h, body = horizontal(FJORD_900, FJORD_600)
(OUT / "logo-liggende.svg").write_text(svg(w, h, body, "Norges Apotek Sokndal"))
w, h, body = horizontal(KALK, FJORD_300, tile_color="#135e55")
(OUT / "logo-liggende-negativ.svg").write_text(svg(w, h, body, "Norges Apotek Sokndal"))

# ── Stående logo ────────────────────────────────────────────────
SM = 120
word, ww = text_path(fraunces, fraunces_data, "Norges Apotek", 56, 0, 0)
tag, tw = text_path(figtree, figtree_data, "SOKNDAL", 19, 0, 0, tracking_em=0.34)
W = max(ww, tw, SM) + 8
word, _ = text_path(fraunces, fraunces_data, "Norges Apotek", 56, (W - ww) / 2, SM + 4 + 72)
tag, _ = text_path(figtree, figtree_data, "SOKNDAL", 19, (W - tw) / 2 + 3, SM + 4 + 112, tracking_em=0.34)
body = mark((W - SM) / 2, 4, SM) + f'<path d="{word}" fill="{FJORD_900}"/><path d="{tag}" fill="{FJORD_600}"/>'
(OUT / "logo-staende.svg").write_text(svg(W, SM + 4 + 124, body, "Norges Apotek Sokndal"))

# ── Merket alene ────────────────────────────────────────────────
(OUT / "logo-merke.svg").write_text(svg(64, 64, mark(0, 0, 64), "Norges Apotek Sokndal"))
(ROOT / "public").mkdir(exist_ok=True)
(ROOT / "public" / "favicon.svg").write_text(svg(64, 64, mark(0, 0, 64), "Norges Apotek Sokndal"))

print("Logoer skrevet til", OUT.relative_to(ROOT))
