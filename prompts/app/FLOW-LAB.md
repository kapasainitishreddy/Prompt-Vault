# APP FLOW LAB • deep repair for one difficult user journey

Use when the problem is a **multi-screen task** rather than a visual redesign. The deliverable is a working, accessible journey with recoverable states.

PROJECT:
{{PROJECT_BRIEF}}

CURRENT FEEDBACK:
{{ITERATION_CONTEXT}}

## Instructions

1. Identify the one most important job as **user + goal + context + measurable success**. Observe the current flow in code and emulator/browser if available. Note current errors without pretending a run.
2. Write a short **state graph**: entry → in progress → valid outcome; branches for cancel, validation error, network failure, auth expiration, empty result, permission denial, interruption/resume and partial save when applicable.
3. Create a **screen-state matrix** with: user intent, action, focus/reading order, accessible labels, feedback copy, back/undo, ownership of data and analytics events only if actually wired.
4. Consider three alternative ways to simplify: remove a step, make choice reversible, or make context persist across screens. Compare costs and risks, pick one.
5. Implement the selected flow with smallest safe code changes; preserve working business logic. New UI must use existing components unless they are demonstrably inadequate.
6. Test with realistic messy content and ten human-perspective **simulations**: first-time, expert, large text, screen reader, motor limits, RTL, bad network, denied permission, interrupted user, privacy-sensitive user. Simulated perspectives are not user studies.
7. Check iOS/Android/web expectations and assistive technologies **appropriate to the actual target**, not generic icons only.
8. Record observed path/task outcomes, screenshots for important states, and manual checks. If unavailable, list unverified cases rather than passing them.
9. Critique weak steps, make focused repairs, repeat **up to four rounds**. Stop when core task succeeds, errors recover, no blocker exists and required evidence is present; otherwise report blockers and stop.

Do **not** replace a working application with a glossy prototype, or invent backend readiness. Report exact routes/files changed and evidence. 
