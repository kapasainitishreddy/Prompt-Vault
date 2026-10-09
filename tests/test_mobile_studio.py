"""Regression checks for Mobile Studio, Expo Native Kit, and catalog MCP.

These validate source integrity; they do NOT substitute for a real phone,
an npm install, TypeScript type-check, rendered browser QA or MCP inspector.
"""
from __future__ import annotations

import json
import re
import shutil
import subprocess
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"
NATIVE = ROOT / "native-kit"
MCP = ROOT / "mcp"


class HTMLIds(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids: list[str] = []
        self.links: list[str] = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if "id" in data:
            self.ids.append(data["id"])
        if tag in {"script", "link"}:
            self.links.extend([data.get("src", ""), data.get("href", "")])


class MobileStudioTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = json.loads((DOCS / "data/app.json").read_text())
        cls.guides = json.loads((DOCS / "data/guided-apps.json").read_text())
        cls.native = json.loads((NATIVE / "catalog.json").read_text())
        cls.html = (DOCS / "mobile-studio.html").read_text()
        cls.css = (DOCS / "mobile-studio.css").read_text()
        cls.js = (DOCS / "mobile-studio.js").read_text()
        cls.tsx = (NATIVE / "src/FlowScreen.tsx").read_text()
        cls.app_tsx = (NATIVE / "App.tsx").read_text()
        cls.parser = HTMLIds()
        cls.parser.feed(cls.html)

    def test_32_flows_20_journeys_stay_in_sync(self):
        self.assertEqual(len(self.app["flows"]), 32)
        self.assertEqual(len(self.guides["blueprints"]), 20)
        self.assertEqual(
            [x["id"] for x in self.app["flows"]],
            [x["id"] for x in self.native["flows"]],
        )
        self.assertEqual(
            [(x["id"], x["flows"]) for x in self.guides["blueprints"]],
            [(x["id"], x["flows"]) for x in self.native["journeys"]],
        )
        ids = {x["id"] for x in self.app["flows"]}
        for journey in self.guides["blueprints"]:
            with self.subTest(journey=journey["id"]):
                self.assertGreater(len(journey["flows"]), 1)
                self.assertTrue(set(journey["flows"]).issubset(ids))

    def test_every_flow_has_native_and_web_example(self):
        expected = {x["id"] for x in self.app["flows"]}
        native_cases = set(re.findall(r'case "([a-z-]+)":', self.tsx))
        body = self.js.split("function renderBody(id){", 1)[1].split(
            "function renderPhone(){", 1
        )[0]
        web_cases = set(re.findall(r'case "([a-z-]+)":', body))
        self.assertEqual(native_cases, expected)
        self.assertEqual(web_cases, expected)
        self.assertIn("<FlowScreen", self.app_tsx)
        self.assertIn("onNavigate", self.tsx)

    def test_visible_preview_before_javascript(self):
        self.assertIn('id="ms-phone-screen"', self.html)
        self.assertIn('class="ms-phone"', self.html)
        self.assertIn("Good morning.", self.html)
        self.assertIn('id="ms-load-status"', self.html)
        self.assertIn("<noscript>", self.html)
        self.assertIn("Catalog unavailable", self.js)
        self.assertIn("fallback", self.js.lower())

    def test_html_ids_unique_and_script_refs_grounded(self):
        ids = self.parser.ids
        self.assertEqual(len(ids), len(set(ids)))
        requested = set(re.findall(r'\$\("([a-z0-9-]+)"\)', self.js))
        # The result list is intentionally introduced by renderBody.
        generated = {'ms-search-results'}
        self.assertFalse(requested - set(ids) - generated)

    def test_local_assets_and_source_prompts_exist(self):
        for rel in ["mobile-studio.js", "mobile-studio.css", "data/app.json",
                    "data/guided-apps.json"]:
            self.assertTrue((DOCS / rel).exists(), rel)
        for flow in self.app["flows"]:
            path = DOCS / "prompts" / "app" / "flows" / (flow["id"] + ".md")
            self.assertTrue(path.exists(), str(path))
        for section in json.loads((DOCS / "data/website.json").read_text())["sections"]:
            self.assertTrue((ROOT / "prompts/website/sections" / (section["id"] + ".md")).exists())

    def test_accessibility_and_responsive_basics(self):
        for token in ['class="ms-skip"', 'aria-label="Preview settings"',
                      'role="tabpanel"', 'aria-selected="true"', 'role="status"']:
            self.assertIn(token, self.html)
        self.assertIn("@media(max-width:750px)", self.css)
        self.assertIn("prefers-reduced-motion", self.css)
        self.assertIn("min-height:44px", self.css)
        self.assertIn('accessibilityRole="button"', (NATIVE / "src/components.tsx").read_text())
        self.assertIn("SafeAreaProvider", self.app_tsx)

    def test_simulated_services_are_not_misrepresented(self):
        combined = self.tsx + self.html + (NATIVE / "README.md").read_text()
        for term in ["No authentication", "No real", "simulation", "demo"]:
            self.assertIn(term.lower(), combined.lower())
        self.assertNotIn("stripe.secret", combined.lower())
        self.assertNotIn("openai_api_key", combined.lower())

    def test_site_discoverability(self):
        for path in ["index.html", "apps.html", "guided.html", "concepts.html",
                     "start-here.html", "sitemap.xml"]:
            with self.subTest(path=path):
                self.assertIn("mobile-studio.html", (DOCS / path).read_text())
        self.assertIn("native-kit", (ROOT / "README.md").read_text())

    def test_pinned_supported_sdk_family(self):
        package = json.loads((NATIVE / "package.json").read_text())
        self.assertTrue(package["dependencies"]["expo"].startswith("~54."))
        self.assertEqual(package["dependencies"]["react"], "19.1.0")
        self.assertTrue(package["dependencies"]["react-native"].startswith("0.81."))
        self.assertIn("react-native-safe-area-context", package["dependencies"])

    @unittest.skipUnless(shutil.which("node"), "Node is unavailable")
    def test_browser_script_node_syntax(self):
        result = subprocess.run(
            ["node", "--check", str(DOCS / "mobile-studio.js")],
            capture_output=True, text=True, timeout=12,
        )
        self.assertEqual(result.returncode, 0, result.stderr)


class CatalogMCPTests(unittest.TestCase):
    def test_sdk_tools_are_read_only_and_sourced(self):
        package = json.loads((MCP / "package.json").read_text())
        self.assertIn("@modelcontextprotocol/server", package["dependencies"])
        source = (MCP / "server.mjs").read_text()
        self.assertIn("serveStdio", source)
        self.assertEqual(source.count("server.registerTool("), 7)
        for tool in ["search_app_patterns", "get_app_pattern",
                     "list_app_journeys", "get_app_journey",
                     "compose_app_brief", "search_website_sections",
                     "get_website_section"]:
            self.assertIn('"'+tool+'"', source)
        self.assertNotIn("writeFileSync", source)
        self.assertNotIn("execSync", source)
        self.assertNotIn("console.log", source)
        self.assertIn("min(10)", source)

    @unittest.skipUnless(shutil.which("node"), "Node is unavailable")
    def test_mcp_source_node_syntax(self):
        result = subprocess.run(
            ["node", "--check", str(MCP / "server.mjs")],
            capture_output=True, text=True, timeout=12,
        )
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
