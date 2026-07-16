# Feature Request: Progressive CopilotKit Integration (Do Not Rewrite Perspectify)

## Critical Constraint

The current frontend is already good.

It has:
- Clear landing page
- Strong editorial design language
- Research desk workflow
- Live agent trace
- Learning-path output
- Minimal cognitive load

This must be preserved.

The goal is NOT:
- Rebuild everything
- Replace the dashboard
- Turn the product into an overwhelming agent playground
- Lose the current simplicity

The goal is:

Add CopilotKit progressively while preserving the existing experience.

---

## Current Product Strengths

Today Perspectify already has:

1. Topic Input
2. Learner Level Selection
3. Time Budget Selection
4. Research Trace
5. Learning Brief
6. Curated Resource List
7. Learning Path Ordering

This is the core experience.

It works.

CopilotKit should amplify it rather than replace it.

---

## Phase 1: Copilot Side Panel (Minimal Risk)

Do not change the landing page.

Do not redesign the dashboard.

Simply add:

- CopilotKit chat panel
- Collapsible right drawer
- Floating assistant button

The existing learning path remains the primary experience.

The copilot becomes:

"Learning Guide"

Example:

User generates path.

Then asks:

- Explain this roadmap.
- Which resource should I start with?
- Give me a faster route.
- Make this project-focused.
- Recommend a beginner alternative.

This immediately increases value with minimal frontend disruption.

---

## Phase 2: Shared Learning State

Introduce CoAgents.

The agent receives access to:

- Topic
- Skill level
- Time budget
- Generated learning path
- Sources
- Claims
- Recommended next steps

The agent no longer starts from an empty chat.

It understands the page the learner is currently viewing.

This is probably the highest ROI CopilotKit feature.

---

## Phase 3: Upgrade Existing Sections With Generative UI

Do NOT create new screens.

Upgrade existing output blocks.

### Existing

Learning Path

### Enhanced

Learning Path Timeline Component

---

### Existing

Claims Section

### Enhanced

Evidence Comparison Cards

---

### Existing

Source List

### Enhanced

Resource Intelligence Cards

showing:

- difficulty
- effort
- authority
- freshness
- practical value

---

### Existing

Next Steps

### Enhanced

Adaptive Study Plan

This preserves the current layout while making it feel agent-native.

---

## Phase 4: Agent Activity Feed

You already have:

Live Agent Trace

Do not remove it.

Extend it.

Current:

- Plan the question
- Find strong sources
- Check evidence
- Write learning brief

Future:

- Discovering resources
- Comparing sources
- Building curriculum
- Finding prerequisites
- Identifying knowledge gaps

This aligns perfectly with CopilotKit's transparency philosophy.

---

## Phase 5: Human-In-The-Loop Learning

After a path is generated:

Agent can suggest:

- harder path
- faster path
- project-first path
- video-first path
- documentation-first path

Learner approves changes.

The roadmap updates.

This uses CopilotKit's strengths without introducing complexity.

---

## Phase 6: Persistent Learning Memory

Only after the previous phases are successful.

Store:

- topics explored
- completed resources
- preferred formats
- weak areas

Result:

Perspectify becomes smarter over time.

---

## Features Explicitly Deferred

Do NOT build initially:

- Infinite canvas
- Multi-agent swarms
- Complex workspace IDE
- Heavy dashboard redesign
- Notion-like interface
- Miro-like interface

These add significant complexity before product validation.

---

## Recommended Technical Migration

Current:

- Bun
- Vanilla JS
- Agno AgentOS

Next:

- Next.js
- React
- CopilotKit
- Existing Perspectify visual language
- Existing information architecture

Migration rule:

Recreate the existing UI first.

Then layer CopilotKit capabilities on top.

No visual redesign unless a feature requires it.

---

## Success Metric

Bad outcome:

"We rebuilt Perspectify around CopilotKit."

Good outcome:

"Perspectify feels like the same product, except now every learning path comes with an intelligent learning strategist that understands the learner and the page they are looking at."

The shortest path to a superior product is progressive enhancement, not replacement.