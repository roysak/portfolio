import { CategorizedArticle, CODE_LABELS } from "./components";
import type { TopicItem } from "./components";

interface CSSFeature {
  name: string;
  category: string;
  description: string;
  syntax: string;
  notes: string;
  returns: string;
  variations: { title: string; code: string }[];
}

const cssData: CSSFeature[] = [
  // ── Layout ───────────────────────────────────────────────────────────────
  {
    name: "display",
    category: "Layout",
    description: "Sets the layout mode for an element — controls how it and its children participate in the formatting context.",
    syntax: "display: block | inline | inline-block | flex | inline-flex\n       | grid | inline-grid | none | contents;",
    notes: "`none` removes the element from the document flow (unlike `visibility: hidden`). `contents` makes the element act as if it weren't there, promoting its children into its place.",
    returns: "Establishes the element's formatting context.",
    variations: [
      { title: "Flex container", code: ".container {\n  display: flex;\n  gap: 1rem;\n}" },
      { title: "Grid container", code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}" },
      { title: "Hide element", code: ".hidden { display: none; }" },
    ],
  },
  {
    name: "Flexbox",
    category: "Layout",
    description: "One-dimensional layout system for distributing space and aligning items along a main axis and a cross axis.",
    syntax: "/* Container */\nflex-direction: row | column | row-reverse | column-reverse;\njustify-content: flex-start | center | space-between | space-around | space-evenly;\nalign-items: stretch | flex-start | center | flex-end | baseline;\nflex-wrap: nowrap | wrap;\ngap: <row-gap> <column-gap>;\n\n/* Child */\nflex: <grow> <shrink> <basis>;\nalign-self: auto | flex-start | center | flex-end | stretch;\norder: <integer>;",
    notes: "`flex: 1` is shorthand for `flex: 1 1 0%` — grow, shrink, and ignore intrinsic size. `align-content` controls multi-line cross-axis alignment (only applies when `flex-wrap: wrap`).",
    returns: "Flexible single-axis layout.",
    variations: [
      { title: "Centered element", code: ".center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}" },
      { title: "Sidebar layout", code: ".layout {\n  display: flex;\n  gap: 1rem;\n}\n.sidebar { flex: 0 0 240px; }\n.main    { flex: 1; }" },
      { title: "Wrap with gap", code: ".tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}" },
    ],
  },
  {
    name: "CSS Grid",
    category: "Layout",
    description: "Two-dimensional layout system — define rows and columns explicitly or let the browser auto-place items.",
    syntax: "grid-template-columns: <track-list>;\ngrid-template-rows:    <track-list>;\ngrid-template-areas:   \"header header\"\n                       \"sidebar main\";\ngap: <row-gap> <column-gap>;\n\n/* Child placement */\ngrid-column: <start> / <end>;\ngrid-row:    <start> / <end>;\ngrid-area:   <name>;",
    notes: "`fr` (fractional unit) divides remaining space. `minmax(min, max)` sets track size bounds. `repeat(auto-fill, minmax(200px, 1fr))` creates responsive columns without media queries.",
    returns: "Explicit two-axis grid layout.",
    variations: [
      { title: "Responsive columns", code: ".grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 1rem;\n}" },
      { title: "Named areas", code: ".layout {\n  display: grid;\n  grid-template-areas:\n    \"header header\"\n    \"sidebar main\"\n    \"footer footer\";\n}" },
      { title: "Spanning columns", code: ".hero {\n  grid-column: 1 / -1; /* span all columns */\n}" },
    ],
  },
  {
    name: "position",
    category: "Layout",
    description: "Controls how an element is positioned in the document — establishes stacking context when combined with `z-index`.",
    syntax: "position: static | relative | absolute | fixed | sticky;\ntop | right | bottom | left: <length> | auto;\nz-index: <integer> | auto;",
    notes: "`static` ignores offset properties. `absolute` is relative to the nearest positioned ancestor (non-static). `fixed` is relative to the viewport. `sticky` toggles between relative and fixed based on scroll position.",
    returns: "Determines the element's positioning context.",
    variations: [
      { title: "Absolute centering", code: ".overlay {\n  position: absolute;\n  inset: 0;\n  margin: auto;\n}" },
      { title: "Sticky header", code: ".header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}" },
      { title: "Fixed badge", code: ".badge {\n  position: fixed;\n  bottom: 1rem;\n  right: 1rem;\n}" },
    ],
  },
  {
    name: "z-index",
    category: "Layout",
    description: "Controls the stacking order of positioned elements — only works on elements with a non-static `position` or inside a flex/grid container.",
    syntax: "z-index: auto | <integer>;",
    notes: "A new stacking context is created by `position + z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate`, and others. Children can't escape their stacking context.",
    returns: "The element's stacking order within its stacking context.",
    variations: [
      { title: "Modal on top", code: ".modal    { z-index: 1000; }\n.overlay  { z-index: 999; }" },
      { title: "Isolate context", code: ".card {\n  isolation: isolate; /* create stacking context */\n}" },
    ],
  },
  {
    name: "aspect-ratio",
    category: "Layout",
    description: "Sets an explicit width-to-height ratio for an element — the browser calculates the missing dimension automatically.",
    syntax: "aspect-ratio: <width> / <height>;\naspect-ratio: 16 / 9;\naspect-ratio: 1;      /* square */\naspect-ratio: auto;   /* use intrinsic ratio */",
    notes: "When both `width` and `height` are set explicitly, `aspect-ratio` is ignored. Particularly useful for responsive embeds, image placeholders, and cards where height should derive from width.",
    returns: "An intrinsic size ratio that maintains proportions as the element resizes.",
    variations: [
      { title: "Responsive video embed", code: ".video-wrapper {\n  aspect-ratio: 16 / 9;\n  width: 100%;\n}\n.video-wrapper iframe {\n  width: 100%;\n  height: 100%;\n}" },
      { title: "Square avatar", code: ".avatar {\n  width: 3rem;\n  aspect-ratio: 1;\n  border-radius: 50%;\n  object-fit: cover;\n}" },
      { title: "Card with ratio", code: ".card-thumb {\n  aspect-ratio: 4 / 3;\n  overflow: hidden;\n}" },
    ],
  },
  {
    name: "scroll-snap",
    category: "Layout",
    description: "Snaps the scroll position to defined points after scrolling stops — ideal for carousels, full-screen sections, and sliders.",
    syntax: "/* Container */\nscroll-snap-type: x mandatory | y proximity | both mandatory;\nscroll-padding: <length>;\n\n/* Children */\nscroll-snap-align: start | center | end;\nscroll-snap-stop: normal | always;",
    notes: "`mandatory` always snaps to the nearest snap point; `proximity` only snaps when close. `scroll-snap-stop: always` prevents fast-scrolling past items. Use `scroll-padding` to account for sticky headers.",
    returns: "Controlled scroll anchoring at defined snap points.",
    variations: [
      { title: "Horizontal carousel", code: ".carousel {\n  display: flex;\n  overflow-x: auto;\n  scroll-snap-type: x mandatory;\n  gap: 1rem;\n}\n.slide {\n  flex: 0 0 100%;\n  scroll-snap-align: start;\n}" },
      { title: "Full-page sections", code: ".scroll-container {\n  overflow-y: scroll;\n  scroll-snap-type: y mandatory;\n  height: 100vh;\n}\nsection {\n  height: 100vh;\n  scroll-snap-align: start;\n}" },
    ],
  },
  // ── Box Model ────────────────────────────────────────────────────────────
  {
    name: "Box Model",
    category: "Box Model",
    description: "Every element is a rectangular box: content → padding → border → margin. `box-sizing` controls how width/height are measured.",
    syntax: "box-sizing: content-box | border-box;\nwidth  | height:  <length> | % | auto | min-content | max-content | fit-content;\npadding: <top> <right> <bottom> <left>;\nmargin:  <top> <right> <bottom> <left> | auto;\nborder:  <width> <style> <color>;",
    notes: "`border-box` makes `width` include padding and border — use `*, *::before, *::after { box-sizing: border-box }` globally. Vertical margins collapse between adjacent block elements.",
    returns: "The visual size and spacing of the element.",
    variations: [
      { title: "Global border-box", code: "*, *::before, *::after {\n  box-sizing: border-box;\n}" },
      { title: "Logical shorthands", code: ".card {\n  padding-inline: 1.5rem;  /* left & right */\n  padding-block:  1rem;    /* top & bottom */\n}" },
      { title: "Auto centering", code: ".container {\n  max-width: 1200px;\n  margin-inline: auto;\n}" },
    ],
  },
  {
    name: "overflow",
    category: "Box Model",
    description: "Controls what happens when content exceeds the element's bounding box.",
    syntax: "overflow: visible | hidden | clip | scroll | auto;\noverflow-x: <value>;\noverflow-y: <value>;",
    notes: "`auto` adds scrollbars only when needed. `clip` is like `hidden` but disables scrolling programmatically. Setting `overflow` to anything other than `visible` creates a new block-formatting context.",
    returns: "Scrollable or clipped content containment.",
    variations: [
      { title: "Truncate text", code: ".truncate {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}" },
      { title: "Scroll container", code: ".scroll-x {\n  overflow-x: auto;\n  white-space: nowrap;\n}" },
    ],
  },
  {
    name: "Custom Properties",
    category: "Box Model",
    description: "CSS variables — declare reusable values with `--name` and consume them with `var()`, enabling dynamic theming.",
    syntax: ":root {\n  --color-primary: #6366f1;\n  --spacing-md: 1rem;\n}\n\n.button {\n  background: var(--color-primary);\n  padding: var(--spacing-md);\n}",
    notes: "Custom properties cascade and inherit like regular properties. `var(--x, fallback)` provides a default. They can be updated at runtime via JavaScript (`el.style.setProperty('--x', value)`).",
    returns: "The computed value of the property at the point of use.",
    variations: [
      { title: "Theming with variables", code: ":root { --bg: white; --text: black; }\n[data-theme=\"dark\"] { --bg: #0f0f0f; --text: white; }" },
      { title: "Fallback value", code: "color: var(--brand-color, #6366f1);" },
      { title: "JS update", code: "el.style.setProperty('--progress', '72%');" },
    ],
  },
  // ── Typography ───────────────────────────────────────────────────────────
  {
    name: "@font-face",
    category: "Typography",
    description: "Load a custom font from a local file or remote URL and make it available as a named family throughout the stylesheet.",
    syntax: "@font-face {\n  font-family: 'MyFont';\n  src: url('font.woff2') format('woff2'),\n       url('font.woff')  format('woff');\n  font-weight: 100 900;   /* variable font range */\n  font-style:  normal;\n  font-display: swap;\n}",
    notes: "`font-display: swap` shows a fallback font immediately and swaps in the custom font once loaded — avoids invisible text. `woff2` is the most compressed format and has universal browser support. A single `@font-face` with a weight range covers variable fonts.",
    returns: "A named font family registered for use in `font-family` declarations.",
    variations: [
      { title: "Variable font", code: "@font-face {\n  font-family: 'Inter';\n  src: url('Inter.woff2') format('woff2');\n  font-weight: 100 900;\n  font-display: swap;\n}" },
      { title: "Google Fonts import", code: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');\n\nbody { font-family: 'Inter', sans-serif; }" },
      { title: "Local fallback first", code: "@font-face {\n  font-family: 'Brand';\n  src: local('BrandFont'),\n       url('brand.woff2') format('woff2');\n}" },
    ],
  },
  {
    name: "font",
    category: "Typography",
    description: "Controls typeface, size, weight, style, and line height — the shorthand combines all font sub-properties.",
    syntax: "font-family: <family-name>, <generic>;\nfont-size:   <length> | <percentage> | clamp(min, val, max);\nfont-weight: 100–900 | bold | normal;\nfont-style:  normal | italic | oblique;\nline-height: <number> | <length> | normal;\nfont: <style> <weight> <size>/<line-height> <family>;",
    notes: "Prefer unitless `line-height` (e.g. `1.5`) — it scales with the element's font size. Use `clamp()` for fluid typography that scales with the viewport without media queries.",
    returns: "The computed font metrics for the element.",
    variations: [
      { title: "Fluid type scale", code: "h1 {\n  font-size: clamp(1.75rem, 4vw, 3rem);\n  line-height: 1.2;\n}" },
      { title: "System font stack", code: "body {\n  font-family: system-ui, -apple-system, sans-serif;\n}" },
      { title: "Variable font weight", code: "@import url('...');\nbody { font-weight: 450; }" },
    ],
  },
  {
    name: "text",
    category: "Typography",
    description: "Fine-tunes text rendering — alignment, decoration, transformation, spacing, and overflow handling.",
    syntax: "text-align:      left | center | right | justify;\ntext-decoration: none | underline | line-through | wavy underline;\ntext-transform:  none | uppercase | lowercase | capitalize;\ntext-indent:     <length>;\nletter-spacing:  <length>;\nword-spacing:    <length>;\nwhite-space:     normal | nowrap | pre | pre-wrap;",
    notes: "`text-decoration` is shorthand for `text-decoration-line`, `-style`, `-color`, and `-thickness`. Use `text-underline-offset` to fine-tune underline position.",
    returns: "Visual presentation of the text content.",
    variations: [
      { title: "Underline offset", code: "a {\n  text-underline-offset: 3px;\n  text-decoration-thickness: 1px;\n}" },
      { title: "Nowrap ellipsis", code: ".label {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}" },
      { title: "Multi-line clamp", code: ".excerpt {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}" },
    ],
  },
  {
    name: "color & background",
    category: "Typography",
    description: "Sets foreground and background colors — supports named colors, hex, rgb(), hsl(), oklch(), and gradients.",
    syntax: "color:              <color>;\nbackground-color:   <color>;\nbackground-image:   url() | linear-gradient() | radial-gradient();\nbackground-size:    cover | contain | <length>;\nbackground-position: center | top left | <x> <y>;\nbackground-repeat:  no-repeat | repeat;",
    notes: "Prefer `oklch()` for perceptually uniform color manipulation. `currentColor` inherits the element's `color` value. The shorthand `background` accepts all sub-properties in one declaration.",
    returns: "The rendered color and background of the element.",
    variations: [
      { title: "oklch color", code: ".button {\n  background-color: oklch(55% 0.18 260);\n  color: white;\n}" },
      { title: "Gradient", code: ".hero {\n  background: linear-gradient(135deg, #6366f1, #8b5cf6);\n}" },
      { title: "Cover image", code: ".banner {\n  background: url('hero.jpg') center/cover no-repeat;\n}" },
    ],
  },
  // ── Visual ───────────────────────────────────────────────────────────────
  {
    name: "border & outline",
    category: "Visual",
    description: "Draws lines around elements — `border` is part of the box model while `outline` sits outside and doesn't affect layout.",
    syntax: "border:        <width> <style> <color>;\nborder-radius: <length> | <percentage>;\nborder-image:  <source> <slice> / <width>;\n\noutline:       <width> <style> <color>;\noutline-offset: <length>;",
    notes: "`outline` doesn't affect layout and is commonly used for focus rings — never remove it without providing an accessible replacement. Use `border-radius: 50%` for circles.",
    returns: "Decorative or interactive border strokes.",
    variations: [
      { title: "Focus ring", code: ":focus-visible {\n  outline: 2px solid #6366f1;\n  outline-offset: 3px;\n}" },
      { title: "Circle", code: ".avatar {\n  border-radius: 50%;\n}" },
      { title: "Gradient border", code: ".card {\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  outline: 2px solid oklch(55% 0.18 260);\n  outline-offset: -2px;\n}" },
    ],
  },
  {
    name: "shadow",
    category: "Visual",
    description: "Adds drop shadows to elements (`box-shadow`) or text (`text-shadow`) — multiple shadows can be layered with commas.",
    syntax: "box-shadow:  <x> <y> <blur> <spread> <color> | inset ...;\ntext-shadow: <x> <y> <blur> <color>;",
    notes: "`inset` places the shadow inside the element. Shadows don't affect layout. Use `filter: drop-shadow()` for shadows that follow non-rectangular shapes (e.g., PNGs with transparency).",
    returns: "A layered shadow effect outside or inside the element.",
    variations: [
      { title: "Soft elevation", code: ".card {\n  box-shadow:\n    0 1px 3px rgb(0 0 0 / 0.1),\n    0 4px 12px rgb(0 0 0 / 0.08);\n}" },
      { title: "Inset (inner glow)", code: ".input:focus {\n  box-shadow: inset 0 0 0 2px #6366f1;\n}" },
      { title: "PNG drop shadow", code: ".icon {\n  filter: drop-shadow(2px 4px 6px rgb(0 0 0 / 0.3));\n}" },
    ],
  },
  {
    name: "opacity & visibility",
    category: "Visual",
    description: "Controls whether an element is visible — `opacity` fades it, `visibility` hides it while preserving space, `display: none` removes it entirely.",
    syntax: "opacity:    0–1;\nvisibility: visible | hidden | collapse;",
    notes: "`opacity` applies to the entire element including children and cannot be un-inherited. For just the background, use `rgb()` / `oklch()` with an alpha channel on `background-color` instead.",
    returns: "The element's visual transparency.",
    variations: [
      { title: "Fade with opacity", code: ".tooltip {\n  opacity: 0;\n  transition: opacity 200ms;\n}\n.tooltip.visible { opacity: 1; }" },
      { title: "Semi-transparent bg", code: ".overlay {\n  background-color: rgb(0 0 0 / 0.5);\n}" },
    ],
  },
  {
    name: "filter & backdrop-filter",
    category: "Visual",
    description: "Apply graphical effects (blur, brightness, contrast, grayscale) to an element or to everything behind it.",
    syntax: "filter: blur(<px>) | brightness(%) | contrast(%) | grayscale(%)\n      | saturate(%) | hue-rotate(deg) | drop-shadow(...);\n\nbackdrop-filter: blur(<px>) | brightness(%) | ...;",
    notes: "`filter` affects the element itself; `backdrop-filter` affects what's behind it (requires the element to have a background or be semi-transparent). Creates a stacking context.",
    returns: "A composited visual effect layer.",
    variations: [
      { title: "Glassmorphism", code: ".glass {\n  background: rgb(255 255 255 / 0.1);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgb(255 255 255 / 0.2);\n}" },
      { title: "Grayscale on hover", code: ".photo { filter: grayscale(100%); }\n.photo:hover { filter: grayscale(0%); }" },
    ],
  },
  {
    name: "clip-path",
    category: "Visual",
    description: "Clips the visible region of an element to a geometric shape or SVG path — anything outside the clip is invisible.",
    syntax: "clip-path: none\n         | inset(<top> <right> <bottom> <left> round <radius>)\n         | circle(<r> at <x> <y>)\n         | ellipse(<rx> <ry> at <x> <y>)\n         | polygon(<x1> <y1>, <x2> <y2>, ...)\n         | path('<svg-path>');",
    notes: "`clip-path` is animatable — transitioning between polygon shapes creates smooth morph effects. The clipped-away area still occupies space in the layout (like `overflow: hidden`). Pairs well with `transform` for reveal animations.",
    returns: "A clipped rendering region for the element.",
    variations: [
      { title: "Circle reveal", code: ".avatar {\n  clip-path: circle(50%);\n}" },
      { title: "Diagonal section cut", code: ".hero {\n  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);\n}" },
      { title: "Animated reveal", code: ".reveal {\n  clip-path: inset(0 100% 0 0);\n  transition: clip-path 500ms ease;\n}\n.reveal.visible {\n  clip-path: inset(0 0% 0 0);\n}" },
    ],
  },
  {
    name: "mix-blend-mode",
    category: "Visual",
    description: "Controls how an element's pixels blend with the content behind it — similar to layer blending in Photoshop.",
    syntax: "mix-blend-mode: normal | multiply | screen | overlay\n              | darken | lighten | color-dodge | color-burn\n              | hard-light | soft-light | difference\n              | exclusion | hue | saturation | color | luminosity;\n\nisolation: isolate; /* contain blending to a group */",
    notes: "`multiply` darkens (good for logos over photos), `screen` lightens, `overlay` boosts contrast. Use `isolation: isolate` on a parent to prevent blending from leaking outside the component.",
    returns: "A composited blend of the element with its backdrop.",
    variations: [
      { title: "Text over image", code: ".title {\n  mix-blend-mode: overlay;\n  color: white;\n}" },
      { title: "Duotone effect", code: ".photo-wrapper {\n  background: #6366f1;\n  isolation: isolate;\n}\n.photo-wrapper img {\n  mix-blend-mode: luminosity;\n}" },
      { title: "Multiply logo", code: ".logo-on-bg {\n  mix-blend-mode: multiply;\n}" },
    ],
  },
  {
    name: "cursor & pointer-events",
    category: "Visual",
    description: "`cursor` changes the mouse cursor appearance; `pointer-events` controls whether an element can be the target of mouse/touch interactions.",
    syntax: "cursor: auto | default | pointer | grab | grabbing\n      | not-allowed | crosshair | text | wait\n      | url('icon.png') <x> <y>, auto;\n\npointer-events: auto | none;",
    notes: "`pointer-events: none` lets clicks pass through an overlay element to whatever is beneath it. It also disables `:hover` and `:active` states. `cursor: url()` loads a custom cursor image with a hotspot offset.",
    returns: "Mouse cursor appearance and hit-testing behavior.",
    variations: [
      { title: "Drag handle", code: ".handle {\n  cursor: grab;\n}\n.handle:active {\n  cursor: grabbing;\n}" },
      { title: "Disabled state", code: ".btn:disabled {\n  cursor: not-allowed;\n  pointer-events: none;\n  opacity: 0.5;\n}" },
      { title: "Click-through overlay", code: ".tooltip-layer {\n  pointer-events: none; /* pass clicks to content below */\n}" },
    ],
  },
  // ── Transforms & Animation ───────────────────────────────────────────────
  {
    name: "transform",
    category: "Animation",
    description: "Apply 2D/3D spatial transformations — translate, scale, rotate, and skew — without affecting layout.",
    syntax: "transform: translate(<x>, <y>)\n          scale(<x>, <y>)\n          rotate(<angle>)\n          skew(<x-angle>, <y-angle>)\n          matrix(...);\ntransform-origin: <x> <y>;\ntransform-box:    fill-box | border-box;",
    notes: "Transforms are composited on the GPU and don't trigger layout recalculation — prefer them over changing `top`/`left` for animations. Multiple functions are applied right to left.",
    returns: "A transformed visual position without affecting document flow.",
    variations: [
      { title: "Center with translate", code: ".centered {\n  position: absolute;\n  top: 50%; left: 50%;\n  transform: translate(-50%, -50%);\n}" },
      { title: "Scale on hover", code: ".card:hover {\n  transform: scale(1.03);\n}" },
      { title: "Rotate icon", code: ".chevron.open {\n  transform: rotate(180deg);\n}" },
    ],
  },
  {
    name: "transition",
    category: "Animation",
    description: "Smoothly interpolate between two CSS property states over a defined duration and easing curve.",
    syntax: "transition: <property> <duration> <easing> <delay>;\ntransition: all 200ms ease;\ntransition: opacity 150ms ease, transform 200ms ease-out;",
    notes: "Only animatable properties can transition. `transition: all` is convenient but can cause unintended performance hits — prefer listing specific properties. Use `ease-out` for elements entering the screen.",
    returns: "An animated interpolation between two property values.",
    variations: [
      { title: "Button hover", code: ".btn {\n  transition: background-color 150ms ease, box-shadow 150ms ease;\n}\n.btn:hover { background-color: #4f46e5; }" },
      { title: "Fade in", code: ".modal {\n  opacity: 0;\n  transition: opacity 200ms ease;\n}\n.modal.open { opacity: 1; }" },
    ],
  },
  {
    name: "@keyframes & animation",
    category: "Animation",
    description: "Define multi-step animations with `@keyframes` and apply them with the `animation` shorthand.",
    syntax: "@keyframes name {\n  from { /* start */ }\n  to   { /* end   */ }\n  50%  { /* midpoint */ }\n}\n\nanimation: <name> <duration> <easing> <delay>\n           <iteration-count> <direction> <fill-mode>;",
    notes: "`animation-fill-mode: forwards` keeps the final state after the animation ends. `animation-iteration-count: infinite` loops forever. Prefer `prefers-reduced-motion` media query to disable motion for users who request it.",
    returns: "A keyframe-based animation applied to the element.",
    variations: [
      { title: "Spin loader", code: "@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.loader {\n  animation: spin 1s linear infinite;\n}" },
      { title: "Fade in up", code: "@keyframes fadeUp {\n  from { opacity: 0; transform: translateY(16px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n.card { animation: fadeUp 300ms ease-out both; }" },
      { title: "Reduced motion", code: "@media (prefers-reduced-motion: reduce) {\n  * { animation-duration: 0.01ms !important; }\n}" },
    ],
  },
  {
    name: "will-change",
    category: "Animation",
    description: "Hints to the browser that a property is about to change, allowing it to create a compositor layer ahead of time and avoid mid-animation jank.",
    syntax: "will-change: auto | transform | opacity | scroll-position\n           | <custom-ident>;",
    notes: "Use sparingly — each `will-change` declaration consumes GPU memory. Apply it only just before an animation starts (via JS) and remove it afterward. Over-using it can actually hurt performance. Prefer it over the `translateZ(0)` hack.",
    returns: "A browser optimization hint for upcoming property changes.",
    variations: [
      { title: "Add before animation", code: "el.addEventListener('mouseenter', () => {\n  el.style.willChange = 'transform';\n});\nel.addEventListener('animationend', () => {\n  el.style.willChange = 'auto';\n});" },
      { title: "CSS trigger on hover", code: ".card {\n  transition: transform 200ms ease;\n}\n.card:hover {\n  will-change: transform;\n  transform: scale(1.03);\n}" },
    ],
  },
  // ── Selectors ────────────────────────────────────────────────────────────
  {
    name: "Pseudo-classes",
    category: "Selectors",
    description: "Target elements based on their state, position, or relationship to other elements without adding extra markup.",
    syntax: ":hover  :focus  :focus-visible  :active  :visited\n:checked  :disabled  :required  :valid  :invalid\n:first-child  :last-child  :nth-child(n)  :only-child\n:not(selector)  :is(...)  :where(...)  :has(...)",
    notes: "`:focus-visible` only shows a focus ring for keyboard navigation — prefer it over `:focus` for button/link styles. `:has()` is a relational selector — it selects a parent based on its children (broad browser support since 2023).",
    returns: "A matched set of elements in the specified state.",
    variations: [
      { title: ":nth-child", code: "li:nth-child(odd)  { background: #f5f5f5; }\nli:nth-child(3n+1) { font-weight: bold; }" },
      { title: ":has() parent select", code: ".card:has(img) {\n  padding-top: 0; /* card contains an image */\n}" },
      { title: ":is() grouping", code: ":is(h1, h2, h3) > a { color: inherit; }" },
    ],
  },
  {
    name: "Pseudo-elements",
    category: "Selectors",
    description: "Insert generated content or style specific parts of an element — `::before` / `::after` are the most common.",
    syntax: "::before  ::after       /* generated content */\n::placeholder           /* input placeholder text */\n::selection             /* highlighted text */\n::first-line            /* first line of a block */\n::marker                /* list item marker */",
    notes: "`::before` and `::after` require `content: \"\"` (even empty string). They are inline by default. Use `content: none` to remove generated content. `::selection` only accepts a limited set of properties.",
    returns: "A virtual element or sub-part of the matched element.",
    variations: [
      { title: "Decorative rule", code: ".heading::after {\n  content: \"\";\n  display: block;\n  width: 3rem;\n  height: 3px;\n  background: #6366f1;\n  margin-top: 0.5rem;\n}" },
      { title: "Custom selection", code: "::selection {\n  background: #6366f1;\n  color: white;\n}" },
      { title: "Custom marker", code: "li::marker { color: #6366f1; font-size: 1.2em; }" },
    ],
  },
  {
    name: "@media queries",
    category: "Selectors",
    description: "Apply styles conditionally based on viewport size, device capabilities, or user preferences.",
    syntax: "@media (min-width: 768px) { ... }\n@media (max-width: 767px) { ... }\n@media (prefers-color-scheme: dark) { ... }\n@media (prefers-reduced-motion: reduce) { ... }\n@media (hover: hover) { ... }",
    notes: "Prefer `min-width` (mobile-first) over `max-width`. Use the `@layer` rule to manage cascade order across breakpoints. `prefers-color-scheme` and `prefers-reduced-motion` improve accessibility.",
    returns: "A conditional rule block applied when the media condition is true.",
    variations: [
      { title: "Mobile-first breakpoints", code: "/* base: mobile */\n.grid { grid-template-columns: 1fr; }\n\n@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n@media (min-width: 1024px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}" },
      { title: "Dark mode", code: "@media (prefers-color-scheme: dark) {\n  :root { --bg: #0f0f0f; --text: #f5f5f5; }\n}" },
    ],
  },
  {
    name: "Attribute selectors",
    category: "Selectors",
    description: "Match elements based on the presence or value of their HTML attributes — without needing extra classes.",
    syntax: "[attr]          /* has the attribute */\n[attr=\"value\"]  /* exact match */\n[attr^=\"val\"]   /* starts with */\n[attr$=\"val\"]   /* ends with */\n[attr*=\"val\"]   /* contains */\n[attr~=\"val\"]   /* word in space-separated list */\n[attr|=\"val\"]   /* exactly or val- prefix */",
    notes: "Add `i` flag for case-insensitive matching: `[type=\"text\" i]`. Attribute selectors have the same specificity as classes (0,1,0). Useful for styling elements by data attributes without adding presentational classes.",
    returns: "Elements matching the specified attribute condition.",
    variations: [
      { title: "External links", code: "a[href^=\"http\"]::after {\n  content: ' ↗';\n  font-size: 0.8em;\n}" },
      { title: "File type icons", code: "a[href$=\".pdf\"]  { --icon: '📄'; }\na[href$=\".zip\"]  { --icon: '📦'; }" },
      { title: "Data attribute theme", code: "[data-variant=\"primary\"] {\n  background: var(--color-primary);\n}\n[data-variant=\"ghost\"] {\n  background: transparent;\n  border: 1px solid currentColor;\n}" },
    ],
  },
  {
    name: "@supports",
    category: "Selectors",
    description: "Apply styles conditionally based on whether the browser supports a given CSS feature — the CSS equivalent of feature detection.",
    syntax: "@supports (property: value) { ... }\n@supports not (property: value) { ... }\n@supports (display: grid) and (gap: 1rem) { ... }\n@supports selector(:has(a)) { ... }",
    notes: "`@supports` checks parsing, not rendering quality — the browser may support the syntax but implement it poorly. Use it for progressive enhancement: write a baseline, then layer improvements inside `@supports`.",
    returns: "A conditional rule block applied when the feature is supported.",
    variations: [
      { title: "Grid with fallback", code: ".layout { display: flex; }\n\n@supports (display: grid) {\n  .layout {\n    display: grid;\n    grid-template-columns: 1fr 3fr;\n  }\n}" },
      { title: "Container query guard", code: "@supports (container-type: inline-size) {\n  .card { container-type: inline-size; }\n}" },
      { title: ":has() guard", code: "@supports selector(:has(a)) {\n  .nav:has(.active) { background: #f5f5f5; }\n}" },
    ],
  },
  {
    name: "@container",
    category: "Selectors",
    description: "Apply styles based on the size of a parent container rather than the viewport — enables truly reusable, context-aware components.",
    syntax: "/* Define the container */\n.wrapper {\n  container-type: inline-size;\n  container-name: card;       /* optional name */\n}\n\n/* Query it */\n@container (min-width: 400px) { ... }\n@container card (min-width: 600px) { ... }",
    notes: "An element cannot query its own container — it queries an ancestor. `container-type: inline-size` is the most common; `size` also tracks block axis. Named containers let nested components target a specific ancestor.",
    returns: "A conditional rule block applied when the container matches the size condition.",
    variations: [
      { title: "Responsive card", code: ".card-wrapper {\n  container-type: inline-size;\n}\n\n.card { flex-direction: column; }\n\n@container (min-width: 480px) {\n  .card { flex-direction: row; }\n}" },
      { title: "Named container", code: ".sidebar {\n  container: sidebar / inline-size;\n}\n\n@container sidebar (max-width: 300px) {\n  .widget { font-size: 0.875rem; }\n}" },
    ],
  },
  {
    name: "@layer",
    category: "Selectors",
    description: "Explicitly order the cascade into named layers — rules in later layers win over earlier ones regardless of specificity.",
    syntax: "@layer reset, base, components, utilities;\n\n@layer base {\n  a { color: blue; }\n}\n\n@layer utilities {\n  .text-red { color: red; }\n}",
    notes: "Unlayered styles always win over layered ones. This makes it safe to include third-party CSS in a low-priority layer without specificity battles. Combine with `@import` for library isolation.",
    returns: "A cascade layer that controls style precedence independently of specificity.",
    variations: [
      { title: "Third-party isolation", code: "@layer vendor;\n@import url('library.css') layer(vendor);\n\n@layer vendor { /* low priority */ }\n@layer app    { /* wins over vendor */ }" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Layout":    "bg-primary-100 text-primary-700",
  "Box Model": "bg-emerald-100 text-emerald-700",
  "Typography":"bg-amber-100 text-amber-700",
  "Visual":    "bg-violet-100 text-violet-700",
  "Animation": "bg-rose-100 text-rose-700",
  "Selectors": "bg-cyan-100 text-cyan-700",
};

const items: TopicItem[] = cssData.map((f) => ({
  name: f.name,
  category: f.category,
  description: f.description,
  syntax: f.syntax,
  notes: f.notes,
  returns: f.returns,
  variations: f.variations,
}));

export default function CSSCheatsheet() {
  return (
    <CategorizedArticle
      items={items}
      badgeColors={categoryColor}
      legendLabel="Category"
      labels={CODE_LABELS}
      countLabel="properties"
    />
  );
}
