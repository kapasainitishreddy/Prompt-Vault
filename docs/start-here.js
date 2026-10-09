/* Beginner path for Prompt-Vault Atlas. Dependency-free, no remote requests. */
(() => {
  'use strict';
  const q = (selector) => document.querySelector(selector);
  const samples = {
    website: {
      address: 'your-first-cafe.example',
      summary: 'A website is a collection of pages people visit in a browser. For example, a café menu, personal portfolio, or online store.',
      title: 'Example: a small café website',
      description: "The top row helps visitors find pages. The large headline explains what this place is. The main button shows what to do next. That's a useful design, even before adding animations.",
      link: './websites.html', linkText: 'Browse 32 website section previews ↗',
      cta: 'Show me website previews ↗',
      defaultProject: 'A welcoming website for a small neighborhood café'
    },
    app: {
      address: 'app-design.example',
      summary: 'An app helps someone do a task on a phone or computer. It has screens, buttons, and a path from the first step to the next.',
      title: 'Example: a tiny habit-tracking app',
      description: 'This one screen makes the next action obvious. People can see their progress and what remains. Good apps explain errors, offline use, privacy, and what to do next.',
      link: './apps.html', linkText: 'Browse 32 app screen and flow previews ↗',
      cta: 'Show me app examples ↗',
      defaultProject: 'A simple habit-tracking app that helps me do one small task each day'
    },
    explore: {
      address: 'ideas-for-your-next-project.example',
      summary: "Not sure what to make? That's fine. Start by looking at pictures of websites and apps. Open anything that catches your interest.",
      title: 'Example: an inspiration starting point',
      description: 'You can browse original visual examples, discover what an interface is meant to do, and learn which ideas to use or avoid. No code necessary.',
      link: './concepts.html#previews', linkText: 'Browse the visual idea gallery ↗',
      cta: 'Show me design inspiration ↗',
      defaultProject: 'A creative project I have not decided on yet'
    }
  };
  const exampleEl = Object.fromEntries(Object.keys(samples).map(key => [key, q('#sample-' + key)]));
  let mode = 'website';
  let lastDefault = samples.website.defaultProject;
  const project = q('#project'), prompt = q('#built-prompt');
  function buildPrompt(type, description) {
    const statement = description.trim() || samples[type].defaultProject;
    const common = 'Use one consistent type scale and color palette, readable text, clear tap targets, sensible spacing on small screens, and honest example content. Show me an original visible preview and explain decisions without jargon. Test keyboard navigation, mobile widths, reduced-motion preferences, and error/empty states. Do not invent customer reviews, integrations, or performance claims.';
    if (type === 'app') return 'Help a complete beginner design this app: ' + statement + '.\n\nStart by showing the smallest helpful action. Suggest the first three screens in order, describe what each button does, and explain the first-time experience. Include a way to recover from mistakes, privacy-conscious defaults, and clear navigation. ' + common + '\n\nGive me a simple Build prompt and a checklist I can use to verify it.';
    if (type === 'explore') return 'Help me explore this idea: ' + statement + '.\n\nShow three genuinely different visual directions (not the same layout with different colors). For each direction, explain who it helps, what to put on the page or screen, and when to avoid it. ' + common + '\n\nThen ask me to choose a direction before producing an implementation prompt.';
    return 'Help a complete beginner design this website: ' + statement + '.\n\nStart with a welcoming top section, clear navigation, useful information, a trust-building detail, and one main next-step button. Say which sections to keep and which to skip, based on the visitor’s goal. ' + common + '\n\nGive me a simple Build prompt and a checklist I can use to verify it.';
  }
  function updatePrompt() { prompt.value = buildPrompt(mode, project.value); }
  function render(next) {
    const data = samples[next], previous = lastDefault;
    mode = next;
    Object.entries(exampleEl).forEach(([key, el]) => { if (el) el.hidden = key !== next; });
    q('#path-summary').textContent = data.summary;
    q('#preview-title').textContent = data.title;
    q('#preview-explanation').textContent = data.description;
    q('#preview-link').textContent = data.linkText;
    q('#preview-link').href = data.link;
    q('#next-collection').textContent = data.cta;
    q('#next-collection').href = data.link;
    q('#fake-address').textContent = data.address;
    if (!project.value.trim() || project.value.trim() === previous) project.value = data.defaultProject;
    lastDefault = data.defaultProject;
    updatePrompt();
  }
  document.querySelectorAll('input[name=path]').forEach(input => {
    input.addEventListener('change', () => { if (input.checked && samples[input.value]) render(input.value); });
  });
  q('#device').addEventListener('click', (event) => {
    const pressed = event.currentTarget.getAttribute('aria-pressed') === 'true';
    event.currentTarget.setAttribute('aria-pressed', String(!pressed));
    event.currentTarget.textContent = pressed ? 'View as phone' : 'View as desktop';
    q('#frame').classList.toggle('bv-mobile', !pressed);
  });
  project.addEventListener('input', updatePrompt);
  q('#copy-prompt').addEventListener('click', async () => {
    const status = q('#copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(prompt.value);
      status.textContent = 'Copied. Paste it into your preferred AI building tool, or save it in your notes.';
    } catch (_) {
      prompt.focus(); prompt.select();
      status.textContent = 'The prompt is selected. Use Copy from your keyboard or device menu.';
    }
  });
  try {
    const requested = new URLSearchParams(location.search).get('path');
    if (requested && samples[requested]) {
      const selected = document.querySelector('input[name=path][value="' + requested + '"]');
      if (selected) { selected.checked = true; render(requested); }
    } else updatePrompt();
  } catch (_) { updatePrompt(); }
})();
