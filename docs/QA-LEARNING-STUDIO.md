# Practice Studio QA record (2026-10-09)

- Local Python unittests: 4 passing for lesson coverage, source references and safe defaults.
- Node sponsorship guards: 3 passing tests for URL validation, sponsor link restrictions and video metadata.
- Source JavaScript syntax: `node --check` passed for `studio.mjs`, `studio-data.mjs`, `support.mjs`, and `support-core.mjs`.
- Chromium 144 browser DOM QA from **inlined local HTML/CSS/JS** (network and localhost navigation blocked by runner): 100 lessons rendered with full prompts, 16 interaction model scenarios exercised, 20 lesson topic families examined at each viewport 1440x900 / 768x1024 / 390x844 / 360x800, no horizontal overflow; 0 page JS errors.
- Browser interactions covered keyboard tabs, form validation, draft preservation, offline queued vs acknowledged writes, denied permissions, purchase pending and decline, text scaling and RTL demonstration, AI cloud/local descriptions, undo, meaningful animation reduction, compare controls, manual 3D rotation and static fallback.
- Browser export generated 100 complete Markdown prompts. Original example media and personal data stay local.
- Sponsor page default had **no active sponsor, no Buy Me a Coffee button, no iframe or external video request**. A clearly test-only configuration proved safe labels, sanitized user-supplied sponsor names, consent-triggered player creation with no autoplay and unload. No real sponsor or payment was configured.
- Still needed: deployed-site smoke check after merge, manual keyboard and screen-reader review on hosted origin, native app/physical device validation for lessons representing iOS/Android constraints, and any actual sponsor/video rights signoff.

No Lighthouse score, Play Store/App Store approval or WCAG conformance has been fabricated.
