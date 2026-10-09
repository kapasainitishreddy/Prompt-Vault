# The Concept Field Guide: an evidence-conscious map of website and app design

*Research review: October 8, 2026. This is a curated practical synthesis, not a systematic review, a professional certification, or a claim to enumerate every concept in existence.*

Start at [the live-source concept explorer](../docs/concepts.html), then use the [archetype-level design academy](../docs/academy.html) when you need a whole website or a complete Android/iOS app journey. The explorer has **200 additional focused concepts**, **100 website and 100 app**, in **20 families**. Each concept includes a distinct user problem, when to use it, when to avoid it, skills, evaluation question, explicit recovery/accessibility requirements, relevant references and a copyable design/build/audit prompt. The code-rendered preview uses a shared original renderer family, not 200 independent production-ready templates or actual native apps.

Research source records and limitations: [50 annotated references](../docs/data/deep-research.json). Additional sources and business observations in [the existing academy](../docs/data/academy.json). External code and component references: [62 additional library entries](../docs/data/deep-resources.json), merged in the explorer with the existing 63 references by upstream URL. Some entries are source-visible **but restricted**. None of their source files or media are copied into our original MIT gallery.

## 1. What the evidence can and cannot tell us

Design decisions operate at different levels of certainty:

| Evidence tier | Useful for | Cannot establish |
| --- | --- | --- |
| Accessibility standard / official implementation guide | Normative requirements, keyboard contracts, assistive-tech expectations and platform conventions | That the interaction is actually usable without testing the implementation |
| Peer-reviewed controlled experiment | Specific perceptual, motor, memory, AI or evaluation effects under tested conditions | That a particular product will gain users or revenue |
| Qualitative usability/field study | Where tested people struggled, possible root causes, promising corrections | A population-wide conversion uplift outside the observed context |
| Professional heuristic and design pattern | Asking better design-review questions and finding likely failure modes | A proof of causality or compliance |
| Product analytics and app market benchmarks | Finding trends and candidate experiments by matched cohorts | The causal contribution of a visual style, individual animation or paywall |
| Open-source demo and component | Understanding technical implementation of a pattern | License permission, accessibility certification or acceptable performance on every device |
| Original generated HTML/CSS specimen | Inspecting hierarchy, state behavior, and screen-scale choices | Working backend, production entitlement, live commerce, genuine data or native device QA |

This distinction matters. Some guidelines are strong because they are part of WCAG, HIG or Android quality expectations. Some are hypotheses that depend on audience, content and product maturity. The explorer shows **when not to use** a pattern specifically to stop decorative cargo culting.

### Foundational papers worth reading in full

1. **Paul Fitts (1954), [motor-system information capacity](https://doi.org/10.1037/h0055392).** Original controlled tasks help explain why control size and distance affect pointing. Do not reduce this study to a universal rule that all buttons must have one fixed pixel size; WCAG and platform target rules are the actual implementation guidance.
2. **Ray Hyman (1953), [stimulus information and reaction time](https://doi.org/10.1037/h0056940).** Choice information can influence response time. It does not support simplistic maximum-item counts for menus.
3. **John Sweller (1988), [cognitive load during problem solving](https://doi.org/10.1207/s15516709cog1202_4).** Demanding processing competes with learning. Useful when deciding how to teach a novel workflow and sequence practice, though not direct evidence for one app onboarding design.
4. **Marc Hassenzahl (2004), [beauty, goodness and usability](https://doi.org/10.1207/s15327051hci1904_2).** Tests distinguish pragmatic and hedonic evaluation of interactive products. An attractive interface is not automatically easy to operate.
5. **Jeffrey Heer and George Robertson (2007), [animated transitions in statistical graphics](https://doi.org/10.1109/TVCG.2007.70539).** Controlled chart-transition studies motivate continuity and staged state change when comparing statistical graphics. They do not mandate animation in every dashboard.
6. **Tamara Munzner (2009), [nested model of visualization design and validation](https://doi.org/10.1109/TVCG.2009.111).** Evaluate the domain problem, abstract task/data, visual encoding and implementation separately; upstream task errors cannot be corrected with prettier graph marks.
7. **Sari Kujala et al. (2011), [UX Curve](https://doi.org/10.1016/j.intcom.2011.06.005).** Investigate long-term user experience rather than judging an app only on the first session. Retrospective methods have recall limitations.
8. **Lewis et al. (2013), [UMUX-LITE](https://doi.org/10.1145/2470654.2481287).** A short perceived-usability scale can complement observed task success. A self-report score does not certify accessibility.
9. **Cleveland and McGill (1984), [graphical perception](https://doi.org/10.1080/01621459.1984.10478080).** Test how well people decode different graphical channels before choosing shapes and legends.
10. **Michelle Borkin et al. (2013), [visualization memorability](https://doi.org/10.1109/TVCG.2013.234).** Memorability varies among chart forms and features. Being remembered is not the same as correct interpretation.
11. **Saleema Amershi et al. (2019), [guidelines for human-AI interaction](https://doi.org/10.1145/3290605.3300233).** Eighteen broad guidelines cover expectations, uncertainty, graceful failure, control and feedback. Test with your model and intended people.
12. **Arunesh Mathur et al. (2019), [dark patterns at scale](https://doi.org/10.1145/3359183).** Documented deceptive commerce patterns inform explicit anti-manipulation checks. This web crawl is not a measurement of all contemporary products.

See the source JSON for precise per-paper claims, date, method class, and applicability limit. Copyrighted papers are **linked, not mirrored or reprinted**.

## 2. The placement principle: meaningful sequence, not every section

A strong site responds to the visitor's evolving questions; a strong app responds to the state of a user task.

**Marketing site:** product and audience → tangible outcome → honest example of how it works → authentic support/limitations → questions or pricing → next step. Alternative navigational structures can be right for documentation, portfolios, public services or ecommerce. Never force the same eight-section landing-page layout on every project.

**Portfolio:** audience and specialism → most relevant shipped work → problem/tradeoff/process/result → honest capabilities → contact. If the creator does not want a face photo, work and attribution can carry identity. Avoid fake client logos or invented outcome numbers.

**Company parent domain:** explain the company briefly and route each audience to products, people, trust information or careers. **Product subdomain:** one product, one user job, its actual screenshots/features, a working CTA, pricing/FAQ/support where applicable. Maintain family ownership and legal continuity while retaining each product's unique purpose.

**Ecommerce:** search and categories → appropriate product list/filter/sort → product variants, quality/size, delivery and returns → transparent cart totals → review and payment → real order confirmation. Baymard's [search](https://baymard.com/research/ecommerce-search) and [product list/filter](https://baymard.com/research/ecommerce-product-lists) research addresses ecommerce interactions, not all browsing products.

**Technical docs:** first successful task → concepts/prerequisites → reference and advanced options → troubleshooting → version changes. Source examples must compile for the claimed API version. Documentation should explain what failed and what to do, not send visitors to a generic AI helper.

**Complex public or business service:** eligibility or purpose → clearly grouped questions → error repair with preserved answers → summary/review → confirmed outcome and reference. The [GOV.UK patterns library](https://design-system.service.gov.uk/patterns/) supplies usable examples, but its assumptions belong to public services and must not be copied indiscriminately.

## 3. Web concept families: ten ways to organize questions

| Family | Tasks to solve | Decision test |
| --- | --- | --- |
| Type & visual hierarchy | Make content legible, scannable and expressive | Does this layout change what people notice first, or only add decoration? |
| Navigation & discoverability | Find pages, records and destinations | Can someone retrieve and return without guessing a menu category? |
| Product storytelling & conversion | Understand benefit and action | Does the page demonstrate a real product before demanding commitment? |
| Commerce & marketplaces | Search, compare, select and pay | Are products comparable, options available, and final costs visible? |
| Forms & service journeys | Give accurate data and recover | Can someone edit previous answers and understand every error? |
| Trust, inclusion & privacy | Exercise meaningful control | Are claims traceable and optional choices genuinely optional? |
| Documentation & knowledge | Move from novice to working result | Are examples runnable, versioned and discoverable? |
| Motion, canvas & 3D | Clarify transitions and spatial information | Is there an accessible static alternative and device performance budget? |
| Design systems & accessible patterns | Produce consistent robust controls | Does each component support focus, loading, error, RTL and mobile width? |
| Portfolio, company & subdomains | Prove work and connect products | Does each audience have a focused, evidence-backed next step? |

The 100 entries are intentionally more granular than the Academy's 16 full-site blueprints. For example, “Product subdomain” in the academy is a whole site; “focused product subdomain” in the concept explorer is one design decision with a when/when-not boundary and specimen.

### A useful adversarial test for each web concept

Ask a reviewer to attempt the intended task at 360px, tablet landscape and wide desktop, without a mouse, with reduced motion, with text zoom and with non-English strings. If they cannot recover from a bad field, find a primary link, or tell example data from genuine proof, the concept is still a sketch.

### Forms need especially careful reading

W3C [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/) spells out focus and keyboard behavior for complex widgets such as tabs, comboboxes and modal dialogs; semantic HTML is often preferable to bespoke widget recreations.

[USWDS form guidance](https://designsystem.digital.gov/components/form/) emphasizes coherent DOM reading order, labels and fieldset semantics. Importantly, USWDS documented a **deprecation** of its validation component following usability and accessibility issues. This is exactly why a flashy pattern should not be automatically treated as good design.

[GOV.UK error summary](https://design-system.service.gov.uk/components/error-summary/) links top-level errors to corresponding fields. Design the error path before adding animations.

## 4. App concept families: ten systems of operation

| Family | User success criteria | Typical edge cases |
| --- | --- | --- |
| Activation & onboarding | Reach first value without unnecessary setup | Denied permissions, guest data preservation |
| Native navigation & adaptive layouts | Move between meaningful destinations on any supported device | Rotation, foldables, back stack, deep links |
| Creation, input & editing | Save edits and recover work reliably | Auth expiry, undo, concurrent edits |
| Search, data & decisions | Find trustworthy records and inspect metric definitions | Empty results, stale timestamps, missing values |
| Community & collaboration | Share or participate with explicit audience control | Privacy, moderation, conflicts |
| Reliability, recovery & privacy | Continue across interruption, offline and failure | Retry duplicates, sync conflicts, export/deletion |
| AI, assistants & agentic UX | Gain value while retaining review and approval | Hallucination, prompt injection, leakage, costly actions |
| Payments, subscriptions & entitlements | Understand terms, restore access and cancel | Failed billing, grace periods, platform differences |
| Media, motion & spatial interfaces | Manipulate real content accessibly | Battery, offline, controls, unsupported AR |
| Learning, wellbeing & global inclusion | Learn and act across languages and abilities | Unvalidated tests, RTL, sensory preferences |

### iOS and Android are separate behavior contracts

Apple's 2026 [tab bar guidance](https://developer.apple.com/design/human-interface-guidelines/tab-bars) explicitly treats tabs as destinations, not buttons performing actions. Its [sheet guidance](https://developer.apple.com/design/human-interface-guidelines/sheets) focuses on contextual scoped tasks. For iOS/iPadOS, inspect safe areas, dynamic type, VoiceOver, permissions, StoreKit and App Review requirements as they apply.

Android's [adaptive app quality guidance](https://developer.android.com/develop/adaptive-apps/quality-guidelines/adaptive-app-quality) addresses windows, foldables, multiple panes and input methods. Test Android system back, insets, TalkBack, keyboard/pointer and supported window sizes. **Do not simply recolor the same iPhone mockup** to call it an Android design.

A browser-rendered phone specimen can demonstrate hierarchy and reversible interactions, but **does not test** store purchase restoration, system permission dialogs, offline database correctness or real device accessibility.

### Platform-specific subscriptions

Subscription UX should display actual price and locale, term/trial and renewal, cancellation and restore, what is paid and free, and failure/grace period status. For current rules, refer to [Apple App Review](https://developer.apple.com/app-store/review/guidelines/) and [Google Play Payments](https://support.google.com/googleplay/android-developer/answer/9858738). Do not derive store policy compliance solely from screenshots.

**Critical reliability contract:** work saved locally is not synonymous with uploaded. Distinguish saved, queued, syncing, conflict, verified and failed states. Consequential payments and repeated operations need idempotency and actual server transaction confirmation. Export and delete controls must match backend behavior.

## 5. AI and agentic UI: a disciplined spectrum

Adding a bot is a product decision, not a decorative obligation. Google's [People + AI Guidebook](https://pair.withgoogle.com/guidebook-v2/patterns) advises testing whether AI adds value and supporting expectations and recourse. Amershi et al. motivate a broad interaction checklist. OWASP's [LLM Top 10](https://genai.owasp.org/llm-top-10/) motivates security checks on untrusted model/tool outputs and agents that can change external state.

| UI mode | Example user job | Main boundary |
| --- | --- | --- |
| No AI / rules | Filter/sort known items, validate local schemas | Deterministic behavior is often more appropriate |
| In-context AI suggestion | Summarize an explicitly selected note | Do not silently rewrite the original |
| Retrieval-grounded assistant | Explain cited docs within permitted access | Never fabricate citations or leak another person's document |
| Human-approved agent | Draft email, then show exact recipients and content for approval | Draft or plan is not permission to send |
| Controlled generative UI | Agent selects known vetted widgets with typed data | Validate all tool data and props |
| Declarative schema UI | Agent proposes a restricted component tree | Validate schema, semantics and permissions before rendering |
| Sandboxed open-ended UI | Render isolated illustrative HTML/SVG as untrusted content | Sandboxing, CSP and input/output validation are critical |
| Browser/on-device models | Run supported task locally with WebLLM, Transformers.js or ONNX Runtime | GPU/RAM/model rights and fallback are device-dependent |
| Hosted frontend APIs | Use Puter.js for user-account hosted inference | This is **cloud** inference, not local execution; disclose user-paid usage |
| Backend hosted agent | Use authorized server keys with model provider and tools | Auth, rate limits, data minimization, logging and human approval |

New reference links include [CopilotKit generative UI](https://github.com/CopilotKit/generative-ui) and [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI). They are source references, **not installed** into Prompt-Vault. Production applications must assess model costs, prompt injection, output validation and external action approvals.

A bot should not be the sole route to human support or the only way to read important product content.

## 6. Motion, spatial content, art direction and accessibility

**Motion helps when** people need to understand relationship, feedback or orientation, and when it is short and reversible. Heer & Robertson's chart transition work is evidence for certain graphical tasks, not “animate all dashboards.” [MDN View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) explains contemporary browser capabilities, which still need progressive enhancement.

**3D helps when** geometry, depth, spatial configuration or physical inspection is central. Simple products may use a rotatable genuine model plus static media; complex scenes need careful WebGL/WebGPU hardware budgets, asset license validation, fallback and pointer/keyboard parity. A CSS box does not make a real 3D model or AR implementation.

**Visual expression helps when** it creates recognition and emotional alignment without making action hard. Hassenzahl's work explores beauty/goodness/usability as distinct judgments. Avoid treating glassmorphism, brutalism, gradients, 3D bubbles, novelty cursors or ambient motion as unconditional signs of quality.

**Accessibility is a functional behavior**, not a badge. W3C [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [ARIA practices](https://www.w3.org/WAI/ARIA/apg/patterns/) and [cognitive accessibility guidance](https://www.w3.org/WAI/cognitive/) provide different layers. Test contrast, reading order, keyboard, touch, zoom, reduced motion and content comprehension. Proper RTL uses direction-aware layout and bilingual handling, not indiscriminate flipping.

## 7. Research instruments and what to actually measure

Choose success criteria in advance for each pattern. The explorer's “Success test” is an **evaluation question**, not a score that has already been measured.

- **Task success:** can participants complete the real objective without help?
- **Error rate and recovery:** what breaks, which choices are reversible and how much is lost?
- **Time and comprehension:** is the correct fact/action findable for the intended audience?
- **Accessibility:** do the real components remain usable with keyboard, VoiceOver/TalkBack, zoom, magnification and reduced-motion preferences?
- **Performance:** for web measure LCP/INP/CLS with context; for native apps measure startup, memory, dropped frames, crash-free sessions and low-resource behavior.
- **Perceived ease:** UMUX-LITE or SUS can complement observed behavior, not replace it.
- **Longitudinal experience:** ongoing use changes priorities; UX Curve suggests ways to study perception over time, subject to recall bias.
- **Business outcomes:** conversion/retention require clear cohort definitions, good instrumentation and ethically designed experiments. Never infer them from the existence of a design pattern.

For charts, read Munzner's nested evaluation model before choosing chart form. For perception, Cleveland & McGill studied which quantitative encodings readers decode accurately. Borkin et al. studied memorability; it is a different outcome from comprehension.

## 8. Rights and source-code safety

A public repository URL does not mean that a package is permissively open-source or that its assets can be resold.

- **[React Bits](https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md)** uses MIT **plus Commons Clause**, restricting resale/redistribution of the components themselves. It is a research reference, not vendored into this library.
- **[tldraw SDK](https://github.com/tldraw/tldraw/blob/main/apps/docs/content/community/license.mdx)** is source available but the SDK's production-use conditions require an appropriate license/key. Do not relicense its code as MIT.
- **[CopilotKit](https://github.com/CopilotKit/CopilotKit)** states MIT for repository source, but product-specific hosted services may have separate terms.
- **[React Flow](https://github.com/xyflow/xyflow)** identifies the React Flow library as MIT; Pro tooling, code samples, media and third-party assets need separate inspection.
- **Model weights, fonts, datasets, photos and icons** often have separate licensing, even when the renderer framework is MIT.

The Concept Field Guide's own UI and example code are original MIT content. The page only **links** third-party repositories and papers.

## 9. How the explorer works, and how to extend it

The machine catalog is divided into [website concepts](../docs/data/concepts-web.json), [app concepts](../docs/data/concepts-app.json), [research](../docs/data/deep-research.json), and [open-source references](../docs/data/deep-resources.json). The browser renders original illustrated specimens using shared **preview families**. Preview controls switch composition, device width and normal/success/error samples. Form examples validate demo input locally. These are not 200 independent apps and no real model, money, booking, purchase or account action takes place.

### Creating a new concept

Each addition must include:

1. A stable unique `id`, `track` (`website` or `app`), and meaningful `family`.
2. `title` naming a real reusable interaction or composition.
3. `purpose` stating the user's task and benefit, without claiming measured results.
4. `useWhen` and `avoidWhen` that make the decision conditional.
5. `preview` using an existing safe original renderer family (or an audited new one).
6. `sources` referencing valid IDs in the research file, with the **source finding and limitation** available.
7. `skills`, `successSignal`, `accessibility`, and `recovery` specific to that task.
8. A unique, working example interaction where appropriate and a reduced-motion path.
9. A check for upstream code/media licensing before any imports.
10. Test coverage for count, source integrity, DOM controls, parseable JS and functional browser behavior if a browser is available.

### Guided design cycle

Select Website or App → filter by actual user job → read fit and anti-fit → open at least one cited source and its limitation → inspect the original preview → toggle normal/success/error and device size → copy **Design**, **Implement** or **Audit** prompt → run in a working coding environment → gather real evidence → fix no more than four prioritized rounds → publish only after QA.

The goal is **a living, inspectable decision library**, not a giant indiscriminate component dump. New patterns can be proposed indefinitely while duplicate concepts and unsupported claims are rejected.
