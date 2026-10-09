# App motion, 3D and interaction physics

**APP track**. Apple and Android have their own navigation, system gestures, reduced-motion preferences, GPU and background lifecycle. Do not use a web landing page's 3D hero as a substitute for usable native flows.

## Motion should explain an app state

- **Action acceptance:** a checkbox or Save control acknowledges a real change (not a pretend success).
- **Object continuity:** selected item morphs into detail only when platform supports it; back/dismiss reverses.
- **Navigation:** top-level transitions reflect destination change, not arbitrary 3D flips.
- **Upload/async:** actual progress or honest indeterminate state; Stop/Retry always accessible.
- **Reorder:** data order updates after successful action; keyboard move-up/down alternative.
- **Error recovery:** place actionable errors near control; avoid punitive form shaking.

Timing heuristics: basic press ~90–180ms, panels ~150–300ms, selected object transition ~200–400ms. Tune on real devices; these ranges aren't app review standards.

## When real 3D is warranted

Use 3D only to inspect **real spatial information**: furniture fit, mechanical assemblies, geology, AR training, collectibles or games. Choose renderer compatible with the target architecture (platform-native SceneKit/RealityKit/Metal, Android Filament/OpenGL/Vulkan, Unity, React Native compatible library). Never assume Three.js/WebGL in a WebView has the same performance as a native GPU rendering stack.

**Minimum fallback:** licensed static image or 2D diagram, dimensions, descriptive accessible labels, explicit Rotate/Reset/Show 2D controls, missing-GPU context, reduced motion, tested touch accessibility and memory limits. If the 3D model adds no task value, remove it.

## iOS vs Android verification

- iOS: safe area, home indicator, native Back/dismiss, VoiceOver focus, Dynamic Type, Reduce Motion, background/foreground.
- Android: edge-to-edge/insets, system Back and predictive Back, TalkBack, text scale, foldables/tablets, GPU thermal constraints, process death.
- Both: lower-end devices, context loss, 60/120 Hz variability, latency and large file downloads. Turn off nonessential animation when battery or motion preference warrants it.

## Copyable prompt

\`\`\`text
Inspect real app navigation and user jobs before proposing movement. Explain which state or spatial relationship needs animation and which needs NONE.
Make three choices: static, restrained state motion, real opt-in 3D (only for a justified spatial task). Select by task evidence.
Use existing native stack and appropriate OS motion/navigation behavior. Make transitions reversible and cancellable.
Implement semantic feedback and stable focus without motion; honor iOS Reduce Motion / Android animation preferences and accessible alternatives.
For 3D, license/optimize assets, guard GPU, pause offscreen/background, include a static equivalent with full information.
Run native simulator and physical device checks when available; never substitute a browser CSS preview for verified iOS/Android runtime.
Four targeted test/repair rounds max. Stop with evidence and known device gaps.
\`\`\`
