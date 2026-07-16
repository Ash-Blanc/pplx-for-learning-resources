# Perspectify Learning Brief

## Flow

The learner enters a topic, chooses a level and time budget, then receives a cited learning brief.

```text
[Start]
  → [Topic + learner profile]
  → [Research trace]
  → [Evidence-backed brief]
  → [Open a source or refine]
```

### States

- Empty: the form is ready with the MCP example prefilled.
- Loading: the research trace advances through planning, finding, checking, and writing.
- Success: the brief shows progressive depth, claims, and sources.
- Partial: the brief is rendered from the local evidence fixture when a provider is unavailable.
- Error: the form remains intact and offers `Try again`.

## Component rules

### Research form

One primary action, `Research`. Topic is required and must be at least 3 characters. Level and time are compact segmented controls. On mobile the controls stack; all targets remain at least 48px tall.

### Research trace

An evidence spine with four stages. The current stage uses the accent marker, completed stages use success, and the live status is announced with `aria-live="polite"`.

### Learning brief

The brief uses three distinct layouts: a headline and stat strip, a two-column evidence/learning grid, and a ruled source list. The evidence spine connects claims to their sources.

### Source row

Each source shows publisher, type, date, read time, and a short reason it was selected. Links open in a new tab with an explicit accessible label.

## Accessibility

- Visible `:focus-visible` rings use the accent color.
- The form has a real fieldset and labels; level and time controls use a radiogroup pattern.
- Loading updates are announced without stealing focus.
- All interactive controls are keyboard reachable.
- `prefers-reduced-motion` disables reveal transforms.

## Design pre-flight

- Identity lock: passed. One palette, type pairing, radius scale, and icon treatment.
- Anti-slop: passed. No purple glow, cream canvas, nested cards, centered mesh hero, or three equal feature cards.
- State coverage: passed. Empty, loading, partial, success, and error are implemented.
- Accessibility: passed in implementation. Focus, labels, live status, keyboard path, and reduced motion are included.
- Layout craft: passed. Split editorial hero, stat strip, two-column analysis grid, and ruled source list.
- Cognitive load: passed. One primary action and three visible decisions.
- Self-critique: distinctiveness 4, hierarchy 4, consistency 4, accessibility 3, state coverage 3, copy 4, restraint 4, motion 3. Total 29/32.

## Build handoff

Target: static SPA with a small Node HTTP API.

Implement exactly this spec. Theme the interface with the locked tokens. Do not redesign the component vocabulary.
