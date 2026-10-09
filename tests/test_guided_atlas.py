"""Tests for 40 research-backed, two-track guided blueprints and the preview atlas.

These are local structural assertions, not a substitute for native-device
screen-reader testing or a claim that illustrative HTML is a shipped app.
"""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def read_json(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))

class GuidedAtlasTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.web = read_json("catalog/guided-websites.json")
        cls.app = read_json("catalog/guided-apps.json")
        cls.sources = read_json("catalog/evidence-atlas.json")
        cls.web_parts = read_json("catalog/website-sections.json")["sections"]
        cls.app_parts = read_json("catalog/app-flows.json")["flows"]
        cls.html = (ROOT / "docs/guided.html").read_text(encoding="utf-8")
        cls.script = (ROOT / "docs/guided.js").read_text(encoding="utf-8")
        cls.css = (ROOT / "docs/guided.css").read_text(encoding="utf-8")

    def test_20_separate_blueprints_for_each_track(self):
        for track, payload in (("website", self.web), ("app", self.app)):
            self.assertEqual(payload["track"], track)
            self.assertEqual(payload["count"], 20)
            self.assertEqual(len(payload["blueprints"]), 20)
            self.assertEqual(len({x["id"] for x in payload["blueprints"]}), 20)
            for bp in payload["blueprints"]:
                self.assertRegex(bp["id"], r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
                self.assertTrue(bp["thesis"])
                self.assertTrue(bp["sourceIds"])
                self.assertTrue(bp["skills"])
                self.assertTrue(bp["ai"])
                self.assertTrue(bp["threeD"])

    def test_full_canonical_prompts_and_browser_mirrors_exist(self):
        for track, payload in (("website", self.web), ("app", self.app)):
            for bp in payload["blueprints"]:
                main = ROOT / "guides" / track / (bp["id"] + ".md")
                mirror = ROOT / "docs/prompts/guided" / track / (bp["id"] + ".md")
                self.assertTrue(main.is_file(), main)
                self.assertTrue(mirror.is_file(), mirror)
                content = main.read_text(encoding="utf-8")
                mirrored = mirror.read_text(encoding="utf-8")
                self.assertGreater(len(content), 2500)
                self.assertIn("copyable", content.lower())
                self.assertIn("AI", content)
                self.assertIn("3D", content)
                self.assertIn("four", content.lower())
                self.assertNotIn("../../prompts/" + track + "/", mirrored)
                self.assertGreater(len(mirrored), 2500)

    def test_source_and_flow_referential_integrity(self):
        sources = {x["id"] for x in self.sources["sources"]}
        for track, payload, parts, key in (
            ("website", self.web, self.web_parts, "sections"),
            ("app", self.app, self.app_parts, "flows")
        ):
            valid = {x["id"] for x in parts}
            for bp in payload["blueprints"]:
                self.assertGreaterEqual(len(bp[key]), 5, bp["id"])
                self.assertTrue(set(bp[key]).issubset(valid), bp["id"])
                self.assertTrue(set(bp["sourceIds"]).issubset(sources), bp["id"])

    def test_research_copies_and_open_source_licenses(self):
        self.assertEqual(self.sources, read_json("docs/data/evidence-atlas.json"))
        self.assertEqual(self.web, read_json("docs/data/guided-websites.json"))
        self.assertEqual(self.app, read_json("docs/data/guided-apps.json"))
        self.assertGreaterEqual(len(self.sources["sources"]), 37)
        self.assertGreaterEqual(len(self.sources["openSource"]), 28)
        for source in self.sources["sources"]:
            self.assertTrue(source["url"].startswith("https://"), source["id"])
            self.assertTrue(source["limitation"], source["id"])
        for lib in self.sources["openSource"]:
            self.assertTrue(lib["url"].startswith("https://github.com/"))
            self.assertTrue(lib["license"])

    def test_native_store_and_ai_3d_guides_exist(self):
        expected = {
            "website":["README.md","AI-INTEGRATION.md","3D-AND-MOTION.md","DOMAIN-ARCHITECTURE.md"],
            "app":["README.md","AI-INTEGRATION.md","MOTION-AND-3D.md","STORE-RELEASE.md","REVENUE-AND-RETENTION.md","UX-PATTERNS.md"]
        }
        for track, paths in expected.items():
            for name in paths:
                self.assertTrue((ROOT / "guides" / track / name).is_file(), track + "/" + name)
        ai = (ROOT / "guides/website/AI-INTEGRATION.md").read_text(encoding="utf-8")
        self.assertIn("Puter.js", ai)
        self.assertIn("cloud", ai.lower())
        self.assertIn("WebLLM", ai)
        self.assertIn("Transformers.js", ai)
        stores = (ROOT / "guides/app/STORE-RELEASE.md").read_text()
        for word in ("StoreKit", "Play Billing", "privacy", "screenshots"):
            self.assertIn(word.lower(), stores.lower())

    def test_preview_structure_and_interactions(self):
        for text in ('data-track="website"','data-track="app"', 'data-variant="0"',
                     'data-variant="1"', 'data-variant="2"', 'data-device="desktop"',
                     'data-device="mobile"', 'data-platform="ios"',
                     'data-platform="android"', 'id="ga-copy-full"',
                     'id="ga-copy-step"', 'id="ga-steps"', 'id="ga-research-links"'):
            self.assertIn(text, self.html)
        for text in ('function sitePreview(', 'function appPreview(',
                     'function onCopyFull(', 'function onCopyStep(', 'function paintResearch(',
                     'function paintSteps(', 'function paintPreview('):
            self.assertIn(text, self.script)
        self.assertIn('prefers-reduced-motion', self.css)
        self.assertIn('not', self.html.lower())  # previews explicitly marked illustrative
        self.assertNotIn('<script src="https://', self.html)
        self.assertNotIn("<iframe", self.html)

    def test_guided_link_is_in_navigation_and_sitemap(self):
        for page in ("index","academy","concepts","websites","apps","motion",
                     "styles","skills","resources","principles"):
            content = (ROOT / "docs" / (page+".html")).read_text(encoding="utf-8")
            self.assertIn('href="./guided.html"', content, page)
        self.assertIn('/guided.html', (ROOT / "docs/sitemap.xml").read_text(encoding="utf-8"))

    def test_optional_ai_and_3d_teaching_demos(self):
        for marker in ('id="ga-ai-choices"', 'data-ai-route="puter"',
                       'data-ai-route="webllm"', 'data-ai-route="transformers"',
                       'data-cube-action="left"', 'data-cube-action="right"',
                       'id="ga-css3d-box"'):
            self.assertIn(marker, self.html)
        self.assertIn("function initCapabilities(", self.script)
        self.assertIn("cloud with a user-pays", self.script)
        self.assertIn("prefers-reduced-motion", self.css)
        self.assertIn("transition:none", self.css)

    def test_research_is_a_decision_tool_not_revenue_guarantee(self):
        report=(ROOT / "research/EVIDENCE-ATLAS.md").read_text(encoding="utf-8")
        self.assertIn("not", report.lower())
        self.assertIn("RevenueCat", report)
        self.assertIn("Sensor Tower", report)
        self.assertIn("Puter.js", report)
        self.assertIn("WebLLM", report)
        self.assertIn("Transformers.js", report)
        self.assertIn("AI", (ROOT / "guides/app/AI-INTEGRATION.md").read_text())
        self.assertIn("No 3D", (ROOT / "guides/app/tasks.md").read_text())

if __name__=="__main__":
    unittest.main()
