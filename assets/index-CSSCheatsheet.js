import{t as e}from"./index-jsx-runtime.js";import{i as t,n}from"./index-components.js";var r=e(),i=[{name:`display`,category:`Layout`,description:`Sets the layout mode for an element — controls how it and its children participate in the formatting context.`,syntax:`display: block | inline | inline-block | flex | inline-flex
       | grid | inline-grid | none | contents;`,notes:"`none` removes the element from the document flow (unlike `visibility: hidden`). `contents` makes the element act as if it weren't there, promoting its children into its place.",returns:`Establishes the element's formatting context.`,variations:[{title:`Flex container`,code:`.container {
  display: flex;
  gap: 1rem;
}`},{title:`Grid container`,code:`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}`},{title:`Hide element`,code:`.hidden { display: none; }`}]},{name:`Flexbox`,category:`Layout`,description:`One-dimensional layout system for distributing space and aligning items along a main axis and a cross axis.`,syntax:`/* Container */
flex-direction: row | column | row-reverse | column-reverse;
justify-content: flex-start | center | space-between | space-around | space-evenly;
align-items: stretch | flex-start | center | flex-end | baseline;
flex-wrap: nowrap | wrap;
gap: <row-gap> <column-gap>;

/* Child */
flex: <grow> <shrink> <basis>;
align-self: auto | flex-start | center | flex-end | stretch;
order: <integer>;`,notes:"`flex: 1` is shorthand for `flex: 1 1 0%` — grow, shrink, and ignore intrinsic size. `align-content` controls multi-line cross-axis alignment (only applies when `flex-wrap: wrap`).",returns:`Flexible single-axis layout.`,variations:[{title:`Centered element`,code:`.center {
  display: flex;
  justify-content: center;
  align-items: center;
}`},{title:`Sidebar layout`,code:`.layout {
  display: flex;
  gap: 1rem;
}
.sidebar { flex: 0 0 240px; }
.main    { flex: 1; }`},{title:`Wrap with gap`,code:`.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}`}]},{name:`CSS Grid`,category:`Layout`,description:`Two-dimensional layout system — define rows and columns explicitly or let the browser auto-place items.`,syntax:`grid-template-columns: <track-list>;
grid-template-rows:    <track-list>;
grid-template-areas:   "header header"
                       "sidebar main";
gap: <row-gap> <column-gap>;

/* Child placement */
grid-column: <start> / <end>;
grid-row:    <start> / <end>;
grid-area:   <name>;`,notes:"`fr` (fractional unit) divides remaining space. `minmax(min, max)` sets track size bounds. `repeat(auto-fill, minmax(200px, 1fr))` creates responsive columns without media queries.",returns:`Explicit two-axis grid layout.`,variations:[{title:`Responsive columns`,code:`.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}`},{title:`Named areas`,code:`.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}`},{title:`Spanning columns`,code:`.hero {
  grid-column: 1 / -1; /* span all columns */
}`}]},{name:`position`,category:`Layout`,description:"Controls how an element is positioned in the document — establishes stacking context when combined with `z-index`.",syntax:`position: static | relative | absolute | fixed | sticky;
top | right | bottom | left: <length> | auto;
z-index: <integer> | auto;`,notes:"`static` ignores offset properties. `absolute` is relative to the nearest positioned ancestor (non-static). `fixed` is relative to the viewport. `sticky` toggles between relative and fixed based on scroll position.",returns:`Determines the element's positioning context.`,variations:[{title:`Absolute centering`,code:`.overlay {
  position: absolute;
  inset: 0;
  margin: auto;
}`},{title:`Sticky header`,code:`.header {
  position: sticky;
  top: 0;
  z-index: 100;
}`},{title:`Fixed badge`,code:`.badge {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
}`}]},{name:`z-index`,category:`Layout`,description:"Controls the stacking order of positioned elements — only works on elements with a non-static `position` or inside a flex/grid container.",syntax:`z-index: auto | <integer>;`,notes:"A new stacking context is created by `position + z-index`, `opacity < 1`, `transform`, `filter`, `isolation: isolate`, and others. Children can't escape their stacking context.",returns:`The element's stacking order within its stacking context.`,variations:[{title:`Modal on top`,code:`.modal    { z-index: 1000; }
.overlay  { z-index: 999; }`},{title:`Isolate context`,code:`.card {
  isolation: isolate; /* create stacking context */
}`}]},{name:`aspect-ratio`,category:`Layout`,description:`Sets an explicit width-to-height ratio for an element — the browser calculates the missing dimension automatically.`,syntax:`aspect-ratio: <width> / <height>;
aspect-ratio: 16 / 9;
aspect-ratio: 1;      /* square */
aspect-ratio: auto;   /* use intrinsic ratio */`,notes:"When both `width` and `height` are set explicitly, `aspect-ratio` is ignored. Particularly useful for responsive embeds, image placeholders, and cards where height should derive from width.",returns:`An intrinsic size ratio that maintains proportions as the element resizes.`,variations:[{title:`Responsive video embed`,code:`.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
}
.video-wrapper iframe {
  width: 100%;
  height: 100%;
}`},{title:`Square avatar`,code:`.avatar {
  width: 3rem;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
}`},{title:`Card with ratio`,code:`.card-thumb {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}`}]},{name:`scroll-snap`,category:`Layout`,description:`Snaps the scroll position to defined points after scrolling stops — ideal for carousels, full-screen sections, and sliders.`,syntax:`/* Container */
scroll-snap-type: x mandatory | y proximity | both mandatory;
scroll-padding: <length>;

/* Children */
scroll-snap-align: start | center | end;
scroll-snap-stop: normal | always;`,notes:"`mandatory` always snaps to the nearest snap point; `proximity` only snaps when close. `scroll-snap-stop: always` prevents fast-scrolling past items. Use `scroll-padding` to account for sticky headers.",returns:`Controlled scroll anchoring at defined snap points.`,variations:[{title:`Horizontal carousel`,code:`.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
}
.slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}`},{title:`Full-page sections`,code:`.scroll-container {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  height: 100vh;
}
section {
  height: 100vh;
  scroll-snap-align: start;
}`}]},{name:`Box Model`,category:`Box Model`,description:"Every element is a rectangular box: content → padding → border → margin. `box-sizing` controls how width/height are measured.",syntax:`box-sizing: content-box | border-box;
width  | height:  <length> | % | auto | min-content | max-content | fit-content;
padding: <top> <right> <bottom> <left>;
margin:  <top> <right> <bottom> <left> | auto;
border:  <width> <style> <color>;`,notes:"`border-box` makes `width` include padding and border — use `*, *::before, *::after { box-sizing: border-box }` globally. Vertical margins collapse between adjacent block elements.",returns:`The visual size and spacing of the element.`,variations:[{title:`Global border-box`,code:`*, *::before, *::after {
  box-sizing: border-box;
}`},{title:`Logical shorthands`,code:`.card {
  padding-inline: 1.5rem;  /* left & right */
  padding-block:  1rem;    /* top & bottom */
}`},{title:`Auto centering`,code:`.container {
  max-width: 1200px;
  margin-inline: auto;
}`}]},{name:`overflow`,category:`Box Model`,description:`Controls what happens when content exceeds the element's bounding box.`,syntax:`overflow: visible | hidden | clip | scroll | auto;
overflow-x: <value>;
overflow-y: <value>;`,notes:"`auto` adds scrollbars only when needed. `clip` is like `hidden` but disables scrolling programmatically. Setting `overflow` to anything other than `visible` creates a new block-formatting context.",returns:`Scrollable or clipped content containment.`,variations:[{title:`Truncate text`,code:`.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}`},{title:`Scroll container`,code:`.scroll-x {
  overflow-x: auto;
  white-space: nowrap;
}`}]},{name:`Custom Properties`,category:`Box Model`,description:"CSS variables — declare reusable values with `--name` and consume them with `var()`, enabling dynamic theming.",syntax:`:root {
  --color-primary: #6366f1;
  --spacing-md: 1rem;
}

.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
}`,notes:"Custom properties cascade and inherit like regular properties. `var(--x, fallback)` provides a default. They can be updated at runtime via JavaScript (`el.style.setProperty('--x', value)`).",returns:`The computed value of the property at the point of use.`,variations:[{title:`Theming with variables`,code:`:root { --bg: white; --text: black; }
[data-theme="dark"] { --bg: #0f0f0f; --text: white; }`},{title:`Fallback value`,code:`color: var(--brand-color, #6366f1);`},{title:`JS update`,code:`el.style.setProperty('--progress', '72%');`}]},{name:`@font-face`,category:`Typography`,description:`Load a custom font from a local file or remote URL and make it available as a named family throughout the stylesheet.`,syntax:`@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2'),
       url('font.woff')  format('woff');
  font-weight: 100 900;   /* variable font range */
  font-style:  normal;
  font-display: swap;
}`,notes:"`font-display: swap` shows a fallback font immediately and swaps in the custom font once loaded — avoids invisible text. `woff2` is the most compressed format and has universal browser support. A single `@font-face` with a weight range covers variable fonts.",returns:"A named font family registered for use in `font-family` declarations.",variations:[{title:`Variable font`,code:`@font-face {
  font-family: 'Inter';
  src: url('Inter.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}`},{title:`Google Fonts import`,code:`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body { font-family: 'Inter', sans-serif; }`},{title:`Local fallback first`,code:`@font-face {
  font-family: 'Brand';
  src: local('BrandFont'),
       url('brand.woff2') format('woff2');
}`}]},{name:`font`,category:`Typography`,description:`Controls typeface, size, weight, style, and line height — the shorthand combines all font sub-properties.`,syntax:`font-family: <family-name>, <generic>;
font-size:   <length> | <percentage> | clamp(min, val, max);
font-weight: 100–900 | bold | normal;
font-style:  normal | italic | oblique;
line-height: <number> | <length> | normal;
font: <style> <weight> <size>/<line-height> <family>;`,notes:"Prefer unitless `line-height` (e.g. `1.5`) — it scales with the element's font size. Use `clamp()` for fluid typography that scales with the viewport without media queries.",returns:`The computed font metrics for the element.`,variations:[{title:`Fluid type scale`,code:`h1 {
  font-size: clamp(1.75rem, 4vw, 3rem);
  line-height: 1.2;
}`},{title:`System font stack`,code:`body {
  font-family: system-ui, -apple-system, sans-serif;
}`},{title:`Variable font weight`,code:`@import url('...');
body { font-weight: 450; }`}]},{name:`text`,category:`Typography`,description:`Fine-tunes text rendering — alignment, decoration, transformation, spacing, and overflow handling.`,syntax:`text-align:      left | center | right | justify;
text-decoration: none | underline | line-through | wavy underline;
text-transform:  none | uppercase | lowercase | capitalize;
text-indent:     <length>;
letter-spacing:  <length>;
word-spacing:    <length>;
white-space:     normal | nowrap | pre | pre-wrap;`,notes:"`text-decoration` is shorthand for `text-decoration-line`, `-style`, `-color`, and `-thickness`. Use `text-underline-offset` to fine-tune underline position.",returns:`Visual presentation of the text content.`,variations:[{title:`Underline offset`,code:`a {
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}`},{title:`Nowrap ellipsis`,code:`.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`},{title:`Multi-line clamp`,code:`.excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`}]},{name:`color & background`,category:`Typography`,description:`Sets foreground and background colors — supports named colors, hex, rgb(), hsl(), oklch(), and gradients.`,syntax:`color:              <color>;
background-color:   <color>;
background-image:   url() | linear-gradient() | radial-gradient();
background-size:    cover | contain | <length>;
background-position: center | top left | <x> <y>;
background-repeat:  no-repeat | repeat;`,notes:"Prefer `oklch()` for perceptually uniform color manipulation. `currentColor` inherits the element's `color` value. The shorthand `background` accepts all sub-properties in one declaration.",returns:`The rendered color and background of the element.`,variations:[{title:`oklch color`,code:`.button {
  background-color: oklch(55% 0.18 260);
  color: white;
}`},{title:`Gradient`,code:`.hero {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}`},{title:`Cover image`,code:`.banner {
  background: url('hero.jpg') center/cover no-repeat;
}`}]},{name:`border & outline`,category:`Visual`,description:"Draws lines around elements — `border` is part of the box model while `outline` sits outside and doesn't affect layout.",syntax:`border:        <width> <style> <color>;
border-radius: <length> | <percentage>;
border-image:  <source> <slice> / <width>;

outline:       <width> <style> <color>;
outline-offset: <length>;`,notes:"`outline` doesn't affect layout and is commonly used for focus rings — never remove it without providing an accessible replacement. Use `border-radius: 50%` for circles.",returns:`Decorative or interactive border strokes.`,variations:[{title:`Focus ring`,code:`:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 3px;
}`},{title:`Circle`,code:`.avatar {
  border-radius: 50%;
}`},{title:`Gradient border`,code:`.card {
  border: 2px solid transparent;
  background-clip: padding-box;
  outline: 2px solid oklch(55% 0.18 260);
  outline-offset: -2px;
}`}]},{name:`shadow`,category:`Visual`,description:"Adds drop shadows to elements (`box-shadow`) or text (`text-shadow`) — multiple shadows can be layered with commas.",syntax:`box-shadow:  <x> <y> <blur> <spread> <color> | inset ...;
text-shadow: <x> <y> <blur> <color>;`,notes:"`inset` places the shadow inside the element. Shadows don't affect layout. Use `filter: drop-shadow()` for shadows that follow non-rectangular shapes (e.g., PNGs with transparency).",returns:`A layered shadow effect outside or inside the element.`,variations:[{title:`Soft elevation`,code:`.card {
  box-shadow:
    0 1px 3px rgb(0 0 0 / 0.1),
    0 4px 12px rgb(0 0 0 / 0.08);
}`},{title:`Inset (inner glow)`,code:`.input:focus {
  box-shadow: inset 0 0 0 2px #6366f1;
}`},{title:`PNG drop shadow`,code:`.icon {
  filter: drop-shadow(2px 4px 6px rgb(0 0 0 / 0.3));
}`}]},{name:`opacity & visibility`,category:`Visual`,description:"Controls whether an element is visible — `opacity` fades it, `visibility` hides it while preserving space, `display: none` removes it entirely.",syntax:`opacity:    0–1;
visibility: visible | hidden | collapse;`,notes:"`opacity` applies to the entire element including children and cannot be un-inherited. For just the background, use `rgb()` / `oklch()` with an alpha channel on `background-color` instead.",returns:`The element's visual transparency.`,variations:[{title:`Fade with opacity`,code:`.tooltip {
  opacity: 0;
  transition: opacity 200ms;
}
.tooltip.visible { opacity: 1; }`},{title:`Semi-transparent bg`,code:`.overlay {
  background-color: rgb(0 0 0 / 0.5);
}`}]},{name:`filter & backdrop-filter`,category:`Visual`,description:`Apply graphical effects (blur, brightness, contrast, grayscale) to an element or to everything behind it.`,syntax:`filter: blur(<px>) | brightness(%) | contrast(%) | grayscale(%)
      | saturate(%) | hue-rotate(deg) | drop-shadow(...);

backdrop-filter: blur(<px>) | brightness(%) | ...;`,notes:"`filter` affects the element itself; `backdrop-filter` affects what's behind it (requires the element to have a background or be semi-transparent). Creates a stacking context.",returns:`A composited visual effect layer.`,variations:[{title:`Glassmorphism`,code:`.glass {
  background: rgb(255 255 255 / 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgb(255 255 255 / 0.2);
}`},{title:`Grayscale on hover`,code:`.photo { filter: grayscale(100%); }
.photo:hover { filter: grayscale(0%); }`}]},{name:`clip-path`,category:`Visual`,description:`Clips the visible region of an element to a geometric shape or SVG path — anything outside the clip is invisible.`,syntax:`clip-path: none
         | inset(<top> <right> <bottom> <left> round <radius>)
         | circle(<r> at <x> <y>)
         | ellipse(<rx> <ry> at <x> <y>)
         | polygon(<x1> <y1>, <x2> <y2>, ...)
         | path('<svg-path>');`,notes:"`clip-path` is animatable — transitioning between polygon shapes creates smooth morph effects. The clipped-away area still occupies space in the layout (like `overflow: hidden`). Pairs well with `transform` for reveal animations.",returns:`A clipped rendering region for the element.`,variations:[{title:`Circle reveal`,code:`.avatar {
  clip-path: circle(50%);
}`},{title:`Diagonal section cut`,code:`.hero {
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}`},{title:`Animated reveal`,code:`.reveal {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 500ms ease;
}
.reveal.visible {
  clip-path: inset(0 0% 0 0);
}`}]},{name:`mix-blend-mode`,category:`Visual`,description:`Controls how an element's pixels blend with the content behind it — similar to layer blending in Photoshop.`,syntax:`mix-blend-mode: normal | multiply | screen | overlay
              | darken | lighten | color-dodge | color-burn
              | hard-light | soft-light | difference
              | exclusion | hue | saturation | color | luminosity;

isolation: isolate; /* contain blending to a group */`,notes:"`multiply` darkens (good for logos over photos), `screen` lightens, `overlay` boosts contrast. Use `isolation: isolate` on a parent to prevent blending from leaking outside the component.",returns:`A composited blend of the element with its backdrop.`,variations:[{title:`Text over image`,code:`.title {
  mix-blend-mode: overlay;
  color: white;
}`},{title:`Duotone effect`,code:`.photo-wrapper {
  background: #6366f1;
  isolation: isolate;
}
.photo-wrapper img {
  mix-blend-mode: luminosity;
}`},{title:`Multiply logo`,code:`.logo-on-bg {
  mix-blend-mode: multiply;
}`}]},{name:`cursor & pointer-events`,category:`Visual`,description:"`cursor` changes the mouse cursor appearance; `pointer-events` controls whether an element can be the target of mouse/touch interactions.",syntax:`cursor: auto | default | pointer | grab | grabbing
      | not-allowed | crosshair | text | wait
      | url('icon.png') <x> <y>, auto;

pointer-events: auto | none;`,notes:"`pointer-events: none` lets clicks pass through an overlay element to whatever is beneath it. It also disables `:hover` and `:active` states. `cursor: url()` loads a custom cursor image with a hotspot offset.",returns:`Mouse cursor appearance and hit-testing behavior.`,variations:[{title:`Drag handle`,code:`.handle {
  cursor: grab;
}
.handle:active {
  cursor: grabbing;
}`},{title:`Disabled state`,code:`.btn:disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
}`},{title:`Click-through overlay`,code:`.tooltip-layer {
  pointer-events: none; /* pass clicks to content below */
}`}]},{name:`transform`,category:`Animation`,description:`Apply 2D/3D spatial transformations — translate, scale, rotate, and skew — without affecting layout.`,syntax:`transform: translate(<x>, <y>)
          scale(<x>, <y>)
          rotate(<angle>)
          skew(<x-angle>, <y-angle>)
          matrix(...);
transform-origin: <x> <y>;
transform-box:    fill-box | border-box;`,notes:"Transforms are composited on the GPU and don't trigger layout recalculation — prefer them over changing `top`/`left` for animations. Multiple functions are applied right to left.",returns:`A transformed visual position without affecting document flow.`,variations:[{title:`Center with translate`,code:`.centered {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}`},{title:`Scale on hover`,code:`.card:hover {
  transform: scale(1.03);
}`},{title:`Rotate icon`,code:`.chevron.open {
  transform: rotate(180deg);
}`}]},{name:`transition`,category:`Animation`,description:`Smoothly interpolate between two CSS property states over a defined duration and easing curve.`,syntax:`transition: <property> <duration> <easing> <delay>;
transition: all 200ms ease;
transition: opacity 150ms ease, transform 200ms ease-out;`,notes:"Only animatable properties can transition. `transition: all` is convenient but can cause unintended performance hits — prefer listing specific properties. Use `ease-out` for elements entering the screen.",returns:`An animated interpolation between two property values.`,variations:[{title:`Button hover`,code:`.btn {
  transition: background-color 150ms ease, box-shadow 150ms ease;
}
.btn:hover { background-color: #4f46e5; }`},{title:`Fade in`,code:`.modal {
  opacity: 0;
  transition: opacity 200ms ease;
}
.modal.open { opacity: 1; }`}]},{name:`@keyframes & animation`,category:`Animation`,description:"Define multi-step animations with `@keyframes` and apply them with the `animation` shorthand.",syntax:`@keyframes name {
  from { /* start */ }
  to   { /* end   */ }
  50%  { /* midpoint */ }
}

animation: <name> <duration> <easing> <delay>
           <iteration-count> <direction> <fill-mode>;`,notes:"`animation-fill-mode: forwards` keeps the final state after the animation ends. `animation-iteration-count: infinite` loops forever. Prefer `prefers-reduced-motion` media query to disable motion for users who request it.",returns:`A keyframe-based animation applied to the element.`,variations:[{title:`Spin loader`,code:`@keyframes spin {
  to { transform: rotate(360deg); }
}
.loader {
  animation: spin 1s linear infinite;
}`},{title:`Fade in up`,code:`@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card { animation: fadeUp 300ms ease-out both; }`},{title:`Reduced motion`,code:`@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}`}]},{name:`will-change`,category:`Animation`,description:`Hints to the browser that a property is about to change, allowing it to create a compositor layer ahead of time and avoid mid-animation jank.`,syntax:`will-change: auto | transform | opacity | scroll-position
           | <custom-ident>;`,notes:"Use sparingly — each `will-change` declaration consumes GPU memory. Apply it only just before an animation starts (via JS) and remove it afterward. Over-using it can actually hurt performance. Prefer it over the `translateZ(0)` hack.",returns:`A browser optimization hint for upcoming property changes.`,variations:[{title:`Add before animation`,code:`el.addEventListener('mouseenter', () => {
  el.style.willChange = 'transform';
});
el.addEventListener('animationend', () => {
  el.style.willChange = 'auto';
});`},{title:`CSS trigger on hover`,code:`.card {
  transition: transform 200ms ease;
}
.card:hover {
  will-change: transform;
  transform: scale(1.03);
}`}]},{name:`Pseudo-classes`,category:`Selectors`,description:`Target elements based on their state, position, or relationship to other elements without adding extra markup.`,syntax:`:hover  :focus  :focus-visible  :active  :visited
:checked  :disabled  :required  :valid  :invalid
:first-child  :last-child  :nth-child(n)  :only-child
:not(selector)  :is(...)  :where(...)  :has(...)`,notes:"`:focus-visible` only shows a focus ring for keyboard navigation — prefer it over `:focus` for button/link styles. `:has()` is a relational selector — it selects a parent based on its children (broad browser support since 2023).",returns:`A matched set of elements in the specified state.`,variations:[{title:`:nth-child`,code:`li:nth-child(odd)  { background: #f5f5f5; }
li:nth-child(3n+1) { font-weight: bold; }`},{title:`:has() parent select`,code:`.card:has(img) {
  padding-top: 0; /* card contains an image */
}`},{title:`:is() grouping`,code:`:is(h1, h2, h3) > a { color: inherit; }`}]},{name:`Pseudo-elements`,category:`Selectors`,description:"Insert generated content or style specific parts of an element — `::before` / `::after` are the most common.",syntax:`::before  ::after       /* generated content */
::placeholder           /* input placeholder text */
::selection             /* highlighted text */
::first-line            /* first line of a block */
::marker                /* list item marker */`,notes:'`::before` and `::after` require `content: ""` (even empty string). They are inline by default. Use `content: none` to remove generated content. `::selection` only accepts a limited set of properties.',returns:`A virtual element or sub-part of the matched element.`,variations:[{title:`Decorative rule`,code:`.heading::after {
  content: "";
  display: block;
  width: 3rem;
  height: 3px;
  background: #6366f1;
  margin-top: 0.5rem;
}`},{title:`Custom selection`,code:`::selection {
  background: #6366f1;
  color: white;
}`},{title:`Custom marker`,code:`li::marker { color: #6366f1; font-size: 1.2em; }`}]},{name:`@media queries`,category:`Selectors`,description:`Apply styles conditionally based on viewport size, device capabilities, or user preferences.`,syntax:`@media (min-width: 768px) { ... }
@media (max-width: 767px) { ... }
@media (prefers-color-scheme: dark) { ... }
@media (prefers-reduced-motion: reduce) { ... }
@media (hover: hover) { ... }`,notes:"Prefer `min-width` (mobile-first) over `max-width`. Use the `@layer` rule to manage cascade order across breakpoints. `prefers-color-scheme` and `prefers-reduced-motion` improve accessibility.",returns:`A conditional rule block applied when the media condition is true.`,variations:[{title:`Mobile-first breakpoints`,code:`/* base: mobile */
.grid { grid-template-columns: 1fr; }

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}`},{title:`Dark mode`,code:`@media (prefers-color-scheme: dark) {
  :root { --bg: #0f0f0f; --text: #f5f5f5; }
}`}]},{name:`Attribute selectors`,category:`Selectors`,description:`Match elements based on the presence or value of their HTML attributes — without needing extra classes.`,syntax:`[attr]          /* has the attribute */
[attr="value"]  /* exact match */
[attr^="val"]   /* starts with */
[attr$="val"]   /* ends with */
[attr*="val"]   /* contains */
[attr~="val"]   /* word in space-separated list */
[attr|="val"]   /* exactly or val- prefix */`,notes:'Add `i` flag for case-insensitive matching: `[type="text" i]`. Attribute selectors have the same specificity as classes (0,1,0). Useful for styling elements by data attributes without adding presentational classes.',returns:`Elements matching the specified attribute condition.`,variations:[{title:`External links`,code:`a[href^="http"]::after {
  content: ' ↗';
  font-size: 0.8em;
}`},{title:`File type icons`,code:`a[href$=".pdf"]  { --icon: '📄'; }
a[href$=".zip"]  { --icon: '📦'; }`},{title:`Data attribute theme`,code:`[data-variant="primary"] {
  background: var(--color-primary);
}
[data-variant="ghost"] {
  background: transparent;
  border: 1px solid currentColor;
}`}]},{name:`@supports`,category:`Selectors`,description:`Apply styles conditionally based on whether the browser supports a given CSS feature — the CSS equivalent of feature detection.`,syntax:`@supports (property: value) { ... }
@supports not (property: value) { ... }
@supports (display: grid) and (gap: 1rem) { ... }
@supports selector(:has(a)) { ... }`,notes:"`@supports` checks parsing, not rendering quality — the browser may support the syntax but implement it poorly. Use it for progressive enhancement: write a baseline, then layer improvements inside `@supports`.",returns:`A conditional rule block applied when the feature is supported.`,variations:[{title:`Grid with fallback`,code:`.layout { display: flex; }

@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}`},{title:`Container query guard`,code:`@supports (container-type: inline-size) {
  .card { container-type: inline-size; }
}`},{title:`:has() guard`,code:`@supports selector(:has(a)) {
  .nav:has(.active) { background: #f5f5f5; }
}`}]},{name:`@container`,category:`Selectors`,description:`Apply styles based on the size of a parent container rather than the viewport — enables truly reusable, context-aware components.`,syntax:`/* Define the container */
.wrapper {
  container-type: inline-size;
  container-name: card;       /* optional name */
}

/* Query it */
@container (min-width: 400px) { ... }
@container card (min-width: 600px) { ... }`,notes:"An element cannot query its own container — it queries an ancestor. `container-type: inline-size` is the most common; `size` also tracks block axis. Named containers let nested components target a specific ancestor.",returns:`A conditional rule block applied when the container matches the size condition.`,variations:[{title:`Responsive card`,code:`.card-wrapper {
  container-type: inline-size;
}

.card { flex-direction: column; }

@container (min-width: 480px) {
  .card { flex-direction: row; }
}`},{title:`Named container`,code:`.sidebar {
  container: sidebar / inline-size;
}

@container sidebar (max-width: 300px) {
  .widget { font-size: 0.875rem; }
}`}]},{name:`@layer`,category:`Selectors`,description:`Explicitly order the cascade into named layers — rules in later layers win over earlier ones regardless of specificity.`,syntax:`@layer reset, base, components, utilities;

@layer base {
  a { color: blue; }
}

@layer utilities {
  .text-red { color: red; }
}`,notes:"Unlayered styles always win over layered ones. This makes it safe to include third-party CSS in a low-priority layer without specificity battles. Combine with `@import` for library isolation.",returns:`A cascade layer that controls style precedence independently of specificity.`,variations:[{title:`Third-party isolation`,code:`@layer vendor;
@import url('library.css') layer(vendor);

@layer vendor { /* low priority */ }
@layer app    { /* wins over vendor */ }`}]}],a={Layout:`bg-primary-100 text-primary-700`,"Box Model":`bg-emerald-100 text-emerald-700`,Typography:`bg-amber-100 text-amber-700`,Visual:`bg-violet-100 text-violet-700`,Animation:`bg-rose-100 text-rose-700`,Selectors:`bg-cyan-100 text-cyan-700`},o=i.map(e=>({name:e.name,category:e.category,description:e.description,syntax:e.syntax,notes:e.notes,returns:e.returns,variations:e.variations}));function s(){return(0,r.jsx)(n,{items:o,badgeColors:a,legendLabel:`Category`,labels:t,countLabel:`properties`})}export{s as default};