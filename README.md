# Perspectify

Perspectify turns a learner's question into a compact, evidence-backed learning brief. It is built for the OpenAI Build Week Education track and demonstrates the idea with **AI agents and MCP**.

## Run it with Bun

Requires Bun 1.x.

```bash
bun run start
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, then choose **Open research desk** or visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard) directly for the working dashboard.

The app works without credentials by using the curated evidence fixture in `data/mcp-brief.json`. This keeps the demo deterministic and gives judges a runnable path. To enable the GPT-5.6 path:

```bash
OPENAI_API_KEY=your_key bun run start
```

Optional model override:

```bash
OPENAI_MODEL=gpt-5.6 OPENAI_API_KEY=your_key bun run start
```

Optional research providers can be enabled alongside GPT-5.6:

```bash
OPENAI_API_KEY=your_key \
PARALLEL_API_KEY=your_parallel_key \
FIRECRAWL_API_KEY=your_firecrawl_key \
bun run start
```

The server uses Parallel for semantic source discovery and Firecrawl for web search plus Markdown extraction. It passes discovered candidates to the OpenAI Responses API, asks for the Perspectify brief shape, and falls back to the local evidence set if any provider is unavailable or the response is invalid. Provider keys are never sent to the browser.

To route the brief through Agno AgentOS first, run the optional Python service in another terminal:

```bash
uv sync --project agent
OPENAI_API_KEY=your_key uv run --project agent python agent/app.py
AGNO_URL=http://127.0.0.1:7777 bun run start
```

The Bun server uses this order: Agno AgentOS, direct GPT-5.6, then the local fixture.

## Project shape

- `public/index.html`: landing page and product narrative
- `public/dashboard.html`: focused research workspace and live brief form
- `public/styles.css`: locked editorial design language
- `public/app.js`: research flow, trace states, and brief rendering
- `server.js`: static server, research endpoint, GPT-5.6 adapter, and fallback behavior
- `agent/app.py`: Agno AgentOS runtime and `perspectify` agent
- `agent/pyproject.toml`: locked Python agent dependencies
- `data/mcp-brief.json`: curated demo evidence set
- `.ulpi/design/`: design lock and UX handoff produced before implementation

## API

### `GET /api/health`

Returns whether an OpenAI key is configured and which model is selected.

### `POST /api/research`

Request:

```json
{
  "topic": "AI agents and MCP",
  "level": "New to it",
  "minutes": 30
}
```

Accepted levels are `New to it`, `Some context`, and `Practitioner`. Accepted time budgets are `10`, `30`, and `60`.

## Demo script

1. Leave the example topic in place.
2. Choose `New to it` and `30 min`.
3. Select `Research this topic`.
4. Show the live trace, then the five-source brief.
5. Point out the three learning layers, evidence claims, one contextual tradeoff, and source trail.
6. Open a source link to demonstrate provenance.

## Hackathon handoff checklist

- [x] Education-focused learner experience
- [x] Separate landing page and focused dashboard
- [x] Working project with fixture fallback
- [x] GPT-5.6 integration path
- [x] Public-repository-ready setup instructions
- [ ] Deploy a public demo URL
- [ ] Record a public YouTube demo under three minutes
- [ ] Add the majority-work Codex `/feedback` session ID to Devpost
- [ ] Submit before July 21, 2026 at 5:00 PM PDT

The final submission should link to the official [OpenAI Build Week](https://openai.devpost.com/) page and clearly explain how Codex and GPT-5.6 accelerated the build.
