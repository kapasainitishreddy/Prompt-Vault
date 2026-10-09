# NO AI SLOP · adversarial design reviewer

This is a **rejection and repair protocol** for any website/app section, not a magical originality detector. Inspect the actual rendered implementation, not just source. Give specific criticism instead of generic "make premium".

## Independent review axes

1. **Product specificity:** Could I replace the logo, noun and accent color with a random SaaS brand and keep this exact layout? If yes, flag the specific generic elements. Require 3 decisions that could not survive a product swap.
2. **Composition:** Repetitive centered sections, evenly spaced 3-card rows, universal bento, every page feeling the same? Require intentional contrast in density, width, scale, rhythm and story.
3. **Typography:** Display font default, same weight everywhere, weak paragraph measures, all caps labels too small? Define functional roles and test real text/other scripts.
4. **Color and surface:** Unjustified lavender/cyan blobs, endless glass, fuzzy black-on-black, gradients in every headline? Develop meaningful semantic color architecture and test contrast.
5. **Media and proof:** Repeated stock character, fake UI screenshot, uncited logo strip, fabricated growth stats, unsourced testimonial? Delete claims lacking evidence, use original CSS/SVG and actual product captures.
6. **Animation:** Are things moving because of interaction/story/state, or just to look AI-fancy? Remove constant wiggling, scrolljacking, non-consensual cursor chase and anything covering controls. Ensure reduced motion.
7. **Real functionality:** Do controls work and errors recover, or is this a static Dribbble shell? Test at least one primary job, one failure state and keyboard.
8. **Responsive specificity:** Does 360px genuinely recompose content or just squish a desktop canvas? Check short and tall devices, 200% zoom and large localized text.
9. **Accessibility:** Semantic HTML/native role, focus, labels, target size, contrast, assistive announcements, touch alternatives.
10. **Coherence and restraint:** Remove at least one visual flourish that doesn't serve comprehension. Keep authored rhythm across connected sections. Originality is not random inconsistency.

## Scoring (local rubric, not scientific)

Score each 0–10 with observed evidence: identity, hierarchy, information clarity, task success, motion meaning, accessibility, responsiveness, content truth, restraint, and performance. **A design is rejected if identity <8**, a critical task fails, P0/P1 is found, or a major claim is fabricated, even if screenshots look stylish.

For a weak section, output:
- **Three exact slop tells:** location/screenshots, why generic or harmful.
- **Three product-led redesign options:** one editorial, one demonstrative, one structurally unexpected; each changes at least 3 design axes.
- **Selected change:** justified by task, semantics, cost, and consistency with brand.
- **Repair patch:** actual changed files, not a new empty prototype.
- **Verification:** observed 360px/1440px capture, accessible input, performance check and motion-off equivalent.
- **Stop:** after four iterations maximum; human review if no evidenced pass.

## Detecting false taste

- Elegant type alone doesn't mean useful design.
- Maximal animation doesn't mean thoughtful motion.
- Passing Lighthouse doesn't mean an app workflow is usable.
- Synthetically generated personas are **not** interviews.
- A 90/100 score from the designing model with no screenshots and tests is **not validation**.
- OSI-compatible license is not inherited from a tool whose website calls itself open source. Check the actual component.

**No rigid style blacklist.** Purple, bento, glass, gradients, kinetic type and cards are legitimate when relevant. Reject **unjustified defaults**, not a color or effect in isolation.
