/* Prompt-Vault Atlas MG styles guide.
   Original interaction code, using externally hosted licensed reference media.
   No third-party JS, autoplay, vendor copying, telemetry, or paid APIs.
*/
(() => {
  'use strict';
  const GITHUB = 'https://github.com/Vincentwei1021/mg-styles-15/';
  const SHOWCASE = 'https://vincentwei1021.github.io/mg-styles-15/';
  const VIDEO = SHOWCASE + 'videos/';
  const byId = (id) => document.getElementById(id);
  const cards = Array.from(document.querySelectorAll('.mf-card[data-slug]'));
  const controls = byId('mf-controls');
  const search = byId('mf-search');
  const kind = byId('mf-kind');
  const count = byId('mf-count');
  const empty = byId('mf-empty');
  const grid = byId('mf-grid');
  const dialog = byId('mf-dialog');
  const video = byId('mf-video');
  const status = byId('mf-stream-status');
  const idea = byId('mf-idea');
  const prompt = byId('mf-prompt');
  const copyStatus = byId('mf-copy-status');
  const validSlug = (value) => /^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
  let activeLink = null;
  let activeCard = null;

  function applyFilters() {
    const term = search.value.trim().toLocaleLowerCase();
    const selected = kind.value;
    let visible = 0;
    cards.forEach((card) => {
      const matchesFamily = selected === 'all' || card.dataset.category === selected;
      const corpus = [
        card.dataset.title, card.dataset.tag, card.dataset.summary,
        card.dataset.good, card.dataset.avoid, card.dataset.how, card.dataset.category
      ].join(' ').toLocaleLowerCase();
      card.hidden = !(matchesFamily && (!term || corpus.includes(term)));
      if (!card.hidden) visible += 1;
    });
    count.textContent = visible === cards.length
      ? 'Showing all 15 motion films'
      : 'Showing ' + visible + ' of ' + cards.length + ' motion films';
    empty.hidden = visible !== 0;
  }
  controls.hidden = false;
  search.addEventListener('input', applyFilters);
  kind.addEventListener('change', applyFilters);
  byId('mf-reset').addEventListener('click', () => {
    search.value = '';
    kind.value = 'all';
    applyFilters();
    search.focus();
  });

  // Keep meaningful text visible even if the remote image fails to load.
  document.querySelectorAll('.mf-visual img').forEach((img) => {
    const unavailable = () => { img.hidden = true; };
    img.addEventListener('error', unavailable);
    if (img.complete && img.naturalWidth === 0) unavailable();
  });

  function buildStarterPrompt() {
    if (!activeCard) return '';
    const title = activeCard.dataset.title;
    const subject = idea.value.trim() || 'a short, original promotional film for my project';
    return [
      'I am new to motion design. Help me create ' + subject + '.',
      'STYLE: ' + title + '. ' + activeCard.dataset.summary,
      'USE CASE: ' + activeCard.dataset.good,
      'VISUAL TECHNIQUE TO EXPLORE: ' + activeCard.dataset.how,
      'Plan one understandable 10-second story with a clear hook, a visual development, a single hero moment and a readable final frame. Use my own brand name, story, original characters, visuals and colors. Explain what each visual beat means in everyday language.',
      'Start with a clear 5-beat storyboard before writing code. Propose a lightweight approach with HTML/SVG/Canvas/Three.js where appropriate, using deterministic animation keyed to time. If a video file is required, explain how to capture frames and join audio with ffmpeg. Require the tools that are actually needed and never silently install paid dependencies.',
      'Accessibility and quality: provide an unanimated poster and captions/transcript as applicable, preserve readable high-contrast text and safe margins, respect motion sensitivity, license all external material, and do not claim measured performance without testing. ' + activeCard.dataset.avoid,
      'Give me an original visual preview, an implementation plan, and a list of tests. This is a learning prompt inspired by a visual genre, not a request to reproduce any upstream film or brand. For the full source production prompt, point me to ' + GITHUB + 'blob/main/prompts/' + activeCard.dataset.slug + '.md.'
    ].join('\n\n');
  }
  function updateStarterPrompt() { prompt.value = buildStarterPrompt(); }
  if (idea) idea.addEventListener('input', updateStarterPrompt);

  function resetVideo() {
    try { video.pause(); } catch (_) {}
    video.removeAttribute('src');
    video.removeAttribute('poster');
    video.load();
    status.textContent = '';
  }
  function openFilm(link, slug) {
    if (!dialog || typeof dialog.showModal !== 'function' || !validSlug(slug)) return false;
    const card = cards.find((item) => item.dataset.slug === slug);
    if (!card) return false;
    activeCard = card;
    activeLink = link;
    byId('mf-detail-index').textContent = card.dataset.category + ' / Source film';
    byId('mf-detail-title').textContent = card.dataset.title;
    byId('mf-detail-summary').textContent = card.dataset.summary;
    byId('mf-detail-good').textContent = card.dataset.good;
    byId('mf-detail-avoid').textContent = card.dataset.avoid;
    byId('mf-detail-how').textContent = card.dataset.how;
    byId('mf-original-film').href = SHOWCASE + '#' + slug;
    byId('mf-original-prompt').href = GITHUB + 'blob/main/prompts/' + slug + '.md';
    byId('mf-original-code').href = GITHUB + 'tree/main/demos/' + slug;
    byId('mf-player-wrap').dataset.portrait = String(slug === '18-hanazi');
    status.textContent = 'Press Play to stream the original 10-second film with audio from the creator’s website.';
    copyStatus.textContent = '';
    if (idea) idea.value = '';
    updateStarterPrompt();
    // Loading is opt-in; the browser only fetches video data when Play is pressed.
    video.preload = 'none';
    video.poster = VIDEO + slug + '.jpg';
    video.src = VIDEO + slug + '.mp4';
    dialog.showModal();
    byId('mf-close').focus();
    return true;
  }

  // An <a> link remains functional if JavaScript is disabled.
  grid.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-film]');
    if (!link) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const slug = link.dataset.film;
    if (openFilm(link, slug)) event.preventDefault();
  });
  video.addEventListener('error', () => {
    status.textContent = 'This hosted film could not load. Select “Original film” below to watch it on the creator’s website.';
  });
  byId('mf-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    resetVideo();
    activeCard = null;
    const focusTarget = activeLink;
    activeLink = null;
    if (focusTarget && focusTarget.isConnected) focusTarget.focus();
  });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !dialog.open) return;
    if (document.hidden) video.pause();
  });

  byId('mf-copy').addEventListener('click', async () => {
    updateStarterPrompt();
    if (!prompt.value) return;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('No clipboard permissions');
      await navigator.clipboard.writeText(prompt.value);
      copyStatus.textContent = 'Copied. You can paste it into a coding assistant or keep it in your notes.';
    } catch (_) {
      prompt.focus();
      prompt.select();
      copyStatus.textContent = 'Text selected. Choose Copy from your keyboard or device menu.';
    }
  });
})();
