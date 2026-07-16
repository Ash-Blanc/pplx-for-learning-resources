# Perspectify Agno service

This optional service owns the agent system. It uses Agno AgentOS to expose the `perspectify` agent through the standard runs API.

## Run with uv

From the repository root:

```bash
uv sync --project agent
OPENAI_API_KEY=your_key uv run --project agent python agent/app.py
```

The AgentOS API is available at `http://127.0.0.1:7777`, with interactive docs at `/docs`.

The Bun product server delegates to this service when `AGNO_URL=http://127.0.0.1:7777` is set. If it is unavailable, the product server falls back to its direct GPT-5.6 adapter and then the local evidence fixture.

## Agent endpoint

```bash
curl -X POST http://127.0.0.1:7777/agents/perspectify/runs \
  -F 'message=Create a 30 minute learning brief for AI agents and MCP for a beginner' \
  -F 'user_id=demo' \
  -F 'session_id=demo-session' \
  -F 'stream=false'
```
