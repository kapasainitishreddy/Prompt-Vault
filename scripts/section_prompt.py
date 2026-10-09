#!/usr/bin/env python3
"""Compose vendor-neutral, section-specific prompts without API keys or paid services.

This tool never invokes a model or downloads/copies vendor components.
Python 3.9+. Independent of the bounded loop manager.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

ROOT = Path(__file__).resolve().parents[1]
CATALOGS = {
    "website": ROOT / "catalog" / "website-sections.json",
    "app": ROOT / "catalog" / "app-flows.json",
}
LOCATIONS = {
    "website": ROOT / "prompts" / "website" / "sections",
    "app": ROOT / "prompts" / "app" / "flows",
}
RECIPES_PATH = ROOT / "prompts" / "motion"
TOKEN = re.compile(r"\{\{([A-Z_]+)\}\}")
VALID_ID = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
INTENSITIES = ("off", "quiet", "expressive", "cinematic")


def catalog(track: str) -> List[Dict[str, Any]]:
    if track not in CATALOGS:
        raise ValueError("Unknown track: " + track)
    value = json.loads(CATALOGS[track].read_text(encoding="utf-8"))
    entries = value["sections"] if track == "website" else value["flows"]
    if not isinstance(entries, list):
        raise ValueError("Invalid catalog format")
    ids = [entry["id"] for entry in entries]
    if len(set(ids)) != len(ids) or any(not VALID_ID.fullmatch(name) for name in ids):
        raise ValueError("Catalog has duplicate or unsafe section IDs")
    return entries


def recipe_ids() -> List[str]:
    data = json.loads((ROOT / "catalog" / "motion-recipes.json").read_text(encoding="utf-8"))
    ids = [entry["id"] for entry in data["recipes"]]
    if len(set(ids)) != len(ids) or any(not VALID_ID.fullmatch(name) for name in ids):
        raise ValueError("Motion catalog contains invalid IDs")
    return ids


def fill(template: str, variables: Dict[str, str]) -> str:
    text = template
    for key, value in variables.items():
        if not isinstance(value, str):
            raise ValueError("Prompt replacement values must be strings")
        text = text.replace("{{" + key + "}}", value)
    missing = TOKEN.findall(text)
    if missing:
        raise ValueError("Unfilled placeholders: " + ", ".join(sorted(set(missing))))
    return text


def render_section(
    track: str,
    section: str,
    brief: str,
    *,
    intensity: str = "quiet",
    recipe: Optional[str] = None,
    route: str = "",
    real_content: str = "",
    stack: str = "",
    platforms: str = "",
    status: str = "",
    style: str = "",
    context: str = "",
    component: str = "",
) -> str:
    if intensity not in INTENSITIES:
        raise ValueError("Motion intensity must be off, quiet, expressive or cinematic")
    if not brief.strip():
        raise ValueError("Brief cannot be blank")
    ids = {item["id"] for item in catalog(track)}
    if section not in ids:
        raise ValueError("Section '" + section + "' is not in " + track + " catalog")

    variables = {
        "PROJECT_BRIEF": brief.strip(),
        "SECTION_ROUTE": route or "Inspect current route, do not guess a destination.",
        "REAL_CONTENT": real_content or "Inspect existing project content and mark anything absent or unverified.",
        "PROJECT_CONSTRAINTS": stack or "Inspect existing project and preserve working services and behavior.",
        "STYLE_NOTES": style or "Use real brand constraints; no arbitrary default gradients/card grids.",
        "ITERATION_CONTEXT": context or "First round; no observed prior review.",
        "PLATFORMS": platforms or "Discover supported targets from repository; do not claim device tests.",
        "IMPLEMENTATION_STATUS": status or "Inspect repository: distinguish implemented, mocked and missing.",
        "COMPONENT": component or "The requested section or flow.",
        "STACK": stack or "Use the project's existing framework; no rewrites for animation alone.",
        "INTENSITY": intensity,
    }
    path = LOCATIONS[track] / (section + ".md")
    text = fill(path.read_text(encoding="utf-8"), variables)
    control = (
        "\n\n---\n\n## Motion-level override for this run\n\n"
        "Selected intensity: **" + intensity.upper() + "**. "
    )
    if intensity == "off":
        control += (
            "Do not implement non-essential spatial animations. Provide static "
            "semantic feedback; do not install animation dependencies."
        )
    elif intensity == "quiet":
        control += "Use small state-driven animations. No ambient loop or mandatory loading."
    elif intensity == "expressive":
        control += (
            "Allow one signature effect tied to the section's job, with restrained "
            "secondary microfeedback; no default persistent effects."
        )
    else:
        control += (
            "Cinematic motion was explicitly selected. Permit one optional/skippable "
            "storytelling moment, but never obscure primary controls, delay tasks "
            "or override reduced-motion preferences."
        )
    if recipe is not None:
        if recipe not in recipe_ids():
            raise ValueError("Unknown motion recipe: " + recipe)
        motion = fill((RECIPES_PATH / (recipe + ".md")).read_text(encoding="utf-8"), variables)
        if intensity == "off":
            control += (
                "\n\nThe motion recipe below is included **for static-fallback analysis only**. "
                "Its non-essential animation instructions are overridden by OFF mode."
            )
        control += "\n\n---\n\n## Optional specialized motion recipe\n\n" + motion
    return text + control + "\n"


def list_catalogs(track: Optional[str]) -> str:
    lines = []
    for name in ((track,) if track else ("website", "app")):
        lines.append(name.upper() + " SECTIONS")
        for entry in catalog(name):
            lines.append("  " + entry["id"].ljust(23) + entry["title"])
    lines.append("MOTION RECIPES")
    for name in recipe_ids():
        lines.append("  " + name)
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--list", action="store_true", help="List all sections and motion recipes")
    parser.add_argument("--track", choices=sorted(CATALOGS))
    parser.add_argument("--section", help="Catalog section ID to generate")
    parser.add_argument("--brief", type=Path, help="File containing real product information")
    parser.add_argument("--intensity", choices=INTENSITIES, default="quiet")
    parser.add_argument("--recipe", help="Optional named motion recipe from catalog")
    parser.add_argument("--route", default="")
    parser.add_argument("--real-content", default="")
    parser.add_argument("--stack", default="")
    parser.add_argument("--platforms", default="")
    parser.add_argument("--status", default="")
    parser.add_argument("--style", default="")
    parser.add_argument("--context", default="")
    parser.add_argument("--component", default="")
    parser.add_argument("--output", type=Path, help="Write final prompt instead of stdout")
    args = parser.parse_args()
    try:
        if args.list:
            print(list_catalogs(args.track), end="")
            return 0
        if not args.track or not args.section or not args.brief:
            raise ValueError("Provide --track, --section and --brief (or --list)")
        brief = args.brief.read_text(encoding="utf-8")
        result = render_section(
            args.track, args.section, brief, intensity=args.intensity,
            recipe=args.recipe, route=args.route, real_content=args.real_content,
            stack=args.stack, platforms=args.platforms, status=args.status,
            style=args.style, context=args.context, component=args.component,
        )
        if args.output:
            path = args.output.resolve()
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(result, encoding="utf-8")
            print("Created: " + str(path))
        else:
            print(result, end="")
        return 0
    except (OSError, ValueError, KeyError, json.JSONDecodeError) as exc:
        print("Section prompt error: " + str(exc), file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
