# Apple App Store + Google Play: design and release checklists

> APP track. This guide is a **release planning reference**, not legal advice, automatic compliance or a claim that any given product is store-ready. Recheck live policy at submission.

## Side-by-side requirements

| Topic | App Store (iOS) | Google Play (Android) |
|---|---|---|
| Native UX | Apple [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/): familiar controls, safe area, dynamic type, VoiceOver | [Android design](https://developer.android.com/design): system Back/predictive Back, edge-to-edge, TalkBack, Material/adaptive guidance |
| App functionality | [Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) and required stable meaningful function | [Core quality](https://developer.android.com/docs/quality-guidelines/) and current API/device requirements |
| Digital purchases | [Apple 3.1.1](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase) ordinarily requires IAP for unlocks/subscriptions, with specified regional/product exceptions | [Google Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738) ordinarily requires Google Play Billing for digital in-app purchases, with specified exceptions |
| Subscriptions | Explain total/cadence, terms, trial details, cancellation and restore; actual entitlements/StoreKit | Product details, Play Billing subscriptions, acknowledgement/recovery and cancellation; verify jurisdiction rules |
| Privacy | Accurate privacy labels, purpose/permissions, account deletion where applicable | Accurate Data Safety, permissions, account deletion URL/process where required |
| Store assets | [Product page](https://developer.apple.com/app-store/product-page/) with screenshots of **real supported app** and accurate descriptions | [Store listing](https://support.google.com/googleplay/android-developer/) with real device captures, accurate tags, graphics and localized assets |
| Experiments | [Product Page Optimization](https://developer.apple.com/app-store/product-page-optimization/) where eligibility permits | [Store Listing Experiments](https://play.google.com/intl/eng_ALL/console/about/store-listing-experiments/) with clear A/B hypothesis |
| Test distribution | TestFlight/internal/external per account eligibility; physical iPhone + iPad if supported | Internal/closed/open testing tracks per account requirements; physical phone + tablet/foldable if supported |

**Payment footnote:** External checkout providers for a website are **not interchangeable** with native app-store digital goods policies. Some markets/product classes have exceptions and entitlements; verify each store's current rules and business model.

## Real screenshot storyboard

Capture **screens that actually exist**, not speculative mock features. Show these in a compelling but honest order:

1. **First value:** what problem is solved in the user's first useful session?
2. **Real core flow:** unmistakable product UI rather than a vague marketing promise.
3. **Differentiating action:** actual interaction that wouldn't fit a generic competitor.
4. **Value over time:** saved work, history, progress or workflow if implemented.
5. **Trust and control:** privacy, offline capabilities, accessibility, billing only if real.

Localize text to the actual supported languages. Do not add unsupported badges, endorsements, revenue/ratings or “fully offline” claims when cloud calls exist.

## In-app navigation/state release gates

- Deep link → correct destination → system Back → previous context preserved.
- Offline/background/process death → no unexpected data loss, recoverable retry state.
- Keyboard/VoiceOver/TalkBack/large type/reduced motion → major tasks remain operable.
- Purchase sandbox tests → correct current entitlement, restore, billing error, cancellation, receipt state.
- Permissions denied/revoked → user sees a real fallback; no endless permission nags.
- Privacy/data export/deletion/legal links → implemented backend and accurate descriptions.

## Copyable release-audit prompt

\`\`\`text
Audit this existing iOS and Android app for actual App Store and Google Play release.
Do NOT invent completion, approval, device test results, features or current policy. Retrieve current official policy where needed.
Map real screens to first-use value, navigation and all critical recovery states, with iOS vs Android differences.
Check StoreKit / Google Play Billing eligibility and integration for digital goods, entitlement restore, cancellation and sandbox outcomes.
Inspect screenshots/graphics from REAL app builds; build truthful localized storyboards. Do not replace device captures with Figma illustrations.
Review exact privacy/data safety, permission, account deletion, ratings and legal routes.
Run supported simulator/physical devices; list missing hardware/credentials and unverified flows clearly.
Rank P0/P1 before polish, four bounded repair rounds. Output submission checklist and the exact remaining blockers.
\`\`\`
