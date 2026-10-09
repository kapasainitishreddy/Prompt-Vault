# Prompt-Vault Atlas website

A static, dependency-free visual gallery of the original **32 website section**, **32 app UI/UX flow**, and **23 motion recipe** prompts.

## Preview locally

```bash
python3 -m http.server 8000
# Open http://localhost:8000/docs/index.html
```

The `docs/` folder is a deployable static website. It includes the complete source prompts and three catalogs copied from the repository as of this commit. No build step, account, database, paid API, external font/CDN, tracking, or GitHub Actions is required.

## Publish on GitHub Pages (no GitHub Actions workflow)

In repository **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/docs**. Then Save. GitHub publishes it at the URL shown in Pages settings after processing; don't assume it is live until that status appears. Keep paths relative so it works under the repository's Pages subpath. Alternative: deploy the same `docs/` directory to any static host.

## Design and preview boundary

All specimens are *original illustrative HTML/CSS UI studies*, not complete production applications, real transactions, verified benchmarks or borrowed vendor templates. Browser/device validation is required for any real product. Motion is non-essential and respects OS reduced-motion settings; animation playback is user-triggered. Catalog prompts stay separately editable in `prompts/` and are copied under `docs/prompts/` for same-origin preview and full-text copying.

## Content and license

Original frontend, specimen art and prompts are [MIT licensed](../LICENSE). Third-party studies and galleries linked in [research](../research/supplied-resources.md) are not bundled, and their component/assets terms do not change. License notes especially matter for restricted catalogs.

## QA checklist

1. Validate the 5 pages at 1440, 768, 390, 360 px; check no horizontal overflow.
2. Search, filter, sort and save patterns in website/app/motion galleries.
3. Open a pattern modal, switch A/B/C art directions, copy its **full** prompt, use keyboard arrows between tabs, close with Escape.
4. Test size switcher, user-triggered motion replay and reduced-motion fallback.
5. Verify all 87 prompt files and 3 catalogs load at their relative same-origin URLs. Check links and mobile navigation.
6. Run `node --check docs/atlas.js`, HTML audits, and browser/assistive-tech tests as available; unknown is not pass.

## Added separately: visual languages and skills

- `styles.html`: 48 original styles, split 24 website and 24 app, three variants each, responsive illustration previews, search, categories, saved patterns, product name editing, prompt view/copy, and reduced motion.
- `skills.html`: the four credited repositories with real license caveats, 16 original focused design workflows, search and three-workflow local prompt composer.
- Both include the complete source Markdown under `docs/prompts/` and their JSON catalogs under `docs/data/`.

Seven static pages; **151 original prompts**, **135 illustrative visual studies**. These are not production apps or reused vendor code. Copy all `docs/` to any static host.
