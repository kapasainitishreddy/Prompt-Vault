/* FAQ search is enhancement-only: native <details> answers remain available without JavaScript. */
(() => {
  "use strict";
  const search = document.getElementById("pvfaq-search");
  const clear = document.getElementById("pvfaq-clear");
  const count = document.getElementById("pvfaq-results");
  if (!search || !clear || !count) return;
  const entries = [...document.querySelectorAll(".pvfaq-item")];
  const groups = [...document.querySelectorAll(".pvfaq-group")];
  function update() {
    const term = search.value.trim().toLocaleLowerCase();
    let matched = 0;
    entries.forEach(item => {
      const text = (item.textContent || "").toLocaleLowerCase();
      const shown = !term || term.split(/\s+/).every(word => text.includes(word));
      item.hidden = !shown;
      if (shown) matched += 1;
      // The browser's native details behavior continues to own expansion.
      if (term && shown) item.open = false;
    });
    groups.forEach(group => { group.hidden = ![...group.querySelectorAll(".pvfaq-item")].some(el => !el.hidden); });
    clear.hidden = !term;
    count.textContent = !term ? entries.length + " questions, organized by topic." : matched === 0 ? "No matching questions. Try a simpler word." : matched + " matching " + (matched === 1 ? "question" : "questions") + ".";
  }
  search.addEventListener("input", update);
  clear.addEventListener("click", () => { search.value = ""; update(); search.focus(); });
  update();
})();