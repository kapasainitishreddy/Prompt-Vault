# Section and motion playbook

**Separate workflows, shared craft.**
- [32 website section prompts](../website/SECTIONS.md)
- [32 app UI/UX flow prompts](../app/FLOWS.md)
- [23 named motion recipes](../motion/README.md)
- [Motion Director](MOTION-DIRECTOR.md)
- [Anti-slop reviewer](ANTI-SLOP-AUDIT.md)
- [Reference & licensing protocol](REFERENCE-PROTOCOL.md)

Choose **one** section/flow, then (optionally) **one** motion recipe. Use the existing track-wide [website loop](../website/LOOP.md) / [app loop](../app/LOOP.md) to keep full-page coherence. Do not run 32 effect prompts on the same page.

### Default selection heuristic

- Editorial/marketing: one focal hero entrance or product demo; small UI feedback elsewhere.
- Dashboard/task app: state-driven animations, no ambient wallpaper animation.
- Portfolio/storytelling: deliberate section choreography with accessible fallbacks.
- Checkout/auth/consent: microfeedback only, rapid and verifiable.
- Playful hobby page: cursor pet may be opt-in; disable by default on touch and reduced motion.

## How to run section-specific loop

```bash
python3 scripts/design_loop.py init --track website --section hero --motion-level expressive \
  --brief examples/website-brief-filled.md --workspace .design-runs/hero
```

To generate one copy-pastable standalone prompt:

```bash
python3 scripts/section_prompt.py --track website --section pricing \
  --brief examples/website-brief-filled.md --intensity quiet --recipe tab-content
```

Source restrictions and research: [supplied resources](../../research/supplied-resources.md).
