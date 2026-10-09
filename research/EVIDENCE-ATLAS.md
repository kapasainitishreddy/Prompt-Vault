# Research evidence and original open-source ingredients

*Verified-source reading register. Reviewed October 8, 2026.*

**Two main design tracks only:** [Website Design](../guides/website/README.md) and [App Design](../guides/app/README.md). 3D, motion and AI are opt-in *capabilities* within these tracks, not obligatory features or a third product.

## How to read this research

- Papers report observations or experiments in a **specific sample**. Never treat "beautiful" as proof of task success.
- Published UX articles and platform design standards are useful guidelines, not a command to clone a brand or make all pages identical.
- Baymard's mobile product/checkout reports identify real sources of purchase friction. They do **not** imply any one template guarantees conversion.
- RevenueCat's 2026 report covers 115,000+ subscription apps. Its churn, trial and store comparisons are observational, **not causally explained by a bottom tab, paywall color or font**.
- Sensor Tower's **$167bn global 2025 IAP estimate** does **not** establish a named app's exact revenue. Avoid fake "top-grossing UI formula" claims.
- Google's good p75 web metrics: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. A desktop-only Lighthouse run is not real-user evidence.
- **Puter.js** sends requests to a vendor-operated cloud AI backend and uses user-pays billing. **WebLLM / Transformers.js** can run selected models in browser/device under hardware, download and license constraints. Do not label Puter.js "on-device inference."
- Native app UI guidance differs between Apple App Store and Android Google Play. Store assets must reflect real functionality and be tested on target devices.

## Academic papers, top-company articles and standards

- **[Attention web designers: You have 50 milliseconds to make a good first impression!](https://doi.org/10.1080/01449290500330448)**, Lindgaard et al. (2006, paper). First-glance visual appeal judgments matter; do not confuse them with successful tasks. **Limit:** Tests involved particular short exposures and stimuli.
- **[The role of visual complexity and prototypicality regarding first impression of websites](https://doi.org/10.1016/j.ijhcs.2012.06.003)**, Tuch et al. (2012, paper). Familiar operation and controlled complexity help initial judgments, while brand expression may stay original. **Limit:** Not a prescription to copy existing layouts.
- **[What is beautiful is usable](https://doi.org/10.1016/S0953-5438(00)00031-X)**, Tractinsky, Katz & Ikar (2000, paper). Appearance influences perceived usability; test objective task outcomes separately. **Limit:** Perception is not task completion.
- **[10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/)**, Nielsen Norman Group (2024, industry-guide). Status, recognition, undo, consistency and error recovery are essential design review dimensions. **Limit:** Expert heuristics cannot replace participant tests.
- **[Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)**, W3C (2023, standard). Contrast, accessible names, keyboard, focus, reflow and input alternatives are baseline QA. **Limit:** Auditing with only automated scanners is insufficient.
- **[Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide)**, W3C (2023, standard). Give controls for qualifying auto-start moving and auto-updating content. **Limit:** Specific exceptions apply; not every transition is prohibited.
- **[Animated Transitions in Statistical Data Graphics](https://doi.org/10.1109/TVCG.2007.70539)**, Heer and Robertson (2007, paper). State-linked transitions can make data changes easier to follow. **Limit:** Data graphics result does not prove arbitrary animations improve conversion.
- **[How the Core Web Vitals metrics thresholds were defined](https://web.dev/articles/defining-core-web-vitals-thresholds)**, Google web.dev (2025, company-guide). Good p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 are real-user targets. **Limit:** A local Lighthouse simulation differs from field data.
- **[5 Steps to Creating a UX-Design Portfolio](https://www.nngroup.com/articles/ux-design-portfolios/)**, Nielsen Norman Group (2019, industry-article). Show roles, process, constraints and results, not only polished screens. **Limit:** UX hiring research does not predict every engineering hiring decision.
- **[Creating a UX Design Portfolio Case Study](https://www.nngroup.com/videos/ux-design-portfolio-case-study/)**, Nielsen Norman Group (2019, industry-video). Structure case studies as problem, decisions, contribution, evidence and outcome. **Limit:** Technical implementation portfolios can adapt this structure.
- **[About Us Information on Corporate Websites](https://www.nngroup.com/articles/about-us-information-on-websites/)**, Nielsen Norman Group (2019, industry-article). Company information should be clear, authentic, transparent and verifiable. **Limit:** Testing context varied by corporate type.
- **[Product Details Page UX Research](https://baymard.com/research/product-page)**, Baymard Institute (2026, industry-research). Decision-ready imagery, dimensions, variant clarity, shipping, spec and availability. **Limit:** Much of the full benchmark is a paid resource.
- **[Checkout UX 2025: 10 Pitfalls and Best Practices](https://baymard.com/research-articles/current-state-of-checkout-ux)**, Baymard Institute (2025, industry-research). Guest checkout, adaptive errors, shipping clarity and fewer irrelevant form fields. **Limit:** Benchmarks do not guarantee conversions for any site.
- **[Product Listing Page UX Best Practices](https://baymard.com/blog/product-listing-page-plp-ux)**, Baymard Institute (2026, industry-article). Filter visibility, comparison, scanning and clear sort improve discovery. **Limit:** Ecommerce context only.
- **[Designing a billing page that converts](https://stripe.com/resources/more/designing-a-billing-page-that-converts-tips-for-better-payment-experiences)**, Stripe (2026, company-article). Honest totals, currency, errors and clear purchase decisions. **Limit:** Company recommendations, not causal experimental proof.
- **[Components and patterns](https://design-system.service.gov.uk/components/)**, GOV.UK Design System (2026, open-design-guide). Semantic, accessible controls, errors and feedback with tested examples. **Limit:** Government copy/branding should not be cloned.
- **[Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)**, Apple Human Interface Guidelines (2026, platform-guide). Tabs are for top-level navigation, not actions; keep nested navigation state. **Limit:** Don't add a tab for every feature.
- **[Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding)**, Apple Human Interface Guidelines (2026, platform-guide). Start fast, teach by doing, and make onboarding optional when possible. **Limit:** Account and permission constraints need individual review.
- **[Layouts and navigation patterns](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns)**, Android Developers (2026, platform-guide). Use familiar navigation bar/rail/drawer by destination count and screen size. **Limit:** Android patterns should not be imposed unchanged on iOS.
- **[Adaptive app quality guidelines](https://developer.android.com/docs/quality-guidelines/adaptive-app-quality)**, Android Developers (2026, platform-guide). Support phones, tablets, foldables and resizable windows when in scope. **Limit:** Quality tiers depend on device support goals.
- **[Core app quality guidelines](https://developer.android.com/docs/quality-guidelines/archive/core/core-app-quality-2026-03-20)**, Android Developers (2026, platform-guide). Meet stability, expected behavior and honest Play Store listing requirements. **Limit:** Snapshot from March; check current policy before submission.
- **[Expressive Design: Google's UX Research](https://design.google/library/expressive-material-design-google-research)**, Google Design (2025, company-research). Balance emotional expression with familiarity and legibility. **Limit:** Do not force a particular Material style onto every brand.
- **[Creating Your Product Page](https://developer.apple.com/app-store/product-page/)**, Apple Developer (2026, platform-guide). Use real feature screenshots and convincing metadata, with localized assets where available. **Limit:** Marketing cannot rescue poor retention and app quality.
- **[Product Page Optimization](https://developer.apple.com/app-store/product-page-optimization/)**, Apple Developer (2026, platform-guide). Run controlled asset tests with sufficient samples instead of assumptions. **Limit:** Results from one cohort might not generalize.
- **[Store Listing Experiments](https://play.google.com/intl/eng_ALL/console/about/store-listing-experiments/)**, Google Play Console (2026, platform-guide). Test icons, preview visuals and localized copy one hypothesis at a time. **Limit:** Traffic and store tests determine statistical confidence.
- **[State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps)**, RevenueCat (2026, industry-report). Early time-to-value, cancellations, retention and store billing recovery deserve study. **Limit:** Observational data from 115k+ apps; correlation is not causation.
- **[State of Mobile 2026](https://sensortower.com/press/press-release-boosted-by-gen-ai-services-consumers-spent-more-money-in-apps-than-games-for-first-time)**, Sensor Tower (2026, industry-report). Global 2025 IAP estimate of $167bn informs market size, not layouts or individual app income. **Limit:** Do not invent named app revenue.
- **[10 Guidelines for Designing Your Site's AI Chatbots](https://www.nngroup.com/articles/ai-chatbots-design-guidelines/)**, Nielsen Norman Group (2026, industry-research). Name bot limitations, context, safe suggestions, task relevance and recoverable errors. **Limit:** AI can be entirely unnecessary for a simple page.
- **[AI Chat Is Not (Always) the Answer](https://www.nngroup.com/articles/ai-chat-not-the-answer/)**, Nielsen Norman Group (2024, industry-article). Test direct search/navigation before adding chat; avoid replacing useful controls. **Limit:** Narrow domain assistants may still help.
- **[Puter.js Documentation](https://docs.puter.com/)**, Puter (2026, vendor-doc). Frontend access to cloud-model APIs with user-pays authentication; not on-device local inference. **Limit:** Requires network, service and user account/allowance.
- **[WebLLM Getting Started](https://webllm.mlc.ai/docs/user/get_started.html)**, MLC.ai (2026, open-source-doc). WebGPU local inference needs model downloads, progress, memory safeguards and fallback. **Limit:** WebGPU and model support differ by browser and device.
- **[Transformers.js WebGPU Guide](https://huggingface.co/docs/transformers.js/guides/webgpu)**, Hugging Face (2026, open-source-doc). Embeddings/classification/vision models can run locally with the right browser. **Limit:** Library and model weight licenses are different.
- **[Get started with built-in AI](https://developer.chrome.com/docs/ai/get-started)**, Chrome Developers (2026, platform-guide). Chrome built-in AI feature/browser/device availability must be queried before use. **Limit:** Some APIs are desktop-only or in trials.
- **[The model-viewer web component](https://web.dev/articles/model-viewer)**, Google web.dev (2020, company-guide). A progressive enhancement path to product 3D/AR viewers. **Limit:** Models need optimization, licenses and accessible static fallback.
- **[React Three Fiber](https://github.com/pmndrs/react-three-fiber)**, Poimandres (2026, open-source-doc). React renderer for useful interactive 3D experiences. **Limit:** React-version compatibility, device GPU budget and semantics matter.
- **[Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)**, W3C (2023, standard). Allow disabling nonessential movement triggered by interactions. **Limit:** This is AAA, not an AA mandate.
- **[10 Guidelines for Designing Your Site's AI Chatbots](https://www.nngroup.com/articles/ai-chatbots-design-guidelines/)**, Nielsen Norman Group (2026, industry-research). Context-specific prompts and easy discovery can help, but don't obstruct the page. **Limit:** Finding a bot useful is not proven by installing a bubble.

## Open-source building blocks, not a code-dump

The license note records the public repository at review; verify the exact package, fonts, example assets, model weights, and potential premium versions when installing. Original Prompt-Vault material is MIT; linking an upstream dependency does not relicense it.

| Tool / library | License summary | Design use |
|---|---|---|
| [three.js](https://github.com/mrdoob/three.js) | MIT | 3D engine; only add to page when the visitor can manipulate or learn something. |
| [React Three Fiber](https://github.com/pmndrs/react-three-fiber) | MIT | Declarative React 3D, check React major version compatibility. |
| [Drei](https://github.com/pmndrs/drei) | MIT | Opt-in helper library for React 3D. |
| [model-viewer](https://github.com/google/model-viewer) | Apache-2.0 | 3D/AR viewer with poster and accessible text fallback. |
| [PlayCanvas Engine](https://github.com/playcanvas/engine) | MIT | High-interaction product/game 3D engine. |
| [Threlte](https://github.com/threlte/threlte) | MIT | Svelte-focused Three.js alternative. |
| [Motion](https://github.com/motiondivision/motion) | MIT | State transitions and animation with reduced-motion alternatives. |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | MIT | Small understandable React motion recipes. |
| [Radix UI](https://github.com/radix-ui/primitives) | MIT | Headless accessible interaction primitives. |
| [Base UI](https://github.com/mui/base-ui) | MIT | Accessible unstyled React components. |
| [React Aria](https://github.com/adobe/react-spectrum) | Apache-2.0 | Accessible interactions, inspect subpackage terms. |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | MIT | Components as starting points, not final art direction. |
| [Origin UI](https://github.com/shadcn/originui) | MIT | Complex React web-app controls. |
| [Uiverse Galaxy](https://github.com/uiverse-io/galaxy) | MIT | Community small UI effects; respect contributors. |
| [Magic UI](https://github.com/magicuidesign/magicui) | MIT public code | Marketing animations; commercial templates separate. |
| [React Native Reusables](https://github.com/founded-labs/react-native-reusables) | MIT | Expo/NativeWind component patterns. |
| [gluestack-ui](https://github.com/gluestack/gluestack-ui) | README says MIT; root license unconfirmed | Cross-platform components; verify each package's actual license. |
| [React Native Paper](https://github.com/callstack/react-native-paper) | MIT | Material-inspired React Native widgets. |
| [Expo](https://github.com/expo/expo) | MIT core | React Native app framework; check SDK compatibility and modules. |
| [Flutter](https://github.com/flutter/flutter) | BSD-3-Clause | Cross-platform native UI. |
| [WebLLM](https://github.com/mlc-ai/web-llm) | Apache-2.0 | WebGPU in-browser LLM; downloads and memory. |
| [Transformers.js](https://github.com/huggingface/transformers.js) | Apache-2.0 | Local embeddings/vision/text; model license separate. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | MIT | Chat UI components; runtime/backend still needed. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | MIT | Context-aware agent UI; require action review and consent. |
| [Puter server](https://github.com/HeyPuter/puter) | AGPL-3.0 | Open self-hosted server; JS cloud API is vendor/user-pays. |
| [Playwright](https://github.com/microsoft/playwright) | Apache-2.0 | Real browser tasks, screenshots and regressions. |
| [axe-core](https://github.com/dequelabs/axe-core) | MPL-2.0 | Automated accessibility checks, not full certification. |
| [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) | MIT | Accessible forms and error patterns, not its branding. |

## A bounded research-to-implementation loop

1. Identify user, primary task, channel and target form factor.
2. Choose only the relevant sources and explain **what each source supports and does not**.
3. Map needed screens/sections, explicit state variants and optional effects. Order by user questions and next-action needs.
4. Produce three original art directions. Protect familiar affordances and accurate content.
5. Implement, render, collect real task/screenshot/error/performance evidence. **Unknown is not pass.**
6. Have an adversarial visual critic and a task skeptic inspect independently.
7. Repair up to four rounds; stop if evidenced gates pass or report blockers.

The [source data JSON](../catalog/evidence-atlas.json) is inspectable; citations remain outbound links to their publishers. No paper PDFs, publisher images or paywalled data are copied into this repo.
