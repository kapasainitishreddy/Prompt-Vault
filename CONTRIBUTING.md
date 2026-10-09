# Contributing to Prompt-Vault

**New section or motion recipe:** add a unique entry to the correct `catalog/*.json`, a corresponding fully copyable prompt under `prompts/website/sections`, `prompts/app/flows`, or `prompts/motion`, and update the appropriate index. Cover motion/off, real states, anti-slop, mobile and accessibility; retain four-round bound. Do not vendor Canvas UI, Originkit catalog, Kombai screenshots, unknown Oneko skins or Bencho site art into MIT without explicit separate rights.

Prompt-Vault is a practical, permissively licensed toolbox, not a gallery of untested adjectives.

1. Keep the **website** and **app** tracks separate. Put shared tests and critique rules under prompts/shared.
2. Include a real **brief**, three contrasting approaches where relevant, and concrete output requirements. A prompt should work with any mainstream model without proprietary commands.
3. Every claimed design improvement should have observable evidence: screenshots at named sizes, task walkthroughs, accessibility review, or measured performance. No fabricated user research or evidence.
4. Explain why a component pattern fits its context, **where it fails**, and its keyboard/assistive technology behavior.
5. Cite original research/standards by title, URL and year. Distinguish empirical results from our proposed heuristics. Do not upload copyrighted paper PDFs.
6. When linking external source, verify its exact current license. Clearly flag additional clauses, assets with separate licenses, premium-only examples and attribution requirements.
7. Do not submit copied visual identities, commissioned assets, screenshots of existing products presented as original, or fake testimonials.
8. A runnable example should have semantic HTML, responsive layout, visible focus styles, no unnecessary external dependencies, and reduced-motion handling where animated.
9. For the loop runner, run `python3 -m unittest discover -s tests -v`; keep it dependency-free and protect bounded stopping behavior.
10. Keep additions readable, small, and focused. PRs should describe user problem, before/after, accessibility changes, and remaining known problems.

**Suggested submission:** problem, target users, design constraints, 3 explored variants, selected direction, observed test evidence, licenses checked and reproducible steps.
