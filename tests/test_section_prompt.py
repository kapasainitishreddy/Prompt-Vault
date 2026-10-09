"""Tests for the section prompt composer and source files. Stdlib only."""
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from section_prompt import catalog, fill, recipe_ids, render_section  # noqa: E402

SCRIPT = ROOT / "scripts" / "section_prompt.py"


class SectionPromptTests(unittest.TestCase):
    def test_catalog_counts_and_unique_ids(self):
        self.assertEqual(len(catalog("website")), 32)
        self.assertEqual(len(catalog("app")), 32)
        self.assertEqual(len(recipe_ids()), 23)

    def test_source_files_exist_for_each_entry(self):
        for track in ("website", "app"):
            folder = "sections" if track == "website" else "flows"
            for entry in catalog(track):
                path = ROOT / "prompts" / track / folder / (entry["id"] + ".md")
                self.assertTrue(path.is_file(), str(path))
                text = path.read_text(encoding="utf-8")
                self.assertIn("four rounds", text.lower())
                self.assertIn("motion", text.lower())
                self.assertIn("{{PROJECT_BRIEF}}", text)
        for effect in recipe_ids():
            text = (ROOT / "prompts" / "motion" / (effect + ".md")).read_text()
            self.assertIn("reduced-motion", text.lower())
            self.assertIn("license", text.lower())

    def test_web_prompt_is_self_contained(self):
        prompt = render_section(
            "website", "hero", "An open source tool for developers",
            intensity="expressive", recipe="ascii-sweep",
        )
        self.assertIn("An open source tool for developers", prompt)
        self.assertIn("ASCII sweep", prompt)
        self.assertIn("EXPRESSIVE", prompt)
        self.assertNotIn("{{", prompt)
        self.assertIn("product", prompt.lower())

    def test_app_prompt_has_real_states(self):
        prompt = render_section("app", "offline-sync", "Offline field notes", intensity="quiet")
        self.assertIn("sync", prompt.lower())
        self.assertIn("device", prompt.lower())
        self.assertNotIn("{{", prompt)

    def test_off_overrides_motion(self):
        prompt = render_section("website", "hero", "Sample", intensity="off", recipe="ascii-sweep")
        self.assertIn("static-fallback analysis only", prompt)
        self.assertIn("Do not implement non-essential spatial animations", prompt)

    def test_path_traversal_and_unknown_recipe_fail(self):
        for bad in ("../README", "../../secrets", "anything-unknown"):
            with self.assertRaises(ValueError):
                render_section("website", bad, "Sample")
        with self.assertRaises(ValueError):
            render_section("website", "hero", "Sample", recipe="../../stuff")

    def test_unfilled_placeholder_rejected(self):
        with self.assertRaises(ValueError):
            fill("Hello {{UNKNOWN_TOKEN}}", {"PROJECT_BRIEF": "X"})

    def test_cli_list_and_output(self):
        listed = subprocess.run([sys.executable, str(SCRIPT), "--list", "--track", "website"],
                                capture_output=True, text=True, check=False)
        self.assertEqual(listed.returncode, 0, listed.stderr)
        self.assertIn("hero", listed.stdout)
        with tempfile.TemporaryDirectory() as directory:
            src = Path(directory) / "brief.md"
            dest = Path(directory) / "created.md"
            src.write_text("Real human-focused product", encoding="utf-8")
            run = subprocess.run(
                [sys.executable, str(SCRIPT), "--track", "app", "--section", "onboarding",
                 "--brief", str(src), "--recipe", "tab-content", "--output", str(dest)],
                capture_output=True, text=True, check=False,
            )
            self.assertEqual(run.returncode, 0, run.stderr)
            self.assertIn("Real human-focused product", dest.read_text(encoding="utf-8"))
            self.assertNotIn("{{", dest.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
