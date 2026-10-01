---
name: Luminescent Precision
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c7c4d8'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#918fa1'
  outline-variant: '#464555'
  surface-tint: '#c3c0ff'
  primary: '#c3c0ff'
  on-primary: '#1d00a5'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#4d44e3'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#00678c'
  on-tertiary-container: '#b2e1ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-sm: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-performance, precision-first environment tailored for high-agency knowledge workers, AI engineers, and modern product builders. The visual narrative combines the utilitarian minimalism of developer-centric tools like Linear and Raycast with the atmospheric, kinetic depth found in cutting-edge digital agency design. 

The emotional tone balances absolute control with technological wonder. The aesthetic is atmospheric dark-mode glassmorphism anchored by dense, deliberate information architecture. Surfaces feel like polished dark obsidian layered in zero gravity: crisp translucent substrates suspended over deep cosmic voids, activated by focused beams of spectral indigo and violet light. Every micro-interaction is razor-sharp, communicating instant response times, low latency, and deterministic power.

## Colors

The palette is engineered around an ultra-deep canvas to minimize visual fatigue while amplifying semantic luminance.

- **Canvas & Base**: The fundamental canvas rests on `#0B0B14` (Deep Midnight). Surfaces sit above this ground using `#121222` modulated with varying degrees of alpha transparency to support glassmorphic layering.
- **Accents & Light Sources**: Primary `#4F46E5` (Electric Indigo) and Secondary `#7C3AED` (Vibrant Violet) operate both as functional indicators and dynamic linear gradients (typically angled at 135°). Tertiary `#38BDF8` (Spectral Cyan) is reserved for high-priority telemetry, AI synthesis states, and focused data highlights.
- **Neutrals & Legibility**: Neutral `#94A3B8` (Muted Slate) anchors secondary metadata and structural borders, stepping up to `#F8FAFC` for high-contrast primary typographic headlines and dropping to `#475569` for deactivated structural paths.
- **Gradients & Glowing Highlights**: Gradients do not serve as decorative fills; they simulate internal luminescence behind hairline strokes and directional illumination across cards.

## Typography

The typographic hierarchy utilizes tension between the technical, geometric character of Space Grotesk for display roles and the neutral clarity of Inter for sustained density.

- **Headlines**: Space Grotesk with negative tracking creates punchy, impactful focal points. At display scales, strokes remain tight and structural.
- **Body & Interface**: Inter handles conversational text, logs, and dense metric arrays, prioritizing readability at 12px to 16px.
- **Monospace Elements**: JetBrains Mono is strictly designated for keybindings, system tokens, latency metrics, and algorithmic readouts.
- **Tracking & Proportion**: Tight tracking is mandatory on all display styles above 24px (`-0.02em` to `-0.04em`), while micro-labels utilize wide letter-spacing (`0.08em`) and full uppercase transformations for contrast against muted surfaces.

## Layout & Spacing

The layout is constructed on an adaptable 12-column fluid grid built upon an immutable 4px/8px incremental base. 

- **Grid Architecture**: 
  - **Desktop (1280px+)**: 12 columns, 24px (`gutter`) gutters, 48px (`margin`) outer canvas margin, with a max container limit of 1440px for operational dashboards and marketing canvases.
  - **Tablet (768px - 1279px)**: 8 columns, 16px gutters, 32px margins. Secondary panels collapse into overlay drawers.
  - **Mobile (Below 768px)**: 4 columns, 16px (`gutter-sm`) gutters, 20px (`margin-sm`) margins. Dense sidebars fold into high-speed bottom action bars.
- **Rhythm Philosophy**: Internal component spacing favors compact utility (`space-xs` and `space-sm` for grouped controls, command bars, and dense lists), while canvas macro-spacing relies on generous voids (`space-xl` and above) to evoke architectural scale and focus.

## Elevation & Depth

Visual hierarchy uses optical layering, specular border strokes, and diffuse luminescence rather than traditional dropped shadows.

- **Layer 0 (Canvas Base)**: Pure `#0B0B14` matte finish, non-reactive.
- **Layer 1 (Card & Substrate)**: Semi-translucent `#121222` with an 85% alpha fill, paired with a `backdrop-filter: blur(16px)` and a precise `1px solid rgba(255, 255, 255, 0.08)` outline.
- **Layer 2 (Floating Popovers & Modals)**: `#16162A` at 90% opacity, `backdrop-filter: blur(24px)`, bounded by `1px solid rgba(255, 255, 255, 0.14)`. Shadows use an ultra-diffused atmospheric glow: `0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 30px -10px rgba(79, 70, 229, 0.15)`.
- **Specular Edge Lighting**: Interactive cards feature an inner radial stroke or top-edge highlight using a gradient stroke (`rgba(255, 255, 255, 0.2)` fading to `rgba(255, 255, 255, 0.02)`), simulating light striking top bevels.
- **Active Glow Elevation**: Hovered interactive elements do not lift along the Z-axis; instead, their edge strokes brighten to `rgba(124, 58, 237, 0.6)` and project a localized radial blur of 20px with 20% opacity matching the primary or secondary accent.

## Shapes

The geometry strikes a balance between sleek engineering and humanized software surfaces.

- **Primary Geometry (`roundedness: 2`)**: Main containers, data cards, context menus, and modal dialogs standardize on `0.5rem` (8px) for inner components, `1rem` (16px) for standard grouping cards, and `1.5rem` (24px) for master viewport sections.
- **Pills & Badges**: Status indicators, category chips, command pills, and key command caps deviate intentionally into fully rounded pills (`border-radius: 9999px`) to create an immediate visual contrast against structural grid lines.
- **Form Controls**: Text fields, dropdown toggles, and command inputs maintain unified 8px radii, matching the inner rounding of cards to preserve strict nested concentricity.

## Components

### Buttons
- **Primary**: Solid linear gradient fill from `#4F46E5` to `#7C3AED`. Text is `#FFFFFF`, 14px Medium. Bounded by a razor-thin internal glow (`inset 0 1px 0 rgba(255, 255, 255, 0.3)`). Hover states trigger an ambient violet shadow (`0 0 20px rgba(124, 58, 237, 0.4)`).
- **Secondary / Glass**: `#121222` at 60% opacity with `backdrop-filter: blur(8px)`, framed by `1px solid rgba(255, 255, 255, 0.08)`. Hover prompts stroke illumination to `rgba(255, 255, 255, 0.2)` and text shift from `#94A3B8` to `#F8FAFC`.
- **Command / Key Action**: Minimal flat button carrying right-aligned monospace badge chips indicating shortcuts (e.g., `⌘K`).

### Chips & Pill Badges
- Continuous pill shape (`rounded-full`). Composed of a subtle tinted fill (`rgba(79, 70, 229, 0.12)`), a 1px border (`rgba(79, 70, 229, 0.3)`), and high-contrast text (`#818CF8`). Often preceded by a 6px pulsating status dot.

### Lists & Data Rows
- Minimal borders (`border-b: 1px solid rgba(255, 255, 255, 0.04)`). Row interaction features a smooth transition to an ambient background wash of `rgba(255, 255, 255, 0.03)` with an instant zero-latency cursor response.

### Form Inputs & Command Palette
- **Text Inputs**: Height 40px (compact 32px for filters). Surface fill `rgba(18, 18, 34, 0.6)` with `1px solid rgba(255, 255, 255, 0.08)`. Focus states trigger an immediate border transition to `#4F46E5` accompanied by an exterior ring: `0 0 0 1px #4F46E5, 0 0 16px rgba(79, 70, 229, 0.25)`.
- **Checkboxes & Radios**: 16px geometric containers. Inactive state: `rgba(255, 255, 255, 0.05)` fill with `1px solid rgba(255, 255, 255, 0.15)`. Checked state: solid `#4F46E5` fill with a crisp white 1.5px checkmark icon.

### Cards
- Surface: `#121222` at 85% opacity, `backdrop-filter: blur(16px)`, `1px solid rgba(255, 255, 255, 0.08)`. 
- Radii: 16px (`rounded-lg`). Padding: 24px (`space-lg`).
- Optional glowing border state: `linear-gradient` border treatment dynamically reflecting cursor coordinates.

### Specialized AI & Pro-SaaS Components
- **Prompt Input Box**: Large elevated command node (56px+ height) featuring dynamic multi-color border gradients on active synthesis, trailing action pills (model selectors, token counters), and instant keyboard submission.
- **Latency / Stream Ticker**: Pill-shaped telemetry tags rendering animated pulse dots next to monospaced tokens per second (e.g., `94 tok/s | 18ms`).