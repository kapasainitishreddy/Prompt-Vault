# App UX patterns: functional first, beautifully specific

Apps are recurring **tasks and state transitions**, not miniature landing pages. Design the difficult moment, not only the pretty initial screen.

| # | Pattern | Core job | Required states and edge cases |
| --- | --- | --- | --- |
| 1 | **Today / next action** | Show exactly what needs attention | No tasks, overdue, snoozed, offline, time zones |
| 2 | **Search and refine** | Find a specific thing quickly | Zero results, typo, partial loading, pagination, voice/screen reader |
| 3 | **Create / edit** | Save meaningful work confidently | Draft, unsaved changes, invalid input, concurrent edits, undo |
| 4 | **Inbox / triage** | Decide what to handle now | Bulk actions, unread, permission failures, undo, archive |
| 5 | **Progressive onboarding** | First value without excessive asks | Skip, return, no account, denied permissions, resumed session |
| 6 | **Dashboard / explanation** | Turn data into a decision | Freshness, no-data, delayed data, metric provenance, legends |
| 7 | **Secure transaction** | Commit with clarity and trust | Idempotency, retry, pending, success receipt, declined payment |
| 8 | **Offline-first workspace** | Keep functioning on poor networks | Cache visibility, queued edits, conflict resolution, stale labels |
| 9 | **Media / creation canvas** | Create without losing a draft | Upload errors, large media, autosave, render progress, permissions |
| 10 | **Preferences / account** | Stay in control of personal data | Data export, deletion, privacy choices, subscription states, confirmation |

## Flow design contract

**User goal → entry point → success path → interruptions → recovery → exit.**

- Enumerate roles and permissions. Name the user task in a verb/object format.
- Decide navigation with an information architecture map, not by imitating a screenshot.
- Record a state table for each primary interaction: idle, working, success, empty, error, offline, unauthorized, disabled, pending and recovered where relevant.
- Label commands with specific verbs and make destructive actions reversible when practical.
- Show actual data shape, dates, truncation rules, avatar/image fallbacks, long strings, dynamic text size and localized numbers.
- On iOS, check safe areas, system bars, Dynamic Type, VoiceOver, native gestures, modal dismissal and permission timing.
- On Android, check edge-to-edge layout, 48dp recommended tap regions, back behavior, IME/keyboard, TalkBack and font scaling.
- In web apps, check keyboard-first operation, responsive tables, screen readers, zoom, focus restoration and browser navigation.
- For every mobile platform: **small devices**, foldables/tablets if in scope, portrait/landscape where supported, dark/light, RTL, offline/slow network, background/foreground transitions, reduced motion, data loss and account sign-out.

## Visual personality without UX sabotage

Choose one recognizable system: type hierarchy, unique icon treatment, purposeful data visuals, content density, product-specific illustration, tactile microfeedback or understated editorial style. **Do not** introduce a novel navigation system merely to appear original.

Use an accessible component primitive set, then add product-specific visual tokens. Maintain a consistent component inventory: button, card, field, status, error, dialog, bottom sheet, list item, navigation, skeleton, empty state and toast. Each needs interactive states and clear semantics.

## Evaluate realistic scenarios

Simulate a first-time user, experienced power user, screen-reader user, motor-limited user, non-native language user, RTL reader, low-connectivity commuter, older user with large text, privacy-sensitive user and user who loses progress mid-task. These are **analysis perspectives, not actual user interviews**. Follow up with humans when possible.

Evidence package: annotated screenshots of key screens/states, a 60-second path-through-task, error/recovery test, accessibility issues, localization test, and a list of features *not* verified. An elegant splash screen is not proof of a usable app.
