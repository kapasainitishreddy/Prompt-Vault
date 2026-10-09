# Website AI Integration: when to add a bot, where to place it, and how to ship it

> WEBSITE track. AI is **optional**, not a default UI section. Avoid replacing clear navigation, search, checkout, contact or accessible controls with chat.

## Decision tree, before choosing an SDK

1. **What repeated visitor job is unsolved?** Finding the right plan, navigating a long technical manual, drafting an item, searching a book catalog, or qualifying an integration question are plausible. A homepage with six clear links probably doesn't need AI.
2. **Could structured search/filter/FAQ do better?** Prototype the non-AI alternative first, time three user tasks and document uncertainty.
3. **What data is required?** Public docs only? Personal customer records? Account-specific pricing? If private, demand explicit permission, minimal scope and secure authorization.
4. **Where should the AI sit?** Contextual *Ask about this page* beside documentation; inline task copilot in product demo; searchable command surface for a large catalog; a dismissible assistant in Help. Never cover the primary CTA, mobile nav, price or keyboard focus. No surprise pop-ups.
5. **What if it fails?** Direct docs, human contact or manual task path. An unavailable model must never prevent ordinary navigation.

## Four implementation architectures

| Choice | What runs where | Use when | Tradeoff |
|---|---|---|---|
| **Puter.js frontend service** | JavaScript SDK in page, AI inference in Puter's cloud, user authenticates/pays from Puter allowance | Low-setup optional public-context assistant, with disclosed user-pays and auth | **Not on-device/private local inference.** Network, service, login and per-user allowance required. |
| **WebLLM in browser** | Download model and infer with WebGPU on supported client | Privacy-preserving offline/local copilot after explicit model download and hardware check | Large download, RAM/GPU demands; broad mobile support not guaranteed. |
| **Transformers.js in browser** | Text/embedding/classification/vision pipelines locally with JS/WASM/WebGPU | Local semantic search, categorization, vision/classification with a specific feasible model | Different APIs, model license and compatibility. Not necessarily a full generative chatbot. |
| **Server-mediated AI SDK** | UI calls authenticated edge/server endpoint, which calls approved model provider | Account-scoped retrieval, audit, rate limits, data policies and costly tasks | Backend/API usage and user data protection required; never put a provider secret in frontend code. |

Source: [Puter Docs](https://docs.puter.com/AI/), [WebLLM](https://webllm.mlc.ai/docs/user/get_started.html), [Transformers.js WebGPU](https://huggingface.co/docs/transformers.js/guides/webgpu), [NN/g AI chat](https://www.nngroup.com/articles/ai-chatbots-design-guidelines/).

### Puter.js progressive, explicit-use example

The example below is a **developer sketch**, not a preconfigured production assistant. Consult [Puter's current API](https://docs.puter.com/AI/) before installing; users must understand that requests are **sent to a cloud provider** and may consume their Puter allowance.

\`\`\`js
// Module-based project: npm install @heyputer/puter.js
import { puter } from "@heyputer/puter.js";
async function answerPageQuestion(question, approvedPageText) {
  if (!question.trim()) return "Ask a question about this page.";
  // approvedPageText must be curated PUBLIC site content, never secrets or DOM-wide extraction.
  const prompt = "Answer only from these public facts. Say 'not in these facts' when unsupported.\n" +
    approvedPageText.slice(0, 12000) + "\nQuestion: " + question;
  const response = await puter.ai.chat(prompt); // cloud user-pays model, not browser inference
  return typeof response === "string" ? response : (response?.message?.content ?? String(response));
}
\`\`\`

**Security:** never send password fields, private DOM contents, session tokens, hidden input values, unconsented uploads or personal support tickets as context. Sanitize markdown/HTML, bound output, link cited source passages, reject unsupported claims and provide Stop / Retry / Manual Help.

### WebLLM local route

\`\`\`js
import { CreateMLCEngine } from "@mlc-ai/web-llm";
if (!("gpu" in navigator)) {
  // Show explanation + a fully usable non-AI search or navigation fallback.
} else {
  // Request consent before model download; display precise model and resource cost.
  const engine = await CreateMLCEngine("MODEL_ID_VERIFIED_IN_WEBLLM_LIBRARY");
  // Replace the placeholder only after verifying support and model license.
  // Call engine.chat.completions.create with bounded messages, on explicit user action.
}
\`\`\`

No silent GPU download; measure memory and exit safely on unsupported browsers. A real build should use a worker where appropriate, show download progress and offer model removal. Model weights require separate licensing.

### Transformers.js local task-specific route

\`\`\`js
import { pipeline } from "@huggingface/transformers";
// Resolve current model + license/compatibility before shipping.
const classifier = await pipeline("text-classification", "VERIFIED_MODEL_ID");
const result = await classifier("The user's intentionally selected text");
\`\`\`

For long documents and private corpora: choose a consented indexing plan (on-device embeddings when feasible or authenticated server with scopes), show provenance and allow deletion. **Classification is not the same as an LLM.**

## Placement rules by website kind

- **Portfolio:** "Ask about this project" inside a specific case study, only with project notes; not a chat orb obscuring Contact.
- **Company:** documentation/help surface after users can reach sales and support directly.
- **SaaS:** product demo or settings help, with source-linked answers and trial details; never fake live integration.
- **Product detail:** contextual size/spec guidance with a clear source and real availability; no invented stock/delivery.
- **Commerce checkout:** avoid chat overlay. Use transparent, accessible form help; no AI-generated payment confirmation.
- **Publication:** opt-in recommendation in Explore/Search; licensing and spoiler controls.

## Complete copyable agent prompt

\`\`\`text
Audit the actual website, audience, navigation and task evidence before adding AI.
Decide IF AI beats standard search/filter/help for one named job. Recommend "no AI" if not.
If justified, place a small contextual entry near the user's task, not a global modal blocking navigation.
Compare Puter.js cloud user-pays, local WebLLM, local Transformers.js, and scoped server-mediated API.
Describe model execution location, data path, cost bearer, browser support, consent, authorization and model license.
Build the selected option with loading/cancel/error/offline/unsupported-device and manual fallback.
For any cloud model, do not expose API keys and do not transmit private content without consent.
Cite public knowledge and refuse unsupported claims. Never execute external actions without explicit approval.
Test keyboard, screen reader, mobile CTA visibility, network error and actual model response. No invented test success.
Provide three distinctive UI directions and run up to four focused fix/review rounds.
\`\`\`
