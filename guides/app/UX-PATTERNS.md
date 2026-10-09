# App UX structure: from first open to recurring real value

> App Design, not a marketing page. Every feature is a **task + state graph**; tabs are only the most important destinations.

## The five layers of app design

1. **Why come here?** The user can name the job and first meaningful outcome. Onboarding should not delay it unless permission/identity truly required.
2. **Where am I?** App navigation reflects 3–5 (or fewer) primary destination groups, with familiar platform conventions and deep-link/back reliability. Secondary settings/actions are not promoted to tabs.
3. **What can I do?** Every screen has a visible heading, one clear main action, labels and relevant content. Avoid dashboard card walls with no decisions.
4. **What just happened?** Loading, success, errors, offline, permission denial, pending/draft, recoverability and undo are explicit.
5. **How do I return?** Save persistent work, honest sync and re-entry context. Learn from meaningful retention, not force users into streaks.

## Screen-level design grammar

For each flow draw and implement:
\`\`\`text
ENTRY → CONTEXT → ACTION → VALIDATION → SUBMIT/SAVE → CONFIRMED REAL RESULT
                     ↘ FAILED → ERROR MESSAGE → FIX/RETRY → RECOVERED
              ↘ INTERRUPTED → DRAFT/QUEUED → RESUME
              ↘ PERMISSION DENIED → MANUAL ALTERNATIVE
\`\`\`

**Required content:** concrete app-specific copy, realistic long record names, known ownership/source, date/timezone formatting, data age, action effects and cancel/undo.

**Required component states:** enabled, disabled with explanation, loading, active/focused, success, error, offline, empty, no permission, expired session, pending payment and accessibility alternative where meaningful.

**Required output:** information architecture map, screen-state table, reusable semantic design tokens, accessibility plan, motion decision, test scripts and exact screen recordings. A screenshot alone is not functioning flow proof.

## Mobile form-factor differences

- Compact phone: one primary column; safe thumb paths; keyboard doesn't cover Send/Save.
- Tablet/large phone: list/detail split if it improves context; no meaningless stretched cards.
- Foldable/desktop window: adapt dynamically to window size, never hardcode device model.
- RTL/languages: actual translations, bidirectional numerals, mirrored direction-aware arrows and non-Latin font fallback.
- iOS/Android: platform appropriate Back/tabs, permissions, Dynamic Type/TalkBack, OS system UI, animations and store billing where appropriate.

## Preview vs product reality

- An academy preview is a **functional HTML illustration** of navigation and visual hierarchy.
- It is **not** a compiled native application, App Store/Play Store screenshot, automated accessibility certification or verified analytics record.
- In a new native app, use [Expo](https://expo.dev/), Flutter or an appropriate native stack based on existing source and constraints.
- Provide realistic, not invented, data states. A build must eventually run on devices before calling it ready.

## Copyable structure prompt

\`\`\`text
Design one genuinely useful app journey by deriving its first task, top destinations, action/recovery states and repeated value.
Build three distinct art-direction systems without changing how familiar native controls work.
Map idle, error, denied, offline, empty, working, success, save and undo states; implement the real data transitions.
Adapt for iOS and Android, and for compact vs tablet/foldable windows. Provide actual VoiceOver/TalkBack/keyboard checks.
Motion only when it shows state or continuity; no obligatory 3D, chatbot, gamification or paywall.
Demonstrate at least 3 task outcomes and a failure recovery on an actual supported runtime. Compare regressions in four or fewer review rounds.
\`\`\`
