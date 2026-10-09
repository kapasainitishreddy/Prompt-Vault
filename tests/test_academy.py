"""Static quality gates for the two-track design academy.

This suite verifies content/architecture, not visual appearance, accessibility
conformance, store approval or functioning native purchases. No paid services.
"""
import json
import re
import shutil
import subprocess
import unittest
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
DATA = DOCS / "data" / "academy.json"
ACADEMY = DOCS / "academy.html"
JS = DOCS / "academy.js"
CSS = DOCS / "academy.css"
MAIN = DOCS / "index.html"


class ReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.refs = []
        self.links = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if "id" in d:
            self.ids.append(d["id"])
        for name in ("href", "src"):
            if d.get(name):
                self.refs.append(d[name])
        if tag == "a":
            self.links.append(d.get("href", ""))


class AcademyCatalogTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads(DATA.read_text(encoding="utf-8"))
        cls.html = ACADEMY.read_text(encoding="utf-8")
        cls.js = JS.read_text(encoding="utf-8")
        cls.css = CSS.read_text(encoding="utf-8")
        cls.home = MAIN.read_text(encoding="utf-8")

    def test_only_two_primary_tracks(self):
        self.assertEqual(self.data["tracks"], ["website", "app"])
        self.assertIn("WEBSITE DESIGN", self.html.upper())
        self.assertIn("APP DESIGN", self.html)
        self.assertIn("Two main tracks", self.home)

    def test_blueprints_are_unique_and_cover_requested_site_types(self):
        web = self.data["website"]
        app = self.data["app"]
        all_items = web + app
        self.assertEqual(len(web), 16)
        self.assertEqual(len(app), 14)
        ids = [item["id"] for item in all_items]
        self.assertEqual(len(ids), len(set(ids)))
        self.assertTrue({
            "developer-portfolio", "company-home", "saas-product",
            "ecommerce-storefront", "product-detail", "developer-documentation",
            "subdomain-product", "editorial-publication", "marketplace",
        }.issubset(set(ids)))
        self.assertTrue({
            "personal-productivity", "learning-course", "ai-copilot",
            "mobile-commerce", "personal-journal", "reading-library",
            "enterprise-operations",
        }.issubset(set(ids)))

    def test_each_ordered_step_has_purpose_skill_and_copyable_prompt(self):
        all_items = self.data["website"] + self.data["app"]
        self.assertGreaterEqual(sum(len(x["steps"]) for x in all_items), 220)
        for item in all_items:
            self.assertGreaterEqual(len(item["steps"]), 5, item["id"])
            for i, step in enumerate(item["steps"], start=1):
                self.assertEqual(step["order"], i, item["id"])
                for field in ("name", "why", "skill", "decision", "microPrompt"):
                    self.assertGreater(len(step[field].strip()), 5, (item["id"], i, field))
                self.assertNotIn("TBD", step["microPrompt"])

    def test_research_sources_and_caveats(self):
        sources = self.data["sources"]
        keys = {s["id"] for s in sources}
        self.assertEqual(len(keys), len(sources))
        self.assertGreaterEqual(len(sources), 30)
        self.assertTrue({"wcag22", "android-core", "apple-review", "nng-heuristics",
                         "baymard-pdp", "sensor-2026", "revenuecat2026",
                         "webllm", "puter"}.issubset(keys))
        for source in sources:
            self.assertTrue(source["url"].startswith("https://"), source["id"])
            self.assertGreater(len(source["finding"]), 24, source["id"])
            self.assertGreater(len(source["limit"]), 24, source["id"])
        for item in self.data["website"] + self.data["app"]:
            self.assertTrue(item["sources"], item["id"])
            self.assertTrue(set(item["sources"]).issubset(keys), item["id"])
        for module in self.data["craft"]:
            self.assertIn(module["source"], keys)
        for signal in self.data["marketSignals"]:
            self.assertIn(signal["source"], keys)
            self.assertGreater(len(signal["caution"]), 20)

    def test_quantitative_research_never_implies_ui_causality(self):
        self.assertGreaterEqual(len(self.data["marketSignals"]), 8)
        self.assertEqual(
            [x["name"] for x in self.data["topEarners"]],
            ["TikTok", "Google One", "ChatGPT"]
        )
        for x in self.data["topEarners"]:
            self.assertEqual(x["year"], 2025)
            self.assertIn("revenue", x["measure"].lower())
        self.assertIn("Correlation isn't causation", self.html)
        self.assertIn("observational", self.html.lower())

    def test_open_source_links_are_explicitly_license_cautious(self):
        items = self.data["openSource"]
        self.assertGreaterEqual(len(items), 60)
        self.assertEqual(len({x["name"] for x in items}), len(items))
        for item in items:
            self.assertTrue(item["url"].startswith("https://github.com/"), item["name"])
            self.assertGreater(len(item["license"]), 5, item["name"])
        self.assertIn("check each upstream", self.html.lower())

    def test_ai_local_and_hosted_are_distinct(self):
        modules = {x["id"]: x for x in self.data["craft"]}
        self.assertIn("ai-local", modules)
        self.assertIn("ai-cloud", modules)
        self.assertIn("WebLLM", modules["ai-local"]["skills"])
        self.assertIn("Puter.js", modules["ai-cloud"]["skills"])
        self.assertNotIn("on-device", modules["ai-cloud"]["when"].lower())

    def test_three_complete_prompts_and_native_platform_notes(self):
        for snippet in (
            "kind==='design'", "kind==='build'", "Independent product design critic",
            "Apple Human Interface Guidelines", "Google Play", "App Store",
            "document.execCommand", "navigator.clipboard", "function composePrompt",
            "function specialWebVisual", "function specialAppVisual",
        ):
            self.assertIn(snippet, self.js)

    def test_html_required_controls_and_local_assets_exist(self):
        parser = ReferenceParser()
        parser.feed(self.html)
        required = {
            "academy-main", "academy-search", "academy-catalog",
            "detail-title", "detail-steps", "platform-guidance",
            "academy-prompt", "academy-preview", "academy-viewport",
            "preview-back", "preview-next", "academy-modules",
            "academy-research", "academy-resources", "academy-resource-search",
            "academy-resource-type", "academy-resource-count",
            "academy-signals", "academy-earners", "academy-toast",
            "mobile-navigation",
        }
        self.assertTrue(required.issubset(set(parser.ids)), required - set(parser.ids))
        self.assertEqual(len(parser.ids), len(set(parser.ids)))
        for path in parser.refs:
            if not path.startswith("./"):
                continue
            local = (DOCS / path).resolve()
            self.assertTrue(local.is_relative_to(DOCS.resolve()), path)
            self.assertTrue(local.exists(), path)
        self.assertIn("./academy.js", parser.refs)
        self.assertIn("./academy.css", parser.refs)

    def test_home_and_every_other_gallery_links_academy(self):
        for name in ("index", "websites", "apps", "motion", "styles",
                     "skills", "resources", "principles"):
            source = (DOCS / (name + ".html")).read_text(encoding="utf-8")
            self.assertIn('href="./academy.html"', source, name)
        self.assertIn("pv-secondary-tracks", self.home)
        self.assertIn('href="./academy.html"', self.home)

    def test_accessibility_responsive_and_truthful_preview_disclosure(self):
        self.assertIn("prefers-reduced-motion:reduce", self.css)
        self.assertIn("@media(max-width:750px)", self.css)
        self.assertIn('role="status"', self.html)
        self.assertIn("not a finished product", self.html.lower())
        self.assertIn("mock", self.js.lower())
        self.assertIn('aria-pressed', self.html)
        self.assertIn("Escape", self.js)

    @unittest.skipUnless(shutil.which("node"), "Node is optional: JavaScript syntax check skipped")
    def test_browser_script_syntax_when_node_is_installed(self):
        result = subprocess.run(
            [shutil.which("node"), "--check", str(JS)],
            capture_output=True, text=True, check=False
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == "__main__":
    unittest.main()
