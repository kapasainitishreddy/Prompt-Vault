"""Checks for the original eight-source reference gallery.
All checks use stdlib, local source, zero paid/remote services.
These are structural tests, not browser, screen-reader or legal certification.
"""
from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "docs" / "resources.html"
SCRIPT = ROOT / "docs" / "resources.js"
STYLE = ROOT / "docs" / "resources.css"
CATALOG = ROOT / "catalog" / "open-source-references.json"
MIRROR = ROOT / "docs" / "data" / "resources.json"

EXPECTED = {
    "ui-promptly", "superdesign-prompts", "motion-primitives",
    "uiverse-galaxy", "magic-ui", "origin-ui",
    "react-native-reusables", "gluestack-ui",
}

class ReferenceGalleryChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
        cls.web_catalog = json.loads(MIRROR.read_text(encoding="utf-8"))
        cls.html = PAGE.read_text(encoding="utf-8")
        cls.script = SCRIPT.read_text(encoding="utf-8")
        cls.style = STYLE.read_text(encoding="utf-8")

    def test_all_eight_sources_and_mirror_are_exact(self):
        self.assertEqual(self.catalog, self.web_catalog)
        resources = self.catalog["references"]
        self.assertEqual(self.catalog["count"], 8)
        self.assertEqual(len(resources), 8)
        self.assertEqual({item["id"] for item in resources}, EXPECTED)
        self.assertEqual(len({item["repo"] for item in resources}), 8)
        for item in resources:
            self.assertTrue(item["repo"].startswith("https://github.com/"))
            self.assertTrue(item["demo"].startswith("https://"))
            self.assertTrue(item["targets"])
            self.assertTrue(item["bestFor"])
            self.assertIn(item["licenseStatus"], {"verified", "unknown", "verify-file"})

    def test_exact_license_boundary_for_unverified_sources(self):
        items = {item["id"]: item for item in self.catalog["references"]}
        self.assertEqual(items["ui-promptly"]["licenseStatus"], "unknown")
        self.assertIn("No root LICENSE", items["ui-promptly"]["licenseNote"])
        self.assertEqual(items["gluestack-ui"]["licenseStatus"], "verify-file")
        self.assertIn("README", items["gluestack-ui"]["licenseNote"])
        self.assertIn("CC0", items["superdesign-prompts"]["license"])
        self.assertIn("Commons Clause", (ROOT / "research" / "supplied-resources.md").read_text(encoding="utf-8"))

    def test_every_resource_has_matching_original_prompt_and_site_copy(self):
        for item in self.catalog["references"]:
            id_ = item["id"]
            repo_prompt = ROOT / "prompts" / "references" / (id_ + ".md")
            site_prompt = ROOT / "docs" / "prompts" / "references" / (id_ + ".md")
            self.assertTrue(repo_prompt.is_file(), str(repo_prompt))
            self.assertTrue(site_prompt.is_file(), str(site_prompt))
            content = repo_prompt.read_text(encoding="utf-8")
            self.assertEqual(content, site_prompt.read_text(encoding="utf-8"))
            self.assertIn("four", content.lower())
            self.assertIn("accessibility", content.lower())
            self.assertIn(item["repo"], content)
            self.assertIn("original", content.lower())

    def test_gallery_contains_expected_accessible_controls(self):
        for marker in (
            'id="resources-grid"', 'id="resource-search"', 'id="resource-filters"',
            'id="resource-dialog"', 'role="tablist"', 'aria-live="polite"',
            'id="ref-copy-prompt"', 'id="ref-source-prompt"',
            'id="resource-dialog-close"', 'id="ref-no-results"',
            'id="ref-official-demo"', 'id="ref-official-code"'
        ):
            self.assertIn(marker, self.html)
        for action in ('mode', 'spec', 'expand', 'toggle', 'reveal', 'native-tab', 'layout'):
            self.assertIn("action==='" + action + "'", self.script)
        self.assertIn("data-demo-form", self.script)
        self.assertIn("event.preventDefault()", self.script)
        self.assertIn("prefers-reduced-motion", self.style)

    def test_new_page_and_prompts_link_from_other_site_pages(self):
        for path in ("index", "websites", "apps", "motion", "styles", "skills", "principles"):
            html = (ROOT / "docs" / (path + ".html")).read_text(encoding="utf-8")
            self.assertIn('href="./resources.html"', html, path)
        home = (ROOT / "docs" / "index.html").read_text(encoding="utf-8")
        self.assertIn("Six collections.", home)
        self.assertIn("183 VISUAL STUDIES", home)
        self.assertIn("/resources.html", (ROOT / "docs" / "sitemap.xml").read_text(encoding="utf-8"))

    def test_no_vendored_vendor_assets_or_external_scripts(self):
        self.assertNotIn("<iframe", self.html.lower())
        self.assertNotIn("cdn.jsdelivr", self.html.lower())
        self.assertNotIn("https://unpkg.com/", self.html.lower())
        self.assertNotIn("<script src=\"https://", self.html.lower())
        self.assertNotIn("Math.random", self.script)  # deterministically generated studies
        self.assertIn("Original", self.html)
        self.assertIn("not a vendor component", self.script)
        self.assertTrue((ROOT / "research" / "open-source-preview-resources.md").exists())

    def test_no_unsafe_catalog_paths(self):
        for item in self.catalog["references"]:
            self.assertRegex(item["id"], r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
            self.assertEqual(item["promptPath"], "./prompts/references/" + item["id"] + ".md")
        self.assertIn("safeUrl", self.script)
        self.assertIn("navigator.clipboard", self.script)

if __name__ == "__main__":
    unittest.main()
