# Prompt-Vault Design Academy: research, architecture and implementation notes

> Research check: 2026-10-08. Curated public references, not a systematic meta-analysis. External publications, app screenshots, product trademarks, and upstream assets are not licensed by Prompt-Vault's MIT license. Review the live source and each package before reuse.

The public academy lives at [docs/academy.html](../docs/academy.html). Its machine-readable content is [docs/data/academy.json](../docs/data/academy.json), which includes 16 website blueprints with 120 ordered section prompts, 14 app blueprints with 100 ordered screen prompts, 16 practical craft modules, 30 source records, 63 upstream references, eight quantitative business observations, and three revenue-ranked app examples. The existing section, flow, motion, style, skill and open-source galleries remain available. The design academy has **only two primary tracks**, **Website** and **App**, with optional tools within each.

## 1. What makes a website good?

A useful website is recognizable, credible, readable, accessible, findable, performant, and successful at the real user's task. It is not defined by the number of animation effects or artistic trends it uses.

1. **A visible purpose.** The first meaningful heading names the offering and whom it serves. Decorative copy must not make the job harder to understand. Rapid first impressions were observed in controlled experiments by Lindgaard and colleagues. They do not prove a universal conversion rule.
2. **Intent-aligned information order.** Show facts and decisions at the moment someone needs them. Navigation mirrors visitors' tasks, not internal company org charts. Unnecessary sections may be removed. NN/g's usability heuristics give a useful diagnostic vocabulary.
3. **Proof without fabrication.** Product screenshots, tested numbers, client names, certification badges, testimonials and integrations are shown only when true, attributable and current. Label fictional UI mock data.
4. **Readable visual hierarchy.** Use typography, contrast, density and whitespace to group related information. Tuch and colleagues found that visual complexity and prototypicality affect early aesthetic responses; they did not directly prove a website conversion impact.
5. **Strong interaction fundamentals.** Links behave like links, buttons trigger actions, keyboard focus is visible, forms validate and recover, loading states are clear, error pages offer navigation, and reduced-motion preferences are respected.
6. **Appropriate performance.** Optimize actual perceived content and interactions rather than merely a tool score. On websites, evaluate Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) using appropriate data.
7. **Accessible use.** WCAG 2.2 is a useful web standard, including focus appearance, keyboard use, text resizing and target sizes. Automated tooling detects a subset of problems only; use assistive technology and human testing.
8. **Measured outcomes.** Choose project-specific tasks such as contact requests, successful trial activation, successful checkout, article completion or successful integration. Do not equate visual polish with business success.

Primary reading:
- Nielsen Norman Group: [10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/), [Usability Testing 101](https://www.nngroup.com/articles/usability-testing-101/).
- Lindgaard et al. (2006), [Attention web designers: you have 50 milliseconds to make a good first impression](https://doi.org/10.1080/01449290500330448).
- Tuch et al. (2012), [The role of visual complexity and prototypicality regarding first impression of websites](https://doi.org/10.1016/j.ijhcs.2012.06.003).
- W3C: [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/).
- Google: [Core Web Vitals](https://web.dev/articles/vitals) and [Search Essentials](https://developers.google.com/search/docs/essentials).

### Website section placement: choose, don't stack blindly

| Site type | Recommended narrative | Essential caveat |
| --- | --- | --- |
| Developer/artist portfolio | Identity and audience → selected real work → 2-5 meaningful case studies → capabilities and credibility → clear contact | Lead with outcomes and working projects, not a long technology logo wall. |
| Company homepage | Clear promise → primary services/products → audience paths → process → genuine trust proof → team/values → careers and contact | Distinct visitor groups need distinct onward paths. |
| SaaS product | Problem and outcome → working product screenshots/demo → benefits and real workflows → integration/security facts → pricing → questions → start trial or demo | One product promise beats 30 disconnected features. |
| Physical product | Product identity → media showing scale/details → size/variants/specs → benefits in context → shipping/returns → verifiable reviews → purchase | Baymard's ecommerce findings cannot be applied indiscriminately to non-commerce sites. |
| Ecommerce catalog | Navigation and search → categories → comparison/filterable listings → detailed product → cart → checkout → support | Make size/stock, fees and returns readable, including mobile. |
| Technical documentation | Overview and prerequisites → quick start → conceptual guides → API reference → errors and troubleshooting → changelog | Code snippets and commands must work; show version and scope. |
| Personal publication or books | Editorial identity → genre/series/topic discovery → real article/book summaries → reading template → author/copyright → optional subscriptions | Reading comfort and real authorship matter more than autoplay. |
| Local business | Service + service area → what is offered → clear prices or quote process → hours/logistics → credible reviews → call/book | Never imply availability you haven't checked. |
| Company app subdomain | App-specific benefit → real UI screens → supported platforms → pricing/onboarding → support/privacy → subtle corporate family links | Product subdomain needs its own information hierarchy and canonical metadata, not a duplicated parent homepage. |

Why placement matters: Baymard's [product page research](https://baymard.com/research/product-page) emphasizes discoverable purchase details, image inspection and option clarity. Its [checkout research](https://baymard.com/research-articles/current-state-of-checkout-ux) focuses on checkout friction, forms and clarity. Research findings apply to the study context; do not translate an observation into a fabricated percentage uplift.

### Multi-product company and subdomain pattern

For a family of apps, **company domain** introduces the company and routes visitors; **product subdomains** explain and convert for one product. Preserve authentic parent brand recognition but give the product a useful visual personality. A practical scheme:

- `example.com`: company purpose, product directory, trust/legal, contact, team.
- `app-one.example.com`: one product's use cases, real screens, platform availability, pricing, docs/support, privacy and terms.
- `app-two.example.com`: a different promise and use case, with its own screenshots and onboarding.
- `docs.example.com`: versioned documentation only where a distinct docs hub helps.
- `status.example.com`: actual monitoring and incident communication, never fabricated uptime.

Decide canonical URLs and search indexing explicitly. Make app-to-company navigation unobtrusive and ensure support, company, privacy and billing terms do not contradict one another across subdomains.

## 2. App design needs a journey, not a marketing page

For apps, the principal unit is **a complete task and its state transitions**. A beautiful onboarding screen does not help if offline edits vanish or purchases cannot be restored.

A general app sequence is: eligibility and value → optional short onboarding → first successful task → repeatable home flow → search/organization → settings/privacy → error and recovery. Add paywall, AI, reminders, motion, community or spatial interface **only when useful**.

The machine dataset contains distinct journeys for productivity/tasks; note-taking; habit and wellness; learning; shopping; finance; social/community; AI assistants; media editors; travel; ebook readers; B2B operations; journaling; and streaming. Each journey specifies ordered screens, inclusion criteria, skills and a copyable prompt for each screen.

### iOS / App Store checks

- Honor Apple [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) for navigation patterns, safe areas, type scaling, and context-sensitive onboarding.
- A tab bar is for destination navigation, not a large decorative call-to-action; confirm appropriateness for your flow.
- Support VoiceOver, Dynamic Type, Reduce Motion, appropriate safe areas, hardware keyboard when applicable, and standard control labeling.
- Implement notification/camera/photo permissions contextually. Handle 'don't allow' as a valid choice rather than a dead end.
- Review the current [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) for content, subscriptions, digital purchases, links, privacy, authentication, account deletion, test logins and policy exceptions. Confirm current StoreKit requirements. Do not promise approval from a checklist alone.
- Test real devices, interruptions, flaky network, purchase restore, entitlement expiration, permissions and locale.

### Android / Google Play checks

- Follow [Android core app quality guidelines](https://developer.android.com/docs/quality-guidelines/core-app-quality) for predictable back behavior, permissions, stability and store quality expectations.
- Use [adaptive app quality guidance](https://developer.android.com/develop/adaptive-apps/quality-guidelines/adaptive-app-quality) for foldables, tablets and resizable windows. Phone screenshots do not prove adaptation.
- Apply appropriate Material 3 system patterns, TalkBack, font scaling, system back gesture, insets, contrast and RTL.
- For purchases, consult [Google Play Payments Policy](https://support.google.com/googleplay/android-developer/answer/9858738) and current Play Billing requirements. Verify regional exceptions and the correct entitlement restore behavior.
- Implement play-policy-compatible account deletion, permission rationale/denial, Data safety declarations where applicable, crash and slow-network recovery and large-window tests.

### Universal critical states

For every mission-critical app action define:

1. Before first use / empty.
2. Loading / slow.
3. Success / confirmation.
4. Invalid input.
5. Offline / reconnecting.
6. Auth expired / permission denied.
7. Server conflict / duplicate request.
8. Recovery / undo / retry.
9. Large text and assistive technology.
10. Localization, longer translated strings and RTL if supported.

These states are actual executable product requirements. Static HTML specimens in the academy are design demonstrations, not proof that native behavior exists.

## 3. AI belongs in a section only if it improves the job

Choose one of these architectures deliberately:

| Approach | Where inference happens | Good for | Key caveat |
| --- | --- | --- | --- |
| [Puter.js](https://docs.puter.com/) | Hosted cloud AI called from frontend JavaScript via Puter | Optional user-account hosted chat or generation | *Not on-device AI*. Users may need a Puter account and are responsible for metered use. Disclose this. |
| [WebLLM](https://github.com/mlc-ai/web-llm) | In user's browser with supported model and WebGPU | Privacy-sensitive local assistant or limited task helper | Large downloads, RAM/GPU demands and browser compatibility. Offer fallback. |
| [Transformers.js](https://huggingface.co/docs/transformers.js/guides/webgpu) | Browser with JS runtime, optionally WebGPU | Embeddings, classification, speech and supported models | Model/license/capability varies; do not imply all models run locally. |
| Secure backend-mediated AI | Provider service through an authenticated server endpoint | Centrally billed models, organizational control, shared data and approval workflows | Backend key isolation, limits, logs, consent, retention and moderation. |

**AI placement heuristics:**
- Website FAQs: do not insert generic chat until searchable FAQs/docs already work. Add page-grounded assistant only if it answers specific questions accurately, cites real references, respects user consent and gracefully handles uncertainty.
- Marketing pages: interactive demos often beat random AI chat. AI might be appropriate for domain-specific product simulation, but mark sample output.
- Developer tools: show model selection, prompt/context inspection, sources/provenance when supported, cost and permission before consequential actions.
- Mobile apps: surface AI where the user works (editor/coach/search/review), not as a floating orb obscuring navigation; provide corrections, copy/export, failures, clear local/cloud distinction, restore and voice accessibility.
- If the assistant edits data, requests permissions, spends money or sends content, use preview + explicit confirmation, audit trail and recoverable operations.

### Example: insert AI in a notes app

```text
Design a private notes assistant for the existing note editor.
User job: summarize one selected note and suggest three search tags.
Offer a non-AI manual workflow.
Show which note is used, whether inference is local or hosted,
what data leaves the device, and any account/usage costs.
Return an editable summary only after a visible user action.
Never rewrite the original note automatically.
Support model download failure, offline state, long documents,
screen readers, slow model response and no GPU.
Use WebLLM/Transformers.js when compatible; otherwise request
consent for hosted processing and implement a secure fallback.
```

## 4. 3D and animation decision tree

1. Does spatial inspection materially help people understand, compare or operate the product? If no, use 2D media or typography.
2. If yes, is the subject truly spatial (product shape, map, building, artwork or game scene)? If no, use ordinary HTML/CSS SVG or canvas.
3. Can the user operate with keyboard/touch/screen reader and a static alternative? If no, simplify the interaction.
4. Can the asset load acceptably on midrange mobile connections and respect battery/memory limits? Measure.
5. Is a reduced-motion version equivalent for the main task? Provide it.
6. Can images, models and textures legally be used and distributed? Verify separately from the renderer license.

Use [model-viewer](https://github.com/google/model-viewer) for a relatively direct product/model turntable when appropriate; [Three.js](https://threejs.org/manual/) and [React Three Fiber](https://github.com/pmndrs/react-three-fiber) for genuinely custom 3D scenes. Use [Motion accessibility guidance](https://motion.dev/docs/react-accessibility) for purposeful interface feedback, including reduced motion. For native 2D/animated content, consider React Native Skia and Reanimated only when the simpler platform tools cannot serve the interaction.

**Motion intentions**: orient people during navigation; confirm action; explain relationship between states; show progress; add delight sparingly. Avoid auto-playing everywhere, motion-dependent meaning, scroll hijacking or animations that obscure important content.

## 5. Revenue-backed app research, with statistical boundaries

These are **market observations**, not UX success certificates.

### Sensor Tower, State of Mobile 2026

[Sensor Tower's Jan 21, 2026 announcement](https://sensortower.com/press/press-release-boosted-by-gen-ai-services-consumers-spent-more-money-in-apps-than-games-for-first-time) estimates global 2025 in-app purchase revenue at **$167B across apps and games**, with non-gaming app spend overtaking games for the first time. It names the three highest-grossing apps for the year as:

1. TikTok.
2. Google One.
3. ChatGPT.

Explore these as **different business and interaction models**, not things to copy screen by screen: TikTok's content discovery and creator feedback; Google One's account-linked subscription value and service integration; ChatGPT's low-friction task entry and progressive capabilities. Source does not isolate how much their particular interface designs cause revenue. No ranking here implies profit, best retention or guaranteed conversion.

### RevenueCat, State of Subscription Apps 2026

[RevenueCat's report](https://www.revenuecat.com/state-of-subscription-apps) analyzes 2025 behavior from more than 115,000 subscription apps integrated with RevenueCat, representing more than $16B in revenue. Its observational findings include:

- **55%** of cancellations of three-day trials happen on Day 0. This is *not* 55% of all trials. Prompt implication: demonstrate value in the first session and communicate subscription terms clearly.
- In compared groups, hard-paywall apps reported **10.7%** median download-to-paid conversion by D35 versus **2.1%** among freemium apps. Do *not* interpret this observational contrast as proof that changing any app to a hard paywall creates 5x conversion.
- AI-powered apps showed **41% more revenue per payer** and **30% faster churn**. The report does not show that merely adding AI improves business outcomes.
- Google Play subscription cancellations linked to billing failures were about **31%**, versus **14%** on the App Store in the analyzed cohorts. Implication: restore/retry/grace-period UX and payment recovery matter especially on Android.
- Longer trials of **17–32 days** had about **42.5%** median trial-to-paid conversion, versus **25.5%** for the shortest trials. Cohorts and time-to-value differ. Test your own category.

**Sample bias:** RevenueCat's data includes apps using its billing platform, not a random sample of all apps. Metrics differ by category, region, plan length, platform, age of app and cohort definition. Revenue isn't profit. Marketing outcomes are not evidence of one universal screen sequence.

### Revenue questions to test, not assume

- Do users reach the first meaningful success *before* you ask for payment?
- Which features create repeatable value and have predictable serving costs?
- Are price, currency, term, trial, autorenewal, cancellation and restore conspicuous?
- Does a subscription actually match the use frequency and product value?
- Does the Android billing recovery journey survive real payment failures?
- Can users export their own content and delete accounts within policy?
- Is growth driven by real repeat use rather than an impressive first impression?

## 6. Open-source reference strategy

The academy's [source catalog](../docs/academy.html#opensource) includes **63** upstream projects across website, mobile, motion, 3D, in-browser AI and verification tools, with links to their project source. The eight earlier interactive reference studies continue under [Open-source Library](../docs/resources.html).

Choose by user job, not by popularity: web primitives and overlays (Radix, Ark UI, React Aria); app UI (React Native Reusables, gluestack-ui, React Native Paper, Tamagui); animation (Motion, React Spring, Lottie Web); 3D (model-viewer, Three.js, R3F, Babylon.js); browser models (WebLLM, Transformers.js, ONNX Runtime, TensorFlow.js); and QA (Playwright, axe-core, Lighthouse).

**Licensing rule:** having source code on GitHub does not automatically make it free to copy or relicense. Licenses differ for code, documentation, prompts, model weights, fonts, image assets, design examples and software-as-a-service usage. Open-source catalog entries with unknown license details are **research links only** until manually inspected.

## 7. How to use guided prompts

1. Select **Website** or **App** at [Design Academy](../docs/academy.html).
2. Choose an archetype (company, product, portfolio, commerce, subdomain, education, AI, journal, etc.).
3. Read **why** each section or app screen belongs in its position. Omit optional sections without a real purpose.
4. Choose the individual **section prompt** or copy a full **Design** prompt to explore three different compositions.
5. Use **Build** prompt to implement real interactions and states, respecting the current codebase and platform.
6. Use **Audit** prompt to test the actual rendered experience and report severity and evidence.
7. Preview the original HTML/CSS specimen, switch desktop/tablet/mobile and advance the section/screen sequence. Do not mistake a specimen for a production-quality app or native simulator.
8. Optional: follow platform guidance and the linked underlying research; check licenses before code reuse.

### Ready-to-paste example: company product subdomain

```text
Build a focused subdomain site for one real product belonging to a
multi-product company. Treat the parent domain as the company directory,
not the template for every app. Order the page by actual user questions:
what it does, who it is for, product workflow and authentic screenshots,
which platforms are really available, security/privacy, transparent
pricing, support and terms, and one clear access CTA.
Provide three distinct visual directions and one approved design system.
Use a responsive semantic layout with mobile navigation, focus states,
reduced-motion fallbacks, alt text, privacy-appropriate analytics, and
real links. Add animation or 3D only if it demonstrably supports a task.
Support dark/light themes only if both can be tested for contrast.
Never invent user testimonials, certifications, uptime or integrations.
Ship actual working interactions. Verify at mobile/tablet/desktop
widths and list the tests executed versus those still pending.
```

### Ready-to-paste example: iOS and Android learning app

```text
Create a learning app flow for both App Store and Google Play.
The first session should show curriculum fit and deliver one useful
practice lesson without forcing unnecessary account creation.
Order screens: goal and level, course map, short lesson, practice,
evidence-based feedback, review, optional progress, privacy/settings.
Handle partial completions, offline content, long translations, RTL,
a11y labels, larger font sizes, speech and reduced-motion preferences.
Keep iOS tab and safe-area behavior native to Apple conventions.
Keep Android system back and adaptive layouts native to Google guidance.
Only include a paywall if there is actual premium value, transparent
terms, entitlement restore, and compliant billing. Validate purchase
failure, billing grace period, account deletion, and denied permissions.
Create interactive code-rendered previews but label mock services as mock.
Deliver actual device QA evidence, or mark native QA outstanding.
```

## 8. Validation and acceptance

**Static repository checks** can establish parseable data, source-link formatting, inclusion criteria, working JavaScript syntax and required DOM hooks. They cannot establish that CSS looks attractive across devices, that VoiceOver works, that deep links work or that an app will be accepted into the stores.

**Web acceptance**: real screen captures at phone, tablet and desktop, keyboard-only task completion, real links/forms, no horizontal overflow, reduced-motion handling, responsive text, accessibility review and field-appropriate performance.

**App acceptance**: real-device walkthrough for each supported OS, role, permission, locale and offline state; data/auth entitlements and purchases end-to-end with sandbox credentials; store policy verification and restore/deletion workflows; screen reader and dynamic type tests.

**Ship philosophy:** familiar in operation, distinctive in expression. Every section must justify its space and every animation its cost. The prompts are design tools, not certified outcomes.
