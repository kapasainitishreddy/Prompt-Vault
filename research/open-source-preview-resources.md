# Open-source UI, prompts & preview systems: source audit

Reviewed **October 8, 2026** using repository metadata, root directory listings and published READMEs. The eight links below were supplied as possible additions to Prompt-Vault's design atlas. This document links to upstream repositories and demos; **no upstream HTML, CSS, JavaScript, screenshots, logos, fonts or artwork has been copied into Prompt-Vault**.

The new [open-source reference gallery](../docs/resources.html) has eight **independently authored interactive mini-studies**. They are educational approximations of relevant design *principles*, **not the upstream project's own live components** or proof of its native compatibility. For the actual source visual previews, visit each **official live demo**.

| Reference | Best role | Repository | Live gallery | License findings and status |
| --- | --- | --- | --- | --- |
| **UI Promptly** | Compare distinct visual style languages as landing vs dashboard | [dotHP-harshu/ui-promptly](https://github.com/dotHP-harshu/ui-promptly) | [Official gallery](https://ui-promptly.vercel.app/) | **Not confirmed.** No LICENSE at the inspected root, nor explicit license declaration in the README. The repository being public does not grant general copying/redistribution rights. Reference only unless author grants terms. |
| **Superdesign Prompts** | Prompt → specification → preview decision-making | [superdesigndev/superdesign-prompts](https://github.com/superdesigndev/superdesign-prompts) | [Official library](https://superdesign.dev/library) | **MIT** repo code/structure in [LICENSE](https://github.com/superdesigndev/superdesign-prompts/blob/main/LICENSE); **CC0 1.0** prompt content in [LICENSE-DATA](https://github.com/superdesigndev/superdesign-prompts/blob/main/LICENSE-DATA). That split does not automatically license the external site's artwork or generated results. |
| **Motion Primitives** | Meaningful React/Motion interface animations | [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | [Official docs/gallery](https://motion-primitives.com/) | **MIT** source per repository root license and README. Check per-component code, example images and dependencies. |
| **Uiverse Galaxy** | Community CSS/Tailwind buttons, toggles and small interactions | [uiverse-io/galaxy](https://github.com/uiverse-io/galaxy) | [Uiverse gallery](https://uiverse.io/) | **MIT** per repository license and README. Attribution to original community author encouraged, even when not required. Asset provenance may vary by element. |
| **Magic UI** | Purposeful animated sections and React components | [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | [Official UI examples](https://magicui.design/) | **MIT** public code. Premium templates/products and independent imagery may have different terms. Don't assume the complete product is unrestricted. |
| **Origin UI** | Complex application-web React/Tailwind controls | [shadcn/originui](https://github.com/shadcn/originui) | [Official components](https://originui.com/) | **MIT** in GitHub metadata and README (which links its license). Verify exact snippets and dependencies before redistribution. This is primarily a web-app component library, not an iOS/Android runtime. |
| **React Native Reusables** | React Native/Expo components and mobile patterns | [founded-labs/react-native-reusables](https://github.com/founded-labs/react-native-reusables) | [Official docs](https://reactnativereusables.com/) | **MIT** root source. Respect dependent packages, images and compatible NativeWind/Expo versions. Browser phone illustrations cannot substitute for native-device tests. |
| **gluestack-ui** | Native app components, adaptive layouts and Expo patterns | [gluestack/gluestack-ui](https://github.com/gluestack/gluestack-ui) | [Official site](https://gluestack.io/) | The README **states MIT** for v5, but the linked root [LICENSE](https://github.com/gluestack/gluestack-ui/blob/main/LICENSE) was **not present in the observed root directory listing**. Confirm specific package and file licenses before copy/distribution. |

## Why we did not import eight UI component libraries

1. The goal is a **design learning and prompt tool**, not a bundle of unrelated third-party packages. Installing every library increases weight, accessibility mismatch and design inconsistency.
2. A product needs intentional **visual identity, semantic interaction, reliability, keyboard/touch behavior and reduced-motion fallbacks**. One attractive demo does not prove these.
3. Licenses are **artifact-specific**. Linking MIT code doesn't grant permission to redistribute all promotional screenshots or paid templates. An **unlicensed** public repository must be reference-only.
4. For Native React apps, browser-drawn mini-studies are properly described as **illustrations**, not tested devices, app store binaries or faithful component demos.

## How each linked preview should be used

- **UI Promptly:** use the live landing/dashboard comparisons to articulate *how* two compositions differ, then author an original layout. Not vendored.
- **Superdesign:** study CC0 prompt structure, evaluation and evidence; keep our individual prompts original.
- **Motion Primitives:** copy MIT modules into *compatible user projects* with notices when desired, or author one minimal state-driven transition.
- **Uiverse Galaxy:** pick focused interactions, review licenses/attribution, then test keyboard semantics, contrast and reduced motion.
- **Magic UI:** prefer one product-relevant signature moment; reject ungrounded animated testimonials or infinite visual noise.
- **Origin UI:** use accessible reusable primitives in React web apps, while separately designing authentic user journeys.
- **React Native Reusables:** target actual Expo/Android/iOS constraints and physical/simulator testing.
- **gluestack-ui:** check v5 source and package license, then test large and small screens, Expo Router, and platform assistive technologies.

## Original Prompt-Vault work

- [Eight standalone implementation prompts](../prompts/references/README.md)
- [Original interactive gallery](../docs/resources.html)
- [Catalog data](../catalog/open-source-references.json)
- [Separate website prompts](../prompts/website/SECTIONS.md)
- [Separate app UI/UX prompts](../prompts/app/FLOWS.md)
- [Motion research](../research/evidence.md)

These original MIT files are independently authored. External references remain credited as links, not imported code. License status is a point-in-time check, **not legal advice or a guarantee of future terms**. The library should be rechecked when updated or installed.
