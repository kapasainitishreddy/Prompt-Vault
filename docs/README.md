## Remix Studio: design selection and copyable customization

[Open Remix Studio](remix.html). It reads the original 48-style catalog, 32 website sections, 32 mobile flows, and 20 web/20 app guided journeys without external services. The [pure prompt engine](remix-core.mjs) distinguishes existing-project redesigns from new builds and produces a detailed build prompt or post-build audit prompt.

Visit from the Style Laboratory's **Use this style in my project** link to preserve the chosen platform/style in a shareable URL (never any entered personal project details). Site previews are original illustrative CSS compositions, not production templates. Clipboard and Markdown download run entirely in the visitor's browser; no AI inference happens on this site. Always verify actual code, accessibility, integrations and screenshots before making public quality claims.

## Signature Mobile Studio (October 9, 2026)

The [Mobile Studio](mobile-studio.html) has 16 purpose-built editorial mobile compositions, linked to the existing 32 patterns and 20 journeys. The [Expo Native Kit](../native-kit/README.md) implements corresponding React Native screens, while `code/` holds source-identical copies for visitor-controlled copy actions. The shared source mirror is validated by `tests/test_signature_gallery.py`. An optional local Playwright script checks interactions and responsive screenshots, but it has not been executed in this environment.

## Mobile Studio and Expo Native Kit (October 9, 2026)

[Mobile Studio](mobile-studio.html) provides 32 browser-interactive app patterns and 20 ordered app journeys, with real UI interaction demonstrations, source inspector, iOS/Android-inspired frames, light/dark and normal/success/error states and prompt copying. The static default screen stays visible if catalog fetch fails.

[Expo Native Kit](../native-kit/README.md) contains React Native TypeScript source, 32 local pattern demos, 20 connected journeys and reusable primitives. Auth, payments, permissions, file upload, model calls, remote sync and account deletion are explicit non-production simulations. Physical-device QA and real-service integration remain separate work.

## Product tours and newcomer FAQ (October 9, 2026)

- [FAQ](faq.html): 23 plain-language questions in four topics; native expanding answers without JavaScript plus optional client-side search. Five answers also appear on the homepage.
- [Guided tour launcher](tour.js): optional version-pinned [Driver.js 1.9.0](https://github.com/nilbuild/driver.js) MIT product tour. It loads on user interaction and highlights the main Atlas features with Back, Next, progress and close. The fixed Help menu also links to [Start Here](start-here.html) and the FAQ. The tour is never automatic.
- [Tour styles](tour.css): restrained popovers matching Atlas typography, mobile layout, reduced-motion support. Without the CDN, tour loading fails gracefully and the core library and FAQ still work.

## MG Styles 15 reference (October 9, 2026)

- [15 real film previews](mg-film-styles.html) from the credited MIT [Vincentwei1021/mg-styles-15](https://github.com/Vincentwei1021/mg-styles-15) source, with actual source-hosted preview frames and optional controlled MP4 playback (10 seconds per film).
- All 15 link to their **full original author prompts** and demos, and include **new original novice-friendly descriptions and copyable customizable starter prompts**. Basic card content is HTML and stays accessible without JavaScript.
- Film videos and image posters are linked externally, not stored inside this repository. Attributions and third-party asset caveats: [research/mg-styles-15-integration.md](../research/mg-styles-15-integration.md).
- Source test: `python3 -m unittest tests.test_mg_film_styles -v` or full `python3 -m unittest discover -s tests -v`.

## First visit: beginner path (October 9, 2026)

- [Start Here](start-here.html): choose Website, App or Exploration; see original visible example screens; learn three plain-English design terms; produce a local, editable/copyable AI-building prompt; and follow a linked route into the right catalog. All works without accounts or external model calls. The initial website example is rendered in HTML/CSS even without JavaScript.
- [Motion libraries explained](motion-library.html): five **original** no-dependency interaction previews explaining Motion, GSAP, Locomotive Scroll v5, React Bits and Three.js. The underlying packages are referenced, **not vendored or claimed as running**. Each entry explains good and bad use cases, current license caveats and has a copyable prompt.
- [Opt-in real Lenis study](lenis-scroll.html): separate page loads Lenis only after the visitor enables enhanced scroll, with an ordinary native-scroll fallback.
- Homepage preview teasers and the user-facing newcomer call-to-action use real HTML/CSS, not an async gallery that may show indefinite loading.

**QA boundary:** Static source review does not establish that the deployed Cloudflare Pages origin runs JavaScript correctly on real browsers. Verify preview gallery loading, client-side routes, responsive layout, keyboard, copy actions and external CDN availability on a real device before claiming live readiness.

# Prompt-Vault Atlas website

## Visual-first previews

The Concept Field Guide now opens with a searchable visual gallery at
[concepts.html#previews](concepts.html#previews), instead of requiring
users to select a text-list item before seeing anything. All 200 concepts
have original **illustrative thumbnails** covering 35 supported
preview categories (16 website and 19 app), with some shared layout building blocks. Click through to an enlarged
interactive specimen, device/composition/state controls and its complete
prompts and research links.

UI files: `concept-previews.css` and the thumbnail renderer in
`concepts.js`. The existing site is static, no third-party images are
copied. These are original miniature UI layouts, not captured real-world
website screenshots, 200 separately engineered production apps or native
device simulations. Browser QA should check all 35 preview types as well
as phone/desktop layouts, click-through selection and reduced motion.


**Practice Studio (new)**: [100 accessible learning prompts](studio.html) (60 apps/40 websites; demos, research, test scenarios, prompt export), plus a separate [Support & Sponsorship page](support.html) whose coffee, paid sponsors and video remain disabled until verified. See [learning/QA guide](LEARNING-STUDIO.md).


**Guided Atlas (new)**: [guided.html](guided.html), 40 full website/app blueprints, original preview renderer with desktop/mobile and iOS/Android modes, per-step source links, research citations, full prompt copy. Catalog: [guided-websites.json](data/guided-websites.json), [guided-apps.json](data/guided-apps.json), [evidence-atlas.json](data/evidence-atlas.json). No paid API or external runtime needed. The examples illustrate UI and state; they are **not** 40 shippable products.


A static, dependency-free visual gallery of the original **32 website section**, **32 app UI/UX flow**, and **23 motion recipe** prompts.

## Deep Concept Field Guide (October 2026)

The original [Concept Field Guide](concepts.html) sits alongside the
[Academy](academy.html). **Website Design** and **App Design** are still the
only primary tracks, supplemented with 100 granular patterns each.
The new guided catalog links **50 scoped research records** (including
12 peer-reviewed papers) and 62 additional source-code references. The
combined source library has 123 unique upstream URLs, with licensing
restrictions or unverified status shown rather than assumed MIT.

Files: `concepts.html`, `concepts.css`, `concepts.js`,
`data/concepts-web.json`, `data/concepts-app.json`,
`data/deep-research.json`, `data/deep-resources.json`.
The [Markdown concept index](../catalog/CONCEPT-INDEX.md) and
[research handbook](../research/concept-field-guide.md) are accessible
without running JavaScript.

The 200 pattern previews are original HTML/CSS specimen variants built
from shared renderer families. They're illustrations with local mock
actions, not 200 independent production websites/mobile apps, live
model calls, purchases or native-device tests. Switch preview width,
composition and normal/success/error to study UI states.

**Smoke and integrity checks:** `python3 -m unittest discover -s tests -v`
from repository root, plus `node --check docs/concepts.js` when Node is
installed. Check the page in actual browsers at 360, 390, 768 and 1440 px
and with keyboard/assistive technology before claiming production QA.

## Guided Design Academy (2026)

[Open the new academy](academy.html) with two primary tracks:
**Website Design** and **App Design**. It adds 16 website blueprints,
14 complete app journey blueprints, 220 ordered section/screen prompts,
3 full prompt types (design/build/audit), 16 craft modules, 30 primary
research/documentation references, 63 source links, original interactive
code-rendered visual studies, native iOS/Android notes and RevenueCat/
Sensor Tower evidence with explicit limitations. Supporting motion,
style, skills and open-source galleries remain intact.

Files: `academy.html`, `academy.css`, `academy.js`,
`data/academy.json`. Research handbook: `../research/design-academy-2026.md`.
Run `python3 -m unittest discover -s tests -v` for static tests. A
browser/device QA pass is still mandatory before calling this production
validated. Code-rendered examples and their interactions are illustrative;
there are no real app store purchases or account integrations in the academy.

## Preview locally

```bash
python3 -m http.server 8000
# Open http://localhost:8000/docs/index.html
```

The `docs/` folder is a deployable static website. It includes the complete source prompts and three catalogs copied from the repository as of this commit. No build step, account, database, paid API, external font/CDN, tracking, or GitHub Actions is required.

## Publish on GitHub Pages (no GitHub Actions workflow)

In repository **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/docs**. Then Save. GitHub publishes it at the URL shown in Pages settings after processing; don't assume it is live until that status appears. Keep paths relative so it works under the repository's Pages subpath. Alternative: deploy the same `docs/` directory to any static host.

## Design and preview boundary

All specimens are *original illustrative HTML/CSS UI studies*, not complete production applications, real transactions, verified benchmarks or borrowed vendor templates. Browser/device validation is required for any real product. Motion is non-essential and respects OS reduced-motion settings; animation playback is user-triggered. Catalog prompts stay separately editable in `prompts/` and are copied under `docs/prompts/` for same-origin preview and full-text copying.

## Content and license

Original frontend, specimen art and prompts are [MIT licensed](../LICENSE). Third-party studies and galleries linked in [research](../research/supplied-resources.md) are not bundled, and their component/assets terms do not change. License notes especially matter for restricted catalogs.

## QA checklist

1. Validate the 5 pages at 1440, 768, 390, 360 px; check no horizontal overflow.
2. Search, filter, sort and save patterns in website/app/motion galleries.
3. Open a pattern modal, switch A/B/C art directions, copy its **full** prompt, use keyboard arrows between tabs, close with Escape.
4. Test size switcher, user-triggered motion replay and reduced-motion fallback.
5. Verify all 87 prompt files and 3 catalogs load at their relative same-origin URLs. Check links and mobile navigation.
6. Run `node --check docs/atlas.js`, HTML audits, and browser/assistive-tech tests as available; unknown is not pass.

## Added separately: visual languages and skills

- `styles.html`: 48 original styles, split 24 website and 24 app, three variants each, responsive illustration previews, search, categories, saved patterns, product name editing, prompt view/copy, and reduced motion.
- `skills.html`: the four credited repositories with real license caveats, 16 original focused design workflows, search and three-workflow local prompt composer.
- Both include the complete source Markdown under `docs/prompts/` and their JSON catalogs under `docs/data/`.

The original eight galleries contain **159 original prompts** and **143 illustrative visual studies**. The ninth guided Academy page composes design, build and audit prompts at runtime from 30 new blueprints, so these generated combinations are not counted as standalone hand-authored Markdown prompt files. These are not production apps or reused vendor code. Copy all `docs/` to any static host.

- `resources.html`: eight original interactive studies with filters, upstream source links, license-aware details and eight full same-origin prompts under `docs/prompts/references/`. No vendored external components or screenshots.
