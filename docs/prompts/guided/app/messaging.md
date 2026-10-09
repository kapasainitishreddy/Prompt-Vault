# App Design Blueprint — Messaging and collaboration

> **Only APP design**. iOS App Store and Android Google Play get separate platform adaptations. This is NOT a landing page template or a replica of a top-grossing app.

**Category:** Social. **Primary task:** Find a thread, communicate, see delivery state and retry failures.
**Original design thesis:** Conversation-first, resilient drafts and transparent delivery.

## Ordered screens and why each exists

1. **Sign in and account recovery** (`authentication`). Let users access a real account securely and recover it. Review bad password; lockout; 2FA; resend; offline; expired link. [Open standalone app-flow prompt](../../app/flows/authentication.md).
2. **Home and task hub** (`home`). Show what matters now, how to act, and current state. Review first use; empty; stale; overloaded; offline. [Open standalone app-flow prompt](../../app/flows/home.md).
3. **App navigation** (`navigation`). Make moving between important jobs reliable and platform-consistent. Review deep link; keyboard; back; many tabs; landscape. [Open standalone app-flow prompt](../../app/flows/navigation.md).
4. **Messaging and conversation** (`chat`). Read/write messages without ambiguity or lost text. Review unsent; offline; retry; large attachment; blocked user. [Open standalone app-flow prompt](../../app/flows/chat.md).
5. **Search and discovery** (`search`). Find one item precisely with clear matching and recovery. Review typo; zero; partial; unauthorized; slow; offline. [Open standalone app-flow prompt](../../app/flows/search.md).
6. **Notifications and inbox** (`notifications`). Prioritize real updates, control interruptions and take action. Review permission off; no alerts; stale link; bulk clear. [Open standalone app-flow prompt](../../app/flows/notifications.md).
7. **Capture and upload** (`upload-capture`). Add files or recorded content with clear safety, control and feedback. Review oversize; unsupported; offline; quota; duplicate. [Open standalone app-flow prompt](../../app/flows/upload-capture.md).
8. **Offline work and sync recovery** (`offline-sync`). Keep important data durable and communicate sync truth. Review offline; reconnect; conflicting edit; retry backoff. [Open standalone app-flow prompt](../../app/flows/offline-sync.md).
9. **Settings and data control** (`settings-privacy`). Help users change preferences, manage account and understand privacy. Review offline change; permission blocked; session expired. [Open standalone app-flow prompt](../../app/flows/settings-privacy.md).
10. **Errors and recovery** (`errors-recovery`). Turn failure into a practical and honest next step. Review timeout; partial failure; backend down; malformed data. [Open standalone app-flow prompt](../../app/flows/errors-recovery.md).

These are task states and screens, **not separate permanent tabs**. Choose top-level navigation destinations using actual user jobs. Preserve back state, draft durability, undo and permission timing. Drop irrelevant screens rather than filling the app with decorative modules.

## Realistic product example
Design a clearly labeled **hypothetical messaging and collaboration**. Use realistic long names, empty data, expired sessions, loading, no permissions, errors and offline mode. Do not invent App Store ratings, user counts, medical claims, verified payments, successful backend writes or live data. A screenshot of a mock is not an app.

## Three competing original UI directions
1. **Utility-first:** recognizable information hierarchy, dense enough to act, precise states and buttons.
2. **Product-expressive:** one unique visual metaphor derived from 'Find a thread, communicate, see delivery state and retry failures', while preserving native conventions.
3. **Adaptive:** compact one-hand phone controls and truly recomposed tablet/desktop regions.

Produce ASCII wireframes for compact iOS, compact Android and a large screen. Vary structural hierarchy, density, type, navigation model and media grammar, not just colors. Select one based on measured task effort and accessibility.

## iOS vs Android: implementation matrix

| Concern | Apple iOS / App Store | Android / Google Play |
| --- | --- | --- |
| Navigation | Apple HIG familiar tab destinations, modal dismissal, native Back conventions | Navigation bars/rails based on destinations, real Android system and predictive Back |
| Layout | Safe areas, keyboard, iPhone and supported iPad modes, Dynamic Type | Edge-to-edge/window insets, foldables/tablets, responsive widths, IME, font scale |
| Accessibility | VoiceOver, Switch Control, Reduce Motion, larger text | TalkBack, touch targets around recommended 48dp, reduced motion, hardware keyboard |
| Account | Apple account/privacy rules, Sign in with Apple if triggered by app conditions | Play Data safety, account removal and permission scope where applicable |
| Payments | Use StoreKit 2 and relevant App Store digital-goods requirements; accurate restore/subscription state | Play Billing for digital purchases as applicable; entitlement, retry/acknowledge/recovery |
| Store pages | Real screenshots for supported devices; honest demo and metadata, localizations | Real screenshots, store graphic, real permissions, validated privacy claims |

Rules change. Verify current [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/), [Apple review](https://developer.apple.com/app-store/review/guidelines/), [Android adaptive guidance](https://developer.android.com/docs/quality-guidelines/adaptive-app-quality) and [Google Play policy](https://support.google.com/googleplay/android-developer/) before release.

## AI & 3D: optional and justified
**AI decision:** Optional compose help that cannot send without user approval. Check [native AI routing](../../../../guides/app/AI-INTEGRATION.md). Never send personal content to cloud without meaningful informed consent; never claim local WebGPU works in every native webview. Include an explicit manual fallback.

**3D decision:** No 3D; message transitions only when state changes. Read [app motion and 3D](../../../../guides/app/MOTION-AND-3D.md). A GPU scene must not substitute for accessible controls or essential data.

**Skills:** Back;  drafts;  delivery receipts;  privacy and recovery. Match to actual project stack. Borrow open-source source code only if the exact file/asset license permits it.

## Revenue / business decisions
RevenueCat's [State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps) includes over 115,000 apps and shows 55% of 3-day-trial cancellations on day zero. It is observational and **does not tell you what exact UI makes an app rich**. [Sensor Tower 2026](https://sensortower.com/press/press-release-boosted-by-gen-ai-services-consumers-spent-more-money-in-apps-than-games-for-first-time) reports $167bn global 2025 IAP across all apps. Research [retention and revenue ethics](../../../../guides/app/REVENUE-AND-RETENTION.md).

**Relevant evidence identifiers:** heuristics, apple-tabs, android-quality. See [source register](../../../../catalog/evidence-atlas.json) and the original published articles with scope and limitations.

## Complete prompt for a coding agent
```text
Act as a native iOS/Android product designer and production-focused engineer.
Existing project must be inspected before any redesign. Preserve working data, auth, subscription entitlements, offline records and integrations.
Product: Messaging and collaboration. Primary user's goal: Find a thread, communicate, see delivery state and retry failures.
Design thesis: Conversation-first, resilient drafts and transparent delivery.
Read app-flow prompts only for relevant state transitions: authentication -> home -> navigation -> chat -> search -> notifications -> upload-capture -> offline-sync -> settings-privacy -> errors-recovery.
Make THREE structurally different mobile directions, with real content and errors. Select one via task clarity and a distinctive product-specific visual grammar.
Implement iOS and Android conventions separately: platform Back/sheets, safe areas/insets, Dynamic Type/font scale, VoiceOver/TalkBack, keyboard, touch and real adaptive views.
Implement idle/loading/error/empty/offline/success/denied-permission and recoverable flows where meaningful. Users should never lose drafts when backgrounding.
AI only if justified: Optional compose help that cannot send without user approval. 3D only if justified: No 3D; message transitions only when state changes.
Do not invent testimonials, billing confirmations, app revenue or untested platform availability. Use actual backend or explicitly labeled local mock.
Screen flows should work, not merely resemble screen designs. Run three primary tasks, a failure recovery and background/restore path. Record screenshots/videos and exact tests.
Check Apple and Google Play current store restrictions and real listing assets. Report unavailable simulator/physical-device tests as UNVERIFIED.
Run separate aesthetic critic and task skeptic, repair the largest two/three issues and retest; MAX FOUR rounds. Stop on measured gates or list blockers.
```

## Release proof checklist
- A new user completes the primary task without a mandatory showcase or early paywall blocking real value.
- Real errors recover and users can clearly tell mock/demo from live state.
- Screens fit narrow phones, larger text and supported adaptive windows.
- Primary controls have accessible labels, keyboard alternatives and reduced motion.
- App Store/Google Play pages describe only verifiably implemented behavior; payments/entitlements and removal flows tested.
- Evidence: device + OS + screen capture + test output and limitations. **No claim of production readiness without verification.**
