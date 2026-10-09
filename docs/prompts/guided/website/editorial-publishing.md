# Website Design Blueprint · Publication / book editorial

**Design track:** WEBSITE ONLY · **Group:** Editorial · **Audience:** Readers discovering stories and authors

**The actual visitor job:** Find a work, read a real excerpt and subscribe or purchase.

## The product-specific design thesis

The typography and the words are the artwork. This is creative direction, not a copied website or universal high-conversion template.

**Example concept:** build a sample publication / book editorial for a clearly hypothetical product. Mark all mock content *illustrative*. Never invent customer quotes, data, certification, logos, teammates, transaction results or published app screenshots.

## Exactly which sections, in which order, and WHY

1. **Header and navigation** (`navigation`): Help users reach the right page without guessing. **Placement reason:** Orient users before the next decision. [Use the standalone section prompt](../../website/sections/navigation.md).
2. **Hero section** (`hero`): Say what this product does, for whom, and why this specific product exists. **Placement reason:** Answer the main arrival question immediately. [Use the standalone section prompt](../../website/sections/hero.md).
3. **Editorial blog and feed** (`articles`): Make long-form knowledge easy to scan and enter. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/articles.md).
4. **Visual gallery** (`gallery`): Show authored media without overwhelming browse and download. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/gallery.md).
5. **Portfolio project section** (`portfolio`): Demonstrate skills with a distinctive story of decisions. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/portfolio.md).
6. **Newsletter capture** (`newsletter`): Earn trust and opt-in with clear value and frequency. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/newsletter.md).
7. **Final call to action** (`call-to-action`): Invite one next step with strong product-specific reasoning. **Placement reason:** Only place this after earlier context is known; it must earn its space by reducing a real uncertainty. [Use the standalone section prompt](../../website/sections/call-to-action.md).
8. **Footer and global utility** (`footer`): Make site closure, policy and secondary navigation reliable. **Placement reason:** End with trustworthy secondary destinations and required information. [Use the standalone section prompt](../../website/sections/footer.md).

**What NOT to include by default:** empty client logo walls, stock testimonials, fake metrics, generic AI chat, autoplay audio, effects competing with content, gratuitous repeated card sections.

## 3 design directions to compare before implementation

A. **Editorial-first:** make content/typography the main evidence. Original asymmetry, credible copy, strong scan hierarchy, restrained 2D motion.
B. **Demonstration-first:** foreground the real product/task (screenshots or functional demo), with concrete outcome and operational detail.
C. **Domain-structural:** derive composition from find a work, read a real excerpt and subscribe or purchase, not a generic template. Show an alternate information architecture with useful navigation.

Show ASCII wireframes for desktop/tablet/mobile; compare hierarchy, information density, accessibility, asset licensing, implementation cost and time-to-task. Choose based on the user's job, not the prettiest gradient.

## Use optional AI / 3D, or intentionally leave them out

**AI placement decision:** Optional topic/library recommender after browse and conventional search. Ask whether search, direct controls or documentation would serve visitors better. If AI truly qualifies, follow [website AI guide](../../../../guides/website/AI-INTEGRATION.md) and disclose local vs cloud, data sent, model confidence, source provenance, error/recovery and optional login.

**3D decision:** Physical book reveal optional, but never interfere with readable excerpts or page navigation. If included, run a user-controlled single-effect implementation with real scene benefit, accessible equivalent, performance budget, static poster and reduced-motion behavior. Use [web 3D guide](../../../../guides/website/3D-AND-MOTION.md), not an endless canvas backdrop.

## Implementation skills used

Long-form typography, metadata, reading progress, accessible search. Choose components deliberately using [the evidence / open-source register](../../../../research/EVIDENCE-ATLAS.md); check individual source license before copying. Use the existing framework, routes, backend and brand tokens.

## Research anchors and limitations

- first-impressions: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- heuristics: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.
- core-web-vitals: See [source register](../../../../catalog/evidence-atlas.json) and direct publisher URL; cite the actual claim and caveat.

**Specific product constraints:** Support sample chapters, genres, series, author context, publication status and regional availability truthfully.

## Complete copyable instruction to give an AI coding agent

```text
Inspect my existing website/project first. This is a Publication / book editorial for Readers discovering stories and authors.
The single visitor job is: Find a work, read a real excerpt and subscribe or purchase.
Art direction: The typography and the words are the artwork.
Build in this order: navigation → hero → articles → gallery → portfolio → newsletter → call-to-action → footer.
For every section, read its matching prompts/website/sections/{id}.md file. Treat the section list as a starting hypothesis: remove any section without real content or a user-facing purpose.
Create three structurally different art directions and choose one with rationale.
Preserve all working features, routes, backend services, consent and payment boundaries.
Support sample chapters, genres, series, author context, publication status and regional availability truthfully.
Optional AI: Optional topic/library recommender after browse and conventional search
Optional 3D: Physical book reveal optional, but never interfere with readable excerpts or page navigation
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
