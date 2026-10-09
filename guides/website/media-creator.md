# Website Design Blueprint · Creator / entertainment channel

**Design track:** WEBSITE ONLY · **Group:** Editorial · **Audience:** Fans and visitors discovering work

**The actual visitor job:** Watch or read a real sample and find the next release.

## The product-specific design thesis

A cinematic library that prioritizes the creator's work. This is creative direction, not a copied website or universal high-conversion template.

**Example concept:** build a sample creator / entertainment channel for a clearly hypothetical product. Mark all mock content *illustrative*. Never invent customer quotes, data, certification, logos, teammates, transaction results or published app screenshots.

## Exactly which sections, in which order, and WHY

1. **Header and navigation** (`navigation`): Help users reach the right page without guessing. **Placement reason:** Orient users before the next decision. [Use the standalone section prompt](../../prompts/website/sections/navigation.md).
2. **Hero section** (`hero`): Say what this product does, for whom, and why this specific product exists. **Placement reason:** Answer the main arrival question immediately. [Use the standalone section prompt](../../prompts/website/sections/hero.md).
3. **Visual gallery** (`gallery`): Show authored media without overwhelming browse and download. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/gallery.md).
4. **Editorial blog and feed** (`articles`): Make long-form knowledge easy to scan and enter. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/articles.md).
5. **Event and schedule section** (`events`): Communicate accurate times, locations and attendance path. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/events.md).
6. **Newsletter capture** (`newsletter`): Earn trust and opt-in with clear value and frequency. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/newsletter.md).
7. **Final call to action** (`call-to-action`): Invite one next step with strong product-specific reasoning. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../prompts/website/sections/call-to-action.md).
8. **Footer and global utility** (`footer`): Make site closure, policy and secondary navigation reliable. **Placement reason:** End with trustworthy secondary destinations and required information. [Use the standalone section prompt](../../prompts/website/sections/footer.md).

**What NOT to include by default:** empty client logo walls, stock testimonials, fake metrics, generic AI chat, autoplay audio, effects competing with content, gratuitous repeated card sections.

## 3 design directions to compare before implementation

A. **Editorial-first:** make content/typography the main evidence. Original asymmetry, credible copy, strong scan hierarchy, restrained 2D motion.
B. **Demonstration-first:** foreground the real product/task (screenshots or functional demo), with concrete outcome and operational detail.
C. **Domain-structural:** derive composition from watch or read a real sample and find the next release, not a generic template. Show an alternate information architecture with useful navigation.

Show ASCII wireframes for desktop/tablet/mobile; compare hierarchy, information density, accessibility, asset licensing, implementation cost and time-to-task. Choose based on the user's job, not the prettiest gradient.

## Use optional AI / 3D, or intentionally leave them out

**AI placement decision:** Optional archive finder; no synthetic fan comments. Ask whether search, direct controls or documentation would serve visitors better. If AI truly qualifies, follow [website AI guide](AI-INTEGRATION.md) and disclose local vs cloud, data sent, model confidence, source provenance, error/recovery and optional login.

**3D decision:** Cinematic title graphics optional, with motion/pause controls and no autoplay audio. If included, run a user-controlled single-effect implementation with real scene benefit, accessible equivalent, performance budget, static poster and reduced-motion behavior. Use [web 3D guide](3D-AND-MOTION.md), not an endless canvas backdrop.

## Implementation skills used

Media curation, captioning, focus, CMS and reusable content. Choose components deliberately using [the evidence / open-source register](../../research/EVIDENCE-ATLAS.md); check individual source license before copying. Use the existing framework, routes, backend and brand tokens.

## Research anchors and limitations

- first-impressions: See [source register](../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- wcag: See [source register](../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- motion-pause: See [source register](../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.

**Specific product constraints:** Respect audio consent, captions, performance budget and real release dates.

## Complete copyable instruction to give an AI coding agent

```text
Inspect my existing website/project first. This is a Creator / entertainment channel for Fans and visitors discovering work.
The single visitor job is: Watch or read a real sample and find the next release.
Art direction: A cinematic library that prioritizes the creator's work.
Build in this order: navigation → hero → gallery → articles → events → newsletter → call-to-action → footer.
For every section, read its matching prompts/website/sections/{id}.md file. Treat the section list as a starting hypothesis: remove any section without real content or a user-facing purpose.
Create three structurally different art directions and choose one with rationale.
Preserve all working features, routes, backend services, consent and payment boundaries.
Respect audio consent, captions, performance budget and real release dates.
Optional AI: Optional archive finder; no synthetic fan comments
Optional 3D: Cinematic title graphics optional, with motion/pause controls and no autoplay audio
Use actual source links in this blueprint. Provide real content provenance.
Implement semantic navigation, authentic copy, 360px through 1440px reflow, focus, keyboard, screen reader names, reduced motion, clear errors, meaningful first CTA.
Render and test actual user task, negative path, screenshots and field performance if available. Never invent results.
Run separate visual-identity and task-success critics. Fix top 2–3 defects and retest, four rounds maximum. Stop on evidenced passing gates or list exact unverified blockers.
```

## Evidence-first QA before publishing

- Can a target visitor understand the product/creator and find a relevant example without special effects?
- Does the intended primary action work and preserve data/permissions?
- Is each section supported by real content? Unknown proof should be omitted, not invented.
- Does the identity survive a logo swap, or is it just a rearranged generic SaaS template?
- At 360/390/768/1440px, zoom 200%, keyboard-only and reduced motion: no hidden key content or broken controls.
- If AI or 3D: test unsupported browser, offline, reduced-motion, slow device, model download failure, missing 3D data and safe dismissal.
- Stop at four documented rounds; screenshots and device tests **unverified** unless actually run.
