---
project: Perspectify
register: product
aesthetic_direction: technical / utilitarian
color_strategy: committed
design_system: DaisyUI 5 with custom perspectify theme
design_variance: 7
motion_intensity: 3
visual_density: 6
---

## Design Read

An evidence operating system for curious people: dark command-center focus, visible agent work, and a short route to understanding.

## Signature

The Live Brief Console is the product's signature: a compact research run with source count, claim count, and agent stages visible beside the learner's question. It turns invisible AI work into a calm, inspectable surface.

Every screen must read as the same product if placed side by side.

## Color (locked)

Dark tinted neutrals lean toward ink-blue, while the single accent is a warm signal orange reserved for the primary action and active evidence markers.

| role | OKLCH | hex | use |
|---|---|---|---|
| background | 0.145 0.020 245 | #151A22 | page canvas |
| surface | 0.185 0.024 245 | #1C232D | primary panels |
| elevated | 0.225 0.025 245 | #252E3A | controls and source rows |
| text | 0.965 0.012 245 | #F2F4F7 | headings and body |
| muted | 0.720 0.035 245 | #AAB4C2 | supporting copy |
| subtle | 0.570 0.030 245 | #7D8999 | metadata |
| border | 0.320 0.035 245 | #414C5D | rules and fields |
| accent | 0.680 0.165 48 | #D75B2A | primary action, active marker |
| success | 0.650 0.120 145 | #277A58 | verified / positive |
| warning | 0.720 0.130 83 | #996F16 | needs context |
| danger | 0.590 0.160 25 | #B54131 | errors |
| info | 0.560 0.095 245 | #3D668D | neutral information |

Text on background is approximately 13:1. Muted on background is approximately 6:1. Accent is used with white text for buttons and passes the 3:1 UI contrast requirement.

## Type (locked)

| role | family | use | notes |
|---|---|---|---|
| display | Newsreader, Georgia, serif | main title and brief title | one human note inside a technical system |
| body | Atkinson Hyperlegible, system fallback, sans-serif | reading content | 65–75ch measure, generous line-height |
| utility | IBM Plex Mono, ui-monospace | labels, timestamps, metrics | uppercase sparingly |

## Scales (locked)

- Spacing: 4px base rhythm. Allowed steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- Radius: `sm 4px`, `md 8px`, `lg 12px`, `xl 16px`, `full 9999px`.
- Motion: 120ms / 300ms / 500ms with `cubic-bezier(0.16, 1, 0.3, 1)`. One staggered reveal only. Reduced-motion users receive no transforms.
- Layout: 12-column desktop grid, 1-column mobile, max-width 1280px. Hero uses an asymmetric copy plus console split. Product sections use a bento grid and a source table, never repeated equal cards.

## Voice

- Register: plain, confident, precise, encouraging.
- Action vocabulary: `Research`, `Read`, `Open source`, `Try again`.
- Avoid hype, vague promises, em-dash punctuation, and artificial certainty.

## Iconography

Use inline line icons with 1.5px strokes and rounded caps. Icons clarify actions; they never carry meaning alone. DaisyUI supplies behavior and state primitives; custom CSS supplies the product identity.
