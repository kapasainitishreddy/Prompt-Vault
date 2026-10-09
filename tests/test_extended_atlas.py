"""Extra Prompt-Vault Atlas validation: 48 style previews + 16 research skill workflows.
No third-party dependencies or network required.
"""
import json
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / "docs"

class ReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.referenced = []
        self.controls = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if d.get("id"):
            self.ids.append(d["id"])
        for k in ("href", "src"):
            path = d.get(k, "")
            if path and not path.startswith(("http:", "https:", "#", "mailto:", "data:")):
                self.referenced.append(unquote(path.split("#")[0].split("?")[0]))
        if d.get("aria-controls"):
            self.controls.extend(d["aria-controls"].split())

class StyleSkillTests(unittest.TestCase):
    def test_catalog_counts_unique_and_exact_source_copies(self):
        for stem, list_key, folder, expected in (
            ("style-directions", "styles", "styles", 48),
            ("agent-skills", "skills", "skills", 16),
        ):
            original = ROOT / "catalog" / (stem + ".json")
            mirrored = DOCS / "data" / ("styles.json" if folder == "styles" else "skills.json")
            self.assertEqual(original.read_bytes(), mirrored.read_bytes())
            items = json.loads(original.read_text(encoding="utf-8"))[list_key]
            self.assertEqual(len(items), expected)
            self.assertEqual(len({i["id"] for i in items}), expected)
            for item in items:
                original_prompt = ROOT / "prompts" / folder / (item["id"] + ".md")
                website_prompt = DOCS / "prompts" / folder / (item["id"] + ".md")
                self.assertEqual(original_prompt.read_bytes(), website_prompt.read_bytes())
                self.assertIn("four", original_prompt.read_text(encoding="utf-8").lower())
        styles = json.loads((ROOT / "catalog/style-directions.json").read_text())["styles"]
        self.assertEqual(sum(s["target"] == "website" for s in styles), 24)
        self.assertEqual(sum(s["target"] == "app" for s in styles), 24)

    def test_every_public_page_navigation_and_assets(self):
        pages = ("index", "websites", "apps", "motion", "principles", "styles", "skills")
        for name in pages:
            path = DOCS / (name + ".html")
            self.assertTrue(path.exists(), name)
            content = path.read_text(encoding="utf-8")
            parser = ReferenceParser()
            parser.feed(content)
            self.assertEqual(len(parser.ids), len(set(parser.ids)), "Duplicate DOM id " + name)
            for id in parser.controls:
                self.assertIn(id, parser.ids, name + ": " + id)
            for ref in parser.referenced:
                self.assertTrue((path.parent / ref).resolve().is_file(), name + " -> " + ref)
            self.assertIn('./websites.html', content)
            self.assertIn('./apps.html', content)
            self.assertIn('./styles.html', content)
            self.assertIn('./skills.html', content)
        self.assertIn('199 ORIGINAL PROMPTS', (DOCS / 'index.html').read_text())

    def test_scripts_have_safe_prompts_and_no_external_vendor_runtime(self):
        style = (DOCS / "style-lab.js").read_text(encoding="utf-8")
        skill = (DOCS / "skill-lab.js").read_text(encoding="utf-8")
        css = (DOCS / "style-lab.css").read_text(encoding="utf-8")
        for script in (style, skill):
            self.assertIn('fetch(', script)
            self.assertIn('navigator.clipboard', script)
            self.assertNotIn('eval(', script)
            self.assertNotIn('new Function(', script)
            self.assertNotIn('cdn.', script)
        self.assertIn("prefers-reduced-motion", css)
        self.assertIn("charCodeAt(0)===34", style)
        self.assertIn("selected.size>=3", skill)
        self.assertIn('aria-pressed', style)

    def test_original_source_attribution_and_license_conflict(self):
        text = (ROOT / "research" / "agent-skill-resources.md").read_text(encoding="utf-8")
        for repo in ('emilkowalski/skills', 'zhangchenchen/UIPromptExplorer',
                     'nextlevelbuilder/ui-ux-pro-max-skill',
                     'freshtechbro/claudedesignskills'):
            self.assertIn(repo, text)
        self.assertIn("Apache", text)
        self.assertIn("README", text)
        self.assertIn("MIT", text)
        self.assertIn("not copied", text)

if __name__ == "__main__":
    unittest.main()
