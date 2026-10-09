#!/usr/bin/env python3
"""Model-neutral, dependency-free *human-reviewed* design prompt loop.

The runner never calls an LLM and never pretends it has seen a screenshot.
Python 3.9+; no shell execution, network requests, or external dependencies.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[1]
TRACKS = {
    "website": ROOT / "prompts" / "website" / "LOOP.md",
    "app": ROOT / "prompts" / "app" / "LOOP.md",
}
ORDER = {"P0": 0, "P1": 1, "P2": 2, "P3": 3}


def load_json(path: Path) -> Dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(value, dict):
        raise ValueError(f"Expected JSON object: {path}")
    return value


def write_json(path: Path, payload: Dict[str, Any]) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def rubric_for(track: str) -> Dict[str, Any]:
    rubric = load_json(ROOT / "rubrics" / f"{track}.json")
    if rubric["track"] != track or sum(rubric["dimensions"].values()) != 100:
        raise ValueError("Invalid rubric: weights must sum to 100 and track must match")
    return rubric


def new_scorecard(rubric: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "_instructions": "Set 0–10 numeric scores. Mark evidence true ONLY when observed, fill its evidence_notes with a screenshot path, log or test observation. Add review_notes and unresolved issues.",
        "scores": {name: 0 for name in rubric["dimensions"]},
        "evidence": {name: False for name in rubric["required_evidence"]},
        "evidence_notes": {name: "" for name in rubric["required_evidence"]},
        "issues": [],
        "review_notes": [],
    }


def create_round(workspace: Path, iteration: int, state: Dict[str, Any], context: str) -> None:
    location = workspace / f"round-{iteration:02d}"
    if location.exists():
        raise ValueError(f"Refusing to overwrite existing round: {location}")
    location.mkdir(parents=True)
    rubric = rubric_for(state["track"])
    template = TRACKS[state["track"]].read_text(encoding="utf-8")
    replacements = {
        "{{PROJECT_BRIEF}}": (workspace / "brief.md").read_text(encoding="utf-8"),
        "{{ITERATION_CONTEXT}}": context,
        "{{QUALITY_GATES}}": json.dumps(
            {
                "minimum_score": rubric["min_total"],
                "min_dimension": rubric["min_dimension"],
                "special_minimums": rubric["special_minimums"],
                "required_evidence": rubric["required_evidence"],
                "blockers": rubric["blocking_severities"],
                "iteration": iteration,
                "last_iteration": state["max_iterations"],
            }, indent=2
        ),
    }
    for placeholder, replacement in replacements.items():
        template = template.replace(placeholder, replacement)
    if any(token in template for token in replacements):
        raise ValueError("Unfilled prompt placeholder")
    (location / "prompt.md").write_text(template, encoding="utf-8")
    write_json(location / "scorecard.json", new_scorecard(rubric))


def assess(scorecard: Dict[str, Any], rubric: Dict[str, Any]) -> Dict[str, Any]:
    weights = rubric["dimensions"]
    scores = scorecard.get("scores")
    if not isinstance(scores, dict) or set(scores) != set(weights):
        raise ValueError(f"Scores must contain exactly: {', '.join(weights)}")
    for name, value in scores.items():
        if isinstance(value, bool) or not isinstance(value, (int, float)) or not 0 <= value <= 10:
            raise ValueError(f"Score '{name}' must be a number between 0 and 10")

    score = round(sum(scores[name] * weight / 10 for name, weight in weights.items()), 1)
    evidence = scorecard.get("evidence")
    details = scorecard.get("evidence_notes")
    if not isinstance(evidence, dict) or not isinstance(details, dict):
        raise ValueError("evidence and evidence_notes must be objects")
    missing = [
        name for name in rubric["required_evidence"]
        if evidence.get(name) is not True or not isinstance(details.get(name), str)
        or not details[name].strip()
    ]
    notes = scorecard.get("review_notes")
    if not isinstance(notes, list) or any(not isinstance(n, str) for n in notes):
        raise ValueError("review_notes must be a list of strings")
    if not any(n.strip() for n in notes):
        missing.append("concrete_review_notes")

    issues = scorecard.get("issues")
    if not isinstance(issues, list):
        raise ValueError("issues must be a list")
    for issue in issues:
        if not isinstance(issue, dict) or issue.get("severity") not in ORDER:
            raise ValueError("Each issue needs a severity P0/P1/P2/P3")
        if not isinstance(issue.get("description"), str) or not issue["description"].strip():
            raise ValueError("Each issue needs a nonempty description")
    blockers = [issue for issue in issues if issue["severity"] in rubric["blocking_severities"]]
    below = {
        key: value for key, value in scores.items()
        if value < max(rubric["min_dimension"], rubric["special_minimums"].get(key, 0))
    }
    reasons = []
    if score < rubric["min_total"]:
        reasons.append(f"score {score}/100 < {rubric['min_total']}")
    if below:
        reasons.append("low dimensions: " + ", ".join(f"{k}={v}" for k, v in below.items()))
    if blockers:
        reasons.append(f"{len(blockers)} P0/P1 blockers")
    if missing:
        reasons.append("missing evidence: " + ", ".join(missing))
    return {
        "total": score,
        "passed": not reasons,
        "reasons": reasons,
        "below_minimum": below,
        "missing_evidence": missing,
        "blocking_issues": blockers,
    }


def next_context(report: Dict[str, Any], card: Dict[str, Any]) -> str:
    ordered = sorted(card["issues"], key=lambda i: ORDER[i["severity"]])
    return (
        "A prior design exists. INSPECT AND PRESERVE WORKING CODE. "
        "Repair only the largest observed issues, then rerender and retest.\n\n"
        "PREVIOUS ASSESSMENT:\n" + json.dumps(report, indent=2, ensure_ascii=False) +
        "\n\nOBSERVATIONS:\n" + "\n".join("- " + n for n in card["review_notes"]) +
        "\n\nISSUES (priority order):\n" + "\n".join(
            "- " + i["severity"] + ": " + i["description"] +
            (" | Suggested fix: " + str(i.get("fix")) if i.get("fix") else "")
            for i in ordered
        ) +
        "\n\nDo not infer unknown verification from a score. Keep a regression log."
    )


def initialize(args: argparse.Namespace) -> None:
    workspace = args.workspace.resolve()
    if workspace.exists() and any(workspace.iterdir()):
        raise ValueError("Workspace is not empty; refusing to overwrite existing design work")
    brief = args.brief.resolve()
    if not brief.is_file() or not brief.read_text(encoding="utf-8").strip():
        raise ValueError("Provide a readable, nonempty brief file")
    if not 1 <= args.max_iterations <= 4:
        raise ValueError("max-iterations must be between 1 and 4")
    rubric_for(args.track)
    workspace.mkdir(parents=True, exist_ok=True)
    (workspace / "brief.md").write_text(brief.read_text(encoding="utf-8"), encoding="utf-8")
    state = {
        "track": args.track,
        "current_iteration": 1,
        "max_iterations": args.max_iterations,
        "status": "active",
        "history": [],
    }
    create_round(workspace, 1, state, "First iteration; no observed prior results.")
    write_json(workspace / "state.json", state)
    print(f"Ready: {workspace / 'round-01' / 'prompt.md'}")
    print("Review observed output and fill round-01/scorecard.json. Then run 'advance'.")


def advance(args: argparse.Namespace) -> None:
    workspace = args.workspace.resolve()
    state = load_json(workspace / "state.json")
    if state.get("status") != "active":
        raise ValueError(f"Loop is already stopped: {state.get('status')}")
    current = state["current_iteration"]
    card = load_json(workspace / f"round-{current:02d}" / "scorecard.json")
    report = assess(card, rubric_for(state["track"]))
    record = {"iteration": current, "total": report["total"], "passed": report["passed"],
              "reasons": report["reasons"]}
    new_history = state["history"] + [record]
    if report["passed"]:
        new_state = {**state, "status": "passed", "history": new_history}
    elif current >= state["max_iterations"]:
        new_state = {**state, "status": "needs-human-review", "history": new_history}
    else:
        new_state = {**state, "current_iteration": current + 1, "history": new_history}
        create_round(workspace, current + 1, new_state, next_context(report, card))
    write_json(workspace / f"round-{current:02d}" / "assessment.json", report)
    write_json(workspace / "state.json", new_state)
    print(json.dumps(
        {"status": new_state["status"], "completed_iteration": current, **report},
        indent=2, ensure_ascii=False
    ))
    if new_state["status"] == "active":
        print(f"Next prompt: {workspace / f'round-{current + 1:02d}' / 'prompt.md'}")
    elif new_state["status"] == "needs-human-review":
        print("Iteration budget exhausted. Review evidence and issues; no infinite loop.")


def status(args: argparse.Namespace) -> None:
    state = load_json(args.workspace.resolve() / "state.json")
    print(json.dumps(state, indent=2, ensure_ascii=False))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    init_parser = sub.add_parser("init", help="Create first prompt, review form and state")
    init_parser.add_argument("--track", required=True, choices=sorted(TRACKS))
    init_parser.add_argument("--brief", required=True, type=Path)
    init_parser.add_argument("--workspace", required=True, type=Path)
    init_parser.add_argument("--max-iterations", type=int, default=4)
    advance_parser = sub.add_parser("advance", help="Score current round and create next prompt")
    advance_parser.add_argument("--workspace", required=True, type=Path)
    status_parser = sub.add_parser("status", help="Read current state")
    status_parser.add_argument("--workspace", required=True, type=Path)
    args = parser.parse_args()
    try:
        {"init": initialize, "advance": advance, "status": status}[args.command](args)
        return 0
    except (OSError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print(f"Design loop error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
