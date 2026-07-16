# Feature Request: Agent-Native Learning OS (Inspired by CopilotKit)

## Vision

Perspectify should evolve from a learning-path generator into an agent-native learning operating system where learners co-work with an AI learning strategist.

The goal is not a better chatbot.

The goal is a persistent learning workspace where the agent:
- Understands learner state.
- Builds and revises learning plans.
- Surfaces visual learning artifacts.
- Tracks progress.
- Requests approval when changing direction.
- Actively guides the learner through resources.

## Key CopilotKit Concepts Worth Adopting

### 1. Shared State (Highest Priority)

CopilotKit CoAgents treat the agent and UI as collaborators sharing the same state.

Perspectify equivalent:

```json
{
  "goal": "Learn AI Agents",
  "skillLevel": "Beginner",
  "timeBudget": 30,
  "completedResources": [],
  "knowledgeGraph": {},
  "learningPlan": []
}
```

Benefits:
- Agent always knows learner progress.
- UI updates instantly.
- Learning plans become living artifacts.
- Enables long-term learning journeys.

### 2. Human-In-The-Loop Learning

Agent proposes.
Learner approves.

Examples:
- Replace a learning path.
- Skip fundamentals.
- Increase difficulty.
- Switch resource formats.
- Generate project-based curriculum.

This prevents the learner from becoming a passive consumer.

### 3. Agentic Generative UI

Instead of returning text, agents generate learning artifacts.

Potential artifacts:
- Learning Path Timeline
- Concept Dependency Graph
- Skill Radar
- Resource Comparison Matrix
- Project Roadmap
- Knowledge Gap Report
- Weekly Study Plan
- Interactive Quiz Cards
- MCP Ecosystem Map
- Agent Architecture Diagrams

For Vue:

LLM -> JSON UI Schema -> Vue Components

Not:

LLM -> React Components

### 4. Agent Transparency Layer

Expose reasoning as visible workflow states.

Examples:
- Discovering Sources
- Comparing Resources
- Detecting Prerequisites
- Building Curriculum
- Creating Projects
- Updating Progress Model

Learners should see the learning strategist work.

### 5. Multi-Agent Learning Team

Future architecture:

- Scout Agent
  - Finds resources.

- Curriculum Agent
  - Designs path.

- Mentor Agent
  - Explains concepts.

- Evaluator Agent
  - Assesses understanding.

- Project Coach Agent
  - Creates implementation challenges.

The learner interacts with one interface while agents collaborate underneath.

## Proposed SOTA Learning Experience

### Learning Canvas

Replace the current output with a persistent workspace.

Panels:

1. Chat + Mentor
2. Learning Roadmap
3. Active Resource
4. Knowledge Graph
5. Progress Tracker
6. Projects
7. Notes

### Adaptive Curriculum Engine

Agent continuously updates curriculum based on:

- Completed resources
- Quiz performance
- Time spent
- Stated goals
- Project outcomes

### Resource Intelligence Layer

Every resource gets:

- Difficulty score
- Freshness score
- Authority score
- Practicality score
- Estimated time

Agent explains WHY a resource was selected.

### Learning Memory

Persist:

- Interests
- Goals
- Concepts learned
- Weak concepts
- Finished projects

Result:

Perspectify becomes a long-term mentor instead of a session tool.

### Project-Driven Learning

After every major topic:

Agent creates:
- Tiny project
- Portfolio project
- Stretch project

Learning becomes output-oriented.

## Recommended Technical Direction

Current Stack:
- Bun
- Vanilla JS
- Agno AgentOS

Near-Term:
- Keep backend agent architecture.
- Build CopilotKit-inspired patterns.
- Do NOT migrate entire product to React.

Instead:

- JSON-based Generative UI
- Shared learning state
- Agent transparency timeline
- Human approval checkpoints
- Persistent learner memory

## Success Metric

Current:

"Generate a good learning path."

Future:

"Act as an adaptive AI learning strategist that co-learns with the user over weeks or months."

That is the strongest leverage hidden inside the CopilotKit philosophy for Perspectify.