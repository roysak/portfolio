import { CategorizedArticle, UX_LABELS } from "./components";
import type { TopicItem } from "./components";

const topicsData: TopicItem[] = [
  // ── Fundamentals ──────────────────────────────────────────────────────────
  {
    name: "What is Color?", category: "Fundamentals",
    description: "Color is the visual perception produced when light of a specific wavelength stimulates the cone cells in the human eye. It is not an intrinsic property of objects — it is a product of light, surface, and the observer's visual system.",
    syntax: "Color = Light wavelength + Surface reflectance + Human perception.",
    notes: "The visible spectrum spans roughly 380–700 nm. Objects appear colored because they absorb certain wavelengths and reflect others. The human eye has three types of cone cells (S, M, L) sensitive to short (blue), medium (green), and long (red) wavelengths — the basis of all color models.",
    returns: "A perceived hue, saturation, and lightness — the three perceptual dimensions of color.",
    variations: [
      { title: "Light vs pigment", code: "Light (additive): Red + Green + Blue → White\n  Used by: screens, projectors, LEDs\n  Model: RGB\n\nPigment (subtractive): Cyan + Magenta + Yellow → Black\n  Used by: ink, paint, printers\n  Model: CMYK\n\nKey difference:\n  Adding light → brighter (converges on white)\n  Mixing pigment → darker (converges on black)" },
      { title: "The visible spectrum", code: "Wavelength  Color\n~380–450 nm  Violet\n~450–495 nm  Blue\n~495–570 nm  Green\n~570–590 nm  Yellow\n~590–620 nm  Orange\n~620–700 nm  Red\n\nBelow 380 nm → Ultraviolet (invisible)\nAbove 700 nm → Infrared (invisible)" },
    ],
  },
  {
    name: "The Color Wheel", category: "Fundamentals",
    description: "The color wheel is a circular arrangement of hues that shows the relationships between primary, secondary, and tertiary colors. It is the foundation for understanding color harmony.",
    syntax: "Primary → Secondary → Tertiary — arranged in a 360° hue circle.",
    notes: "The traditional RYB (Red-Yellow-Blue) wheel is used in art and painting. The RGB wheel (Red-Green-Blue) is used in digital design. They differ in how secondary colors are derived — mixing red and blue in RYB gives purple, in RGB it gives magenta.",
    returns: "A map of color relationships that guides palette selection and harmony.",
    variations: [
      { title: "RYB wheel (traditional art)", code: "Primary:    Red, Yellow, Blue\nSecondary:  Orange (R+Y), Green (Y+B), Violet (B+R)\nTertiary:   Red-Orange, Yellow-Orange, Yellow-Green,\n            Blue-Green, Blue-Violet, Red-Violet\n\nUsed in: painting, illustration, traditional design education" },
      { title: "RGB wheel (digital design)", code: "Primary:    Red, Green, Blue\nSecondary:  Yellow (R+G), Cyan (G+B), Magenta (R+B)\nTertiary:   Yellow-Green, Cyan-Green, Cyan-Blue,\n            Blue-Magenta, Red-Magenta, Yellow-Red\n\nUsed in: screens, web design, digital art, CSS" },
      { title: "Hue as an angle", code: "In HSL / HSB / LCH:\n  0°   / 360° → Red\n  30°         → Orange\n  60°         → Yellow\n  120°        → Green\n  180°        → Cyan\n  240°        → Blue\n  300°        → Magenta\n\nOpposite hues (complementary) = 180° apart on the wheel" },
    ],
  },
  {
    name: "Color Models", category: "Fundamentals",
    description: "A color model is a mathematical system for representing color as a set of numbers. Different models are suited to different purposes — display, print, perceptual uniformity, or human intuition.",
    syntax: "RGB, HSL, HSB, CMYK, LAB, LCH, OKLCH — each encodes color differently.",
    notes: "No single model is universally best. RGB is native to screens. HSL/HSB map to human intuition about color. LAB and OKLCH are perceptually uniform — equal numerical changes produce equal perceived changes — making them superior for interpolation and accessibility calculations.",
    returns: "A numeric representation of color suited to a specific use case.",
    variations: [
      { title: "RGB — screen native", code: "rgb(255, 0, 0)     → pure red\nrgb(0, 128, 255)   → sky blue\nrgb(255, 255, 255) → white\nrgb(0, 0, 0)       → black\n\nValues: 0–255 per channel (or 0%–100%)\nHex shorthand: #RRGGBB → #ff0000 = red" },
      { title: "HSL — human-intuitive", code: "hsl(hue, saturation%, lightness%)\n\nhsl(0,   100%, 50%)  → pure red\nhsl(120, 100%, 50%)  → pure green\nhsl(240, 100%, 50%)  → pure blue\nhsl(0,     0%, 50%)  → medium gray\nhsl(200,  80%, 60%)  → light sky blue\n\nH: 0–360°  S: 0–100%  L: 0–100%" },
      { title: "OKLCH — perceptually uniform", code: "oklch(lightness chroma hue)\n\noklch(0.63 0.26 29)   → a vivid red\noklch(0.75 0.18 145)  → a vivid green\noklch(0.55 0.21 264)  → a vivid blue\noklch(0.5  0    0)    → medium gray\n\nL: 0–1   C: 0–0.4+   H: 0–360°\nBest for: accessible palettes, smooth gradients" },
      { title: "CMYK — print", code: "cmyk(cyan%, magenta%, yellow%, key/black%)\n\ncmyk(0, 100, 100, 0)  → red\ncmyk(100, 0, 100, 0)  → green\ncmyk(100, 100, 0, 0)  → blue\ncmyk(0, 0, 0, 100)    → black\n\nUsed by: offset printing, laser/inkjet printers\nNot used in CSS or web design directly" },
    ],
  },

  // ── Color Properties ──────────────────────────────────────────────────────
  {
    name: "Hue", category: "Color Properties",
    description: "Hue is the attribute of color that allows it to be described as red, orange, yellow, green, blue, or violet — the pure chromatic identity of a color. It is independent of how light or dark, or how vivid or muted, the color appears.",
    syntax: "Hue = position on the color wheel (0°–360°).",
    notes: "Two colors with the same hue but different saturation or lightness are still considered shades/tints of the same hue. Hue shift is a common technique in gradients — slightly rotating the hue as lightness changes produces more natural-looking transitions.",
    returns: "The base color identity — red, blue, green, etc. — without reference to brightness or saturation.",
    variations: [
      { title: "Hue in HSL", code: "hsl(0,   100%, 50%)  → Red\nhsl(60,  100%, 50%)  → Yellow\nhsl(120, 100%, 50%)  → Green\nhsl(180, 100%, 50%)  → Cyan\nhsl(240, 100%, 50%)  → Blue\nhsl(300, 100%, 50%)  → Magenta\n\nOnly the first value (hue angle) changes — same saturation and lightness." },
      { title: "Hue shift in gradients", code: "/* Naive gradient — muddy in the middle */\nbackground: linear-gradient(\n  hsl(0, 100%, 50%),    /* red */\n  hsl(240, 100%, 50%)   /* blue */\n);\n\n/* Hue-shifted gradient — vivid throughout */\nbackground: linear-gradient(\n  in oklch,\n  oklch(0.63 0.26 29),\n  oklch(0.55 0.21 264)\n);" },
    ],
  },
  {
    name: "Saturation & Chroma", category: "Color Properties",
    description: "Saturation describes the intensity or purity of a color — how far it departs from a neutral gray. Chroma is the perceptually uniform equivalent used in LAB and OKLCH. High saturation = vivid; low saturation = muted or gray.",
    syntax: "HSL: saturation 0%–100%. OKLCH: chroma 0–0.4+.",
    notes: "Saturation in HSL is relative — it depends on the lightness level, making fully saturated dark and light colors look washed out. Chroma in OKLCH is absolute — a chroma of 0.2 means the same perceptual intensity regardless of lightness, making it better for consistent palette building.",
    returns: "The vividness of a color — the degree of departure from gray.",
    variations: [
      { title: "Saturation scale", code: "hsl(200, 0%,   50%)  → Gray (no saturation)\nhsl(200, 25%,  50%)  → Muted blue-gray\nhsl(200, 50%,  50%)  → Moderate blue\nhsl(200, 75%,  50%)  → Vivid blue\nhsl(200, 100%, 50%)  → Pure vivid blue" },
      { title: "Saturation in design", code: "High saturation (80–100%):\n  → Accents, CTAs, alerts, brand colors\n  → Use sparingly — fatiguing if overused\n\nMedium saturation (30–60%):\n  → UI components, backgrounds, illustrations\n  → Approachable and professional\n\nLow saturation (0–20%):\n  → Text, borders, subtle backgrounds\n  → Neutral and unobtrusive" },
    ],
  },
  {
    name: "Lightness, Value & Brightness", category: "Color Properties",
    description: "Lightness (HSL) and Value/Brightness (HSB) describe how light or dark a color is — from black to white. They are related but not identical: in HSL, 50% is the 'pure' hue; in HSB, 100% value is the pure hue.",
    syntax: "HSL: lightness 0% (black) → 50% (pure hue) → 100% (white).\nHSB: brightness 0% (black) → 100% (pure hue).",
    notes: "HSL's 50% pure hue point can be unintuitive — moving from 50% to 100% lightness washes the color to white, not just brightens it. OKLCH lightness is perceptually uniform: 0.5 always looks equally bright regardless of hue, unlike HSL where yellow at 50% looks much brighter than blue at 50%.",
    returns: "The perceived luminosity of a color on a scale from black to white.",
    variations: [
      { title: "HSL lightness scale", code: "hsl(200, 100%, 0%)   → Black (always black)\nhsl(200, 100%, 25%)  → Dark blue\nhsl(200, 100%, 50%)  → Pure vivid blue\nhsl(200, 100%, 75%)  → Light blue (tint)\nhsl(200, 100%, 100%) → White (always white)" },
      { title: "Tint, shade, tone", code: "Pure hue: hsl(200, 100%, 50%)\n\nTint   (add white): increase lightness\n  hsl(200, 100%, 70%)  → light blue\n\nShade  (add black): decrease lightness\n  hsl(200, 100%, 30%)  → dark blue\n\nTone   (add gray):  reduce saturation\n  hsl(200, 40%, 50%)   → muted blue" },
    ],
  },
  {
    name: "Color Temperature", category: "Color Properties",
    description: "Color temperature describes the warmth or coolness of a color. Warm colors (reds, oranges, yellows) suggest energy, warmth, and urgency. Cool colors (blues, greens, purples) suggest calm, trust, and distance.",
    syntax: "Warm: reds → oranges → yellows. Cool: blues → greens → violets.",
    notes: "Temperature is relative — a warm gray contains more red/yellow; a cool gray contains more blue. The same hue can feel warmer or cooler depending on surrounding colors (simultaneous contrast). In photography, color temperature is measured in Kelvin: 3000K = warm (incandescent), 6500K = cool (daylight).",
    returns: "The psychological warmth or coolness impression of a color.",
    variations: [
      { title: "Warm vs cool examples", code: "Warm colors (energy, urgency, appetite):\n  Red      hsl(0,   100%, 50%)\n  Orange   hsl(30,  100%, 50%)\n  Yellow   hsl(60,  100%, 50%)\n  Amber    hsl(45,  100%, 50%)\n\nCool colors (calm, trust, depth):\n  Green    hsl(120, 60%, 45%)\n  Teal     hsl(180, 60%, 40%)\n  Blue     hsl(220, 80%, 50%)\n  Violet   hsl(270, 60%, 50%)" },
      { title: "Temperature in UI design", code: "Warm:\n  → Call-to-action buttons (urgency)\n  → Warning and error states\n  → Food, hospitality, energy brands\n\nCool:\n  → Trust-building (banking, healthcare)\n  → Technology and SaaS products\n  → Calm and focus-oriented UIs\n\nNeutral (mixed temperature):\n  → Versatile backgrounds and surfaces\n  → Works alongside any accent color" },
    ],
  },

  // ── Color Harmonies ───────────────────────────────────────────────────────
  {
    name: "Complementary", category: "Color Harmonies",
    description: "Complementary colors sit directly opposite each other on the color wheel (180° apart). Together they create maximum contrast and visual tension — each makes the other appear more vivid.",
    syntax: "Hue A and Hue A + 180° = complementary pair.",
    notes: "Pure complementary pairings (e.g. red/green, blue/orange) can create vibrating visual effects when placed at equal saturation and similar lightness — use carefully, especially at small text sizes. Softening one color with lower saturation or different lightness reduces this effect.",
    returns: "Maximum contrast and vibrance — each color intensifies the other.",
    variations: [
      { title: "Common complementary pairs", code: "Red      / Cyan     (0° / 180°)\nOrange   / Blue     (30° / 210°)\nYellow   / Violet   (60° / 240°)\nGreen    / Magenta  (120° / 300°)\n\nIn digital design:\n  Primary blue + CTA orange → classic SaaS pairing\n  Dark navy + warm gold → premium / luxury feel" },
      { title: "Safe complementary use", code: "/* Avoid equal-saturation clashing */\nDO:    dark navy background + vivid orange accent\nDON'T: vivid red text on vivid green background\n\n/* Split the dominance — one dominant, one accent */\n~80% of UI: blue (dominant)\n~20% of UI: orange (accent, CTAs only)\n\n/* Desaturate one side for readability */\nhsl(220, 70%, 25%)  + hsl(40, 90%, 55%)" },
    ],
  },
  {
    name: "Analogous", category: "Color Harmonies",
    description: "Analogous colors are groups of 3–5 colors that sit adjacent to each other on the color wheel (within 30–60° of each other). They create harmonious, natural palettes with low contrast.",
    syntax: "Hue A, A ± 30°, A ± 60° — adjacent hues on the wheel.",
    notes: "Analogous palettes are soothing and cohesive but can lack contrast for UI hierarchy. Add contrast using lightness and saturation variation within the group rather than introducing a distant hue. Nature is full of analogous color schemes — sunsets, forests, oceans.",
    returns: "A harmonious, low-tension palette that feels natural and cohesive.",
    variations: [
      { title: "Example palettes", code: "Warm earth tones (analogous):\n  Red-Orange  hsl(15,  80%, 55%)\n  Orange      hsl(30,  85%, 55%)\n  Yellow-Orange hsl(45, 80%, 55%)\n\nOcean blues (analogous):\n  Cyan-Green  hsl(165, 60%, 45%)\n  Teal        hsl(185, 65%, 40%)\n  Blue        hsl(205, 70%, 45%)" },
      { title: "Adding contrast", code: "/* Analogous = similar hues, so vary other dimensions */\n\n/* Use lightness for hierarchy */\nhsl(220, 70%, 20%)  → Dark header text\nhsl(220, 60%, 45%)  → Body / interactive\nhsl(220, 50%, 75%)  → Muted backgrounds\nhsl(220, 40%, 92%)  → Subtle borders\n\n/* Or vary saturation to distinguish priority */\nhsl(220, 80%, 50%)  → Primary action\nhsl(220, 30%, 50%)  → Secondary action" },
    ],
  },
  {
    name: "Triadic", category: "Color Harmonies",
    description: "A triadic palette uses three colors evenly spaced around the color wheel (120° apart). It creates a vibrant, high-energy palette with strong contrast while maintaining balance.",
    syntax: "Hue A, A + 120°, A + 240° — three equidistant hues.",
    notes: "Triadic schemes are visually rich but challenging to balance — they work best when one color dominates and the other two serve as accents. Pure triadic combos at high saturation can feel garish; desaturating two of the three and varying lightness brings balance.",
    returns: "A bold, balanced palette with strong visual energy and variety.",
    variations: [
      { title: "Example triadic sets", code: "Primary triadic:\n  Red (0°), Yellow (120°), Blue (240°)\n\nSecondary triadic:\n  Orange (30°), Green (150°), Violet (270°)\n\nCustom example:\n  Blue    hsl(220, 80%, 50%)\n  Red     hsl(340, 75%, 50%)\n  Yellow  hsl(100, 60%, 45%)" },
      { title: "Balancing triadic", code: "60-30-10 rule applied to triadic:\n  60% → dominant (primary brand color)\n  30% → secondary (supporting color)\n  10% → accent (high-energy pop color)\n\nExample:\n  60% navy blue   (backgrounds, text)\n  30% warm gray   (surfaces, cards)\n  10% vivid amber (CTAs, highlights)" },
    ],
  },
  {
    name: "Split-Complementary", category: "Color Harmonies",
    description: "Split-complementary uses a base color and the two colors adjacent to its complement (±30° from the opposite hue). It offers similar contrast to complementary but is less visually jarring and easier to balance.",
    syntax: "Hue A, (A + 150°), (A + 210°) — base + two neighbors of its complement.",
    notes: "Split-complementary is often the safer alternative to full complementary, especially for UI design. The base color dominates, while the two split-complement colors are used as accents and supporting tones.",
    returns: "High contrast with more variety than complementary, and less visual tension.",
    variations: [
      { title: "Example", code: "Base:           Blue      (220°)\nComplement:     Orange    (40°)   ← not used\nSplit-complements:\n  Yellow-Orange  (10°)\n  Red-Orange     (70°)\n\nResult: Blue dominant + warm yellow-red accents\n  → Popular in sports and entertainment branding" },
    ],
  },
  {
    name: "Tetradic (Rectangle & Square)", category: "Color Harmonies",
    description: "Tetradic schemes use four colors arranged as two complementary pairs. A rectangle uses two pairs with uneven spacing; a square uses pairs exactly 90° apart. These offer the richest palettes but are the hardest to balance.",
    syntax: "Rectangle: A, A+60°, A+180°, A+240°. Square: A, A+90°, A+180°, A+270°.",
    notes: "Tetradic palettes work best when one color clearly dominates and the others serve supporting roles. In UI design, this often means one brand color, one complementary highlight, and two neutralised variants for backgrounds and text.",
    returns: "A rich, complex palette with four hue relationships — requires disciplined use to avoid chaos.",
    variations: [
      { title: "Square example", code: "Four colors, 90° apart:\n  Red      (0°)\n  Yellow   (90°)\n  Green    (180°)\n  Blue-Violet (270°)\n\nBalance approach:\n  → Use one vivid, three muted\n  → Or: one dark, one light, two mid-tone\n  → Vary saturation drastically to create hierarchy" },
      { title: "Rectangle example", code: "Two complementary pairs, uneven spacing:\n  Blue        (220°)\n  Orange      (40°)   ← complement of blue\n  Teal        (175°)\n  Red-Orange  (355°)  ← complement of teal\n\nMore variety than square — the uneven spacing\ncreates two distinct 'moods' within the palette." },
    ],
  },
  {
    name: "Monochromatic", category: "Color Harmonies",
    description: "A monochromatic palette uses a single hue with variations in lightness and saturation. It is the simplest and most cohesive harmony — clean, elegant, and easy to implement.",
    syntax: "One hue, multiple tints (+ white), shades (+ black), and tones (+ gray).",
    notes: "Monochromatic palettes need strong lightness contrast to establish visual hierarchy — without it, everything looks flat. Adding a small accent color (even a neutral warm/cool shift) can energise a monochromatic scheme without breaking its cohesion.",
    returns: "A cohesive, minimal palette — easy to maintain, brand-consistent.",
    variations: [
      { title: "Blue monochromatic scale", code: "hsl(220, 80%, 15%)   → Dark navy (headers, text)\nhsl(220, 70%, 30%)   → Deep blue (primary actions)\nhsl(220, 65%, 45%)   → Medium blue (interactive)\nhsl(220, 55%, 65%)   → Soft blue (hover states)\nhsl(220, 45%, 80%)   → Light blue (backgrounds)\nhsl(220, 30%, 93%)   → Near-white blue (subtle bg)\nhsl(220, 20%, 98%)   → Off-white (page background)" },
      { title: "Design use cases", code: "✓ Brand guidelines and corporate identity\n✓ Data visualisation (sequential colour scales)\n✓ Single-product landing pages\n✓ Photography portfolios (neutral, non-competing)\n\nTip: use warm/cool bias on your neutrals to complement\nthe main hue — warm neutrals for warm hues, cool for cool." },
    ],
  },

  // ── Color in Design ───────────────────────────────────────────────────────
  {
    name: "Contrast & Accessibility", category: "Color in Design",
    description: "Contrast ratio measures the luminance difference between a foreground color and its background. WCAG 2.1 defines minimum contrast requirements to ensure text is legible for users with low vision or color blindness.",
    syntax: "Contrast ratio = (L1 + 0.05) / (L2 + 0.05), where L = relative luminance.",
    notes: "WCAG 3.0 is introducing APCA (Advanced Perceptual Contrast Algorithm) as a replacement for the current ratio-based method, as it better accounts for font weight, size, and polarity. Never rely on color alone to convey meaning — always add text, icons, or patterns as redundant cues.",
    returns: "A ratio between 1:1 (no contrast) and 21:1 (black on white).",
    variations: [
      { title: "WCAG 2.1 requirements", code: "Level AA (minimum):\n  Normal text (< 18pt / < 14pt bold)  → 4.5:1\n  Large text  (≥ 18pt / ≥ 14pt bold)  → 3:1\n  UI components and graphical objects   → 3:1\n\nLevel AAA (enhanced):\n  Normal text  → 7:1\n  Large text   → 4.5:1\n\nExemptions: decorative elements, disabled UI, logos" },
      { title: "Common failing combinations", code: "FAILS AA:\n  Light gray #999 on white #fff  → 2.85:1\n  Yellow #ffff00 on white #fff   → 1.07:1\n  Blue link #0000ff on black     → 2.44:1\n\nPASSES AA:\n  Black #000 on white #fff       → 21:1\n  Dark gray #595959 on white     → 7.0:1\n  Navy #003366 on white          → 12.6:1\n  White on primary-blue #1a6fd4  → 4.6:1" },
      { title: "Testing tools", code: "Browser DevTools:\n  Chrome/Edge: color picker shows contrast ratio\n  Firefox: Accessibility tab shows ratio warnings\n\nOnline tools:\n  WebAIM Contrast Checker — webaim.org/resources/contrastchecker\n  Colour Contrast Analyser — desktop app by TPGi\n  Stark — Figma / Sketch / XD plugin\n\nCSS: new color-contrast() function (limited support)\n  color: color-contrast(white vs blue, navy, teal);" },
    ],
  },
  {
    name: "Color Blindness", category: "Color in Design",
    description: "Color blindness affects approximately 8% of males and 0.5% of females (worldwide). The most common form is red-green color blindness (deuteranopia/protanopia). Design that relies solely on color excludes these users.",
    syntax: "Never use color alone to convey meaning — pair with text, icons, or patterns.",
    notes: "Deuteranopia (green-weak) and protanopia (red-weak) are the most common, making red/green combinations especially problematic. Blue-yellow color blindness (tritanopia) is rarer. Achromatopsia (no color vision at all) affects ~0.003% of people.",
    returns: "A more inclusive design that communicates effectively regardless of color perception.",
    variations: [
      { title: "Types of color blindness", code: "Deuteranopia   — green-weak (most common, ~5% of males)\nProtanopia     — red-weak (~1% of males)\nDeuteranomaly  — green-shifted (most common form overall)\nProtanomaly    — red-shifted\nTritanopia     — blue-yellow weakness (rare)\nAchromatopsia  — no color perception (very rare)\n\nMost common confusion:\n  Red & Green → appear similar\n  Blue & Purple → appear similar\n  Green & Brown → appear similar" },
      { title: "Design guidelines", code: "✓ Pair color with text labels ('Error: invalid email')\n✓ Use icons alongside color indicators\n✓ Use patterns/textures in charts (not just color fills)\n✓ Ensure sufficient luminance contrast between states\n✓ Use the Coblis simulator or Figma Stark plugin to test\n\n✗ 'Red = error, Green = success' without other indicators\n✗ Line charts differentiated by color alone\n✗ Traffic light (red/amber/green) status without labels" },
      { title: "Safer color pairings", code: "Problematic for red-green blindness:\n  Red + Green at similar lightness\n  Orange + Olive green\n\nSafer alternatives:\n  Blue + Orange (strong contrast, both visible)\n  Purple + Yellow (distinct in most forms)\n  Dark + Light (rely on lightness, not hue)\n\nIn data visualisation:\n  Use Viridis, Cividis, or Okabe-Ito palettes\n  — designed to be distinguishable by all common\n    types of color blindness" },
    ],
  },
  {
    name: "Color Psychology", category: "Color in Design",
    description: "Colors carry psychological associations that influence how users feel and behave. These associations are partly universal (evolutionary), partly cultural, and partly contextual. No color is inherently good or bad — context determines meaning.",
    syntax: "Color associations vary by culture, context, and individual experience.",
    notes: "Color psychology effects are real but often overstated. The same red that signals danger in one context signals passion in another. Cultural variation is significant — white is associated with death in many East Asian cultures, while being associated with purity in Western ones. Test with your actual audience, not just general guidelines.",
    returns: "An understanding of the emotional and behavioural associations colors can carry.",
    variations: [
      { title: "Common associations (Western context)", code: "Red:    Energy, urgency, danger, passion, hunger\n        Used by: Netflix, YouTube, Coca-Cola, McDonalds\n\nOrange: Warmth, enthusiasm, affordability, creativity\n        Used by: Amazon, Harley-Davidson, Fanta\n\nYellow: Optimism, caution, clarity, attention\n        Used by: IKEA, Snapchat, McDonald's arches\n\nGreen:  Nature, health, growth, success, go\n        Used by: Spotify, WhatsApp, Whole Foods\n\nBlue:   Trust, calm, intelligence, stability\n        Used by: Facebook, Samsung, PayPal, LinkedIn\n\nPurple: Luxury, creativity, wisdom, mystery\n        Used by: Cadbury, Hallmark, Twitch\n\nBlack:  Sophistication, power, elegance, premium\n        Used by: Apple, Chanel, Nike\n\nWhite:  Cleanliness, simplicity, space, purity" },
      { title: "Context changes meaning", code: "Red:\n  ✓ Sale tag — urgency, great deal\n  ✓ Sports app — energy, performance\n  ✗ Healthcare app — alarm, danger\n  ✗ Financial dashboard — losses\n\nGreen:\n  ✓ Healthcare — health, safety\n  ✓ Finance — profit, go\n  ✓ Environmental brand — nature\n  ✗ Halloween brand — eerie (paler greens)\n\nRule: Test color choices in your specific context\n      with your specific audience." },
    ],
  },
  {
    name: "60-30-10 Rule", category: "Color in Design",
    description: "The 60-30-10 rule is a simple guideline for distributing colors in a design: 60% dominant color, 30% secondary color, 10% accent color. It creates visual balance without monotony.",
    syntax: "60% dominant + 30% secondary + 10% accent = balanced palette.",
    notes: "The proportions are a guideline, not a law. In UI design, the dominant color is often a neutral (white, off-white, dark gray), the secondary is a mid-toned brand color, and the accent is a vivid, attention-grabbing hue used only for the most important interactive elements.",
    returns: "A visually balanced composition that guides attention naturally.",
    variations: [
      { title: "Applied to a UI", code: "60% — Off-white / light gray (background, surfaces)\n  bg: hsl(220, 15%, 97%)\n\n30% — Brand blue (nav, headers, cards)\n  primary: hsl(220, 70%, 40%)\n\n10% — Vivid amber (CTAs, badges, key highlights)\n  accent: hsl(40, 95%, 55%)\n\nThe accent color should appear rarely enough that\nwhen it does, it immediately draws the eye." },
      { title: "Dark mode adaptation", code: "60% — Deep dark (page background, large surfaces)\n  bg: hsl(220, 20%, 10%)\n\n30% — Mid dark (cards, sidebars, nav)\n  surface: hsl(220, 18%, 18%)\n\n10% — Vivid accent (same as light mode, adjusted)\n  accent: hsl(40, 90%, 60%)  ← slightly lighter for contrast\n\nText: use off-white rather than pure white\n  text: hsl(220, 10%, 90%)" },
    ],
  },
  {
    name: "Color Tokens & Systems", category: "Color in Design",
    description: "Color tokens are named variables that abstract raw color values behind semantic or structural names. They are the foundation of scalable design systems — making theming, dark mode, and brand updates a single-point change.",
    syntax: "Primitive token → Semantic token → Component token.",
    notes: "A three-tier token system separates what a color is (primitive: blue-500 = #3b82f6) from how it is used (semantic: color-primary = blue-500) from where it appears (component: button-bg = color-primary). This allows theming by swapping semantic tokens without touching component styles.",
    returns: "A maintainable, scalable color system that supports theming and multi-brand design.",
    variations: [
      { title: "Three-tier token structure", code: "/* Tier 1: Primitive (raw values, not used in components) */\n--blue-500: #3b82f6;\n--blue-600: #2563eb;\n--gray-100: #f3f4f6;\n\n/* Tier 2: Semantic (meaning, references primitives) */\n--color-primary:    var(--blue-500);\n--color-primary-hover: var(--blue-600);\n--color-surface:    var(--gray-100);\n\n/* Tier 3: Component (per-component, references semantic) */\n--button-bg:        var(--color-primary);\n--button-bg-hover:  var(--color-primary-hover);" },
      { title: "Dark mode with tokens", code: ":root {\n  --color-background: hsl(0, 0%, 100%);\n  --color-text:       hsl(220, 15%, 10%);\n  --color-primary:    hsl(220, 80%, 50%);\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-background: hsl(220, 20%, 10%);\n    --color-text:       hsl(220, 10%, 90%);\n    --color-primary:    hsl(220, 70%, 65%);\n  }\n}\n\n/* Components reference tokens — no changes needed */\n.button { background: var(--color-primary); }" },
    ],
  },

  // ── Color in CSS ──────────────────────────────────────────────────────────
  {
    name: "CSS Color Formats", category: "Color in CSS",
    description: "CSS supports many color formats — from hex and named colors to modern perceptually uniform formats like oklch(). Choosing the right format affects readability, browser support, and the quality of color manipulation.",
    syntax: "hex | rgb() | hsl() | hwb() | lab() | lch() | oklch() | color()",
    notes: "oklch() and color() with wide-gamut color spaces (display-p3, rec2020) can express colors beyond the sRGB gamut that are visible on modern HDR/P3 displays. Always provide an sRGB fallback when using out-of-gamut colors.",
    returns: "A color value the browser can render — choose the format that best fits your use case.",
    variations: [
      { title: "All CSS color formats", code: "/* Named */\ncolor: rebeccapurple;\n\n/* Hex */\ncolor: #3b82f6;\ncolor: #3b82f680;  /* with alpha (last 2 digits) */\n\n/* RGB */\ncolor: rgb(59 130 246);         /* space-separated (modern) */\ncolor: rgb(59, 130, 246);       /* comma-separated (legacy) */\ncolor: rgb(59 130 246 / 50%);   /* with alpha */\n\n/* HSL */\ncolor: hsl(217 91% 60%);\ncolor: hsl(217 91% 60% / 0.5);\n\n/* OKLCH (perceptually uniform) */\ncolor: oklch(0.65 0.21 253);\ncolor: oklch(0.65 0.21 253 / 50%);\n\n/* Wide gamut (P3 display) */\ncolor: color(display-p3 0.2 0.5 0.9);" },
      { title: "Choosing a format", code: "hex       → Quick, copy-paste from design tools. Opaque only (or #rrggbbaa).\nhsl()     → Great for design tokens — readable, tweakable in code.\nrgb()     → When you need precise channel control or JS interop.\noklch()   → Best for palettes, gradients, and accessible color maths.\nhwb()     → Hue + Whiteness + Blackness — intuitive for tints/shades.\n\nAvoid:\n  Hardcoding hex in components — prefer tokens\n  hsl() for gradient midpoints — use oklch() instead" },
    ],
  },
  {
    name: "Color Mixing in CSS", category: "Color in CSS",
    description: "CSS color-mix() lets you blend two colors in a specified color space, enabling dynamic palette generation, tinting, and shading without JavaScript or preprocessors.",
    syntax: "color-mix(in color-space, color1 percentage, color2 percentage)",
    notes: "The color space matters significantly — mixing in oklch produces perceptually even intermediate colors, while mixing in srgb can produce muddy or overly dark midpoints. color-mix() is supported in all major browsers as of 2023.",
    returns: "A blended color in the specified color space.",
    variations: [
      { title: "Basic usage", code: "/* Mix blue and white 50/50 in sRGB */\ncolor: color-mix(in srgb, blue 50%, white);\n\n/* Tint: mix a color with white */\nbackground: color-mix(in oklch, #3b82f6 30%, white);\n\n/* Shade: mix with black */\nbackground: color-mix(in oklch, #3b82f6 70%, black);\n\n/* Omitting percentage: defaults to 50% each */\ncolor: color-mix(in hsl, red, blue);" },
      { title: "Color space comparison", code: "/* Mixing red and green */\n\n/* In sRGB — muddy brown midpoint */\ncolor-mix(in srgb, red, green)  → brownish\n\n/* In HSL — might shift hue unexpectedly */\ncolor-mix(in hsl, red, green)   → yellow (hue rotates)\n\n/* In OKLCH — perceptually even, vivid midpoint */\ncolor-mix(in oklch, red, green) → vibrant yellow-green\n\n/* Recommendation: use oklch for design-quality mixing */" },
      { title: "Theming with color-mix()", code: "/* Generate a scale from one token */\n:root {\n  --brand: hsl(220 80% 50%);\n\n  --brand-100: color-mix(in oklch, var(--brand) 15%, white);\n  --brand-200: color-mix(in oklch, var(--brand) 30%, white);\n  --brand-300: color-mix(in oklch, var(--brand) 50%, white);\n  --brand-700: color-mix(in oklch, var(--brand) 70%, black);\n  --brand-900: color-mix(in oklch, var(--brand) 90%, black);\n}" },
    ],
  },
  {
    name: "CSS Gradients & Color Interpolation", category: "Color in CSS",
    description: "CSS gradients interpolate between colors across a range. The color space used for interpolation determines whether the midpoint is vivid or muddy. Modern CSS lets you specify the interpolation space explicitly.",
    syntax: "linear-gradient(in oklch, color1, color2)",
    notes: "Gradients interpolated in sRGB often produce a dark or desaturated midpoint (the 'gray zone'). Interpolating in oklch or display-p3 maintains perceived brightness and chroma throughout the gradient, producing results that match designer expectations.",
    returns: "A smooth color transition across the chosen color space.",
    variations: [
      { title: "Specifying color space", code: "/* Default sRGB interpolation */\nbackground: linear-gradient(to right, blue, yellow);\n/* → passes through a dark muddy green midpoint */\n\n/* OKLCH interpolation — vivid throughout */\nbackground: linear-gradient(in oklch, blue, yellow);\n/* → passes through vibrant cyan and green midpoints */\n\n/* Shorter hue path (default) */\nbackground: linear-gradient(in oklch, red, blue);\n\n/* Longer hue path (goes the long way round the wheel) */\nbackground: linear-gradient(in oklch longer hue, red, blue);" },
      { title: "Gradient color stops", code: "/* Multiple stops with positions */\nbackground: linear-gradient(\n  in oklch,\n  hsl(220, 80%, 40%) 0%,\n  hsl(220, 80%, 40%) 30%,  /* held solid */\n  hsl(40,  90%, 55%) 70%,\n  hsl(40,  90%, 55%) 100%\n);\n\n/* Radial gradient */\nbackground: radial-gradient(\n  in oklch circle at center,\n  white 0%,\n  oklch(0.55 0.21 264) 100%\n);\n\n/* Conic gradient (pie chart, angular) */\nbackground: conic-gradient(in oklch, red, yellow, green, blue, red);" },
    ],
  },
  {
    name: "Wide-Gamut Color & Display P3", category: "Color in CSS",
    description: "The sRGB color space used by most CSS covers only about 35% of visible colors. Modern displays (iPhone, Mac Retina, most OLED screens) support the Display P3 gamut, which covers ~50% more colors than sRGB — richer reds, greens, and vivid saturated tones.",
    syntax: "color(display-p3 r g b)  — values outside 0–1 may exceed sRGB.",
    notes: "Browsers on sRGB-only displays will gamut-map out-of-gamut colors to the nearest in-gamut equivalent — you do not need to fear broken designs on older screens. Use @media (color-gamut: p3) to progressively enhance with wide-gamut colors.",
    returns: "More vivid, saturated colors on capable displays — sRGB fallback on others.",
    variations: [
      { title: "Progressively enhanced wide-gamut", code: "/* Base: sRGB color for all browsers */\n.button {\n  background: hsl(340, 80%, 50%);\n}\n\n/* Enhanced: P3 color for capable displays */\n@media (color-gamut: p3) {\n  .button {\n    background: color(display-p3 0.85 0.15 0.35);\n  }\n}" },
      { title: "OKLCH out-of-sRGB colors", code: "/* oklch can describe P3 colors naturally */\n/* High chroma values exceed sRGB */\ncolor: oklch(0.63 0.30 29);   /* vivid P3 red */\ncolor: oklch(0.70 0.32 145);  /* vivid P3 green */\n\n/* Browsers auto-gamut-map on sRGB displays */\n/* On P3 displays, the full vividness is shown */\n\n/* Check if a color is in sRGB gamut: */\n@supports (color: oklch(0 0.3 0)) {\n  /* oklch is supported — use it */\n}" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Fundamentals":      "bg-primary-100 text-primary-700",
  "Color Properties":  "bg-violet-100 text-violet-700",
  "Color Harmonies":   "bg-amber-100 text-amber-700",
  "Color in Design":   "bg-emerald-100 text-emerald-700",
  "Color in CSS":      "bg-rose-100 text-rose-700",
};

export default function ColorTheory() {
  return (
    <CategorizedArticle
      items={topicsData}
      badgeColors={categoryColor}
      legendLabel="Category"
      labels={UX_LABELS}
    />
  );
}
