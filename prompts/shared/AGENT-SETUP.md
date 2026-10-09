# Agent setup and reusable prompts

These prompt files are **vendor neutral**: no magic token, model-specific proprietary command or external server is required.

## For a coding agent with browser/device tools

1. Provide project repository/workspace and the filled appropriate brief.
2. Paste either `prompts/website/LOOP.md` or `prompts/app/LOOP.md`.
3. Explicitly allow changes only in the intended project and require screenshots from actual browser/emulator.
4. Allow an implementation and review loop for at most 4 rounds; require test commands and evidenced results.
5. If the agent cannot inspect screenshots or run the platform, stop and report missing validation instead of guessing.

## For ChatGPT or a model without repo write permission

Request three proposals and a wireframe, then code for the chosen concept. Move the generated files into your project yourself. Capture screenshots and paste them back with **CRITIC.md** for grounded iteration. Re-run until gates pass or budget expires.

## For a team

- Product owner: brief, real proof, critical task and brand constraints.
- Designer: direction choice, typography, density, visual signature.
- Engineer: functional states, responsive behavior, a11y and regression.
- Reviewer: task walkthrough, screenshots, licenses and signoff.

Do not let the same assistant self-certify a production release without evidence. Humans remain responsible for accessibility conformance, device validation and correctness.

## Examples of useful feedback

**Helpful:** "At 390px the H1 wraps over the CTA; screenshot screen-03.png; reduce display size and restructure grid. Navigation on keyboard loses focus after menu opens; fix, rerun."

**Not helpful:** "Make it premium and modern", "Add animations everywhere", "Continue until perfect", "Design like Apple", or "100/100, ship it" with no tests.
