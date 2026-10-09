# Prompt-Vault Practice Studio: 100 worked design lessons

The new [Practice Studio](studio.html) is a free, offline-friendly static teaching extension to the existing Design Academy and the 200-concept Field Guide. It contains 60 app-first lessons and 40 website lessons across 20 families. Every lesson has:

- Clear, plain-English explanation and **where the pattern belongs**.
- A concrete example, a bad-case warning, and a testable acceptance question.
- A working **original illustrative HTML/JS model**, chosen from 15 model families, with a failure/recovery path. These are not 100 independent production apps or 100 full native UI screens.
- Source links with **category and evidence limitations**, including books, papers, standards, company guidance, an individual Medium case report, and a Reddit creator account. No copyrighted source text is reproduced.
- Fully copyable generated build/design/audit prompts (over 300,000 characters across 100 lessons), a one-click export, bookmarked lessons and local progress. No AI API, account, paid service, analytics or GitHub Actions.

The [Support page](support.html) provides truthful public sponsorship disclosure, a **disabled Buy Me a Coffee slot** until the maintainer supplies their verified URL, and an optional **opt-in sponsorship video** that only loads with complete metadata, caption/transcript confirmation and a visitor click. There are **zero named paying sponsors**, zero fabricated statistics, zero live payment integrations by default.

## Configure when links and agreements actually exist

Edit `support-config.json` only after verifying the real creator account, sponsor agreements and video rights. The allowed fields are `coffeeUrl` (nullable verified buymeacoffee.com/<creator> HTTPS URL), `sponsors` (array with approved=true, name, https URL), and `video` (nullable YouTube record with type, 11-character id, sponsor, title, captionsConfirmed=true, actual transcript). Leaving these unset is safe: no checkout CTA or embed exists. **Do not submit a placeholder to the live site.**

## Run and verify

From repo root, serve `docs/` on an ordinary static host or with `python3 -m http.server 8000 -d docs`; open `/studio.html` and `/support.html`. Node 20+ recommended for tests:

```bash
python3 -m unittest discover -s tests -v
node --test tests/test_support_guards.mjs
node --check docs/studio.mjs
node --check docs/studio-data.mjs
```

Browser QA completed separately in Chromium 144 with the static assets **inlined into a single test document** because this execution environment blocked URL navigation. The 100 lesson views and copyable prompts, 16 interactive scenario families, 20 focus groups at 1440/768/390/360 CSS px, keyboard tabs, local-save/restore simulation and non-active sponsor defaults passed without JavaScript page exceptions. This is **not** verification of production-host navigation, iOS/Android native apps, physical devices, screen reader conformance, Play Billing or App Store approval.

Source remains original MIT; upstream references, videos, books, model files and sponsor media retain their own rights.
