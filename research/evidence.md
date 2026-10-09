# Research evidence -> design rules

This is a living **reading list and evidence map**, reviewed October 8, 2026. It does not imply that a paper endorses our particular scores, threshold (85/100), four-pass budget, or art direction. Those are local engineering conventions.

| Source | What the source supports | Applied prompt behavior | Important limitation |
| --- | --- | --- | --- |
| Lindgaard, Fernandes, Dudek & Brown (2006), [Attention web designers: You have 50 milliseconds to make a good first impression!](https://doi.org/10.1080/01449290500330448) | Visual-appeal ratings of web homepages were strongly correlated between short exposures including 50ms and 500ms. | Inspect first viewport, clarity and composition in a fast glance test. | Does **not** mean users fully evaluate usefulness or comprehension in 50ms. |
| Tuch et al. (2012), [Role of visual complexity and prototypicality in website first impressions](https://doi.org/10.1016/j.ijhcs.2012.06.003) ([author summary](https://research.google/pubs/the-role-of-visual-complexity-and-prototypicality-regarding-first-impression-of-websites-working-towards-understanding-aesthetic-judgments/)) | In their experiments, visual complexity and website prototypicality influenced rapid aesthetic judgments; low complexity/high prototypicality performed well. | Keep *interaction conventions* familiar while using original brand expression. Remove unneeded clutter. | Novelty is not automatically better; effects depend on task, stimuli and audience. |
| Tractinsky, Katz & Ikar (2000), [What is beautiful is usable](https://doi.org/10.1016/S0953-5438(00)00031-X) | ATM-interface aesthetics influenced perceived usability ratings in the study. | Give visual craft a measured place in the rubric. | Aesthetic perception is **not** actual success or efficiency. |
| Hassenzahl & Monk (2010), [The inference of perceived usability from beauty](https://doi.org/10.1080/07370024.2010.500139) | Explores relationships between perceived beauty and usability judgments. | Keep appearance review separate from observed task trials. | Do not infer real usability from attractive screenshots alone. |
| Nielsen, [10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/) (1994, revised online) | Broad principles: status visibility, language, recovery, consistency, error prevention, recognition and more. | Review user flows and every critical interaction state. | Heuristics are principles, not automated proof of user experience. |
| Nielsen Norman Group, [Aesthetic-Usability Effect](https://www.nngroup.com/articles/aesthetic-usability-effect/) (2024, reviewed 2026) | Attractive UI can mask usability problems during subjective testing. | Test tasks and inspect actions independently from visual scores. | Article is a professional interpretation, not a single new controlled experiment. |
| Si et al. (2024), [Design2Code: Benchmarking Multimodal Code Generation for Automated Front-End Engineering](https://arxiv.org/abs/2403.03163) ([code](https://github.com/NoviScl/Design2Code)) | Benchmark shows visual-element and layout reconstruction are difficult in screenshot-to-code tasks. | Compare **actual rendered screenshots** with the intended design, instead of trusting source code. | Screenshot fidelity does not equal originality or functional quality. |
| Laurençon, Tronchon & Sanh (2024), [WebSight](https://arxiv.org/abs/2403.09029) | Dataset and method for HTML-from-image learning. | Use visual references as analysis cues; verify implementation visually. | Synthetic pair performance is not a guarantee for production apps. |
| Li et al. (2025), [ScreenSpot-Pro](https://arxiv.org/abs/2504.07981) | High-resolution professional GUI grounding remains hard for models. | Require explicit interaction tests and localized screenshots; do not claim the AI can perceive every UI state accurately. | Agent benchmark is **not** a direct design-aesthetics study. |

## Animation research and limits

- Heer & Robertson (2007), [Animated Transitions in Statistical Data Graphics](https://doi.org/10.1109/TVCG.2007.70539): controlled experiments found that selected animated transitions can improve graphical perception of changing **statistical data graphics**. This is a targeted result, **not evidence that perpetual decorative motion makes conversion better**. Use matched-data transitions for continuity, not fabricated number rolls.
- Thomas & Calder (2001), [Applying cartoon animation techniques to graphical user interfaces](https://doi.org/10.1145/502907.502909): investigated animation as feedback in direct manipulation. Applied here to drag/reorder and state change, **not as a blanket endorsement of cartoon effects**.
- [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), Level A: for qualifying auto-start moving content lasting more than 5 seconds, pause/stop/hide control is needed, with exact exceptions. Better avoid automatic looping.
- [WCAG Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions), **AAA**: nonessential motion triggered by interaction can be disabled. A useful design target beyond AA, not an AA requirement.
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion): use OS preference to remove or replace unnecessary movement.
- [web.dev high-performance CSS animation](https://web.dev/articles/animations-guide): prefer composited transform and opacity where practical.

All timing profiles, maximum-one-hero-effect recommendations, originality thresholds and iteration budgets in this repository are **proposed team heuristics**, not scientifically certified timings or evidence of user outcomes.

## Normative or platform guidance (not papers)

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/): aim for AA; text contrast typically **4.5:1** normal and **3:1** large; non-text elements **3:1** where applicable; focus visible, reflow, keyboard navigation, reduced-motion accommodations and meaningful names. WCAG 2.2 AA target sizing is **24 × 24 CSS px OR an allowed spacing/other exception**. Larger targets are often more usable. Automated scanners cannot certify conformance.
- [WCAG 2.2 target-size explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum): precise exceptions; do not incorrectly call 44px the universal AA minimum.
- [Android accessibility, touch targets](https://support.google.com/accessibility/android/answer/7101858): recommended **48 × 48 dp** responsive touch region, not necessarily a 48dp visible icon.
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/): consult platform/current component guidance for touch areas, navigation, Dynamic Type, assistive technologies and motion. Do not assume Android and iOS controls are visually identical.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion): respect the user's reduced-motion preference.
- [GOV.UK Design System](https://design-system.service.gov.uk/): practical examples of accessible components, content style and error handling; inspect underlying licenses before copying components.

## Our derived design principles (not research claims)

1. **Distinctive expression, conventional controls.** Give the brand a recognizable visual signature without making basic actions mysterious.
2. **First impression is a doorway, not the destination.** Critique screenshot hierarchy, then test tasks, speed and recovery.
3. **Measure with evidence.** Unseen/offline states and unverified devices stay *unverified*, not green.
4. **Progressively reduce uncertainty.** Branch into different compositions early; later revise the weakest dimensions rather than restart from scratch.
5. **Reality over glamour.** Use real copy, real states and realistic content lengths before decorative effects.
6. **Human sign-off matters.** Scores and model critics are suggestive. Real user testing and accessibility audits are separate responsibilities.

See [rubrics](../rubrics) for deliberately subjective scoring rules, and [the critic prompt](../prompts/shared/CRITIC.md) for how to avoid self-congratulatory reviews.
