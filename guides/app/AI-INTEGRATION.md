# AI in iOS and Android apps: context, actions, privacy, model routing

**APP track.** UI must remain useful when AI is slow, offline, mistaken or unavailable. Store listings must not claim AI capabilities that are not implemented and tested.

## Define the AI role

- **Search/explanation:** cite app-controlled records with explicit permission. Useful for catalogs, personal knowledge, documentation, analytics.
- **Suggestion/generation:** user asks for a draft; visibly separate suggested text from saved content. Provide edit, discard and regenerate.
- **Action-taking agent:** display intended consequences and request **explicit approval** before sending, deleting, purchasing, scheduling, publishing or changing accounts.
- **Background summary:** only after opt-in; respect battery, privacy, notifications and provider quotas.
- **Don't add AI:** task completion, permissions, paywall checkout and emergency help should not rely on generative output.

## Local vs cloud (native reality)

| Route | Device reality | Consent/performance |
|---|---|---|
| Server-mediated hosted model | Native app calls scoped backend, backend holds keys | Clear data disclosure, authenticated scoped retrieval, rate limiting, logs and cancellation |
| Puter.js hosted AI | A JavaScript browser SDK calling Puter cloud with user-pays account | **Not local inference**; embedding in native WebView requires careful session/auth/terms review. Do not assume Expo native compatibility. |
| WebLLM/Transformers.js | Browser/WebView-compatible JS with GPU/WASM may run on supported devices | WebGPU/model support differs, large downloads/ram; not automatically available in React Native JS runtime |
| Native device models | Platform-specific on-device frameworks where available | Check OS version, supported device, model permission/download, locale and memory; explicit capability check |
| Hybrid | Local quick classification + optional cloud generation | Clearly signal exactly when private data leaves device; user can disable cloud path |

**User-visible model menu** only when it improves a real task. Avoid untestable model rankings and magic-orb interfaces. Show job-specific entry point in the working screen rather than a bubble over the bottom navigation.

## Core interaction state machine

\`\`\`text
idle → user request → consent/source selection → queued → running
  → output draft with provenance → edit / accept / reject
  → approved save/action (when allowed) → confirmed actual state
  ↘ unsupported / offline / no permission / model error / expired account
     → retry / manual feature / human support
\`\`\`

Handle context truncation, prompt injection from retrieved content, tool allowlists and sensitive-data redaction. Store user approvals separately from generated reasoning. Avoid presenting hallucinated output as verified app records.

## Platform accessibility and limits

- **iOS:** VoiceOver labels for response and controls, dynamic font, keyboard/Focus, safe areas, app background/cancel behavior, explicit microphone/photo/location permissions only at need. On-device APIs require supported iOS release and hardware.
- **Android:** TalkBack, IME, predictive/system back and process-death recovery, permission states, small and large screen adaptive layout, mobile power/thermal/memory limits.
- **Both:** meaningful progress, Stop generation, cite source links, retry, clear saved/unsaved boundary, readable tables, motion-off. Never expose provider API keys inside native distributable bundles.

## Example: compare two user journeys

**Journal:** traditional search must work offline. Local embeddings can optionally group entries on compatible hardware and only after user consent. Cloud summarization is a separate opt-in with precise privacy disclosure. The system must never suggest a diagnosis.

**Operations agent:** explain a number with source, let a user approve a proposed change, log actual backend result, undo if technically possible. Unverified recommendations remain draft, not performed actions.

## Copyable implementation prompt

\`\`\`text
Design an iOS/Android feature-aware AI assistant embedded in the user's real task screen.
First decide if AI is justified over structured search, ordinary filters or manual actions. Say no if not.
Inspect native app source/backend/data, platform runtime and capabilities. Choose server/cloud/local or hybrid, document where model runs and who pays.
Use an explicit input, consent/data-source selection and Stop button; distinguish draft from saved/acted-upon record.
Implement permission denial, no network, unsupported model, out-of-credits, stale source, model uncertainty, tool failure and manual fallback.
For actions: show scope/side effects and obtain explicit user approval before writing, deleting, sending or purchasing.
Real device test iOS VoiceOver, Android TalkBack, keyboard, orientation, font scaling, memory and background cancellation where hardware exists. Label untested platforms UNVERIFIED.
No keys in app bundles, no fabricated model output. No AI-only navigation. Four bounded repair rounds with independent task critique.
\`\`\`
