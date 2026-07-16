# Perspectify

## One-line description

Perspectify turns a learner's question into the shortest trustworthy route through a topic.

## Project description

Most learning time disappears before the learning begins. A student searches across documentation, blogs, videos, and tutorials, then spends hours deciding what is current, authoritative, and worth reading.

Perspectify is an evidence-backed research desk for learners. Give it a topic, your starting point, and the time you have. It finds strong sources, filters repeated material, checks claims against the source trail, surfaces disagreement, and produces a progressive learning path.

The demo focuses on AI agents and MCP. It shows how a learner can go from “I want to understand this” to a five-minute orientation, a twenty-minute core path, and a deeper hour-long route without opening a pile of tabs.

## How it was built

- Bun serves the product shell and the research API.
- Agno AgentOS serves the `perspectify` research editor and owns the agent boundary.
- GPT-5.6 handles intent planning, evidence comparison, and learning-brief synthesis when `OPENAI_API_KEY` is configured.
- Parallel provides semantic source discovery when `PARALLEL_API_KEY` is configured.
- Firecrawl provides web search and Markdown extraction when `FIRECRAWL_API_KEY` is configured.
- A curated MCP evidence fixture provides a complete deterministic fallback for judging and local testing.

The Bun server delegates to AgentOS first when `AGNO_URL` is configured, then retains a direct GPT-5.6 path and a local fixture fallback for resilient judging.

Codex accelerated the work by shaping the product boundary, creating the editorial evidence interface, implementing the research state machine, wiring the provider seams, and testing the runnable fallback path.

## Demo video outline

1. Enter “AI agents and MCP”.
2. Select “New to it” and “30 min”.
3. Run the research desk and show the four-stage trace.
4. Show the progressive learning path and the source counts.
5. Open the “What the evidence says” section and point out consensus, confidence, and a contextual tradeoff.
6. Open a source from the source trail.
7. Close with: “Perspectify keeps the curiosity and removes the sprawl.”

## Testing

```bash
bun run start
```

Open `http://localhost:3000`. The default demo works without API keys. The public repository README contains API and environment-variable instructions.

## Submission fields still requiring human completion

- Public demo URL: deploy the Bun server or host the static shell with an API endpoint.
- Public YouTube video: keep it under three minutes and show the working project.
- Codex `/feedback` session ID: paste the session that contains the majority of the core implementation.
- Devpost team members and final category submission.
