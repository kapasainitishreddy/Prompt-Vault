"""Guard optional open-source guided tour and plain-English FAQ functionality."""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
PAGE_FILES = (
    "index.html", "start-here.html", "websites.html", "apps.html",
    "motion.html", "mg-film-styles.html", "styles.html", "motion-library.html",
    "concepts.html", "academy.html", "guided.html", "studio.html",
    "skills.html", "resources.html", "support.html", "principles.html",
    "lenis-scroll.html", "faq.html",
)


class FAQParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.details = 0
        self.summaries = 0
        self.inputs = []
        self.sections = []
        self.navigation = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        if tag == "details":
            self.details += 1
        if tag == "summary":
            self.summaries += 1
        if tag == "input":
            self.inputs.append(a)
        if tag == "section" and "pvfaq-group" in a.get("class", ""):
            self.sections.append(a)
        if tag == "nav":
            self.navigation += 1


class TestTourAndFAQ(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.faq_html = (DOCS / "faq.html").read_text(encoding="utf8")
        cls.home_html = (DOCS / "index.html").read_text(encoding="utf8")
        cls.tour_js = (DOCS / "tour.js").read_text(encoding="utf8")
        cls.tour_css = (DOCS / "tour.css").read_text(encoding="utf8")
        cls.faq_js = (DOCS / "faq.js").read_text(encoding="utf8")
        cls.parser = FAQParser()
        cls.parser.feed(cls.faq_html)

    def test_twenty_three_plain_english_questions(self):
        self.assertEqual(self.parser.details, 23)
        self.assertEqual(self.parser.summaries, 23)
        self.assertEqual(len(self.parser.sections), 4)
        self.assertEqual(len(self.parser.ids), len(set(self.parser.ids)))
        for topic in ("faq-start", "faq-previews", "faq-motion", "faq-trust"):
            self.assertIn('id="' + topic + '"', self.faq_html)
        for phrase in (
            "What exactly is Prompt-Vault Atlas?",
            "What can I actually do on Atlas?",
            "Does Atlas automatically build and publish",
            "Do you show actual website previews?",
            "Does Atlas actually run Motion, GSAP, Three.js or Lenis?",
            "Will my project idea be sent to an AI model?",
        ):
            self.assertIn(phrase, self.faq_html)

    def test_homepage_contains_discoverable_tour_and_faq(self):
        self.assertIn('data-pv-tour-start', self.home_html)
        self.assertIn('class="pv-faq-preview"', self.home_html)
        self.assertIn('./faq.html', self.home_html)
        self.assertEqual(self.home_html.count("<details><summary>"), 5)
        self.assertIn("Show me around", self.home_html)
        self.assertIn("What is Prompt-Vault Atlas?", self.home_html)

    def test_site_wide_help_links_and_assets(self):
        for page in PAGE_FILES:
            with self.subTest(page=page):
                source = (DOCS / page).read_text(encoding="utf8")
                self.assertEqual(source.count('src="./tour.js"'), 1)
                self.assertEqual(source.count('href="./tour.css"'), 1)
                self.assertIn("<main", source)
                self.assertIn("</head>", source)
        self.assertIn('href="./faq.css"', self.faq_html)
        self.assertIn('src="./faq.js"', self.faq_html)

    def test_real_open_source_driver_loading_is_intentional(self):
        self.assertIn('DRIVER_VERSION = "1.9.0"', self.tour_js)
        self.assertIn("driver.js.iife.js", self.tour_js)
        self.assertIn("driver.css", self.tour_js)
        self.assertIn("window.driver.js.driver", self.tour_js)
        self.assertIn("activeDriver.drive()", self.tour_js)
        self.assertIn("activeDriver.destroy()", self.tour_js)
        self.assertIn('data-pv-tour-start', self.tour_js)
        self.assertIn('document.addEventListener("click"', self.tour_js)
        self.assertIn("skipMissingElement: true", self.tour_js)
        self.assertIn("showProgress: true", self.tour_js)
        self.assertIn("allowKeyboardControl: true", self.tour_js)
        self.assertIn("animate: !reducedMotion()", self.tour_js)
        self.assertIn('doneBtnText: "Done"', self.tour_js)
        self.assertNotIn("@latest", self.tour_js)
        self.assertNotIn("localStorage", self.tour_js)
        self.assertNotIn("sessionStorage", self.tour_js)
        self.assertNotIn('window.location.href', self.tour_js)
        self.assertNotIn("autostart", self.tour_js.lower())

    def test_tour_steps_cover_key_site_routes(self):
        for route in ("home", "start-here", "mg-film-styles", "websites", "apps", "motion", "styles", "motion-library", "faq"):
            self.assertRegex(self.tour_js, r'(?:"' + re.escape(route) + r'"|' + re.escape(route) + r'):\s*\[')
        self.assertIn(".pv-peek-grid", self.tour_js)
        self.assertIn(".pv-mg-home", self.tour_js)
        self.assertIn(".pv-faq-preview", self.tour_js)
        self.assertIn(".mf-card:first-child", self.tour_js)

    def test_faq_search_is_optional_and_privacy_friendly(self):
        self.assertIn('id="pvfaq-search"', self.faq_html)
        self.assertIn('id="pvfaq-results"', self.faq_html)
        self.assertIn('id="pvfaq-clear"', self.faq_html)
        self.assertIn('role="status"', self.faq_html)
        self.assertIn(".pvfaq-item", self.faq_js)
        self.assertIn('search.addEventListener("input"', self.faq_js)
        self.assertNotIn("fetch(", self.faq_js)
        self.assertNotIn("localStorage", self.faq_js)
        self.assertNotIn("navigator.sendBeacon", self.faq_js)

    def test_inclusive_styles_and_skip_links(self):
        self.assertIn("@media(prefers-reduced-motion:reduce)", self.tour_css)
        self.assertIn("@media(prefers-reduced-motion:reduce)", (DOCS / "faq.css").read_text(encoding="utf8"))
        self.assertIn('class="skip-link"', self.faq_html)
        self.assertIn("Help & tour", self.tour_js)
        self.assertIn("Close guided tour", self.tour_js)

    def test_discoverability_and_source_attribution(self):
        self.assertIn("https://prompt-vault-atlas.pages.dev/faq.html", (DOCS / "sitemap.xml").read_text(encoding="utf8"))
        self.assertIn("https://github.com/nilbuild/driver.js", (ROOT / "README.md").read_text(encoding="utf8"))
        self.assertIn("MIT", self.tour_js)
        self.assertIn("Kamran Ahmed", self.tour_js)


if __name__ == "__main__":
    unittest.main()
