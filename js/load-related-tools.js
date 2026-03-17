function loadRelatedTools(){
  const container = document.getElementById("relatedTools");
  if(!container || typeof TOOL_CARDS === "undefined") return;

  const current = window.location.pathname;

  let filtered = TOOL_CARDS.filter(t => !current.includes(t.url));

  // shuffle
  filtered.sort(() => 0.5 - Math.random());

  const selected = filtered.slice(0, 3);

  container.innerHTML = selected.map(t => `
    <a class="tool-card ${t.color}" href="${t.url}">
      <div class="icon">${t.icon}</div>
      <div class="tool-title">${t.title}</div>
      <div class="tool-desc">${t.desc}</div>
      <div class="badge">Try it</div>
    </a>
  `).join("");
}

loadRelatedTools();
