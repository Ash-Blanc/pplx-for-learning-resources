"""Perspectify's optional Agno AgentOS service.

The Bun app remains the product surface. This service owns the agent boundary so
the same agent can later power the brief form, CopilotKit, and scheduled research.
"""

from __future__ import annotations

import json
import os
from typing import Any

import httpx
from agno.agent import Agent
from agno.models.openai import OpenAIResponses
from agno.os import AgentOS


def _headers() -> dict[str, str]:
    return {"content-type": "application/json"}


def discover_sources(topic: str) -> str:
    """Discover source candidates through the configured research providers."""
    candidates: list[dict[str, Any]] = []
    with httpx.Client(timeout=12) as client:
        parallel_key = os.getenv("PARALLEL_API_KEY")
        if parallel_key:
            response = client.post(
                os.getenv("PARALLEL_API_URL", "https://api.parallel.ai/v1beta/search"),
                headers={"x-api-key": parallel_key, **_headers()},
                json={
                    "objective": f"Find authoritative, current learning resources for {topic}.",
                    "search_queries": [
                        f"{topic} official documentation",
                        f"{topic} practical guide",
                        f"{topic} latest research",
                    ],
                },
            )
            response.raise_for_status()
            candidates.extend(
                {
                    "title": item.get("title"),
                    "url": item.get("url"),
                    "description": " ".join(item.get("excerpts", [])),
                    "provider": "Parallel",
                }
                for item in response.json().get("results", [])
            )

        firecrawl_key = os.getenv("FIRECRAWL_API_KEY")
        if firecrawl_key:
            response = client.post(
                os.getenv("FIRECRAWL_API_URL", "https://api.firecrawl.dev/v2/search"),
                headers={"authorization": f"Bearer {firecrawl_key}", **_headers()},
                json={
                    "query": f"{topic} authoritative technical learning guide",
                    "limit": 8,
                    "sources": ["web"],
                    "scrapeOptions": {"formats": [{"type": "markdown"}]},
                },
            )
            response.raise_for_status()
            candidates.extend(
                {
                    "title": item.get("title"),
                    "url": item.get("url"),
                    "description": item.get("description") or item.get("markdown", "")[:800],
                    "provider": "Firecrawl",
                }
                for item in response.json().get("data", {}).get("web", [])
            )

    return json.dumps([item for item in candidates if item.get("url")])


perspectify = Agent(
    id="perspectify",
    name="Perspectify Research Editor",
    model=OpenAIResponses(id=os.getenv("OPENAI_MODEL", "gpt-5.6")),
    tools=[discover_sources],
    description="Builds concise, source-grounded learning briefs for students and self-directed learners.",
    instructions=[
        "Interpret the learner's topic, level, and time budget before researching.",
        "Call discover_sources for a non-trivial topic when provider keys are available.",
        "Prefer primary sources and recent material, and remove derivative duplicates.",
        "Explain consensus, disagreement, and tradeoffs instead of flattening them.",
        "Return JSON with topic, eyebrow, title, dek, stats, orientation, path, claims, sources, and next.",
        "Every claim must reference source ids. Never invent a URL.",
    ],
    add_datetime_to_context=True,
    markdown=False,
)

agent_os = AgentOS(
    description="Perspectify's agent runtime",
    agents=[perspectify],
)
app = agent_os.get_app()


if __name__ == "__main__":
    agent_os.serve(app="app:app", host=os.getenv("AGNO_HOST", "127.0.0.1"), port=int(os.getenv("AGNO_PORT", "7777")), reload=False)
