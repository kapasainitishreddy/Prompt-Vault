"""Static QA for the credited MG Styles 15 gallery (no browser or paid API required)."""
from __future__ import annotations

import re
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
ORIGINAL = "https://vincentwei1021.github.io/mg-styles-15/"
REPO = "https://github.com/Vincentwei1021/mg-styles-15/"
STYLES = (
    "05-cel-boil",
    "03-isometric",
    "01-flat-vector",
    "02-line-art",
    "04-3d-render",
    "08-morph",
    "19-paperclip",
    "22-hud",
    "06-collage",
    "12-aurora-glass",
    "09-bauhaus",
    "10-synthwave",
    "20-pixel",
    "07-liquid",
    "18-hanazi",
)


class MediaGalleryParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.cards = []
        self.sources = []
        self.posters = []
        self.local_scripts = []
        self.ids = []
        self.videos = []
        self.dialogs = []
        self.links = []
        self.inputs = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        if tag == "article" and a.get("class") == "mf-card":
            self.cards.append(a)
        if tag == "img" and a.get("src", "").startswith(ORIGINAL):
            self.posters.append(a)
        if tag == "a":
            self.links.append(a)
            if "data-film" in a:
                self.sources.append(a["data-film"])
        if tag == "video":
            self.videos.append(a)
        if tag == "dialog":
            self.dialogs.append(a)
        if tag == "script":
            self.local_scripts.append(a.get("src", ""))
        if tag == "input":
            self.inputs.append(a)


class TestMotionFilmCollection(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = (DOCS / "mg-film-styles.html").read_text(encoding="utf-8")
        cls.js = (DOCS / "mg-film-styles.js").read_text(encoding="utf-8")
        cls.css = (DOCS / "mg-film-styles.css").read_text(encoding="utf-8")
        cls.parser = MediaGalleryParser()
        cls.parser.feed(cls.html)

    def test_exact_fifteen_original_films_no_duplicates(self):
        self.assertEqual(tuple(x["data-slug"] for x in self.parser.cards), STYLES)
        self.assertEqual(len(self.parser.cards), 15)
        self.assertEqual(len(set(self.parser.ids)), len(self.parser.ids))

    def test_every_card_has_explanations_and_real_poster_link(self):
        self.assertEqual(len(self.parser.posters), 15)
        for card, poster in zip(self.parser.cards, self.parser.posters):
            slug = card["data-slug"]
            for field in ("data-category", "data-title", "data-summary", "data-good", "data-avoid", "data-how"):
                self.assertTrue(card.get(field), (slug, field))
            self.assertEqual(poster["src"], ORIGINAL + "videos/" + slug + ".jpg")
            self.assertIn("loading", poster)
            self.assertIn("decoding", poster)
            self.assertTrue(any(
                x.get("href") == REPO + "blob/main/prompts/" + slug + ".md"
                for x in self.parser.links
            ), slug)
            self.assertTrue(any(
                x.get("href") == ORIGINAL + "#" + slug
                for x in self.parser.links
            ), slug)

    def test_native_video_is_accessible_and_never_autoplays(self):
        self.assertEqual(len(self.parser.videos), 1)
        attrs = self.parser.videos[0]
        self.assertIn("controls", attrs)
        self.assertIn("playsinline", attrs)
        self.assertEqual(attrs.get("preload"), "none")
        self.assertNotIn("autoplay", attrs)
        self.assertEqual(len(self.parser.dialogs), 1)
        self.assertEqual(self.parser.dialogs[0].get("aria-labelledby"), "mf-detail-title")
        self.assertIn("video.preload = 'none'", self.js)
        self.assertIn("video.pause()", self.js)
        self.assertIn("video.removeAttribute('src')", self.js)
        self.assertIn("dialog.addEventListener('close'", self.js)
        self.assertNotIn("video.autoplay", self.js)
        self.assertNotIn("<iframe", self.html)

    def test_usable_without_javascript_and_under_reduced_motion(self):
        self.assertEqual(self.parser.local_scripts, ["./mg-film-styles.js"])
        self.assertIn("prefers-reduced-motion:reduce", self.css)
        self.assertIn("<noscript>", self.html)
        self.assertIn('id="mf-grid"', self.html)
        self.assertIn('id="mf-count"', self.html)
        self.assertIn('id="mf-search"', self.html)
        self.assertIn('id="mf-kind"', self.html)
        self.assertIn('id="mf-idea"', self.html)
        self.assertIn('id="mf-prompt"', self.html)
        self.assertIn("if (openFilm(link, slug)) event.preventDefault()", self.js)

    def test_upstream_license_and_linked_provenance(self):
        self.assertIn("Vincentwei1021", self.html)
        self.assertIn("MIT", self.html)
        self.assertIn(REPO + "blob/main/LICENSE", self.html)
        self.assertIn("Third-party assets retain their own terms", self.html)
        self.assertTrue((ROOT / "research" / "mg-styles-15-integration.md").exists())
        self.assertFalse(any(DOCS.rglob("*.mp4")))

    def test_home_and_discoverability(self):
        for page in ("index.html", "motion.html", "styles.html", "motion-library.html", "start-here.html", "resources.html"):
            html = (DOCS / page).read_text(encoding="utf-8")
            self.assertIn("./mg-film-styles.html", html, page)
        sitemap = (DOCS / "sitemap.xml").read_text(encoding="utf-8")
        self.assertIn("https://prompt-vault-atlas.pages.dev/mg-film-styles.html", sitemap)

    def test_no_heavy_upstream_code_or_external_dependency_scripts(self):
        self.assertEqual(len(self.parser.cards), len(STYLES))
        self.assertNotIn("node_modules", self.html)
        self.assertNotIn("<script src=\"https://", self.html)
        self.assertNotIn("autoplay", self.html.split("<video", 1)[1].split("</video>", 1)[0])
        self.assertIn("No paid APIs or autoplay", self.html)


if __name__ == "__main__":
    unittest.main()
