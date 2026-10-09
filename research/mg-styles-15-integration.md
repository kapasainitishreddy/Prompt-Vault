# Source note: MG Styles 15 (October 9, 2026)

Original project: https://github.com/Vincentwei1021/mg-styles-15
Original showcase: https://vincentwei1021.github.io/mg-styles-15/
Source author: Vincentwei1021
Source LICENSE: MIT License, Copyright (c) 2026 Vincentwei1021.

## What Atlas integrates

- Fifteen source-linked style cards in `docs/mg-film-styles.html` with titles, original film posters, plain-English context, common use cases and avoidance notes.
- On user interaction, an embedded HTML5 video player can stream the **original films** from the original author's GitHub Pages site (`videos/{slug}.mp4`). No autoplay, no automatic full-video downloads; `preload="none"`.
- The film posters (`videos/{slug}.jpg`) are displayed directly from the upstream GitHub Pages origin, with visible attribution and an accessible original-film link if the embedding fails.
- Every film links to its exact original production prompt (`prompts/{slug}.md`) and source directory (`demos/{slug}/`).
- The local starter prompt is a **new short educational adaptation**, not a copied upstream prompt and not a claim that an external renderer works within Atlas.
- No film binaries, vendor JavaScript, fonts, or instrument samples have been added to the Atlas repository.

## Upstream rights and limits

The README explicitly states that original code, original prompts, documentation and films are MIT; the MIT license notice is linked in the gallery. The project also includes third-party materials with distinct license terms (for example some OFL glyph outlines; several CC0/public-domain textures, imagery, maps and instrument samples; and BSD-3-Clause syntax-highlighting code). Do not assume every extra asset, soundtrack sample or font is MIT. Upstream **does not distribute the original font binaries** because their licenses differ.

The showcase's original films are short produced videos, *not* 15 complete website widgets, native apps or generic scroll libraries. A website should borrow only appropriate animation principles and use native scrolling, accessible controls, reduced-motion handling and meaningful performance measurements.

## Production and QA caveats

- Posters and video playback require access to the original GitHub Pages domain. If unavailable, Atlas shows a static colored fallback with a readable title plus links to the original film and prompt.
- Media is loaded from a third-party domain; avoid auto-playing or rehosting massive MP4s to protect visitor bandwidth.
- Verify the original 15 poster/video URLs, filtering, player close/pause cleanup, keyboard navigation, copy fallback, reduced motion and small mobile displays in the actual deployed origin.
- An ordinary `img` may request a preview poster even if a visitor does not click it. All images are small compared with films, and low-priority items are lazily loaded.
- Before redistributing derivative work, keep copyright and licensing notices and check the specific third-party asset terms.

Implementation path: `docs/mg-film-styles.html`, `docs/mg-film-styles.css`, `docs/mg-film-styles.js`.
