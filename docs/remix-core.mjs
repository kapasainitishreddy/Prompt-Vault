/**
 * Prompt-Vault Remix Studio. Pure, deterministic, offline prompt composition.
 * No AI model, paid API, website crawler or hidden external service is used.
 */
export const clean=(value,max=900)=>String(value??"").replace(/\r/g,"").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g,"").trim().slice(0,max);
const useful=(value,fallback)=>clean(value)||fallback;
const lines=(items)=>items.filter(Boolean).join("\n");
const styleSource=s=>s?"https://github.com/kapasainitishreddy/Prompt-Vault/blob/main/prompts/styles/"+encodeURIComponent(s.id)+".md":"";
const direction={
  balanced:"Balanced: strong hierarchy, restrained motion, generous breathing room, clear focal points and a practical implementation.",
  expressive:"Expressive: art-directed typography, asymmetric composition and occasional purposeful motion while preserving usability.",
  compact:"Structured: scannable content density, explicit navigation and information-rich layouts with rigorous alignment."
};
const platform={
  website:"responsive website (mobile, tablet and desktop)",
  app:"native mobile app (iOS and Android, adapt to each platform)"
};
function validate({target,style,project={}}){
 if(!["website","app"].includes(target))throw Error("Choose website or app.");
 if(!style||style.target!==target||!style.palette||!style.title)throw Error("Choose a valid design style for the selected platform.");
 if(!["new","existing"].includes(project.mode))throw Error("Choose whether this is a new product or an existing one.");
}
function urlLine(value){
 const url=clean(value,350);
 if(!url)return "No website URL supplied. Inspect the codebase and available screenshots; do not invent the current design.";
 if(/^https?:\/\/[^\s/]+\.[^\s]+$/i.test(url)||/^https?:\/\/localhost(?::\d+)?(?:\/\S*)?$/i.test(url))return "Existing reference URL (read-only, verify access): "+url;
 return "Unverified reference entered by user: "+url+". Ask for a valid working link if this cannot be inspected.";
}
function flowFor(target,focus){
 if(!focus)return null;
 const label=target==="website"?"section":"screen";
 return lines([
 "Selected "+label+": "+useful(focus.title,focus.id),
 "Purpose: "+useful(focus.job||focus.purpose,"Support the main user task."),
 focus.behavior?"Interaction decision: "+clean(focus.behavior,300):"",
 focus.states?"Important states: "+clean(focus.states,230):"",
 focus.verify?"Verification question: "+clean(focus.verify,270):"",
 ]);
}
function journeyFor(target,blueprint){
 if(!blueprint)return "";
 const sequence=target==="website"?blueprint.sections:blueprint.flows;
 return lines([
 "Recommended flow/section order ("+blueprint.title+"):",
 ...(Array.isArray(sequence)?sequence.map((id,i)=>"  "+(i+1)+". "+id):[]),
 "Architecture goal: "+useful(blueprint.goal||blueprint.job,blueprint.thesis),
 "Approach: "+useful(blueprint.thesis,"Use the smallest clear path to value."),
 ]);
}
function commonBrief({target,style,project,focus,blueprint}){
 const isExisting=project.mode==="existing",wide=project.scope==="full";
 const customPalette=style.palette;
 const brand=useful(project.name,isExisting?"My existing product":"My new project");
 const stack=useful(project.stack,"Keep the existing stack and dependencies; identify them from the repository.");
 const preserve=useful(project.preserve,"All working features, routes, business logic, authentication, existing user data, content and integrations.");
 const change=useful(project.change,"Improve visual hierarchy, typography, navigation, readability, spacing and meaningful interaction feedback.");
 const goal=useful(project.goal,target==="website"?"Make the product clearer, more distinctive and easier to use.":"Help a user complete the primary task quickly and confidently.");
 const audience=useful(project.audience,"Real people using the product; infer no personal attributes without evidence.");
 const scope=wide
 ?(target==="website"?"Entire website experience, including reusable sections, responsive navigation and key flows.":"The complete native app journey, with shared components, navigation, core screens and recovery.")
 :(target==="website"?"Only the selected website section and its directly necessary shared design primitives.":"Only the selected app screen/flow and its directly necessary shared design primitives.");
 const implementation=isExisting
 ?lines(["This is a REDESIGN of an EXISTING product, not permission to rebuild from scratch.","First inspect the repository: current routes/screens, shared UI tokens, real content, navigation, state, dependencies and tests. Render/capture the current experience if browser/device access exists.","Use the supplied URL only for read-only visual inspection; if inaccessible, state that clearly and rely on the repository or user-provided screenshots.","Make the smallest safe set of changes in the existing stack. Preserve functionality and data contracts. Do not overwrite unrelated areas."])
 :lines(["This is a NEW product. Build only the requested scope, with real navigation and meaningful states.","Choose a supported, current framework appropriate for the selected platform. Explain the installation and dependency constraints, and ship a runnable example.","Avoid paid APIs, mock testimonials and backends unless they are genuinely required and explicitly configured."]);
 return lines([
 "# Prompt-Vault | Design remix and implementation brief",
 "",
 "## My project",
 "Name: "+brand,
 "Work type: "+(isExisting?"Improve existing "+target:"Create new "+target),
 "Deliverable: "+platform[target],
 "Scope: "+scope,
 urlLine(project.url),
 "Audience: "+audience,
 "Primary outcome: "+goal,
 "Existing stack / preferred framework: "+stack,
 "Changes I want: "+change,
 "Must preserve: "+preserve,
 "",
 "## Chosen design reference",
 "Visual direction: "+style.title+" ("+style.family+")",
 "Art direction: "+style.visual+"; composition: "+style.layout+"; density: "+style.density,
 "Why this direction fits: "+style.purpose,
 "Typography: "+style.typography,
 "Palette tokens: background "+customPalette.paper+", primary text "+customPalette.ink+", accent "+customPalette.accent+", secondary "+customPalette.secondary+". Check contrast before finalizing; change tokens if necessary.",
 "Motion guidance: "+style.motion+". Respect reduced motion, never animate for decoration alone.",
 "Avoid: "+style.avoid,
 "Variant: "+(direction[project.variant]||direction.balanced),
 "Original, illustrative source guidance: "+styleSource(style),
 "",
 focus?("## Selected "+(target==="website"?"section":"screen")+"\n"+flowFor(target,focus)+"\n"):"",
 blueprint?"## Product architecture\n"+journeyFor(target,blueprint)+"\n":"",
 "## Implementation rules",
 implementation,
 "Create a consistent design system (type scale, spacing, color, surfaces, radii and interaction states) and apply it across every IN-SCOPE screen/section. Avoid repetitive equally sized cards, random gradients, fake glassmorphism, mismatched typefaces or unnecessary shadows.",
 target==="website"
 ?"Build semantic HTML, navigable landmarks, clear calls to action, keyboard-accessible menus and forms, adaptive layouts, image sizing and appropriate metadata/SEO for existing routes. Check 360px, 390px, 768px and desktop layouts."
 :"Use platform-appropriate iOS/Android navigation, safe areas, large touch targets, scalable text, clear input/keyboard behavior, VoiceOver/TalkBack labels and accessible alternatives to swipe-only actions. Keep native state and gestures predictable.",
 "Design with realistic, attributable project content. Where real data is unavailable, mark samples as examples. Never fabricate metrics, clients, reviews, research findings, AI processing, checkout results or connected-service states.",
 "Cover real states as applicable: loading, empty, error, success, interrupted, offline, permission denied, sync conflict, undo and destructive confirmation. Keep user-entered work during recovery.",
 "For animations use quick, purposeful feedback; include reduced-motion support and avoid performance-heavy scroll effects or constant looping.",
 "Never introduce unapproved paid dependencies, expose secrets, remove security checks or silently change backend/data semantics.",
 "",
 "## Work order and evidence",
 "1. Audit the current experience and report the most important usability problems using observed evidence (not assumptions).",
 "2. Present 2-3 distinctly different compositions within the selected style and choose one with a stated rationale. Do not simply recolor existing cards.",
 "3. Implement the chosen design in actual working files. Keep shared tokens consistent; preserve existing behavior when redesigning.",
 "4. Run the project tests/lint/build plus relevant interaction, responsive and accessibility checks. Use real browser/device screenshots where the environment permits. Fix defects found.",
 "5. Hand back: changed file paths, before/after description, the completed UX flow, screenshots or preview URLs that actually work, test commands/results and remaining unverified items.",
 "",
 "## Definition of done",
 "The target user can understand the page/screen, complete the primary action, recover from errors and navigate without guessing. The appearance is visibly distinctive for its real purpose, and every claim about functioning integrations or passing tests is supported by actual evidence.",
 ]);
}
export function composeBuild(args){validate(args);return commonBrief(args);}
export function composeAudit({target,style,project,focus,blueprint}){
 validate({target,style,project});
 return lines([
 "# Prompt-Vault | Review and polish my "+(target==="app"?"mobile app":"website"),
 "Project: "+useful(project.name,"My product"),
 project.mode==="existing"?"Audit the actual existing implementation, including the changes from the last design pass.":"Audit the implementation created from my build brief.",
 urlLine(project.url),
 "Visual direction: "+style.title+"; target: "+platform[target]+".",
 "Focus: "+useful(focus?.title||blueprint?.title,project.scope==="full"?"End-to-end experience":"Selected component"),
 "Audience / user goal: "+useful(project.audience,"General users")+" / "+useful(project.goal,"Complete the primary task easily."),
 "",
 "Inspect actual rendered screens and relevant source. Evaluate:",
 "1. Task completion: navigation, primary action, form controls, errors, undo, interrupted states.",
 "2. Visual polish: type scale, spacing rhythm, alignment, contrast, distinct section composition, dark/light states and realistic content.",
 "3. Accessibility: semantic labels, keyboard, screen readers, text scaling, focus, controls/touch targets, reduced motion, color-independence.",
 target==="website"?"4. Web reliability: responsive 360/390/768/1440px; no overflow, CLS or broken images; metadata, speed and link integrity.":"4. Native reliability: Android/iOS routes, device safe areas, keyboard avoidance, touch/gesture alternatives, offline and OS settings.",
 "5. Product truth: do not invent user data, telemetry, working payments, AI, external services or published results.",
 "",
 "Fix verified high-severity defects in the real implementation, not in mockups alone. If screenshots or tools are unavailable, say what was not inspected. Avoid unrelated rewrites and preserve working behavior.",
 "Deliver a concise issue table with severity and observed evidence, exact fixes and files, before/after screen captures where available, tests executed with results, and remaining release blockers.",
 ]);
}
