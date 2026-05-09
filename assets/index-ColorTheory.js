import{t as e}from"./index-jsx-runtime.js";import{a as t,n}from"./index-components.js";var r=e(),i=[{name:`What is Color?`,category:`Fundamentals`,description:`Color is the visual perception produced when light of a specific wavelength stimulates the cone cells in the human eye. It is not an intrinsic property of objects — it is a product of light, surface, and the observer's visual system.`,syntax:`Color = Light wavelength + Surface reflectance + Human perception.`,notes:`The visible spectrum spans roughly 380–700 nm. Objects appear colored because they absorb certain wavelengths and reflect others. The human eye has three types of cone cells (S, M, L) sensitive to short (blue), medium (green), and long (red) wavelengths — the basis of all color models.`,returns:`A perceived hue, saturation, and lightness — the three perceptual dimensions of color.`,variations:[{title:`Light vs pigment`,code:`Light (additive): Red + Green + Blue → White
  Used by: screens, projectors, LEDs
  Model: RGB

Pigment (subtractive): Cyan + Magenta + Yellow → Black
  Used by: ink, paint, printers
  Model: CMYK

Key difference:
  Adding light → brighter (converges on white)
  Mixing pigment → darker (converges on black)`},{title:`The visible spectrum`,code:`Wavelength  Color
~380–450 nm  Violet
~450–495 nm  Blue
~495–570 nm  Green
~570–590 nm  Yellow
~590–620 nm  Orange
~620–700 nm  Red

Below 380 nm → Ultraviolet (invisible)
Above 700 nm → Infrared (invisible)`}]},{name:`The Color Wheel`,category:`Fundamentals`,description:`The color wheel is a circular arrangement of hues that shows the relationships between primary, secondary, and tertiary colors. It is the foundation for understanding color harmony.`,syntax:`Primary → Secondary → Tertiary — arranged in a 360° hue circle.`,notes:`The traditional RYB (Red-Yellow-Blue) wheel is used in art and painting. The RGB wheel (Red-Green-Blue) is used in digital design. They differ in how secondary colors are derived — mixing red and blue in RYB gives purple, in RGB it gives magenta.`,returns:`A map of color relationships that guides palette selection and harmony.`,variations:[{title:`RYB wheel (traditional art)`,code:`Primary:    Red, Yellow, Blue
Secondary:  Orange (R+Y), Green (Y+B), Violet (B+R)
Tertiary:   Red-Orange, Yellow-Orange, Yellow-Green,
            Blue-Green, Blue-Violet, Red-Violet

Used in: painting, illustration, traditional design education`},{title:`RGB wheel (digital design)`,code:`Primary:    Red, Green, Blue
Secondary:  Yellow (R+G), Cyan (G+B), Magenta (R+B)
Tertiary:   Yellow-Green, Cyan-Green, Cyan-Blue,
            Blue-Magenta, Red-Magenta, Yellow-Red

Used in: screens, web design, digital art, CSS`},{title:`Hue as an angle`,code:`In HSL / HSB / LCH:
  0°   / 360° → Red
  30°         → Orange
  60°         → Yellow
  120°        → Green
  180°        → Cyan
  240°        → Blue
  300°        → Magenta

Opposite hues (complementary) = 180° apart on the wheel`}]},{name:`Color Models`,category:`Fundamentals`,description:`A color model is a mathematical system for representing color as a set of numbers. Different models are suited to different purposes — display, print, perceptual uniformity, or human intuition.`,syntax:`RGB, HSL, HSB, CMYK, LAB, LCH, OKLCH — each encodes color differently.`,notes:`No single model is universally best. RGB is native to screens. HSL/HSB map to human intuition about color. LAB and OKLCH are perceptually uniform — equal numerical changes produce equal perceived changes — making them superior for interpolation and accessibility calculations.`,returns:`A numeric representation of color suited to a specific use case.`,variations:[{title:`RGB — screen native`,code:`rgb(255, 0, 0)     → pure red
rgb(0, 128, 255)   → sky blue
rgb(255, 255, 255) → white
rgb(0, 0, 0)       → black

Values: 0–255 per channel (or 0%–100%)
Hex shorthand: #RRGGBB → #ff0000 = red`},{title:`HSL — human-intuitive`,code:`hsl(hue, saturation%, lightness%)

hsl(0,   100%, 50%)  → pure red
hsl(120, 100%, 50%)  → pure green
hsl(240, 100%, 50%)  → pure blue
hsl(0,     0%, 50%)  → medium gray
hsl(200,  80%, 60%)  → light sky blue

H: 0–360°  S: 0–100%  L: 0–100%`},{title:`OKLCH — perceptually uniform`,code:`oklch(lightness chroma hue)

oklch(0.63 0.26 29)   → a vivid red
oklch(0.75 0.18 145)  → a vivid green
oklch(0.55 0.21 264)  → a vivid blue
oklch(0.5  0    0)    → medium gray

L: 0–1   C: 0–0.4+   H: 0–360°
Best for: accessible palettes, smooth gradients`},{title:`CMYK — print`,code:`cmyk(cyan%, magenta%, yellow%, key/black%)

cmyk(0, 100, 100, 0)  → red
cmyk(100, 0, 100, 0)  → green
cmyk(100, 100, 0, 0)  → blue
cmyk(0, 0, 0, 100)    → black

Used by: offset printing, laser/inkjet printers
Not used in CSS or web design directly`}]},{name:`Hue`,category:`Color Properties`,description:`Hue is the attribute of color that allows it to be described as red, orange, yellow, green, blue, or violet — the pure chromatic identity of a color. It is independent of how light or dark, or how vivid or muted, the color appears.`,syntax:`Hue = position on the color wheel (0°–360°).`,notes:`Two colors with the same hue but different saturation or lightness are still considered shades/tints of the same hue. Hue shift is a common technique in gradients — slightly rotating the hue as lightness changes produces more natural-looking transitions.`,returns:`The base color identity — red, blue, green, etc. — without reference to brightness or saturation.`,variations:[{title:`Hue in HSL`,code:`hsl(0,   100%, 50%)  → Red
hsl(60,  100%, 50%)  → Yellow
hsl(120, 100%, 50%)  → Green
hsl(180, 100%, 50%)  → Cyan
hsl(240, 100%, 50%)  → Blue
hsl(300, 100%, 50%)  → Magenta

Only the first value (hue angle) changes — same saturation and lightness.`},{title:`Hue shift in gradients`,code:`/* Naive gradient — muddy in the middle */
background: linear-gradient(
  hsl(0, 100%, 50%),    /* red */
  hsl(240, 100%, 50%)   /* blue */
);

/* Hue-shifted gradient — vivid throughout */
background: linear-gradient(
  in oklch,
  oklch(0.63 0.26 29),
  oklch(0.55 0.21 264)
);`}]},{name:`Saturation & Chroma`,category:`Color Properties`,description:`Saturation describes the intensity or purity of a color — how far it departs from a neutral gray. Chroma is the perceptually uniform equivalent used in LAB and OKLCH. High saturation = vivid; low saturation = muted or gray.`,syntax:`HSL: saturation 0%–100%. OKLCH: chroma 0–0.4+.`,notes:`Saturation in HSL is relative — it depends on the lightness level, making fully saturated dark and light colors look washed out. Chroma in OKLCH is absolute — a chroma of 0.2 means the same perceptual intensity regardless of lightness, making it better for consistent palette building.`,returns:`The vividness of a color — the degree of departure from gray.`,variations:[{title:`Saturation scale`,code:`hsl(200, 0%,   50%)  → Gray (no saturation)
hsl(200, 25%,  50%)  → Muted blue-gray
hsl(200, 50%,  50%)  → Moderate blue
hsl(200, 75%,  50%)  → Vivid blue
hsl(200, 100%, 50%)  → Pure vivid blue`},{title:`Saturation in design`,code:`High saturation (80–100%):
  → Accents, CTAs, alerts, brand colors
  → Use sparingly — fatiguing if overused

Medium saturation (30–60%):
  → UI components, backgrounds, illustrations
  → Approachable and professional

Low saturation (0–20%):
  → Text, borders, subtle backgrounds
  → Neutral and unobtrusive`}]},{name:`Lightness, Value & Brightness`,category:`Color Properties`,description:`Lightness (HSL) and Value/Brightness (HSB) describe how light or dark a color is — from black to white. They are related but not identical: in HSL, 50% is the 'pure' hue; in HSB, 100% value is the pure hue.`,syntax:`HSL: lightness 0% (black) → 50% (pure hue) → 100% (white).
HSB: brightness 0% (black) → 100% (pure hue).`,notes:`HSL's 50% pure hue point can be unintuitive — moving from 50% to 100% lightness washes the color to white, not just brightens it. OKLCH lightness is perceptually uniform: 0.5 always looks equally bright regardless of hue, unlike HSL where yellow at 50% looks much brighter than blue at 50%.`,returns:`The perceived luminosity of a color on a scale from black to white.`,variations:[{title:`HSL lightness scale`,code:`hsl(200, 100%, 0%)   → Black (always black)
hsl(200, 100%, 25%)  → Dark blue
hsl(200, 100%, 50%)  → Pure vivid blue
hsl(200, 100%, 75%)  → Light blue (tint)
hsl(200, 100%, 100%) → White (always white)`},{title:`Tint, shade, tone`,code:`Pure hue: hsl(200, 100%, 50%)

Tint   (add white): increase lightness
  hsl(200, 100%, 70%)  → light blue

Shade  (add black): decrease lightness
  hsl(200, 100%, 30%)  → dark blue

Tone   (add gray):  reduce saturation
  hsl(200, 40%, 50%)   → muted blue`}]},{name:`Color Temperature`,category:`Color Properties`,description:`Color temperature describes the warmth or coolness of a color. Warm colors (reds, oranges, yellows) suggest energy, warmth, and urgency. Cool colors (blues, greens, purples) suggest calm, trust, and distance.`,syntax:`Warm: reds → oranges → yellows. Cool: blues → greens → violets.`,notes:`Temperature is relative — a warm gray contains more red/yellow; a cool gray contains more blue. The same hue can feel warmer or cooler depending on surrounding colors (simultaneous contrast). In photography, color temperature is measured in Kelvin: 3000K = warm (incandescent), 6500K = cool (daylight).`,returns:`The psychological warmth or coolness impression of a color.`,variations:[{title:`Warm vs cool examples`,code:`Warm colors (energy, urgency, appetite):
  Red      hsl(0,   100%, 50%)
  Orange   hsl(30,  100%, 50%)
  Yellow   hsl(60,  100%, 50%)
  Amber    hsl(45,  100%, 50%)

Cool colors (calm, trust, depth):
  Green    hsl(120, 60%, 45%)
  Teal     hsl(180, 60%, 40%)
  Blue     hsl(220, 80%, 50%)
  Violet   hsl(270, 60%, 50%)`},{title:`Temperature in UI design`,code:`Warm:
  → Call-to-action buttons (urgency)
  → Warning and error states
  → Food, hospitality, energy brands

Cool:
  → Trust-building (banking, healthcare)
  → Technology and SaaS products
  → Calm and focus-oriented UIs

Neutral (mixed temperature):
  → Versatile backgrounds and surfaces
  → Works alongside any accent color`}]},{name:`Complementary`,category:`Color Harmonies`,description:`Complementary colors sit directly opposite each other on the color wheel (180° apart). Together they create maximum contrast and visual tension — each makes the other appear more vivid.`,syntax:`Hue A and Hue A + 180° = complementary pair.`,notes:`Pure complementary pairings (e.g. red/green, blue/orange) can create vibrating visual effects when placed at equal saturation and similar lightness — use carefully, especially at small text sizes. Softening one color with lower saturation or different lightness reduces this effect.`,returns:`Maximum contrast and vibrance — each color intensifies the other.`,variations:[{title:`Common complementary pairs`,code:`Red      / Cyan     (0° / 180°)
Orange   / Blue     (30° / 210°)
Yellow   / Violet   (60° / 240°)
Green    / Magenta  (120° / 300°)

In digital design:
  Primary blue + CTA orange → classic SaaS pairing
  Dark navy + warm gold → premium / luxury feel`},{title:`Safe complementary use`,code:`/* Avoid equal-saturation clashing */
DO:    dark navy background + vivid orange accent
DON'T: vivid red text on vivid green background

/* Split the dominance — one dominant, one accent */
~80% of UI: blue (dominant)
~20% of UI: orange (accent, CTAs only)

/* Desaturate one side for readability */
hsl(220, 70%, 25%)  + hsl(40, 90%, 55%)`}]},{name:`Analogous`,category:`Color Harmonies`,description:`Analogous colors are groups of 3–5 colors that sit adjacent to each other on the color wheel (within 30–60° of each other). They create harmonious, natural palettes with low contrast.`,syntax:`Hue A, A ± 30°, A ± 60° — adjacent hues on the wheel.`,notes:`Analogous palettes are soothing and cohesive but can lack contrast for UI hierarchy. Add contrast using lightness and saturation variation within the group rather than introducing a distant hue. Nature is full of analogous color schemes — sunsets, forests, oceans.`,returns:`A harmonious, low-tension palette that feels natural and cohesive.`,variations:[{title:`Example palettes`,code:`Warm earth tones (analogous):
  Red-Orange  hsl(15,  80%, 55%)
  Orange      hsl(30,  85%, 55%)
  Yellow-Orange hsl(45, 80%, 55%)

Ocean blues (analogous):
  Cyan-Green  hsl(165, 60%, 45%)
  Teal        hsl(185, 65%, 40%)
  Blue        hsl(205, 70%, 45%)`},{title:`Adding contrast`,code:`/* Analogous = similar hues, so vary other dimensions */

/* Use lightness for hierarchy */
hsl(220, 70%, 20%)  → Dark header text
hsl(220, 60%, 45%)  → Body / interactive
hsl(220, 50%, 75%)  → Muted backgrounds
hsl(220, 40%, 92%)  → Subtle borders

/* Or vary saturation to distinguish priority */
hsl(220, 80%, 50%)  → Primary action
hsl(220, 30%, 50%)  → Secondary action`}]},{name:`Triadic`,category:`Color Harmonies`,description:`A triadic palette uses three colors evenly spaced around the color wheel (120° apart). It creates a vibrant, high-energy palette with strong contrast while maintaining balance.`,syntax:`Hue A, A + 120°, A + 240° — three equidistant hues.`,notes:`Triadic schemes are visually rich but challenging to balance — they work best when one color dominates and the other two serve as accents. Pure triadic combos at high saturation can feel garish; desaturating two of the three and varying lightness brings balance.`,returns:`A bold, balanced palette with strong visual energy and variety.`,variations:[{title:`Example triadic sets`,code:`Primary triadic:
  Red (0°), Yellow (120°), Blue (240°)

Secondary triadic:
  Orange (30°), Green (150°), Violet (270°)

Custom example:
  Blue    hsl(220, 80%, 50%)
  Red     hsl(340, 75%, 50%)
  Yellow  hsl(100, 60%, 45%)`},{title:`Balancing triadic`,code:`60-30-10 rule applied to triadic:
  60% → dominant (primary brand color)
  30% → secondary (supporting color)
  10% → accent (high-energy pop color)

Example:
  60% navy blue   (backgrounds, text)
  30% warm gray   (surfaces, cards)
  10% vivid amber (CTAs, highlights)`}]},{name:`Split-Complementary`,category:`Color Harmonies`,description:`Split-complementary uses a base color and the two colors adjacent to its complement (±30° from the opposite hue). It offers similar contrast to complementary but is less visually jarring and easier to balance.`,syntax:`Hue A, (A + 150°), (A + 210°) — base + two neighbors of its complement.`,notes:`Split-complementary is often the safer alternative to full complementary, especially for UI design. The base color dominates, while the two split-complement colors are used as accents and supporting tones.`,returns:`High contrast with more variety than complementary, and less visual tension.`,variations:[{title:`Example`,code:`Base:           Blue      (220°)
Complement:     Orange    (40°)   ← not used
Split-complements:
  Yellow-Orange  (10°)
  Red-Orange     (70°)

Result: Blue dominant + warm yellow-red accents
  → Popular in sports and entertainment branding`}]},{name:`Tetradic (Rectangle & Square)`,category:`Color Harmonies`,description:`Tetradic schemes use four colors arranged as two complementary pairs. A rectangle uses two pairs with uneven spacing; a square uses pairs exactly 90° apart. These offer the richest palettes but are the hardest to balance.`,syntax:`Rectangle: A, A+60°, A+180°, A+240°. Square: A, A+90°, A+180°, A+270°.`,notes:`Tetradic palettes work best when one color clearly dominates and the others serve supporting roles. In UI design, this often means one brand color, one complementary highlight, and two neutralised variants for backgrounds and text.`,returns:`A rich, complex palette with four hue relationships — requires disciplined use to avoid chaos.`,variations:[{title:`Square example`,code:`Four colors, 90° apart:
  Red      (0°)
  Yellow   (90°)
  Green    (180°)
  Blue-Violet (270°)

Balance approach:
  → Use one vivid, three muted
  → Or: one dark, one light, two mid-tone
  → Vary saturation drastically to create hierarchy`},{title:`Rectangle example`,code:`Two complementary pairs, uneven spacing:
  Blue        (220°)
  Orange      (40°)   ← complement of blue
  Teal        (175°)
  Red-Orange  (355°)  ← complement of teal

More variety than square — the uneven spacing
creates two distinct 'moods' within the palette.`}]},{name:`Monochromatic`,category:`Color Harmonies`,description:`A monochromatic palette uses a single hue with variations in lightness and saturation. It is the simplest and most cohesive harmony — clean, elegant, and easy to implement.`,syntax:`One hue, multiple tints (+ white), shades (+ black), and tones (+ gray).`,notes:`Monochromatic palettes need strong lightness contrast to establish visual hierarchy — without it, everything looks flat. Adding a small accent color (even a neutral warm/cool shift) can energise a monochromatic scheme without breaking its cohesion.`,returns:`A cohesive, minimal palette — easy to maintain, brand-consistent.`,variations:[{title:`Blue monochromatic scale`,code:`hsl(220, 80%, 15%)   → Dark navy (headers, text)
hsl(220, 70%, 30%)   → Deep blue (primary actions)
hsl(220, 65%, 45%)   → Medium blue (interactive)
hsl(220, 55%, 65%)   → Soft blue (hover states)
hsl(220, 45%, 80%)   → Light blue (backgrounds)
hsl(220, 30%, 93%)   → Near-white blue (subtle bg)
hsl(220, 20%, 98%)   → Off-white (page background)`},{title:`Design use cases`,code:`✓ Brand guidelines and corporate identity
✓ Data visualisation (sequential colour scales)
✓ Single-product landing pages
✓ Photography portfolios (neutral, non-competing)

Tip: use warm/cool bias on your neutrals to complement
the main hue — warm neutrals for warm hues, cool for cool.`}]},{name:`Contrast & Accessibility`,category:`Color in Design`,description:`Contrast ratio measures the luminance difference between a foreground color and its background. WCAG 2.1 defines minimum contrast requirements to ensure text is legible for users with low vision or color blindness.`,syntax:`Contrast ratio = (L1 + 0.05) / (L2 + 0.05), where L = relative luminance.`,notes:`WCAG 3.0 is introducing APCA (Advanced Perceptual Contrast Algorithm) as a replacement for the current ratio-based method, as it better accounts for font weight, size, and polarity. Never rely on color alone to convey meaning — always add text, icons, or patterns as redundant cues.`,returns:`A ratio between 1:1 (no contrast) and 21:1 (black on white).`,variations:[{title:`WCAG 2.1 requirements`,code:`Level AA (minimum):
  Normal text (< 18pt / < 14pt bold)  → 4.5:1
  Large text  (≥ 18pt / ≥ 14pt bold)  → 3:1
  UI components and graphical objects   → 3:1

Level AAA (enhanced):
  Normal text  → 7:1
  Large text   → 4.5:1

Exemptions: decorative elements, disabled UI, logos`},{title:`Common failing combinations`,code:`FAILS AA:
  Light gray #999 on white #fff  → 2.85:1
  Yellow #ffff00 on white #fff   → 1.07:1
  Blue link #0000ff on black     → 2.44:1

PASSES AA:
  Black #000 on white #fff       → 21:1
  Dark gray #595959 on white     → 7.0:1
  Navy #003366 on white          → 12.6:1
  White on primary-blue #1a6fd4  → 4.6:1`},{title:`Testing tools`,code:`Browser DevTools:
  Chrome/Edge: color picker shows contrast ratio
  Firefox: Accessibility tab shows ratio warnings

Online tools:
  WebAIM Contrast Checker — webaim.org/resources/contrastchecker
  Colour Contrast Analyser — desktop app by TPGi
  Stark — Figma / Sketch / XD plugin

CSS: new color-contrast() function (limited support)
  color: color-contrast(white vs blue, navy, teal);`}]},{name:`Color Blindness`,category:`Color in Design`,description:`Color blindness affects approximately 8% of males and 0.5% of females (worldwide). The most common form is red-green color blindness (deuteranopia/protanopia). Design that relies solely on color excludes these users.`,syntax:`Never use color alone to convey meaning — pair with text, icons, or patterns.`,notes:`Deuteranopia (green-weak) and protanopia (red-weak) are the most common, making red/green combinations especially problematic. Blue-yellow color blindness (tritanopia) is rarer. Achromatopsia (no color vision at all) affects ~0.003% of people.`,returns:`A more inclusive design that communicates effectively regardless of color perception.`,variations:[{title:`Types of color blindness`,code:`Deuteranopia   — green-weak (most common, ~5% of males)
Protanopia     — red-weak (~1% of males)
Deuteranomaly  — green-shifted (most common form overall)
Protanomaly    — red-shifted
Tritanopia     — blue-yellow weakness (rare)
Achromatopsia  — no color perception (very rare)

Most common confusion:
  Red & Green → appear similar
  Blue & Purple → appear similar
  Green & Brown → appear similar`},{title:`Design guidelines`,code:`✓ Pair color with text labels ('Error: invalid email')
✓ Use icons alongside color indicators
✓ Use patterns/textures in charts (not just color fills)
✓ Ensure sufficient luminance contrast between states
✓ Use the Coblis simulator or Figma Stark plugin to test

✗ 'Red = error, Green = success' without other indicators
✗ Line charts differentiated by color alone
✗ Traffic light (red/amber/green) status without labels`},{title:`Safer color pairings`,code:`Problematic for red-green blindness:
  Red + Green at similar lightness
  Orange + Olive green

Safer alternatives:
  Blue + Orange (strong contrast, both visible)
  Purple + Yellow (distinct in most forms)
  Dark + Light (rely on lightness, not hue)

In data visualisation:
  Use Viridis, Cividis, or Okabe-Ito palettes
  — designed to be distinguishable by all common
    types of color blindness`}]},{name:`Color Psychology`,category:`Color in Design`,description:`Colors carry psychological associations that influence how users feel and behave. These associations are partly universal (evolutionary), partly cultural, and partly contextual. No color is inherently good or bad — context determines meaning.`,syntax:`Color associations vary by culture, context, and individual experience.`,notes:`Color psychology effects are real but often overstated. The same red that signals danger in one context signals passion in another. Cultural variation is significant — white is associated with death in many East Asian cultures, while being associated with purity in Western ones. Test with your actual audience, not just general guidelines.`,returns:`An understanding of the emotional and behavioural associations colors can carry.`,variations:[{title:`Common associations (Western context)`,code:`Red:    Energy, urgency, danger, passion, hunger
        Used by: Netflix, YouTube, Coca-Cola, McDonalds

Orange: Warmth, enthusiasm, affordability, creativity
        Used by: Amazon, Harley-Davidson, Fanta

Yellow: Optimism, caution, clarity, attention
        Used by: IKEA, Snapchat, McDonald's arches

Green:  Nature, health, growth, success, go
        Used by: Spotify, WhatsApp, Whole Foods

Blue:   Trust, calm, intelligence, stability
        Used by: Facebook, Samsung, PayPal, LinkedIn

Purple: Luxury, creativity, wisdom, mystery
        Used by: Cadbury, Hallmark, Twitch

Black:  Sophistication, power, elegance, premium
        Used by: Apple, Chanel, Nike

White:  Cleanliness, simplicity, space, purity`},{title:`Context changes meaning`,code:`Red:
  ✓ Sale tag — urgency, great deal
  ✓ Sports app — energy, performance
  ✗ Healthcare app — alarm, danger
  ✗ Financial dashboard — losses

Green:
  ✓ Healthcare — health, safety
  ✓ Finance — profit, go
  ✓ Environmental brand — nature
  ✗ Halloween brand — eerie (paler greens)

Rule: Test color choices in your specific context
      with your specific audience.`}]},{name:`60-30-10 Rule`,category:`Color in Design`,description:`The 60-30-10 rule is a simple guideline for distributing colors in a design: 60% dominant color, 30% secondary color, 10% accent color. It creates visual balance without monotony.`,syntax:`60% dominant + 30% secondary + 10% accent = balanced palette.`,notes:`The proportions are a guideline, not a law. In UI design, the dominant color is often a neutral (white, off-white, dark gray), the secondary is a mid-toned brand color, and the accent is a vivid, attention-grabbing hue used only for the most important interactive elements.`,returns:`A visually balanced composition that guides attention naturally.`,variations:[{title:`Applied to a UI`,code:`60% — Off-white / light gray (background, surfaces)
  bg: hsl(220, 15%, 97%)

30% — Brand blue (nav, headers, cards)
  primary: hsl(220, 70%, 40%)

10% — Vivid amber (CTAs, badges, key highlights)
  accent: hsl(40, 95%, 55%)

The accent color should appear rarely enough that
when it does, it immediately draws the eye.`},{title:`Dark mode adaptation`,code:`60% — Deep dark (page background, large surfaces)
  bg: hsl(220, 20%, 10%)

30% — Mid dark (cards, sidebars, nav)
  surface: hsl(220, 18%, 18%)

10% — Vivid accent (same as light mode, adjusted)
  accent: hsl(40, 90%, 60%)  ← slightly lighter for contrast

Text: use off-white rather than pure white
  text: hsl(220, 10%, 90%)`}]},{name:`Color Tokens & Systems`,category:`Color in Design`,description:`Color tokens are named variables that abstract raw color values behind semantic or structural names. They are the foundation of scalable design systems — making theming, dark mode, and brand updates a single-point change.`,syntax:`Primitive token → Semantic token → Component token.`,notes:`A three-tier token system separates what a color is (primitive: blue-500 = #3b82f6) from how it is used (semantic: color-primary = blue-500) from where it appears (component: button-bg = color-primary). This allows theming by swapping semantic tokens without touching component styles.`,returns:`A maintainable, scalable color system that supports theming and multi-brand design.`,variations:[{title:`Three-tier token structure`,code:`/* Tier 1: Primitive (raw values, not used in components) */
--blue-500: #3b82f6;
--blue-600: #2563eb;
--gray-100: #f3f4f6;

/* Tier 2: Semantic (meaning, references primitives) */
--color-primary:    var(--blue-500);
--color-primary-hover: var(--blue-600);
--color-surface:    var(--gray-100);

/* Tier 3: Component (per-component, references semantic) */
--button-bg:        var(--color-primary);
--button-bg-hover:  var(--color-primary-hover);`},{title:`Dark mode with tokens`,code:`:root {
  --color-background: hsl(0, 0%, 100%);
  --color-text:       hsl(220, 15%, 10%);
  --color-primary:    hsl(220, 80%, 50%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: hsl(220, 20%, 10%);
    --color-text:       hsl(220, 10%, 90%);
    --color-primary:    hsl(220, 70%, 65%);
  }
}

/* Components reference tokens — no changes needed */
.button { background: var(--color-primary); }`}]},{name:`CSS Color Formats`,category:`Color in CSS`,description:`CSS supports many color formats — from hex and named colors to modern perceptually uniform formats like oklch(). Choosing the right format affects readability, browser support, and the quality of color manipulation.`,syntax:`hex | rgb() | hsl() | hwb() | lab() | lch() | oklch() | color()`,notes:`oklch() and color() with wide-gamut color spaces (display-p3, rec2020) can express colors beyond the sRGB gamut that are visible on modern HDR/P3 displays. Always provide an sRGB fallback when using out-of-gamut colors.`,returns:`A color value the browser can render — choose the format that best fits your use case.`,variations:[{title:`All CSS color formats`,code:`/* Named */
color: rebeccapurple;

/* Hex */
color: #3b82f6;
color: #3b82f680;  /* with alpha (last 2 digits) */

/* RGB */
color: rgb(59 130 246);         /* space-separated (modern) */
color: rgb(59, 130, 246);       /* comma-separated (legacy) */
color: rgb(59 130 246 / 50%);   /* with alpha */

/* HSL */
color: hsl(217 91% 60%);
color: hsl(217 91% 60% / 0.5);

/* OKLCH (perceptually uniform) */
color: oklch(0.65 0.21 253);
color: oklch(0.65 0.21 253 / 50%);

/* Wide gamut (P3 display) */
color: color(display-p3 0.2 0.5 0.9);`},{title:`Choosing a format`,code:`hex       → Quick, copy-paste from design tools. Opaque only (or #rrggbbaa).
hsl()     → Great for design tokens — readable, tweakable in code.
rgb()     → When you need precise channel control or JS interop.
oklch()   → Best for palettes, gradients, and accessible color maths.
hwb()     → Hue + Whiteness + Blackness — intuitive for tints/shades.

Avoid:
  Hardcoding hex in components — prefer tokens
  hsl() for gradient midpoints — use oklch() instead`}]},{name:`Color Mixing in CSS`,category:`Color in CSS`,description:`CSS color-mix() lets you blend two colors in a specified color space, enabling dynamic palette generation, tinting, and shading without JavaScript or preprocessors.`,syntax:`color-mix(in color-space, color1 percentage, color2 percentage)`,notes:`The color space matters significantly — mixing in oklch produces perceptually even intermediate colors, while mixing in srgb can produce muddy or overly dark midpoints. color-mix() is supported in all major browsers as of 2023.`,returns:`A blended color in the specified color space.`,variations:[{title:`Basic usage`,code:`/* Mix blue and white 50/50 in sRGB */
color: color-mix(in srgb, blue 50%, white);

/* Tint: mix a color with white */
background: color-mix(in oklch, #3b82f6 30%, white);

/* Shade: mix with black */
background: color-mix(in oklch, #3b82f6 70%, black);

/* Omitting percentage: defaults to 50% each */
color: color-mix(in hsl, red, blue);`},{title:`Color space comparison`,code:`/* Mixing red and green */

/* In sRGB — muddy brown midpoint */
color-mix(in srgb, red, green)  → brownish

/* In HSL — might shift hue unexpectedly */
color-mix(in hsl, red, green)   → yellow (hue rotates)

/* In OKLCH — perceptually even, vivid midpoint */
color-mix(in oklch, red, green) → vibrant yellow-green

/* Recommendation: use oklch for design-quality mixing */`},{title:`Theming with color-mix()`,code:`/* Generate a scale from one token */
:root {
  --brand: hsl(220 80% 50%);

  --brand-100: color-mix(in oklch, var(--brand) 15%, white);
  --brand-200: color-mix(in oklch, var(--brand) 30%, white);
  --brand-300: color-mix(in oklch, var(--brand) 50%, white);
  --brand-700: color-mix(in oklch, var(--brand) 70%, black);
  --brand-900: color-mix(in oklch, var(--brand) 90%, black);
}`}]},{name:`CSS Gradients & Color Interpolation`,category:`Color in CSS`,description:`CSS gradients interpolate between colors across a range. The color space used for interpolation determines whether the midpoint is vivid or muddy. Modern CSS lets you specify the interpolation space explicitly.`,syntax:`linear-gradient(in oklch, color1, color2)`,notes:`Gradients interpolated in sRGB often produce a dark or desaturated midpoint (the 'gray zone'). Interpolating in oklch or display-p3 maintains perceived brightness and chroma throughout the gradient, producing results that match designer expectations.`,returns:`A smooth color transition across the chosen color space.`,variations:[{title:`Specifying color space`,code:`/* Default sRGB interpolation */
background: linear-gradient(to right, blue, yellow);
/* → passes through a dark muddy green midpoint */

/* OKLCH interpolation — vivid throughout */
background: linear-gradient(in oklch, blue, yellow);
/* → passes through vibrant cyan and green midpoints */

/* Shorter hue path (default) */
background: linear-gradient(in oklch, red, blue);

/* Longer hue path (goes the long way round the wheel) */
background: linear-gradient(in oklch longer hue, red, blue);`},{title:`Gradient color stops`,code:`/* Multiple stops with positions */
background: linear-gradient(
  in oklch,
  hsl(220, 80%, 40%) 0%,
  hsl(220, 80%, 40%) 30%,  /* held solid */
  hsl(40,  90%, 55%) 70%,
  hsl(40,  90%, 55%) 100%
);

/* Radial gradient */
background: radial-gradient(
  in oklch circle at center,
  white 0%,
  oklch(0.55 0.21 264) 100%
);

/* Conic gradient (pie chart, angular) */
background: conic-gradient(in oklch, red, yellow, green, blue, red);`}]},{name:`Wide-Gamut Color & Display P3`,category:`Color in CSS`,description:`The sRGB color space used by most CSS covers only about 35% of visible colors. Modern displays (iPhone, Mac Retina, most OLED screens) support the Display P3 gamut, which covers ~50% more colors than sRGB — richer reds, greens, and vivid saturated tones.`,syntax:`color(display-p3 r g b)  — values outside 0–1 may exceed sRGB.`,notes:`Browsers on sRGB-only displays will gamut-map out-of-gamut colors to the nearest in-gamut equivalent — you do not need to fear broken designs on older screens. Use @media (color-gamut: p3) to progressively enhance with wide-gamut colors.`,returns:`More vivid, saturated colors on capable displays — sRGB fallback on others.`,variations:[{title:`Progressively enhanced wide-gamut`,code:`/* Base: sRGB color for all browsers */
.button {
  background: hsl(340, 80%, 50%);
}

/* Enhanced: P3 color for capable displays */
@media (color-gamut: p3) {
  .button {
    background: color(display-p3 0.85 0.15 0.35);
  }
}`},{title:`OKLCH out-of-sRGB colors`,code:`/* oklch can describe P3 colors naturally */
/* High chroma values exceed sRGB */
color: oklch(0.63 0.30 29);   /* vivid P3 red */
color: oklch(0.70 0.32 145);  /* vivid P3 green */

/* Browsers auto-gamut-map on sRGB displays */
/* On P3 displays, the full vividness is shown */

/* Check if a color is in sRGB gamut: */
@supports (color: oklch(0 0.3 0)) {
  /* oklch is supported — use it */
}`}]}],a={Fundamentals:`bg-primary-100 text-primary-700`,"Color Properties":`bg-violet-100 text-violet-700`,"Color Harmonies":`bg-amber-100 text-amber-700`,"Color in Design":`bg-emerald-100 text-emerald-700`,"Color in CSS":`bg-rose-100 text-rose-700`};function o(){return(0,r.jsx)(n,{items:i,badgeColors:a,legendLabel:`Category`,labels:t})}export{o as default};