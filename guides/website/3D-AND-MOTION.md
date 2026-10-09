# 3D and motion for websites: value first, effects second

**3D is optional**. Render it only when it meaningfully improves product explanation, creative demonstration, spatial understanding or engagement **without delaying content**. This guide applies to websites, product pages and portfolios, not to generic app navigation.

## 3D choice table

| Need | Recommended primitive | Example | Required non-3D fallback |
|---|---|---|---|
| Physical product shape/variant/AR | [model-viewer](https://modelviewer.dev/) (Apache-2.0) | Inspect true hardware proportions | Licensed still photos, specs, alt description, variant controls |
| Complex interactive real geometry | [Three.js](https://threejs.org/) (MIT) | Explore how a mechanism fits together | Static labeled diagram and transcript |
| Interactive React scene | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Drei](https://github.com/pmndrs/drei) (MIT) | Tactile 3D creator/engineering portfolio | 2D equivalent with same information and controls |
| Svelte product experience | [Threlte](https://threlte.xyz/) (MIT) | Curated 3D study where meaningful | Responsive non-WebGL page |
| Game-like showcase | [PlayCanvas](https://playcanvas.com/) (MIT core) | Controlled 3D interaction on deliberate opt-in | Still, playable 2D explanation or video with captions |
| No spatial problem | **CSS / authored SVG / no 3D** | Magazine, forms, corporate, checkout | Already the optimal choice |

## Example: honest progressive 3D product feature

\`\`\`html
<figure>
  <model-viewer src="/licensed-product.glb"
    poster="/licensed-product-still.webp"
    alt="Rotatable 3D model of the product, showing its three externally visible ports"
    camera-controls interaction-prompt="auto"
    loading="lazy" reveal="interaction"></model-viewer>
  <figcaption>Rotate to inspect ports. Also see the dimensions and text specification below.</figcaption>
</figure>
<!-- Use the versioned official model-viewer module from a vetted dependency;
     this markup is not operational without the installed web component.
     Both URLs must point to licensed real assets. -->
\`\`\`

**Do not include a made-up GLB.** Preserve full dimensions/specs under the viewer for readers using assistive technology and devices without WebGL/WebGPU. Consider autoplay, wheel capture and AR permission. Use a tap-to-activate 3D view to avoid first-load GPU cost.

## Motion grammar: four levels

- **None:** labels and state update immediately; default for critical controls.
- **Quiet:** 80–250ms purpose-driven hover, validation, focus, disclosure.
- **Expressive:** 200–550ms one signature section; scroll navigation remains native.
- **Cinematic:** user-activated one-off transition of up to about a second with Skip and reduced-motion alternative.

These are *design heuristics*, not scientifically validated speed limits. Use CSS transform/opacity where possible; avoid unnecessary permanent blur, 100 background particles, scroll hijacking, repeated card fly-ins and pan-inducing layouts. Comply with [W3C pause/stop/hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide) and [reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

## Asset and performance pipeline

1. Explain why the 3D content improves a specific user decision. Reject decorative usage.
2. Confirm model/texture license; optimize triangles, textures, environment and GLB size. Do **not** vendor random web gallery meshes without rights.
3. Show a meaningful poster in the first viewport; lazy-load scene on click/visible intersection when justified.
4. Bound device pixel ratio, frame rate and memory; throttle when page hidden, on battery/mobile; handle context lost.
5. Create keyboard/touch equivalents: Rotate left/right, Reset view, Show static, Read description. Announce object state textually.
6. Provide no-motion and no-GPU fallbacks. Test at 360, 390, 768, 1440px; avoid capturing wheel scroll.
7. Measure p75 [Core Web Vitals](https://web.dev/articles/defining-core-web-vitals-thresholds) LCP/INP/CLS. Avoid claiming production-grade without real data.
8. Use an adversarial critic: does 3D clarify the product more than a sharp photo or annotated diagram? If not, remove it.

## Copyable AI coding-agent prompt

\`\`\`text
Inspect existing website, semantics, assets and actual user job. Explain whether 3D helps more than a 2D schematic.
Create three original visual directions: no-3D editorial, progressive model viewer, purposeful interactive 3D.
Choose based on real product constraints; never force WebGL/Three.js into forms, docs or checkout.
For 3D chosen: source and verify real licensed GLB/images; use model-viewer or existing compatible framework, cap GPU cost, lazy-load on explicit action and show accessible poster/text equivalents.
Implement keyboard/touch controls and error fallback; honor prefers-reduced-motion and pause/stop controls.
Render true 360–1440px output, test lost GPU context, device support, and user ability to complete the primary task.
Check performance and input responsiveness; four targeted revision rounds max; state unresolved tests.
\`\`\`
