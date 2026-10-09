# Parent brand, product pages, documentation and subdomains

**Website track.** A subdomain is a hosting, product and security boundary, not an automatic SEO boost or a replacement for good information architecture.

## Three valid topologies (choose deliberately)

| Topology | Good fit | Typical routes | Tradeoffs |
|---|---|---|---|
| **One site, paths** | Related content, same publishing/auth, shared team | \`brand.example/products/\`, \`brand.example/docs/\`, \`brand.example/blog/\` | Simpler consistent navigation, analytics and policy management; unified deployment |
| **Marketing root + independent apps** | Separate frameworks/deployments, distinct app sessions | \`brand.example\` (company), \`product.brand.example\` (app), \`docs.brand.example\` (docs) | Easier independent releases; require careful auth/cookies/CORS/CSP/canonical links |
| **Many product roots** | Products with independent businesses, branding and audiences | \`product-a.example\`, \`product-b.example\`, common parent directory | Stronger autonomy; higher SEO and design/maintenance cost |

**Recommendation:** choose paths for closely related content, subdomains for genuinely independent apps or security/deployment separation. There is no universal search-ranking advantage.

## IA to include

**Parent root** should contain genuine company positioning, product index, verified authorship, support/contact, privacy/terms and source of trust. Give every product an understandable label, audience, one-line benefit, real availability and truthful CTA. Do not create 70 empty landing pages merely to show volume.

**Individual product** should contain one complete product story (problem, actual demo/screenshot, benefits, use cases, pricing and policies where relevant). Separate authenticated \`app.\` routes from public marketing when scope/privacy justifies it.

**Documentation** should be search- and version-friendly with deep links and tested code examples. Prefer a separate docs hostname only when deployment/workflow demands it.

**Help/support** needs real contact and accessible manual routes before a contextual AI assistant.

**Book/publication** collections may use product path or separate publication domain, but cross-entity identity and sales rules must be clear.

## Example architecture

\`\`\`text
brand.example
  /                 company and product index
  /products         searchable product directory
  /about            factual team/ownership/mission
  /contact          real sales/support contact
  /privacy, /terms  live legal pages, linked from relevant products

product.brand.example
  /                 product marketing (public)
  /app              authenticated UI, if same origin appropriate
  /pricing          accurate plans and billing limits
  /help             support without mandatory AI

docs.brand.example
  /product          versioned guides
  /sdk              working examples and auth/error documentation

help.brand.example  (only if separate service justified)
\`\`\`

## Cross-origin, data, and discoverability review

- Decide login scope and cookie attributes intentionally. Never share broad cookies across subdomains without a reason; consider SameSite, Secure and HttpOnly.
- Set minimal CORS, CSP, allowed redirect hosts, OAuth callback destinations, CSRF handling and account deletion routes per origin.
- Do not accidentally transmit product chat, health or personal data to a central analytics system without disclosure/consent and purpose.
- Choose canonical URLs carefully; sitemap per host; independent robots rules when needed; redirect moved pages using appropriate status; stable breadcrumb/navigation cross-links.
- If creating a static landing page for each app, automate **quality checks**, not manufactured claims. Don't bulk-publish before product functionality is verified.
- Distinguish payment providers from app store digital-goods constraints: mobile billing rules are covered in the **app** track.
- Shared design tokens can maintain brand family resemblance without repeating one "AI slop" card composition on all properties.

## Copyable agent prompt

\`\`\`text
Inventory existing domains, DNS, routes, authentication, product repos and deployments first; no live DNS or production auth changes without explicit permission.
Group pages by user job, brand ownership, privacy boundary, hosting/release cycle and SEO intent.
Compare path-based parent site, root+product subdomains and fully independent product domains.
Choose minimum-complexity topology and draw a route tree, user handoff map and session/cookie/security boundary.
For root company, create factual products index + about + contact + support/legal links; for each app create a real proof-led product page, not a cloned template.
Preserve working domains and links. Design adaptive navigation, breadcrumbs, product-specific hero/preview, canonical tags, accessible forms.
Test cross-origin sign-in/callbacks/CORS/CSP/canonical URLs, privacy and actual link navigation in a staging environment.
Use no paid extras. Three original design directions, four evidence-based iteration rounds max. Report unverified production changes.
\`\`\`
