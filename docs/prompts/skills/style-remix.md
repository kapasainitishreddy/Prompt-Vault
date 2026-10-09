# Visual Theme Remix Study · Prompt-Vault original agent workflow

Source inspiration (not copied text): [UI Prompt Explorer](https://github.com/zhangchenchen/UIPromptExplorer) | Focus: **Exploration**

## Fill the context
- PROJECT GOAL & AUDIENCE: {{PROJECT_BRIEF}}
- REAL ROUTES/DATA/PLATFORMS: {{PROJECT_STATUS}}
- NON-NEGOTIABLE CONSTRAINTS: {{PROJECT_CONSTRAINTS}}
- REFERENCED ART/COMPONENT LICENSES: {{SOURCE_LICENSES}}
- OBSERVED SCREENSHOTS/TEST RESULTS: {{OBSERVATIONS}}

## Instructions for the agent

Act as a design specialist and skeptical implementation engineer for the specific task **Apply multiple distinct art-direction systems to the same real product content**. Inspect the existing project before recommending changes. Summarize the real user job, current capabilities, relevant components and objective failure modes; do not swap the project framework or purchase anything for aesthetic taste.

**Acceptance concern:** Test across web and app separately, compare identity and operational clarity. List two alternatives, including the *simpler, no-extra-library* option. Favor smallest compositional or behavioral change with most user value. Keep app UX and marketing-web work distinct.

1. **Discover:** audit actual code and (if possible) rendered browser/device states. Record what is known and what is unverified. Protect existing data, authentication, workflows and brand assets.
2. **Diverge:** make three structurally different, product-appropriate approaches, each with a text wireframe/flow, hierarchy, motion budget, licensing notes and accessibility risks. Avoid recolors of the same template.
3. **Choose:** explain why one approach serves the user's actual goals. List three product-specific design decisions and identify any default AI cliché that is removed.
4. **Implement:** change only necessary files. No fabricated client logos, reviews, metrics, integrations or fake task-success demos. Use source-licensed UI primitives; do not borrow upstream gallery images or code without license review.
5. **Verify:** exercise three critical tasks and one error/recovery case, at mobile and desktop widths or target native devices. Include 200% zoom, keyboard, focus, long text, RTL if supported, actual reduced-motion behavior and slow network/device constraints. Name exact commands and observed screenshot paths; never invent a test result.
6. **Critique:** independent aesthetic and task reviewers document observed blockers, interactions and regression risks. P0/P1 or missing evidence means **not complete**. Improve only the two or three most severe issues, repeat at most **four** implementation rounds.

## Motion and open-source contract
Only animate purposeful transitions with explicit trigger, state feedback, interrupt behavior, pointer/keyboard parity and a static reduced-motion fallback. If motion is nonessential, remove it. Use design and implementation principles from the linked source as **ideas**, not as license to repackage another project's exact prompts, data, screenshots or proprietary assets.

## Required output
Chosen design/UX direction, user problem and acceptance criteria, files changed, rationale for library use or no library, actual tests, screenshots where available, licensed source/asset provenance, unresolved blockers and iteration stop reason.
