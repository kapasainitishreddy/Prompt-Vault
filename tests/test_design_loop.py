"""Behavioral tests for the model-neutral design loop; no external packages."""
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "design_loop.py"


class DesignLoopTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.brief = self.root / "brief.md"
        self.brief.write_text("# A real product\nAudience: editors\nGoal: save a draft.\n", encoding="utf-8")
        self.workspace = self.root / "run"

    def command(self, *parts, expect=0):
        result = subprocess.run(
            [sys.executable, str(SCRIPT), *parts],
            capture_output=True, text=True, encoding="utf-8", check=False
        )
        self.assertEqual(result.returncode, expect, result.stdout + result.stderr)
        return result

    def initialize(self, track="website", max_iterations=4):
        return self.command(
            "init", "--track", track, "--brief", str(self.brief),
            "--workspace", str(self.workspace), "--max-iterations", str(max_iterations)
        )

    def current_card(self, n=1):
        path = self.workspace / f"round-{n:02d}" / "scorecard.json"
        return path, json.loads(path.read_text(encoding="utf-8"))

    def fill_card(self, n=1, score=9, evidence=True, issue=None):
        path, card = self.current_card(n)
        for key in card["scores"]:
            card["scores"][key] = score
        for key in card["evidence"]:
            card["evidence"][key] = evidence
            card["evidence_notes"][key] = f"Observed: {key} at artifact-or-test-path"
        card["review_notes"] = ["Observed CTA, keyboard and page states; see test log."]
        if issue:
            card["issues"].append(issue)
        path.write_text(json.dumps(card), encoding="utf-8")

    def test_init_creates_usable_prompt_and_unticked_scorecard(self):
        self.initialize()
        prompt = (self.workspace / "round-01" / "prompt.md").read_text(encoding="utf-8")
        self.assertIn("A real product", prompt)
        self.assertNotIn("{{PROJECT_BRIEF}}", prompt)
        _, card = self.current_card()
        self.assertTrue(all(not v for v in card["evidence"].values()))

    def test_unverified_evidence_never_passes(self):
        self.initialize()
        self.fill_card(evidence=False)
        report = self.command("advance", "--workspace", str(self.workspace))
        self.assertIn('"passed": false', report.stdout)
        self.assertTrue((self.workspace / "round-02" / "prompt.md").exists())

    def test_qualified_round_passes_and_stops(self):
        self.initialize("app")
        self.fill_card()
        out = self.command("advance", "--workspace", str(self.workspace))
        self.assertIn('"status": "passed"', out.stdout)
        self.assertFalse((self.workspace / "round-02").exists())
        self.command("advance", "--workspace", str(self.workspace), expect=2)

    def test_p1_never_passes_on_high_scores(self):
        self.initialize()
        self.fill_card(issue={"severity": "P1", "description": "Primary CTA unreachable"})
        output = self.command("advance", "--workspace", str(self.workspace))
        self.assertIn("P0/P1 blockers", output.stdout)
        self.assertTrue((self.workspace / "round-02").exists())

    def test_bounded_failure_stops(self):
        self.initialize(max_iterations=1)
        self.fill_card(score=0, evidence=False)
        output = self.command("advance", "--workspace", str(self.workspace))
        self.assertIn('"status": "needs-human-review"', output.stdout)
        self.assertFalse((self.workspace / "round-02").exists())

    def test_invalid_score_rejected_without_advancing(self):
        self.initialize()
        self.fill_card()
        path, card = self.current_card()
        card["scores"][next(iter(card["scores"]))] = 11
        path.write_text(json.dumps(card), encoding="utf-8")
        self.command("advance", "--workspace", str(self.workspace), expect=2)
        state = json.loads((self.workspace / "state.json").read_text(encoding="utf-8"))
        self.assertEqual(state["current_iteration"], 1)

    def test_initialization_does_not_overwrite_work(self):
        self.initialize()
        self.command("init", "--track", "website", "--brief", str(self.brief),
                     "--workspace", str(self.workspace), expect=2)

    def test_special_minimum_enforced(self):
        self.initialize()
        self.fill_card()
        path, card = self.current_card()
        card["scores"]["distinctiveness"] = 7
        path.write_text(json.dumps(card), encoding="utf-8")
        output = self.command("advance", "--workspace", str(self.workspace))
        self.assertIn("distinctiveness=7", output.stdout)


if __name__ == "__main__":
    unittest.main()
