/* Prompt-Vault Atlas guided page tours.
   Driver.js 1.9.0 (MIT, © Kamran Ahmed) loads from the official npm CDN
   only after a visitor requests a tour. No cookies, auto-start, or analytics.
   Original Atlas-specific steps, with an ordinary Start Here / FAQ fallback.
*/
(() => {
  "use strict";
  const DRIVER_VERSION = "1.9.0";
  const ROOT = "https://cdn.jsdelivr.net/npm/driver.js@" + DRIVER_VERSION + "/dist/";
  const STEP_SETS = {
    home: [
      [".hero-copy", "Welcome to Prompt-Vault Atlas", "This free library teaches website, app and animation design through pictures, clear explanations and copyable instructions. It does not build or publish a complete app for you."],
      [".hero-actions", "New? Start with one idea", "The Start Here guide explains the basics without technical terms. Choose a website, an app, or just browsing ideas."],
      [".pv-peek-grid", "See the design before the theory", "These three examples are original visual previews. Open one to inspect a section and learn how its parts work. They are not complete production websites."],
      [".collection-rows", "Pick the right collection", "Website design teaches page sections. App design teaches screens and flows. Choose based on what you're building."],
      [".pv-mg-home", "Explore real motion films", "This opens 15 actual short films from a credited open-source creator. Films are different from website animation widgets."],
      [".practice-ribbon", "Learn by practicing", "The Practice Studio has guided lessons and prompts. You do not need an Atlas account or a paid model to browse them."],
      [".pv-faq-preview", "Ask anything", "This short FAQ explains what Atlas does and does not do. Open the full FAQ for questions about previews, code, licensing, AI and privacy."]
    ],
    "start-here": [
      [".bv-hero", "No experience required", "This guide begins with ordinary language. You can use it without creating an account or paying for a tool."],
      ["#choose", "Choose your project type", "Select a website, an app, or just exploring. There is no wrong choice, and you can switch any time."],
      ["#example", "Look at an original example", "The visual changes to match your choice. Use the phone-view button to see how a narrow layout might appear."],
      ["#make", "Describe your own idea", "Write one sentence about what you want to make. Atlas turns it into a local written starting prompt. No AI service is called here."],
      ["#copy-prompt", "Copy and continue", "Copy your instruction to an AI coding tool or use it as a checklist. The result still needs implementation and real testing."],
      [".bv-finish", "Explore a full collection", "Continue to website previews, app design patterns, or the credited motion film gallery after this short lesson."]
    ],
    "mg-film-styles": [
      [".mf-hero", "15 real motion-design films", "Each source-linked 10-second film shows an animation style you can learn from. They are videos, not live website templates."],
      [".mf-filters", "Find the style you want", "Search for an animation idea or filter by hand-drawn, geometric, atmospheric, spatial, or caption-focused work."],
      [".mf-card:first-child .mf-visual", "Watch a real film", "Select a thumbnail to open the creator's video with playback controls. Video is not set to autoplay."],
      [".mf-card:first-child .mf-card-links", "Follow the real source", "Each film links to the original production prompt and implementation code with proper creator credit."],
      [".mf-bottom", "Use the method, not someone else's brand", "Watch one example, identify its visual technique, then build your own story. Check licenses when using external assets."]
    ],
    websites: [
      [".atlas-headline", "Welcome to website design", "This collection explains useful parts of a website, such as the first screen, navigation, product details and contact forms."],
      [".atlas-sidebar", "Search for a section", "Find the part of a website that you need. You do not need to understand every design term."],
      ["#gallery", "Open a visual preview", "Choose any card to inspect an original illustrative design. You can view a fuller prompt and design notes in the preview dialog."],
      [".atlas-end", "Make it your own", "Use the example to plan your actual content. Test the final website on a real phone and computer."]
    ],
    apps: [
      [".atlas-headline", "Welcome to app design", "App flows cover tasks people complete across screens, not just pretty isolated graphics."],
      [".atlas-sidebar", "Find a screen or task", "Try onboarding, notifications, settings, payment, offline use or error recovery."],
      ["#gallery", "Open an app-screen preview", "A card shows an illustrative app idea. Study the behavior, read the design notes and copy the build instructions."],
      [".atlas-end", "Build a whole journey", "Think through how a person begins, succeeds and recovers from mistakes. A prototype is not a finished native app."]
    ],
    motion: [
      [".atlas-headline", "Motion is a design tool", "The Motion Lab teaches animation recipes for real interfaces, such as feedback, transitions and reveals."],
      ["#mg-film-heading", "15 cinematic motion-film styles", "Watch actual code-rendered 10-second films and follow each creator prompt. These are videos, not reusable buttons."],
      ["#lenis-new", "Try optional real Lenis scrolling", "The separate Lenis playground compares natural scrolling with an opt-in smooth-scroll library."],
      ["#motion-explore-title", "Learn five animation libraries", "Motion, GSAP, Locomotive Scroll, React Bits and Three.js are explained through original educational previews."],
      ["#gallery", "Pick a small animation recipe", "Start with one purposeful movement. Do not animate everything just because you can."]
    ],
    styles: [
      [".style-hero", "Choose a visual direction", "Style Lab studies how an interface looks and feels, not just what color its buttons are."],
      [".style-mode-tabs", "Choose website or app", "The same design direction can serve different tasks. Select the right platform first."],
      ["#style-grid", "Compare original compositions", "Visual previews help you explore alternatives; they are not whole production apps."],
      ["a[href='./mg-film-styles.html']", "Need something that moves?", "Open 15 real source-linked motion films for cinematic inspiration."]
    ],
    "motion-library": [
      [".mt-hero", "Learn what animation libraries do", "These five small interactive samples explain useful movement without copying entire commercial templates."],
      ["#motion", "Motion", "Study button and component movement."],
      ["#gsap", "GSAP", "See how a timeline coordinates a sequence."],
      ["#locomotive", "Locomotive Scroll", "Explore the idea of scroll-linked visual storytelling."],
      ["#react-bits", "React Bits", "Learn text and component animation principles. Check upstream redistribution terms."],
      ["#three", "Three.js", "Try an original lightweight CSS 3D sample. Real Three.js is a separate WebGL library."]
    ],
    faq: [
      [".pvfaq-hero", "What is Atlas?", "This FAQ explains what the site can do, what it cannot do, and how to use the previews and prompts."],
      [".pvfaq-quick-path", "Find a topic quickly", "Jump to Getting Started, Previews, Animation, or Privacy and Licensing."],
      ["#pvfaq-search", "Search in plain language", "Type something like previews, free, build, or films to find a relevant answer."],
      ["#faq-basics", "Start with what you need", "Open a question to read the answer. This FAQ works even when JavaScript is turned off."],
      ["#faq-next", "Try your first example", "The guided beginner path is a good next stop if you're ready to explore."]
    ],
    general: [
      ["main", "Explore a design collection", "This page contains original previews, explanations and source-linked design prompts. Start with one thing you want to understand."],
      ["footer", "Need help?", "Return to the Start Here walkthrough or open the full FAQ for a plain-English explanation."]
    ]
  };
  let driverLoad = null;
  let activeDriver = null;
  let lastLaunch = null;
  const button = document.createElement("button");
  const info = document.createElement("details");
  info.className = "pv-help";
  info.setAttribute("aria-label", "Site help and guided tours");
  info.innerHTML = '<summary>Help & tour <span aria-hidden="true">?</span></summary><div class="pv-help-options"><button type="button" data-pv-tour-start>Show me around</button><a href="./start-here.html">Beginner guide ↗</a><a href="./faq.html">What is this? FAQ ↗</a><p class="pv-help-feedback" role="status" aria-live="polite"></p></div>';
  document.body.append(info);
  const helpStatus = info.querySelector(".pv-help-feedback");
  const route = document.body.getAttribute("data-tour-page")
    || document.body.getAttribute("data-page")
    || (location.pathname.split("/").filter(Boolean).pop() || "home").replace(/\.html$/, "");
  function reducedMotion() { return !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches; }
  function tourSteps() {
    const config = STEP_SETS[route] || STEP_SETS.general;
    return config.filter(([selector]) => {
      const el = document.querySelector(selector);
      if (!el || el.closest("[hidden]")) return false;
      if (typeof el.getClientRects === "function" && el.getClientRects().length === 0) return false;
      return true;
    }).map(([element, title, description]) => ({element, popover:{title, description, side:"bottom", align:"start"}}));
  }
  function loadDriver() {
    if (typeof window.driver?.js?.driver === "function") return Promise.resolve(window.driver.js.driver);
    if (driverLoad) return driverLoad;
    driverLoad = new Promise((resolve, reject) => {
      // The CSS and script are loaded only after an explicit button press.
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = ROOT + "driver.css";
      stylesheet.addEventListener("error", () => { /* The tour remains usable without upstream theme CSS only if JS loads. */ });
      document.head.append(stylesheet);
      const script = document.createElement("script");
      script.src = ROOT + "driver.js.iife.js";
      script.async = true;
      script.addEventListener("load", () => {
        if (typeof window.driver?.js?.driver === "function") resolve(window.driver.js.driver);
        else reject(new Error("Driver.js global was not found"));
      });
      script.addEventListener("error", () => reject(new Error("Unable to load Driver.js")));
      document.head.append(script);
    }).catch(error => { driverLoad = null; throw error; });
    return driverLoad;
  }
  async function beginTour(from) {
    const steps = tourSteps();
    if (!steps.length) {
      helpStatus.textContent = "This page has no tour steps yet. The Beginner guide and FAQ are available above.";
      info.open = true;
      return;
    }
    lastLaunch = from || document.activeElement;
    const all = [...document.querySelectorAll("[data-pv-tour-start]")];
    all.forEach(b => { b.disabled = true; b.setAttribute("aria-busy","true"); });
    helpStatus.textContent = "Opening the guided tour…";
    try {
      const createDriver = await loadDriver();
      if (activeDriver) activeDriver.destroy();
      // Prevent a fixed help menu from covering the first highlighted element.
      info.open = false;
      activeDriver = createDriver({
        steps,
        animate: !reducedMotion(),
        duration: 170,
        smoothScroll: false,
        showProgress: true,
        progressText: "{{current}} of {{total}}",
        showButtons: ["next","previous","close"],
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Done",
        closeBtnLabel: "Close guided tour",
        overlayColor: "#121c17",
        overlayOpacity: 0.54,
        stagePadding: 8,
        stageRadius: 8,
        allowScroll: true,
        allowClose: true,
        skipMissingElement: true,
        allowKeyboardControl: true,
        popoverClass: "pv-tour-popover",
        onDestroyed() {
          activeDriver = null;
          helpStatus.textContent = "Tour finished. You can replay it any time.";
          if (lastLaunch?.isConnected && typeof lastLaunch.focus === "function") {
            lastLaunch.focus({preventScroll:true});
          }
        }
      });
      activeDriver.drive();
      helpStatus.textContent = "";
    } catch (e) {
      helpStatus.textContent = "Tour couldn't load right now. The Beginner guide and FAQ still work.";
      info.open = true;
    } finally {
      all.forEach(b => { b.disabled = false; b.removeAttribute("aria-busy"); });
    }
  }
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-pv-tour-start]");
    if (!trigger) return;
    event.preventDefault();
    beginTour(trigger);
  });
  window.addEventListener("pagehide", () => { try { activeDriver?.destroy(); } catch (_) {} });
  // Intentional: the tour never starts automatically, including on a new visit.
})();