# Open-source toolkit and license check

Reviewed **October 8, 2026** against project repositories. These are optional *ingredients*, not presets or copy/paste mandates. Component licenses can differ from image packs, examples, fonts, pro tiers and dependencies; verify each artifact's current license before shipping.

## Website / hero / application web

| Resource | Use selectively for | Repository / license at review |
| --- | --- | --- |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | Accessible component starting points; replace the default visual tokens | MIT |
| [Base UI](https://github.com/mui/base-ui) | Unstyled accessible React primitives | MIT |
| [Radix UI Primitives](https://github.com/radix-ui/primitives) | Headless interaction components | MIT; inspect packages |
| [React Aria](https://github.com/adobe/react-spectrum) | Accessibility-heavy interaction semantics and widgets | Apache-2.0; verify subpackages |
| [Motion](https://github.com/motiondivision/motion) / [motion.dev](https://motion.dev/) | Meaningful UI animation and transitions | Core library MIT; **Motion+ content/features are separate paid products** |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | Editable small interaction recipes | MIT; site notes beta |
| [react-spring](https://github.com/pmndrs/react-spring) | Spring-based animation | MIT |
| [Lucide](https://github.com/lucide-icons/lucide) | Clear interface icons | ISC, with MIT attribution for inherited Feather icons |
| [Tremor](https://github.com/tremorlabs/tremor) | Data display and dashboard patterns | Apache-2.0 |
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | Styling utility, not a substitute for design decisions | MIT |
| [Playwright](https://github.com/microsoft/playwright) | Browser flows, screenshots, regressions | Apache-2.0 |
| [axe-core](https://github.com/dequelabs/axe-core) | Automated accessibility checks | MPL-2.0; check license details and bundled dependencies |

## Native / cross-platform apps

| Resource | Use for | Repository / license at review |
| --- | --- | --- |
| [Expo](https://github.com/expo/expo) | React Native app framework, routing and native facilities | Expo source MIT; dependencies can differ |
| [React Native Reusables](https://github.com/founded-labs/react-native-reusables) | Open editable React Native components | MIT |
| [gluestack-ui](https://github.com/gluestack/gluestack-ui) | React and React Native copy-paste components | MIT |
| [React Native Paper](https://github.com/callstack/react-native-paper) | Material-style React Native components | MIT |
| [Flutter](https://github.com/flutter/flutter) | Native-capable cross-platform UI stack | BSD-3-Clause; inspect dependencies |
| [Android Compose samples](https://github.com/android/compose-samples) | Reference interaction patterns | Apache-2.0 files unless marked otherwise |
| [Material Components Android](https://github.com/material-components/material-components-android) | Android components | Apache-2.0 |

## Fonts / graphics / references

- [Google Fonts](https://github.com/google/fonts): **per-font** licenses, mostly SIL OFL 1.1, some Apache or other. License files and reserved font names matter. Pair a expressive display face with a readable workhorse, with script support.
- [Lucide](https://github.com/lucide-icons/lucide): clean UI iconography. Do not scatter icons where words are clearer.
- Create **original CSS/SVG** decorative visuals, diagrams and charts from actual product data where feasible. External photographs/illustrations require their own license check and attribution.
- [GOV.UK Design System](https://design-system.service.gov.uk/) and [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) are **design references**, not implicit grants to copy artwork or site design.
- [Design2Code](https://github.com/NoviScl/Design2Code) is a **research/evaluation** resource; datasets and site screenshots can have separate rights. Do not package benchmark content as this repository's assets.

## Important restrictions: not everything labeled "free" is permissive OSS

**React Bits** ([original repository](https://github.com/DavidHDev/react-bits)) explicitly uses **MIT + Commons Clause**, which restricts some commercialization of the software itself and is **not standard OSI-approved open-source licensing**. Its individual site snippets are subject to the actual license. Do not relabel or bundle it as MIT-only.

**Motion+** is not covered merely because the Motion core runtime is MIT. **Font Awesome Free** distinguishes SVG icons (CC BY 4.0), font files (SIL OFL) and code (MIT). **Pa11y** is LGPL-3.0-only, which requires license consideration when redistributing.

## How to choose (instead of installing every library)

- Need accessible dialogs, menus, selects? Use **one** headless component system already in the project.
- Need visual personality? Use custom tokens, layout rhythms, honest imagery/illustration and type before reaching for a component gallery.
- Need motion? Start with CSS. Use Motion or Motion Primitives only for *state changes and meaning*, with reduced-motion fallback.
- Building Android/iOS? Honor each platform's conventions, keyboard, permissions and assistive technology. A mobile web card grid is not a native app.
- Test with no paid services first: local browsers, OS simulators, and real devices when available. Do not claim device validation if a device was unavailable.

**No external code, fonts or assets are vendored here.** Links and license notes are informational. Prompt-Vault's own files are MIT licensed; external projects keep their own terms.

## More UI/preview open-source libraries

Read the [eight-source license and demo audit](open-source-preview-resources.md), including reference-only UI Promptly (no root LICENSE found) and gluestack (MIT asserted in README, linked root LICENSE absent in observed root listing).
