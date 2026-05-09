import{t as e}from"./index-jsx-runtime.js";import{i as t,n}from"./index-components.js";var r=e(),i=[{name:`What is Specificity?`,category:`How Specificity Works`,description:`Specificity is the algorithm browsers use to decide which CSS declaration wins when multiple rules target the same element and property. It is not about the order rules appear — it is a weight calculated from the types of selectors used.`,syntax:`More specific rule wins, regardless of source order.`,notes:`Specificity is only compared within the same cascade origin and layer. If two rules have equal specificity, the later one in source order wins. Specificity does not apply to inherited values — a directly targeted element always beats inheritance.`,returns:`The winning declaration for a given property on a given element.`,variations:[{title:`Basic conflict example`,code:`/* Both target the same <p> — which wins? */
p { color: black; }            /* specificity: (0,0,1) */
.intro { color: blue; }        /* specificity: (0,1,0) */

/* .intro wins — class outweighs type selector.
   Source order doesn't matter here. */`},{title:`Specificity vs source order`,code:`/* Source order only breaks ties in equal specificity */
.card { color: red; }
.card { color: blue; }  /* ← wins (same specificity, later) */

/* But a higher-specificity earlier rule still wins */
#hero { color: green; }   /* wins */
.hero  { color: pink; }   /* loses — lower specificity */`}]},{name:`The (A, B, C) Scoring Model`,category:`How Specificity Works`,description:`Specificity is expressed as three columns — (A, B, C) — where A = ID selectors, B = class/attribute/pseudo-class selectors, and C = type selectors and pseudo-elements. Each column is compared left-to-right; a higher A always beats any B or C.`,syntax:`(A, B, C)  — compare left to right; first difference wins.`,notes:`The columns are not base-10 — (0,1,0) does not equal 10 points. A selector with (0,0,11) still loses to (0,1,0). There is no overflow between columns in the spec (though older browsers occasionally had edge cases). Inline styles sit above this system entirely.`,returns:`A three-column weight that can be compared between competing rules.`,variations:[{title:`Column definitions`,code:`Column A  — ID selectors (#id)
Column B  — Class selectors (.class)
             Attribute selectors ([attr])
             Pseudo-classes (:hover, :nth-child)
Column C  — Type selectors (div, p, h1)
             Pseudo-elements (::before, ::after)

Not counted: Universal selector (*), combinators (+, >, ~, ' ')`},{title:`Scoring examples`,code:`h1                    →  (0, 0, 1)
p.intro               →  (0, 1, 1)
#hero                 →  (1, 0, 0)
a:hover               →  (0, 1, 1)
div > p.note:first-child  →  (0, 2, 2)
#nav .item:hover      →  (1, 2, 0)
*                     →  (0, 0, 0)`},{title:`Left-to-right comparison`,code:`/* Which wins? */
.a .b .c .d .e { color: red; }  /* (0, 5, 0) */
#x             { color: blue; } /* (1, 0, 0) */

/* #x wins — A=1 beats A=0, regardless of B or C */

/* Equal A, compare B: */
#x .a .b { color: red; }   /* (1, 2, 0) */
#x .a    { color: blue; }  /* (1, 1, 0) */
/* first rule wins — higher B */`}]},{name:`Calculating a Selector's Score`,category:`How Specificity Works`,description:`To find a selector's specificity, count each component type separately and place the totals in the (A, B, C) columns. Then compare column by column against competing selectors.`,syntax:`Count IDs → A. Count classes/attrs/pseudo-classes → B. Count types/pseudo-elements → C.`,notes:`Count every part of a compound or complex selector, including those in pseudo-class arguments (except :where()). Combinators (+, >, ~, space, ||) do not contribute to specificity.`,returns:`The (A, B, C) score for any given CSS selector.`,variations:[{title:`Step-by-step calculation`,code:`Selector: nav#main > ul.menu li:hover::before

Break it down:
  nav          → type      → C+1
  #main        → ID        → A+1
  >            → combinator → (nothing)
  ul           → type      → C+1
  .menu        → class     → B+1
  li           → type      → C+1
  :hover       → pseudo-class → B+1
  ::before     → pseudo-element → C+1

Result: (1, 2, 4)`},{title:`Common pitfall: over-counting`,code:`/* Each selector PART is counted once */
div div div div { }  /* (0,0,4) — not (0,0,1) */

.a.b.c { }           /* (0,3,0) — three classes */

/* Combinators add NO score */
.a > .b + .c ~ .d { }  /* (0,4,0) — four classes only */`}]},{name:`Specificity vs Inheritance`,category:`How Specificity Works`,description:`Inherited values have no specificity — any directly applied rule, even with (0,0,0) specificity from the universal selector, overrides an inherited value.`,syntax:`Directly applied style (any specificity) > inherited value.`,notes:`Properties that are inherited by default (color, font, line-height, etc.) pass values down the DOM tree. But if a child element has any rule targeting it for that property, the inherited value is ignored.`,returns:`A direct declaration always wins over inheritance, regardless of specificity.`,variations:[{title:`Inheritance example`,code:`/* Parent rule */
body { color: navy; }   /* color inherits to all children */

/* Child rule — even (0,0,0) beats inheritance */
* { color: black; }     /* overrides inherited navy */

/* To restore inheritance explicitly */
p { color: inherit; }   /* opts back in to parent's color */`},{title:`Forcing inheritance`,code:`/* Sometimes you want to inherit, not override */
a {
  color: inherit;    /* use parent's color, not browser default */
}

/* Or reset everything to inherited value */
.reset {
  all: inherit;
}`}]},{name:`Universal & Combinators — (0,0,0)`,category:`Selector Weights`,description:`The universal selector (*) and all combinators (>, +, ~, space, ||) contribute zero specificity. They are useful for targeting elements without raising the specificity bar.`,syntax:`* { }   →  (0, 0, 0)`,notes:`A zero-specificity rule will still beat an inherited value, but loses to any rule that has any specificity at all. Using * is common in CSS resets and low-specificity base styles.`,returns:`(0, 0, 0) — the lowest possible non-inherited specificity.`,variations:[{title:`Universal selector`,code:`* { box-sizing: border-box; }  /* (0,0,0) */

/* Combinator has no score of its own */
.parent > * { margin: 0; }     /* (0,1,0) — only .parent counts */

/* Useful: target all children without locking specificity */
.card > * + * { margin-top: 1rem; }  /* (0,1,0) */`},{title:`Combinator examples`,code:`/* None of these combinators add any score */
div p          { }  /* (0,0,2) — descendant */
div > p        { }  /* (0,0,2) — child */
h2 + p         { }  /* (0,0,2) — adjacent sibling */
h2 ~ p         { }  /* (0,0,2) — general sibling */
col || td      { }  /* (0,0,2) — column (table) */`}]},{name:`Type Selectors & Pseudo-elements — (0,0,1)`,category:`Selector Weights`,description:`Type selectors (element names like div, p, h1) and pseudo-elements (::before, ::after, ::first-line, etc.) each add 1 to the C column.`,syntax:`element  →  (0, 0, 1)
::pseudo-element  →  (0, 0, 1)`,notes:`::before and ::after are the most common pseudo-elements. Note the double-colon syntax (CSS3+); single-colon (:before) still works but is legacy. Type selectors are the weakest real selectors — easy to override with a class.`,returns:`(0, 0, n) — where n is the number of type selectors and pseudo-elements.`,variations:[{title:`Type selectors`,code:`h1     { font-size: 2rem; }   /* (0,0,1) */
div p  { color: gray; }       /* (0,0,2) */
ul li  { list-style: disc; }  /* (0,0,2) */`},{title:`Pseudo-elements`,code:`p::first-line  { font-weight: bold; }  /* (0,0,2) */
a::after       { content: ' ↗'; }      /* (0,0,2) */

/* Stacks with other selectors */
.note::before  { content: '⚠ '; }      /* (0,1,1) */`},{title:`All pseudo-elements`,code:`::before        /* generated content before element */
::after         /* generated content after element  */
::first-line    /* first rendered line of a block    */
::first-letter  /* first letter of a block           */
::placeholder   /* input placeholder text            */
::selection     /* user-selected text                */
::marker        /* list item bullet / number         */
::backdrop      /* behind <dialog> / fullscreen      */`}]},{name:`Class, Attribute & Pseudo-class — (0,1,0)`,category:`Selector Weights`,description:`Class selectors (.name), attribute selectors ([attr]), and pseudo-classes (:hover, :focus, :nth-child, etc.) each add 1 to the B column. One class always outweighs any number of type selectors.`,syntax:`.class  →  (0, 1, 0)
[attr]  →  (0, 1, 0)
:pseudo-class  →  (0, 1, 0)`,notes:`Even attribute selectors that match very broadly (like [class]) still only score (0,1,0). :not(), :is(), and :has() are special — they adopt the highest specificity of their arguments (see 'Special Selectors'). :where() always scores (0,0,0).`,returns:`(0, n, 0) — where n is the count of classes, attributes, and pseudo-classes.`,variations:[{title:`Class selectors`,code:`.card          { padding: 1rem; }    /* (0,1,0) */
.card.featured { border: 2px solid; } /* (0,2,0) */
.nav .item     { color: white; }      /* (0,2,0) */`},{title:`Attribute selectors`,code:`[type="text"]         { border: 1px solid; }  /* (0,1,0) */
a[href^="https"]      { color: green; }       /* (0,1,1) */
input[disabled]       { opacity: 0.5; }       /* (0,1,1) */
[data-theme="dark"]   { background: #000; }   /* (0,1,0) */`},{title:`Pseudo-classes`,code:`:hover         →  (0,1,0)
:focus         →  (0,1,0)
:nth-child(2)  →  (0,1,0)
:not(.active)  →  (0,1,0)  ← argument's specificity
:is(.a, #b)    →  (1,0,0)  ← highest argument wins
:where(.a, #b) →  (0,0,0)  ← always zero`}]},{name:`ID Selectors — (1,0,0)`,category:`Selector Weights`,description:`ID selectors (#id) add 1 to the A column — the highest specificity column. A single ID outweighs any number of classes or type selectors.`,syntax:`#id  →  (1, 0, 0)`,notes:`IDs should be unique per page, making them inflexible for reusable styles. Prefer classes over IDs in CSS to keep specificity manageable. If you must target an element with an ID, use an attribute selector [id='name'] to get class-level specificity instead.`,returns:`(1, 0, 0) — beats any class- or type-only selector.`,variations:[{title:`ID vs class conflict`,code:`#header { color: red; }    /* (1,0,0) */
.header { color: blue; }   /* (0,1,0) */

/* #header wins on any element that has both */

/* Even a mountain of classes can't beat one ID */
.a.b.c.d.e.f { color: blue; }  /* (0,6,0) */
#x            { color: red; }   /* (1,0,0) — still wins */`},{title:`Reducing ID specificity`,code:`/* Target an ID element at class-level specificity */
[id="hero"]        { color: blue; }  /* (0,1,0) */

/* Useful when overriding third-party CSS that uses IDs */
[id="widget"] .btn { color: green; } /* (0,2,0) */`},{title:`ID in complex selectors`,code:`#nav .item:hover { color: white; }  /* (1,2,0) */
/*      ↑     ↑      ↑
        A=1   B=1    B+1 (pseudo-class)
                     Total: (1,2,0) */`}]},{name:`Inline Styles — above (1,0,0)`,category:`Selector Weights`,description:`Inline styles written directly on an element via the style attribute beat all selector-based rules, regardless of specificity. They are not part of the (A,B,C) system — they exist above it.`,syntax:`<div style="color: red;">  →  beats any stylesheet rule`,notes:`Inline styles can still be overridden with !important in a stylesheet. Avoid inline styles in production CSS — they are hard to override and create tight coupling between markup and presentation. React's style prop and CSS-in-JS libraries produce inline styles.`,returns:`Wins over any selector-based rule unless the stylesheet rule uses !important.`,variations:[{title:`Inline vs stylesheet`,code:`/* Stylesheet */
#hero .title { color: blue; }  /* (1,1,0) — loses */

<!-- HTML -->
<h1 id="hero" class="title" style="color: red;">
  Always red — inline style wins
</h1>`},{title:`Overriding inline with !important`,code:`/* The only way to override an inline style from CSS */
.title {
  color: green !important;  /* beats inline style */
}`},{title:`React / CSS-in-JS`,code:`// These produce inline styles — hard to override from CSS
<div style={{ color: 'red' }} />

// Prefer className-based approaches for overridability
<div className={styles.hero} />`}]},{name:`!important — override all`,category:`Selector Weights`,description:`Adding !important to a declaration removes it from the normal specificity competition. An !important rule beats all non-important rules, regardless of specificity. When two !important rules conflict, specificity is used to choose between them.`,syntax:`property: value !important;`,notes:`!important is a last resort — it breaks the natural cascade and makes future overrides require yet another !important, escalating maintenance cost. Legitimate uses: accessibility overrides, utility classes (like Tailwind), and overriding third-party styles you cannot change.`,returns:`Wins over all non-!important declarations. When two !important rules compete, higher specificity wins.`,variations:[{title:`Basic usage`,code:`.card { color: blue; }

/* Override from a utility class */
.text-red { color: red !important; }  /* wins */

/* Even an inline style loses to !important in a sheet */
.force-dark {
  background: #000 !important;  /* beats style='background:white' */
}`},{title:`!important vs !important`,code:`/* When two !important rules conflict, specificity decides */
p       { color: blue !important; }   /* (0,0,1) */
.intro  { color: green !important; }  /* (0,1,0) — wins */
#hero   { color: red !important; }    /* (1,0,0) — wins */

/* All with !important — normal specificity logic applies */`},{title:`Alternatives to !important`,code:`/* Instead of escalating specificity with !important: */

/* 1. Add a class closer to the element */
.card.is-active { color: red; }  /* higher specificity */

/* 2. Use @layer to control override order */
@layer base { p { color: black; } }
@layer theme { p { color: blue; } }  /* later layer wins */

/* 3. Use :where() to keep base styles at zero specificity */
:where(p) { color: black; }  /* any class can override */`}]},{name:`The Full Cascade Algorithm`,category:`The Cascade`,description:`Before specificity is even compared, the browser runs through a set of higher-priority cascade stages. Specificity only applies within the same origin, layer, and importance level.`,syntax:`Origin+Importance → @layer → Specificity → Source Order`,notes:`Most day-to-day CSS conflicts are resolved at the specificity or source order stage. Understanding the full algorithm is essential when working with @layer, third-party stylesheets, or browser/user agent styles.`,returns:`The single winning declaration for each property on each element.`,variations:[{title:`Full cascade priority order`,code:`Highest priority first:

1. Transition declarations
2. User-agent !important rules
3. User !important rules
4. Author !important rules (your CSS, reversed layer order)
5. Animation declarations
6. Author normal rules (your CSS, in layer order)
7. User normal rules
8. User-agent normal rules

Within each stage: later @layers win → higher specificity → later source order`},{title:`Author vs user agent styles`,code:`/* Browser applies its default sheet (user-agent origin) */
h1 { font-size: 2em; font-weight: bold; }
a  { color: blue; text-decoration: underline; }

/* Your stylesheet (author origin) overrides it */
a { color: inherit; text-decoration: none; }  /* wins */

/* User can override via browser settings or extensions */
/* Their !important rules even override your !important */`}]},{name:`@layer — Cascade Layers`,category:`The Cascade`,description:`Cascade layers let you explicitly divide your CSS into ordered layers. Later layers win over earlier ones, regardless of specificity. Rules outside any layer always win over all layered rules.`,syntax:`@layer layerName { ... }
@layer base, components, utilities;`,notes:`Layers were designed to solve specificity wars with third-party CSS. By placing third-party styles in an early layer, your unlayered overrides always win — no !important needed. Unlayered (implicit) styles have higher priority than any named layer.`,returns:`A deterministic override order controlled by layer declaration sequence, not specificity.`,variations:[{title:`Declaring and using layers`,code:`/* Declare order first — earlier = lower priority */
@layer base, components, utilities;

@layer base {
  p { color: black; margin: 0; }
  a { color: blue; }
}

@layer components {
  .card p { color: gray; }  /* wins over base, even same specificity */
}

@layer utilities {
  .text-red { color: red; }  /* wins over everything layered */
}

/* Unlayered rule — wins over ALL layers */
p { color: green; }  /* strongest, no layer */`},{title:`Third-party isolation`,code:`/* Import a library into a low-priority layer */
@layer vendor {
  @import url('third-party.css');
}

/* Now your unlayered CSS always overrides the library */
/* No !important needed, no specificity battles */
.button { background: blue; }  /* wins over vendor styles */`},{title:`Nested layers`,code:`@layer components {
  @layer base {         /* components.base */
    .btn { padding: 0.5rem; }
  }
  @layer variants {     /* components.variants */
    .btn-lg { padding: 1rem; }  /* wins over components.base */
  }
}

/* You can also refer to nested layers from outside */
@layer components.base {
  .btn { border-radius: 4px; }
}`},{title:`!important reverses layer order`,code:`/* Normal: later layer wins */
@layer base      { p { color: black; } }
@layer utilities { p { color: red; }   }  /* wins */

/* !important: EARLIER layer wins */
@layer base      { p { color: black !important; } }  /* wins! */
@layer utilities { p { color: red !important; }   }

/* !important reverses the layer priority — base !important
   beats utilities !important */`}]},{name:`Specificity Within @layer`,category:`The Cascade`,description:`Inside a single @layer, the normal specificity rules apply exactly as they would without layers. Layers only control the priority between themselves — within a layer, higher specificity still wins.`,syntax:`Within a layer: higher (A,B,C) wins. Across layers: layer order wins.`,notes:`A low-specificity rule in a later layer still beats a high-specificity rule in an earlier layer. This is the key insight of @layer — you can write low-specificity code in later layers and it will still override earlier layers.`,returns:`Layer order → specificity → source order (within a layer).`,variations:[{title:`Cross-layer specificity`,code:`@layer base, utilities;

@layer base {
  #hero h1 { color: navy; }  /* (1,0,1) — very high specificity */
}

@layer utilities {
  .text-red { color: red; }  /* (0,1,0) — low specificity */
}

/* .text-red WINS — later layer beats earlier layer
   regardless of specificity */`},{title:`Within-layer specificity`,code:`@layer base {
  p        { color: black; }  /* (0,0,1) */
  .intro p { color: gray; }   /* (0,1,1) — wins within this layer */
}

/* Normal specificity rules still apply inside each layer */`}]},{name:`Cascade Origins & the User`,category:`The Cascade`,description:`CSS declarations can come from three origins: the browser (user-agent), the user (browser settings or extensions), and the author (your stylesheet). Each origin has its own priority level, and !important reverses those priorities.`,syntax:`Normal: author > user > user-agent
!important: user-agent > user > author`,notes:`User stylesheets are rare in modern browsers but are important for accessibility. A user's !important rule can override any author rule — this is intentional, to preserve user control over their browsing experience.`,returns:`An understanding of where styles come from and which origin takes precedence.`,variations:[{title:`Origin priority`,code:`/* User-agent (browser default) */
h1 { font-size: 2em; }

/* User (browser extensions, reader mode, etc.) */
body { font-size: 18px !important; }  /* beats author !important */

/* Author (your CSS) */
h1 { font-size: 3rem; }  /* overrides user-agent normal */`},{title:`Respecting user preferences`,code:`/* Honour the user's OS-level preference */
@media (prefers-color-scheme: dark) {
  :root { --bg: #1a1a1a; --text: #f0f0f0; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`}]},{name:`:where() — Zero Specificity`,category:`Special Selectors`,description:`:where() takes a selector list as its argument and matches everything its arguments match, but contributes zero specificity — regardless of what is inside it.`,syntax:`:where(selector-list)  →  (0, 0, 0)`,notes:`This makes :where() ideal for writing base/reset styles that are easy to override with any downstream selector. It is the perfect alternative to * when you want to be specific about what you target without locking in any specificity.`,returns:`(0, 0, 0) — always zero, regardless of argument specificity.`,variations:[{title:`Base styles without specificity debt`,code:`/* Without :where() — specificity is (0,1,1) */
ul.list li { margin: 0; }

/* With :where() — specificity is (0,0,0) */
:where(ul.list) li { margin: 0; }
/* Now any class can override: */
.tight-list { margin: 2px; }  /* (0,1,0) — wins easily */`},{title:`Reset stylesheet pattern`,code:`/* A zero-specificity reset — anything overrides it */
:where(h1, h2, h3, h4, h5, h6) {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
}

:where(ul, ol) {
  list-style: none;
  padding: 0;
  margin: 0;
}`},{title:`Contrast with :is()`,code:`:where(#id, .class) { color: red; }  /* (0,0,0) */
:is(#id, .class)    { color: blue; } /* (1,0,0) — highest arg wins */

/* :where = no specificity, :is = adopts argument specificity */`}]},{name:`:is() — Adopts Argument Specificity`,category:`Special Selectors`,description:`:is() takes a selector list and matches all elements that match any item in the list. Its specificity is determined by the MOST SPECIFIC selector in the argument list, even if that specific selector didn't match the element.`,syntax:`:is(selector-list)  →  specificity of highest argument`,notes:`This 'forgiving selector list' means invalid selectors in the list are ignored, not erroring the whole rule. The specificity is fixed at parse time from the argument list — it doesn't change based on which argument actually matched.`,returns:`Specificity of the highest-specificity argument in the list.`,variations:[{title:`Specificity from argument list`,code:`:is(h1, h2, h3) { margin: 0; }   /* (0,0,1) — from type selectors */

:is(.a, .b, .c) { color: red; }  /* (0,1,0) — from class selectors */

:is(#id, .cls)  { color: blue; } /* (1,0,0) — #id is highest arg */
/* Even if the element only matched .cls, score is still (1,0,0) */`},{title:`Practical grouping`,code:`/* Instead of repeating selectors: */
h1 a, h2 a, h3 a { color: inherit; }

/* Use :is() for concise, equivalent result */
:is(h1, h2, h3) a { color: inherit; }  /* (0,0,2) */`},{title:`Forgiving selector list`,code:`/* :is() silently ignores invalid selectors */
:is(.card, ::-unknown-pseudo, .item) {
  padding: 1rem;  /* still applies to .card and .item */
}

/* Without :is(), one invalid selector kills the whole rule */
.card, ::-unknown-pseudo, .item { }  /* entire rule ignored! */`}]},{name:`:not() — Adopts Argument Specificity`,category:`Special Selectors`,description:`:not() excludes elements that match its argument. Like :is(), its specificity comes from the most specific selector in its argument list — not from :not() itself.`,syntax:`:not(selector-list)  →  specificity of highest argument`,notes:`:not() in CSS3 accepted only a single simple selector. In CSS4 (Selectors Level 4), it accepts a full selector list. Chaining :not() with high-specificity arguments can inadvertently raise the specificity of a rule.`,returns:`Specificity of the highest-specificity argument.`,variations:[{title:`Basic exclusion`,code:`/* All links except those in .nav */
a:not(.nav a) { text-decoration: underline; } /* (0,1,1) */

/* All paragraphs except the first */
p:not(:first-child) { margin-top: 1rem; }    /* (0,2,0) */

/* Input elements that are not disabled */
input:not([disabled]) { border-color: blue; } /* (0,2,1) */`},{title:`Specificity gotcha`,code:`:not(#id) { color: blue; }    /* (1,0,0) — from #id argument! */

/* This catches people out — even though the rule
   matches elements WITHOUT that ID, the specificity
   is still (1,0,0) because of the argument */

/* Safer: use :not() with low-specificity arguments */
:not(.active) { opacity: 0.5; }  /* (0,1,0) */`}]},{name:`:has() — Adopts Argument Specificity`,category:`Special Selectors`,description:`:has() is a relational pseudo-class that matches an element if any of its descendants (or relations) match the argument. Its specificity is determined by its highest-specificity argument, same as :is() and :not().`,syntax:`:has(selector-list)  →  specificity of highest argument`,notes:`:has() is not supported in Firefox (unless enabled via flags) as of late 2023, but has broad support in Chrome and Safari. It cannot be used inside another :has() and does not support pseudo-elements as arguments.`,returns:`Specificity of the highest-specificity argument.`,variations:[{title:`Practical examples`,code:`/* Style a card that contains an image */
.card:has(img) { padding: 0; }       /* (0,2,1) */

/* Style a label whose input is checked */
label:has(input:checked) { font-weight: bold; }  /* (0,2,1) */

/* Style a form that has errors */
form:has(.error) { border: 2px solid red; }  /* (0,2,0) */`},{title:`Logical combinations`,code:`/* Has an img but no figcaption */
figure:has(img):not(:has(figcaption)) {
  border: 1px dashed;
}

/* Parent is targeted when child matches */
section:has(h2) { padding-top: 2rem; }

/* Style previous sibling (sort of) */
h2:has(+ p.intro) { margin-bottom: 0.25rem; }`}]},{name:`Specificity of :nth-child(An+B of S)`,category:`Special Selectors`,description:`The extended :nth-child() syntax accepts a selector argument ('of S'). The specificity of the 'of S' argument is added to :nth-child's own pseudo-class specificity.`,syntax:`:nth-child(An+B of selector)  →  (0,1,0) + specificity of 'selector'`,notes:`This syntax is relatively new and support is still catching up. Without the 'of' argument, :nth-child() scores (0,1,0) — just the pseudo-class.`,returns:`Sum of :nth-child's pseudo-class specificity and the 'of' argument's specificity.`,variations:[{title:`With and without 'of S'`,code:`:nth-child(2)             /* (0,1,0) */
:nth-child(2 of .item)    /* (0,2,0) — adds .item's (0,1,0) */
:nth-child(2 of #id)      /* (1,1,0) — adds #id's (1,0,0) */`},{title:`Practical use`,code:`/* Every other .card, starting from the second */
:nth-child(even of .card) {
  background: #f5f5f5;
}

/* Without 'of S', this would also match non-.card elements */
/* that happen to be even children */`}]}],a={"How Specificity Works":`bg-primary-100 text-primary-700`,"Selector Weights":`bg-violet-100 text-violet-700`,"The Cascade":`bg-amber-100 text-amber-700`,"Special Selectors":`bg-emerald-100 text-emerald-700`};function o(){return(0,r.jsx)(n,{items:i,badgeColors:a,legendLabel:`Category`,labels:t})}export{o as default};