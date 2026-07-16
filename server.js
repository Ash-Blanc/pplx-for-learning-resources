import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(root, "public");
const fixture = JSON.parse(await readFile(join(root, "data/mcp-brief.json"), "utf8"));
const port = Number(process.env.PORT || 3000);

const stages = [
  { id: "plan", label: "Plan the question" },
  { id: "find", label: "Find strong sources" },
  { id: "check", label: "Check the evidence" },
  { id: "write", label: "Write the learning brief" }
];

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
}

function normalizeTopic(topic) {
  return String(topic || "").trim().replace(/\s+/g, " ").slice(0, 160);
}

async function readBody(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  if (body.length > 100_000) throw new Error("Request is too large");
  return JSON.parse(body || "{}");
}

async function withTimeout(url, options, timeout = 12_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function searchParallel(topic) {
  if (!process.env.PARALLEL_API_KEY) return [];
  const response = await withTimeout(process.env.PARALLEL_API_URL || "https://api.parallel.ai/v1beta/search", {
    method: "POST",
    headers: { "x-api-key": process.env.PARALLEL_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({
      objective: `Find authoritative, current learning resources for ${topic}. Prioritize original specifications, official documentation, research, and practitioner guides. Return sources useful for teaching a learner.`,
      search_queries: [`${topic} official documentation`, `${topic} practical guide`, `${topic} latest research`]
    })
  });
  if (!response.ok) throw new Error(`Parallel search failed with ${response.status}`);
  const payload = await response.json();
  return (payload.results || []).map((item) => ({ title: item.title, url: item.url, description: (item.excerpts || []).join(" "), provider: "Parallel" }));
}

async function searchFirecrawl(topic) {
  if (!process.env.FIRECRAWL_API_KEY) return [];
  const response = await withTimeout(process.env.FIRECRAWL_API_URL || "https://api.firecrawl.dev/v2/search", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      query: `${topic} authoritative technical learning guide`,
      limit: 8,
      sources: ["web"],
      scrapeOptions: { formats: [{ type: "markdown" }] }
    })
  });
  if (!response.ok) throw new Error(`Firecrawl search failed with ${response.status}`);
  const payload = await response.json();
  return (payload.data?.web || []).map((item) => ({ title: item.title, url: item.url, description: item.description || item.markdown?.slice(0, 800) || "", provider: "Firecrawl" }));
}

async function collectSources(topic) {
  const results = await Promise.allSettled([searchParallel(topic), searchFirecrawl(topic)]);
  return results.flatMap((result) => result.status === "fulfilled" ? result.value : []).filter((item) => item.url);
}

function promptFor(topic, level, minutes, candidates) {
  const sourceContext = candidates.length ? `\nCandidate sources found by the research tools:\n${candidates.map((item, index) => `${index + 1}. ${item.title} | ${item.url} | ${item.description}`).join("\n")}` : "";
  return `Create an evidence-backed learning brief for a learner who wants to study: ${topic}.\nLearner level: ${level}. Time budget: ${minutes} minutes.\nReturn JSON with the same shape as the demo brief: topic, eyebrow, title, dek, stats, orientation, path (3 items), claims, sources, and next. Every claim must reference source ids. Prefer primary and recent sources, explain disagreements, and keep the reading path minimal. Use only URLs from the candidate sources when candidates are provided.${sourceContext}`;
}

async function researchWithAgno(topic, level, minutes) {
  if (!process.env.AGNO_URL) return null;
  const form = new FormData();
  form.append("message", promptFor(topic, level, minutes, []));
  form.append("user_id", "demo-learner");
  form.append("session_id", "perspectify-demo");
  form.append("stream", "false");
  const response = await withTimeout(`${process.env.AGNO_URL.replace(/\/$/, "")}/agents/perspectify/runs`, { method: "POST", body: form }, 20_000);
  if (!response.ok) throw new Error(`Agno run failed with ${response.status}`);
  const payload = await response.json();
  const content = payload.content || payload.response?.content || payload.response || payload.output;
  if (!content) throw new Error("Agno returned no content");
  const parsed = typeof content === "string" ? JSON.parse(content) : content;
  return { ...parsed, mode: "agno", model: process.env.OPENAI_MODEL || "gpt-5.6" };
}

async function researchWithOpenAI(topic, level, minutes, candidates) {
  if (!process.env.OPENAI_API_KEY) return null;
  const model = process.env.OPENAI_MODEL || "gpt-5.6";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [
        { role: "system", content: [{ type: "input_text", text: "You are Perspectify, an exacting research editor. Return valid JSON only. Do not invent URLs. If you cannot verify a source, omit it." }] },
        { role: "user", content: [{ type: "input_text", text: promptFor(topic, level, minutes, candidates) }] }
      ],
      text: { format: { type: "json_object" } }
    })
  });
  if (!response.ok) throw new Error(`GPT request failed with ${response.status}`);
  const payload = await response.json();
  const text = payload.output_text || payload.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text;
  if (!text) throw new Error("GPT returned no text");
  return { ...JSON.parse(text), mode: "gpt-5.6", model };
}

function fixtureBrief(topic, level, minutes) {
  return {
    ...fixture,
    topic,
    title: topic.toLowerCase() === "ai agents and mcp" ? fixture.title : `A focused route into ${topic}`,
    dek: topic.toLowerCase() === "ai agents and mcp" ? fixture.dek : `A compact, evidence-backed starting point for learning ${topic} in ${minutes} minutes.`,
    learner: { level, minutes },
    mode: "fixture",
    trace: {
      stages,
      message: "Using the local evidence set so the brief stays runnable without provider keys."
    }
  };
}

function serveStatic(req, res) {
  const requestedPath = req.url.split("?")[0];
  const rawPath = requestedPath === "/" ? "/index.html" : requestedPath === "/dashboard" ? "/dashboard.html" : requestedPath;
  const safePath = normalize(rawPath).replace(/^\.\.[\\/]/, "");
  const filePath = join(publicDir, safePath);
  if (!filePath.startsWith(publicDir)) return sendJson(res, 403, { error: "Forbidden" });
  readFile(filePath).then((content) => {
    const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml" };
    res.writeHead(200, { "content-type": `${types[extname(filePath)] || "application/octet-stream"}; charset=utf-8` });
    res.end(content);
  }).catch(() => sendJson(res, 404, { error: "Not found" }));
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/api/health") {
      return sendJson(res, 200, { ok: true, agnoConfigured: Boolean(process.env.AGNO_URL), gptConfigured: Boolean(process.env.OPENAI_API_KEY), model: process.env.OPENAI_MODEL || "gpt-5.6" });
    }
    if (req.method === "POST" && req.url === "/api/research") {
      const input = await readBody(req);
      const topic = normalizeTopic(input.topic);
      const level = ["New to it", "Some context", "Practitioner"].includes(input.level) ? input.level : "New to it";
      const minutes = [10, 30, 60].includes(Number(input.minutes)) ? Number(input.minutes) : 30;
      if (topic.length < 3) return sendJson(res, 400, { error: "Give the research desk a topic with at least three characters." });
      const candidates = await collectSources(topic);
      let brief;
      try {
        brief = await researchWithAgno(topic, level, minutes);
      } catch (error) {
        console.warn(`Agno unavailable: ${error.message}`);
      }
      try {
        brief ||= await researchWithOpenAI(topic, level, minutes, candidates);
      } catch (error) {
        console.warn(`Direct GPT unavailable: ${error.message}`);
      }
      const result = brief || fixtureBrief(topic, level, minutes);
      result.providers = {
        parallel: Boolean(process.env.PARALLEL_API_KEY),
        firecrawl: Boolean(process.env.FIRECRAWL_API_KEY),
        candidates: candidates.length
      };
      return sendJson(res, 200, result);
    }
    if (req.method === "GET") return serveStatic(req, res);
    sendJson(res, 405, { error: "Method not allowed" });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Something went wrong." });
  }
});

server.listen(port, () => console.log(`Perspectify listening at http://localhost:${port}`));
