"""Repository checks for public, self-contained, correctly linked section prompts.

No external network, browser, paid API or CI runner is required.
"""
import re
import unittest
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
MARKDOWN_LINK = re.compile(r"\[[^\]]+\]\(([^)]+)\)")
EXTERNAL = ("http://", "https://", "mailto:", "data:", "#")


class RepositoryIntegrityTests(unittest.TestCase):
    def test_internal_markdown_links_resolve(self):
        broken = []
        for doc in ROOT.rglob("*.md"):
            if ".design-runs" in doc.parts:
                continue
            text = doc.read_text(encoding="utf-8")
            for match in MARKDOWN_LINK.finditer(text):
                target = match.group(1).strip()
                if not target or target.startswith(EXTERNAL):
                    continue
                # URL fragments and minimal quoting are supported. Relative only.
                target = unquote(target.split("#", 1)[0].strip("<>"))
                if not target:
                    continue
                resolved = (doc.parent / target).resolve()
                if not resolved.is_relative_to(ROOT.resolve()):
                    broken.append(f"{doc.relative_to(ROOT)} escapes root: {target}")
                elif not resolved.exists():
                    broken.append(f"{doc.relative_to(ROOT)} -> {target}")
        self.assertEqual(broken, [])

    def test_all_original_html_examples_respect_reduced_motion(self):
        for path in (ROOT / "examples").glob("*.html"):
            text = path.read_text(encoding="utf-8")
            self.assertIn("prefers-reduced-motion", text, str(path))
            self.assertIn("viewport", text, str(path))
            self.assertFalse(re.search(r'https?://[^" ]+\.js', text), "No remote JS dependencies in example")

    def test_resource_rights_cannot_be_misread_as_unrestricted(self):
        doc = (ROOT / "research" / "supplied-resources.md").read_text(encoding="utf-8")
        for marker in ("Commons Clause", "Originkit", "Bencho", "Oneko", "Kombai", "VengeanceUI", "ObsidianUI"):
            self.assertIn(marker, doc)
        self.assertIn("not relicensed", doc.lower())
        self.assertIn("reference", doc.lower())

    def test_catalog_and_flow_prompts_explain_testing(self):
        for folder in (ROOT / "prompts" / "website" / "sections",
                       ROOT / "prompts" / "app" / "flows"):
            entries = sorted(folder.glob("*.md"))
            self.assertEqual(len(entries), 32)
            for path in entries:
                text = path.read_text(encoding="utf-8").lower()
                for marker in ("motion", "keyboard", "four rounds", "reduced", "anti-slop"):
                    self.assertIn(marker, text, str(path))

    def test_motion_recipe_docs_are_self_contained(self):
        entries = sorted((ROOT / "prompts" / "motion").glob("*.md"))
        self.assertEqual(len(entries), 24)  # 23 recipes + the index
        for path in entries:
            text = path.read_text(encoding="utf-8").lower()
            self.assertIn("reduced", text)
            self.assertIn("license", text)


if __name__ == "__main__":
    unittest.main()
