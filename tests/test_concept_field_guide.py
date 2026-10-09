"""Source-level checks for Prompt-Vault's deep Concept Field Guide.

Tests prove catalog wiring/content, not native features, browser rendering,
compliance, paper claims or accessibility conformance. No external services.
"""
import json
import re
import shutil
import subprocess
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
CONCEPTS = DOCS / "concepts.html"
STYLE = DOCS / "concepts.css"
SCRIPT = DOCS / "concepts.js"
JSON_FILES = ("concepts-web.json", "concepts-app.json",
              "deep-research.json", "deep-resources.json")


class DocumentParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.scripts = []
        self.styles = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"])
        if tag == "a" and values.get("href"):
            self.links.append(values["href"])
        if tag == "script" and values.get("src"):
            self.scripts.append(values["src"])
        if tag == "link" and values.get("rel") == "stylesheet":
            self.styles.append(values.get("href", ""))


class ConceptFieldGuideTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = {
            n: json.loads((DOCS / "data" / n).read_text(encoding="utf-8"))
            for n in JSON_FILES
        }
        cls.web = cls.data["concepts-web.json"]
        cls.app = cls.data["concepts-app.json"]
        cls.research = cls.data["deep-research.json"]
        cls.resources = cls.data["deep-resources.json"]
        cls.all = cls.web["concepts"] + cls.app["concepts"]
        cls.html = CONCEPTS.read_text(encoding="utf-8")
        cls.css = STYLE.read_text(encoding="utf-8")
        cls.js = SCRIPT.read_text(encoding="utf-8")
        cls.parser = DocumentParser()
        cls.parser.feed(cls.html)

    def test_exactly_two_design_tracks_with_200_new_concepts(self):
        self.assertEqual(self.web["track"], "website")
        self.assertEqual(self.app["track"], "app")
        self.assertEqual(len(self.web["concepts"]), 100)
        self.assertEqual(len(self.app["concepts"]), 100)
        self.assertEqual(len({x["id"] for x in self.all}), 200)
        for x in self.web["concepts"]:
            self.assertEqual(x["track"], "website")
        for x in self.app["concepts"]:
            self.assertEqual(x["track"], "app")

    def test_twenty_families_ten_per_track_with_ten_patterns_each(self):
        for group in (self.web, self.app):
            self.assertEqual(len(group["families"]), 10)
            self.assertEqual(len(set(group["families"])), 10)
            for family in group["families"]:
                self.assertEqual(
                    len([x for x in group["concepts"] if x["family"] == family]), 10
                )

    def test_all_concepts_have_decision_boundaries_and_specific_goals(self):
        for x in self.all:
            for key in ("id", "title", "purpose", "useWhen", "avoidWhen",
                        "preview", "successSignal", "accessibility", "recovery"):
                self.assertGreater(len(x[key].strip()), 5, (x["id"], key))
            self.assertGreaterEqual(len(x["skills"]), 2, x["id"])
            self.assertGreaterEqual(len(x["sources"]), 2, x["id"])
            self.assertNotEqual(x["useWhen"], x["avoidWhen"], x["id"])
            self.assertNotIn("TBD", x["purpose"])

    def test_citations_all_exist_and_have_scope_limitations(self):
        sources = self.research["sources"]
        keys = {x["id"] for x in sources}
        self.assertEqual(len(sources), 50)
        self.assertEqual(len(keys), 50)
        for x in self.all:
            self.assertTrue(set(x["sources"]).issubset(keys), x["id"])
        for source in sources:
            self.assertTrue(source["url"].startswith("https://"), source["id"])
            for key in ("title", "type", "insight", "limitation"):
                self.assertGreater(len(str(source[key]).strip()), 10,
                                   (source["id"], key))
            self.assertGreaterEqual(len(source["tags"]), 1)

    def test_twelve_peer_reviewed_papers_are_explicitly_scoped(self):
        papers = [s for s in self.research["sources"]
                  if s["type"] == "peer-reviewed"]
        self.assertGreaterEqual(len(papers), 12)
        doi_papers = [s for s in papers if "doi.org/" in s["url"]]
        self.assertGreaterEqual(len(doi_papers), 12)
        self.assertTrue(all(p["limitation"] for p in papers))

    def test_new_upstream_refs_are_license_cautious(self):
        resources = self.resources["resources"]
        self.assertEqual(len(resources), 62)
        self.assertEqual(len({x["name"] for x in resources}), 62)
        self.assertEqual(len({x["url"] for x in resources}), 62)
        for r in resources:
            self.assertTrue(r["url"].startswith("https://github.com/"))
            self.assertIn(
                r["licenseStatus"],
                {"restricted", "verified-permissive", "reference", "unverified"}
            )
            self.assertTrue(r["licenseNotes"])
            if r["licenseStatus"] == "unverified":
                self.assertNotIn("MIT", r["licenseNotes"])
        restricted = {r["name"] for r in resources
                      if r["licenseStatus"] == "restricted"}
        self.assertTrue({"React Bits", "tldraw SDK"}.issubset(restricted))

    def test_earlier_academy_is_preserved_and_joined_by_upstream_url(self):
        academy = json.loads(
            (DOCS / "data" / "academy.json").read_text(encoding="utf-8")
        )
        self.assertEqual(len(academy["website"]), 16)
        self.assertEqual(len(academy["app"]), 14)
        self.assertGreaterEqual(len(academy["openSource"]), 63)
        self.assertIn("const known=new Map", self.js)
        self.assertIn("known.set(x.url.toLowerCase()", self.js)

    def test_html_has_unique_ids_and_all_script_accessors(self):
        ids = set(self.parser.ids)
        self.assertEqual(len(ids), len(self.parser.ids))
        required = {
            "concept-total", "research-total", "concept-list", "concept-search",
            "concept-family", "concept-saved-only", "result-count",
            "reset-concept-filters", "current-title", "current-purpose",
            "current-when", "current-avoid", "current-skills",
            "current-success", "current-access", "current-recovery",
            "current-sources", "save-concept", "copy-link", "project-brief",
            "concept-prompt", "copy-concept-prompt", "specimen", "specimen-stage",
            "research-search", "research-type", "research-count",
            "research-more", "research-list", "paper-count",
            "resource-search", "resource-kind", "resource-list",
            "resource-count", "resource-more", "library-count",
            "mobile-navigation", "concept-toast"
        }
        self.assertTrue(required.issubset(ids), required - ids)
        referenced = set(re.findall(r"\$\('([^']+)'\)", self.js))
        dynamically_created = {"specimen-status"}
        self.assertTrue(referenced.issubset(ids | dynamically_created),
                        referenced - (ids | dynamically_created))
        self.assertIn("./concepts.js", self.parser.scripts)
        self.assertIn("./concepts.css", self.parser.styles)

    def test_every_local_asset_and_deep_link_is_in_repo(self):
        for path in self.parser.scripts + self.parser.styles:
            if not path.startswith("./"):
                continue
            target = (DOCS / path).resolve()
            self.assertTrue(target.is_relative_to(DOCS.resolve()), path)
            self.assertTrue(target.is_file(), path)
        for suffix in JSON_FILES + ("academy.json",):
            self.assertIn("./data/" + suffix, self.js)
        index = (ROOT / "catalog" / "CONCEPT-INDEX.md").read_text(
            encoding="utf-8"
        )
        self.assertEqual(index.count("#### ["), 200)
        for c in self.all:
            self.assertIn("../docs/concepts.html#" + c["id"], index)

    def test_all_existing_pages_link_field_guide(self):
        for filename in ("index.html", "academy.html", "websites.html",
                         "apps.html", "motion.html", "styles.html",
                         "skills.html", "resources.html", "principles.html"):
            html = (DOCS / filename).read_text(encoding="utf-8")
            self.assertIn('href="./concepts.html"', html, filename)
        home = (DOCS / "index.html").read_text(encoding="utf-8")
        academy = (DOCS / "academy.html").read_text(encoding="utf-8")
        self.assertIn("pv-home-concept", home)
        self.assertIn("ac-deep-concepts", academy)

    def test_local_interaction_and_three_scenarios_are_explicit(self):
        self.assertIn("normal", self.html)
        self.assertIn("success", self.html)
        self.assertIn("error", self.html)
        self.assertIn('data-device="desktop"', self.html)
        self.assertIn('data-device="tablet"', self.html)
        self.assertIn('data-device="mobile"', self.html)
        for name in ("focus", "editorial", "dense"):
            self.assertIn('data-direction="' + name + '"', self.html)
        for name in ("design", "build", "audit"):
            self.assertIn('data-prompt="' + name + '"', self.html)
        self.assertIn("addEventListener('submit'", self.js)
        self.assertIn("preventDefault()", self.js)
        self.assertIn("reportValidity()", self.js)
        self.assertIn("No real checkout", self.html)

    def test_reduced_motion_keyboard_and_safety_disclosures(self):
        self.assertIn("prefers-reduced-motion:reduce", self.css)
        self.assertIn("aria-expanded", self.html)
        self.assertIn('role="status"', self.html)
        self.assertIn("Escape", self.js)
        self.assertIn("safeUrl", self.js)
        self.assertIn("escapeHTML", self.js)
        self.assertIn("not 200 independent", self.research["scope"].lower()
                      + (ROOT / "research" / "concept-field-guide.md")
                        .read_text(encoding="utf-8").lower())
        self.assertIn("tldraw SDK", self.html)
        self.assertIn("React Bits", self.html)

    def test_prompts_have_design_build_audit_and_research_limits(self):
        self.assertIn("state.prompt==='design'", self.js)
        self.assertIn("state.prompt==='build'", self.js)
        self.assertIn("TASK: Independently audit", self.js)
        self.assertIn("Limitation:", self.js)
        self.assertIn("human approval",
                      (ROOT / "research" / "concept-field-guide.md")
                        .read_text(encoding="utf-8").lower())

    @unittest.skipUnless(shutil.which("node"), "Node optional, JS syntax not executed")
    def test_javascript_syntax_if_node_available(self):
        command = [shutil.which("node"), "--check", str(SCRIPT)]
        result = subprocess.run(command, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
