# Revenue and retention research: design lessons without cargo cult

**APP track.** Financial results of popular applications can motivate hypotheses but do not reveal the causal UI feature responsible.

## What the primary reports actually say

- [Sensor Tower, State of Mobile 2026](https://sensortower.com/press/press-release-boosted-by-gen-ai-services-consumers-spent-more-money-in-apps-than-games-for-first-time): estimated **$167bn global consumer spending through in-app purchases in 2025**, with non-game app spending exceeding games for the first time. This is not any one application's revenue.
- [RevenueCat, State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps): a report drawing on **115,000+ subscription apps**. Its 3-day-trial section reports **55.4% of cancellations on day zero**. Interpretation: the first experience deserves attention and expectations must be clear. Do not assume shortening or lengthening trials always improves earnings.
- RevenueCat reports 7-day trials with 39.8% of cancellation events on day zero, and 14-day trials 35.7%, within its observed sample. These are not experiment-induced causal effects.
- A high-grossing app's navigation, icons, animation, paywall, bright palette or chat surface **does not automatically cause its revenue**. Business model, distribution, network effects, category and user needs differ.

## Benchmark-derived design hypotheses (not promises)

| Observation | Product question to test | Responsible UX experiment |
|---|---|---|
| Early trial cancellations | Does the user understand the product and achieve one real outcome before choosing a plan? | First-session task, honest trial terms, show clear upgrade timing |
| Retention variance | Do people return because work is genuinely useful? | Repeat a real job, saved state, reminder opt-in, survey nonreturners |
| Store differences | Are billing and platform conventions reducing voluntary/involuntary churn? | Run actual StoreKit and Play Billing sandbox/error/restore tests by OS |
| AI monetization attention | Does an AI feature produce verified user value, and what are its costs? | Consent-first opt-in, measured latency, evaluations and explicit pricing |
| High-rated app polish | Can a user solve their task with different abilities/devices? | Real iOS/Android accessibility and orientation study |

## Ethical measurement and decision table

Measure explicit quantities with definitions:
- Activation: percentage of eligible users **completing a specific core job** within a defined time, not just viewing onboarding.
- Retention: active cohorts returning for a **meaningful task** at D1/D7/D30, not app-open vanity.
- Conversion: paid events among a **defined denominator**, separated by trial plan/store/locale/cohort.
- Refund/chargeback/cancellation: reasons and timing in eligible sample.
- Reliability: error-free sessions, crash rates, restore and sync failures; user support time.
- Accessibility: completion rates or observation logs by real test participants with consent; simulation personas ≠ user research.

Never select a design based solely on screenshots or copied rankings. Personal data collection needs notice/consent and access control. Avoid dark patterns such as hidden “Cancel”, preselected yearly prices or manufactured urgency.

## Sample comparison questions for the Academy

**Video/community:** playback continuity and discovery can be studied as tasks; network effects cannot be copied by cloning a feed.

**Cloud subscription utility:** clarity of entitlement, storage usage and cancellation often matters more than a cinematic login.

**AI assistant:** show source confidence, a fast first useful result, real model/usage cost and explicit action approval; do not equate typing animation with trust.

## Copyable revenue-focused design prompt

\`\`\`text
Examine the existing app's top three user jobs, first-session outcomes, reliable retention and monetization constraints.
Use RevenueCat 2026 and Sensor Tower 2026 as observational context with denominators and limitations, never as claims that one screen style generates revenue.
Create three ethical UX hypotheses, defining baseline, guardrails, target population, metric, observation period and stop condition.
Optimize ability to accomplish real work, honest pricing, cancellation/restore access, notification opt-in and performance.
Separate iOS and Android journeys and billing logic; do not invent analytics records or test results.
Build and test the least risky improvements in at most four rounds; report what was observed and what is still unverified.
\`\`\`
