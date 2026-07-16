# Perspectify UI/UX/AX Revamp

## Reference DNA

- [Nia](https://www.trynia.ai): take the strong plainspoken promise, source-format vocabulary, terminal-like try-it moment, and trust-through-benchmarks. Reject the dense logo wall and unqualified performance claims.
- [Morph](https://www.morphllm.com): take the dark operator console, API/SDK/MCP framing, live status metrics, and product-in-context proof. Reject the developer-infrastructure-only tone.
- [Cofounder](https://cofounder.co): take the agentic operating-system metaphor, visible departments/tasks, approval gates, and work-in-progress dashboard. Reject the business-automation breadth.

Synthesis: Perspectify becomes a calm dark research console. The learner's question is the command, the live brief is the work surface, and source evidence is the audit trail.

## Primary flow

1. Landing hero names the problem and previews a working console, not a static marketing illustration.
2. The learner enters the dashboard, which has one job: create a brief.
3. Learner enters a question, level, and time budget.
4. A four-stage trace exposes agent progress: plan, find, check, write.
5. The brief opens as an inspectable result with selected sources, evidence claims, and next moves.
6. The learner can refine the question or open any source.

## AX states

- Empty: an example prompt is present but clearly editable.
- Loading: each agent stage is visible; the current stage is announced through `aria-live`.
- Partial: provider fallback is explicitly labeled as local evidence mode.
- Error: the original form values remain and a retry action is keyboard reachable.
- Success: the result has a clear primary reading route and secondary evidence detail.

## Interaction rules

- Exactly one primary action per view: `Research this topic` or `Start with a question`.
- The console is not decorative: its metrics mirror the response payload.
- Tabs are progressive disclosure, not navigation. The default tab is the live brief.
- Status color is always paired with text and an icon or label.
- All touch targets are at least 48px. Focus rings use the orange accent.
- Reduced-motion mode removes reveal transforms and leaves the trace readable as static state.

## Pre-flight

- Reference synthesis: passed. No single page is cloned.
- Banned patterns: no purple glow, no centered mesh hero, no generic three-card feature row, no gradient text.
- AX: passed. Labels, keyboard focus, live status, provider state, and fallback recovery are explicit.
- Cognitive load: passed. The hero exposes one task, three learner decisions, and one submit action.
- Surface separation: passed. The landing page earns the click; the dashboard holds the work; both use the same locked tokens.
