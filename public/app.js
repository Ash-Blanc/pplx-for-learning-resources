const form = document.querySelector("#research-form");
const button = document.querySelector("#research-button");
const traceSection = document.querySelector("#trace-section");
const trace = document.querySelector("#trace");
const results = document.querySelector("#results");
const traceMode = document.querySelector("#trace-mode");
const defaultStages = [
  { id: "plan", label: "Plan the question", sub: "Turning intent into a brief" },
  { id: "find", label: "Find strong sources", sub: "Looking past the first page" },
  { id: "check", label: "Check the evidence", sub: "Comparing claims and context" },
  { id: "write", label: "Write the learning brief", sub: "Ordering the shortest route" }
];

const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function drawTrace(activeIndex = -1, done = false) {
  trace.innerHTML = defaultStages.map((stage, index) => {
    const state = done || index < activeIndex ? "complete" : index === activeIndex ? "active" : "";
    return `<div class="trace-step ${state}"><span class="trace-marker" aria-hidden="true"></span><span class="trace-label">${stage.label}</span><span class="trace-sub">${stage.sub}</span></div>`;
  }).join("");
}

function sourceById(brief, id) { return brief.sources.find((source) => source.id === id); }

function renderBrief(brief) {
  const stats = brief.stats || {};
  const orientation = brief.orientation || {};
  const source = (id) => sourceById(brief, id);
  const sourcePills = (ids = []) => ids.map((id) => {
    const item = source(id);
    return item ? `<span class="source-pill">${esc(item.publisher)}</span>` : "";
  }).join("");
  const path = (brief.path || []).map((item) => `<article class="path-item"><div><span class="path-time">${esc(item.time)}</span><span class="path-label">${esc(item.label)}</span></div><div><h4>${esc(item.title)}</h4><p>${esc(item.body)}</p></div></article>`).join("");
  const claims = (brief.claims || []).map((claim) => `<article class="claim ${claim.status === "tradeoff" ? "explained" : ""}"><div class="claim-top"><span class="claim-text">${esc(claim.text)}</span><span class="claim-confidence">${esc(claim.confidence || "Checked")}</span></div><p>${esc(claim.explanation)}</p><div class="claim-sources">${sourcePills(claim.sourceIds)}</div></article>`).join("");
  const sources = (brief.sources || []).map((item) => `<article class="source-row"><div class="source-main"><a href="${esc(item.url)}" target="_blank" rel="noreferrer">${esc(item.title)} <span aria-hidden="true">↗</span></a><div class="source-meta">${esc(item.publisher)} · ${esc(item.type)} · ${esc(item.date)} · ${esc(item.readTime)}</div><p class="source-reason">${esc(item.reason)}</p></div><span class="source-quality">${esc(item.quality)}</span></article>`).join("");
  const next = (brief.next || []).map((item) => `<li>${esc(item)}</li>`).join("");
  results.innerHTML = `<div class="brief-header"><div><span class="utility-label">${esc(brief.eyebrow || "A focused field guide")}</span><h2 id="results-title">${esc(brief.title || brief.topic)}</h2><p class="brief-dek">${esc(brief.dek || "A concise route through the strongest available material.")}</p></div><aside class="brief-aside"><span class="utility-label">Your brief</span><p>${esc(brief.learner?.level || "New to it")} · ${esc(brief.learner?.minutes || 30)} minutes<br />Built from ${esc(stats.sources || brief.sources?.length || 0)} selected sources.</p></aside></div><div class="stats-strip"><div class="stat"><span class="stat-value">${esc(stats.sources || brief.sources?.length || 0)}</span><span class="stat-label">Selected sources</span></div><div class="stat"><span class="stat-value">${esc(stats.claims || brief.claims?.length || 0)}</span><span class="stat-label">Claims checked</span></div><div class="stat"><span class="stat-value">${esc(stats.filtered || 0)}</span><span class="stat-label">Echoes filtered</span></div><div class="stat"><span class="stat-value">${esc(stats.freshness || "Live")}</span><span class="stat-label">Freshness</span></div></div>${brief.mode === "fixture" ? '<div class="partial-notice" role="status"><strong>Local evidence mode.</strong> This complete brief is powered by the demo source set, so the experience stays testable without provider keys.</div>' : ""}<div class="brief-grid"><div><section class="brief-section"><span class="utility-label">Start here</span><div class="orientation"><h3>${esc(orientation.title || "In one sentence")}</h3><p>${esc(orientation.body)}</p></div></section><section class="brief-section"><span class="utility-label">The shortest route</span><h3>Learn in layers, not links.</h3><div class="path-list">${path}</div></section><section class="brief-section"><span class="utility-label">What the evidence says</span><h3>Agreement is useful. Context is better.</h3><div class="claim-list">${claims}</div></section></div><aside><section class="brief-section"><span class="utility-label">Next moves</span><h3>Make it stick.</h3><ul class="next-list">${next}</ul></section><section class="brief-section"><span class="utility-label">Source trail</span><div class="source-list">${sources}</div></section></aside></div>`;
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function runResearch(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const payload = { topic: formData.get("topic"), level: formData.get("level"), minutes: Number(formData.get("minutes")) };
  button.disabled = true;
  button.querySelector("span:first-child").textContent = "Researching...";
  traceSection.hidden = false;
  results.hidden = true;
  drawTrace(0);
  traceMode.textContent = "Preparing evidence";
  traceSection.scrollIntoView({ behavior: "smooth", block: "center" });
  try {
    const request = fetch("/api/research", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    for (let index = 1; index < defaultStages.length; index += 1) {
      await wait(520);
      drawTrace(index);
      traceMode.textContent = defaultStages[index].label;
    }
    const response = await request;
    const brief = await response.json();
    if (!response.ok) throw new Error(brief.error || "The research desk could not complete that brief.");
    await wait(350);
    drawTrace(defaultStages.length, true);
    traceMode.textContent = brief.mode === "agno" ? "Agno agent runtime" : brief.mode === "gpt-5.6" ? `GPT-5.6 · ${brief.model}` : "Local evidence set";
    renderBrief(brief);
  } catch (error) {
    trace.innerHTML = `<div class="error-message" role="alert">${esc(error.message)} <button type="button" id="retry-button">Try again</button></div>`;
    document.querySelector("#retry-button")?.addEventListener("click", () => form.requestSubmit());
  } finally {
    button.disabled = false;
    button.querySelector("span:first-child").textContent = "Research this topic";
  }
}

form.addEventListener("submit", runResearch);
drawTrace();
