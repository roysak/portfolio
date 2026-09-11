import{t as e}from"./index-jsx-runtime.js";import{n as t}from"./index-components.js";var n=e(),r={syntax:`Syntax`,detail:`Notes`,returns:`Key Attributes`,variations:`Examples`},i=[{name:`Document Shell`,category:`Document`,description:`The required skeleton for every HTML page — doctype declaration, root element, head, and body.`,syntax:`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <!-- content -->
  </body>
</html>`,notes:"<!DOCTYPE html> tells the browser to use standards mode — always include it as the very first line. The `lang` attribute on <html> is essential for screen readers and search engines.",returns:`lang, dir (text direction: ltr | rtl)`,variations:[{title:`Minimal shell`,code:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Page</title>
</head>
<body></body>
</html>`}]},{name:`<meta>`,category:`Document`,description:`Provides machine-readable metadata about the document — charset, viewport, description, and social sharing cards.`,syntax:`<meta name="..." content="..." />
<meta property="..." content="..." />
<meta charset="UTF-8" />
<meta http-equiv="..." content="..." />`,notes:"Always place `charset` first in <head>. The viewport meta tag is critical for responsive design. Open Graph (`og:`) and Twitter Card (`twitter:`) meta tags control social previews.",returns:`charset, name, content, property, http-equiv`,variations:[{title:`Viewport`,code:`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`},{title:`SEO description`,code:`<meta name="description" content="A short page summary." />`},{title:`Open Graph`,code:`<meta property="og:title" content="Page Title" />
<meta property="og:image" content="https://example.com/img.png" />
<meta property="og:type" content="website" />`},{title:`Theme color`,code:`<meta name="theme-color" content="#6366f1" />`}]},{name:`<link>`,category:`Document`,description:`Defines relationships between the current document and external resources — stylesheets, icons, preload hints, and canonical URLs.`,syntax:`<link rel="..." href="..." />`,notes:"`preload` fetches a resource early and keeps it in cache (add `as` attribute). `preconnect` warms up the TCP connection to a third-party origin. `prefetch` hints at resources needed for the next page.",returns:`rel, href, type, as, media, crossorigin, sizes`,variations:[{title:`Stylesheet`,code:`<link rel="stylesheet" href="styles.css" />`},{title:`Favicon`,code:`<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />`},{title:`Preload font`,code:`<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />`},{title:`Canonical`,code:`<link rel="canonical" href="https://example.com/page" />`},{title:`Preconnect`,code:`<link rel="preconnect" href="https://fonts.googleapis.com" />`}]},{name:`<script>`,category:`Document`,description:"Embeds or links JavaScript. The `defer` and `async` attributes control how scripts are fetched and executed relative to HTML parsing.",syntax:`<script src="app.js" defer><\/script>
<script src="analytics.js" async><\/script>
<script type="module" src="main.js"><\/script>`,notes:'`defer` downloads in parallel and runs after HTML is parsed (in order). `async` downloads in parallel and runs immediately when ready (out of order). `type="module"` enables ES module syntax and implies `defer`.',returns:`src, type, defer, async, integrity, crossorigin, nomodule`,variations:[{title:`Deferred script`,code:`<script src="app.js" defer><\/script>`},{title:`ES module`,code:`<script type="module" src="main.js"><\/script>`},{title:`Inline script`,code:`<script>
  console.log('Hello');
<\/script>`},{title:`Subresource integrity`,code:`<script src="lib.js"
  integrity="sha384-..."
  crossorigin="anonymous"
><\/script>`}]},{name:`<header> & <footer>`,category:`Semantic Layout`,description:`Landmark regions that mark the introductory content or navigational links (<header>) and closing content (<footer>) of a page or section.`,syntax:`<header>...</header>
<footer>...</footer>`,notes:`Both can appear inside <article> or <section> to act as the header/footer for that region, not just the whole page. Assistive technologies expose them as landmarks.`,returns:`No specific attributes — inherits global attributes.`,variations:[{title:`Page header`,code:`<header>
  <a href="/"><img src="logo.svg" alt="Company" /></a>
  <nav>...</nav>
</header>`},{title:`Article footer`,code:`<article>
  <h2>Post Title</h2>
  <p>Content...</p>
  <footer>
    <time datetime="2026-05-12">May 12, 2026</time>
  </footer>
</article>`}]},{name:`<nav>`,category:`Semantic Layout`,description:`Marks a section of major navigation links — the browser and screen readers expose it as a navigation landmark.`,syntax:`<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>`,notes:'Use `aria-label` when a page has multiple <nav> elements to distinguish them (e.g., "Main" vs "Breadcrumb"). Not every group of links needs a <nav> — reserve it for primary navigation blocks.',returns:`aria-label, aria-labelledby`,variations:[{title:`Breadcrumb nav`,code:`<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li aria-current="page">Article</li>
  </ol>
</nav>`}]},{name:`<main>, <article>, <section>`,category:`Semantic Layout`,description:`Core page-structure elements: <main> is the dominant content area, <article> is self-contained and syndication-ready, <section> groups thematically related content.`,syntax:`<main>...</main>
<article>...</article>
<section>...</section>`,notes:`A page should have exactly one <main>. <article> should make sense on its own when extracted (blog posts, cards, comments). <section> should always have a heading to label the group.`,returns:`No specific attributes — inherits global attributes.`,variations:[{title:`Page structure`,code:`<main>
  <section>
    <h2>Featured</h2>
    <article>...</article>
  </section>
</main>`}]},{name:`<aside>`,category:`Semantic Layout`,description:`Marks content that is tangentially related to the surrounding content — sidebars, pull quotes, ads, or supplementary information.`,syntax:`<aside>
  <h2>Related Articles</h2>
  <ul>...</ul>
</aside>`,notes:`When nested inside an <article>, <aside> is related to that article. When a direct child of <body> or <main>, it is related to the page as a whole.`,returns:`No specific attributes — inherits global attributes.`,variations:[{title:`Sidebar`,code:`<aside aria-label="Sidebar">
  <section>
    <h2>Tags</h2>
    ...
  </section>
</aside>`}]},{name:`<figure> & <figcaption>`,category:`Semantic Layout`,description:`Groups self-contained content (images, diagrams, code) with an optional caption that describes or credits it.`,syntax:`<figure>
  <img src="chart.png" alt="Bar chart of sales" />
  <figcaption>Q1 2026 sales data</figcaption>
</figure>`,notes:'The <figcaption> can appear before or after the content. If the <img> has an adjacent <figcaption>, the `alt` can be empty (`alt=""`) when the caption fully describes the image.',returns:`No specific attributes — inherits global attributes.`,variations:[{title:`Code listing`,code:`<figure>
  <pre><code>const x = 1;</code></pre>
  <figcaption>Variable declaration example</figcaption>
</figure>`}]},{name:`Headings`,category:`Text & Inline`,description:`Six levels of section headings (<h1>–<h6>) that create a document outline used by screen readers and search engines.`,syntax:`<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>`,notes:`Use only one <h1> per page. Don't skip levels (e.g. h1 → h3) — structure should be a logical outline. Headings are for document structure, not visual sizing — use CSS for size.`,returns:`No specific attributes — inherits global attributes.`,variations:[{title:`Correct outline`,code:`<h1>Recipes</h1>
<h2>Breakfast</h2>
<h3>Pancakes</h3>
<h2>Dinner</h2>
<h3>Pasta</h3>`}]},{name:`Inline Text Elements`,category:`Text & Inline`,description:`Semantic inline elements that add meaning to runs of text — importance, emphasis, code, highlighting, and more.`,syntax:`<strong>important</strong>   <!-- strong importance -->
<em>emphasis</em>            <!-- stress emphasis -->
<mark>highlighted</mark>     <!-- relevance highlight -->
<code>inline code</code>     <!-- code fragment -->
<kbd>Ctrl+S</kbd>            <!-- keyboard input -->
<del>removed</del>           <!-- deleted text -->
<ins>inserted</ins>          <!-- inserted text -->
<sub>H<sub>2</sub>O</sub>   <!-- subscript -->
<sup>x<sup>2</sup></sup>    <!-- superscript -->
<abbr title="HyperText">HTML</abbr>`,notes:"Use <strong>/<em> for semantic meaning, not for visual bold/italic — that's CSS's job. <mark> is designed for search result highlights. <del>/<ins> pair with `datetime` for editorial changes.",returns:`abbr: title | del/ins: cite, datetime`,variations:[{title:`Search result highlight`,code:`<p>Results for <mark>TypeScript</mark>:</p>`},{title:`Keyboard shortcut`,code:`<p>Save with <kbd>Ctrl</kbd>+<kbd>S</kbd></p>`}]},{name:`<time>`,category:`Text & Inline`,description:"Represents a specific point or range in time — the `datetime` attribute provides a machine-readable version for browsers and search engines.",syntax:`<time datetime="2026-05-12">May 12, 2026</time>
<time datetime="2026-05-12T09:00">9 AM</time>
<time datetime="P1D">one day</time>`,notes:"The human-readable text and `datetime` value can differ. ISO 8601 format is required for `datetime`. Useful for `<article>` publish dates, events, and durations.",returns:`datetime (ISO 8601 date/time string)`,variations:[{title:`Article date`,code:`<time datetime="2026-05-12">May 12, 2026</time>`},{title:`Duration`,code:`<time datetime="PT2H30M">2 hours 30 minutes</time>`}]},{name:`<blockquote> & <cite>`,category:`Text & Inline`,description:`<blockquote> marks a section quoted from another source; <cite> references the title of a creative work.`,syntax:`<blockquote cite="https://source.example">
  <p>Quote text here.</p>
  <footer>— <cite>Book Title</cite></footer>
</blockquote>`,notes:"The `cite` attribute on <blockquote> is a URL pointing to the source — it is not displayed. The <cite> element references a work's title, not a person's name.",returns:`blockquote: cite (URL) | q: cite (URL)`,variations:[{title:`Inline quote`,code:`<p>As they say, <q cite="https://example.com">brevity is the soul of wit</q>.</p>`}]},{name:`<pre> & <code>`,category:`Text & Inline`,description:`<pre> preserves whitespace and line breaks (preformatted text); <code> marks computer code. Combine them for code blocks.`,syntax:`<!-- Block code -->
<pre><code>function hello() {
  return 'world';
}</code></pre>

<!-- Inline code -->
<p>Use <code>npm install</code> to install.</p>`,notes:"Text inside <pre> is rendered exactly as typed, including spaces and newlines. Always escape HTML special characters (`<`, `>`, `&`) inside <code> blocks.",returns:`No specific attributes — inherits global attributes.`,variations:[{title:`Code block with language`,code:`<pre><code class="language-js">const x = 1;</code></pre>`}]},{name:`Lists`,category:`Lists & Tables`,description:`<ul> for unordered lists, <ol> for ordered (numbered) lists, <dl> for description lists (term–definition pairs).`,syntax:`<ul>
  <li>Item</li>
</ul>

<ol start="3" reversed>
  <li>Third item</li>
</ol>

<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>`,notes:"Nest lists by placing a <ul> or <ol> inside an <li>. <ol> accepts `start` (starting number), `reversed`, and `type` (1, A, a, I, i). <dl> is ideal for glossaries, FAQs, and metadata pairs.",returns:`ol: type, start, reversed | li: value (ol only)`,variations:[{title:`Nested list`,code:`<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
</ul>`},{title:`Definition list`,code:`<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`}]},{name:`<table>`,category:`Lists & Tables`,description:`Marks up tabular data — rows and columns with semantic header, body, and footer sections.`,syntax:`<table>
  <caption>Monthly Costs</caption>
  <thead>
    <tr><th scope="col">Item</th><th scope="col">Cost</th></tr>
  </thead>
  <tbody>
    <tr><td>Hosting</td><td>$10</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Total</td><td>$10</td></tr>
  </tfoot>
</table>`,notes:"Always include `scope` on <th> (`col` or `row`) for accessibility. Use <caption> to give the table a title. `colspan` and `rowspan` merge cells. Never use tables for layout — that's CSS Grid's job.",returns:`th: scope (col | row | colgroup | rowgroup) | td/th: colspan, rowspan | col: span`,variations:[{title:`Spanning cells`,code:`<tr>
  <th scope="col" colspan="2">Name</th>
  <th scope="col">Age</th>
</tr>`}]},{name:`<form>`,category:`Forms`,description:`Creates an interactive form that collects user input and submits it to a server or handles it with JavaScript.`,syntax:`<form action="/submit" method="post" novalidate>
  <!-- inputs -->
  <button type="submit">Submit</button>
</form>`,notes:'`action` is the URL to submit to; omit for same-page submission. `method="post"` for data changes, `method="get"` for filters/searches. `novalidate` disables native browser validation (useful when implementing custom validation).',returns:`action, method (get | post), enctype, novalidate, autocomplete, target`,variations:[{title:`File upload form`,code:`<form method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" accept="image/*" />
  <button type="submit">Upload</button>
</form>`}]},{name:`<input>`,category:`Forms`,description:"The most versatile form element — its behaviour is entirely defined by the `type` attribute. HTML5 added many new types.",syntax:`<input type="..." name="..." id="..." />`,notes:"Always pair an <input> with a <label> using `for`/`id` or by wrapping. The `name` attribute is what gets sent to the server. New HTML5 types provide mobile-friendly keyboards and native validation.",returns:`type, name, id, value, placeholder, required, disabled, readonly, autocomplete, autofocus, form`,variations:[{title:`Text with label`,code:`<label for="email">Email</label>
<input type="email" id="email" name="email"
  required autocomplete="email" />`},{title:`Range slider`,code:`<input type="range" min="0" max="100" step="5" value="50" />`},{title:`Color picker`,code:`<input type="color" value="#6366f1" />`},{title:`Date picker`,code:`<input type="date" min="2026-01-01" max="2026-12-31" />`}]},{name:`Input Types (HTML5)`,category:`Forms`,description:`HTML5 introduced specialised input types that trigger appropriate mobile keyboards and provide built-in validation.`,syntax:`type="text"          <!-- default -->
type="email"         <!-- validates email format -->
type="url"           <!-- validates URL format -->
type="tel"           <!-- telephone number -->
type="number"        <!-- numeric with min/max/step -->
type="range"         <!-- slider -->
type="date"          <!-- date picker -->
type="datetime-local"<!-- date + time -->
type="month"         <!-- year + month -->
type="week"          <!-- year + week -->
type="time"          <!-- time picker -->
type="color"         <!-- color picker -->
type="file"          <!-- file upload -->
type="search"        <!-- search field -->
type="password"      <!-- masked input -->
type="checkbox"      <!-- toggle -->
type="radio"         <!-- single choice -->
type="hidden"        <!-- hidden data -->
type="submit" | "reset" | "button"`,notes:"Browsers on mobile use the `type` attribute to show the appropriate keyboard (e.g. numeric pad for `number`, `@` key for `email`). Always specify `type`; omitting it defaults to `text`.",returns:`min, max, step (number/range/date) | accept (file) | multiple (email/file) | pattern (text/email/tel/url/password)`,variations:[{title:`Number with bounds`,code:`<input type="number" min="1" max="10" step="1" value="5" />`},{title:`File with accept`,code:`<input type="file" accept=".pdf,.docx" multiple />`}]},{name:`Form Validation Attributes`,category:`Forms`,description:`HTML5 built-in constraint validation — attributes that trigger native browser validation without JavaScript.`,syntax:`required          <!-- field must have a value -->
minlength / maxlength
min / max         <!-- for number/date/range -->
step              <!-- valid increment -->
pattern="regex"   <!-- custom regex constraint -->
type="email|url"  <!-- format validation -->
novalidate        <!-- disable on <form> -->`,notes:"Use `:valid`, `:invalid`, `:required` CSS pseudo-classes to style validated fields. Call `reportValidity()` or `checkValidity()` in JS to trigger or test native validation. `setCustomValidity()` sets a custom error message.",returns:`N/A — declarative validation constraints.`,variations:[{title:`Password rules`,code:`<input type="password"
  minlength="8"
  pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
  title="8+ chars, one uppercase, one number"
  required />`},{title:`Custom validity (JS)`,code:`input.setCustomValidity('Username is taken');
input.reportValidity();`}]},{name:`<select>, <textarea>, <button>`,category:`Forms`,description:`Other core form controls: dropdown selection, multi-line text input, and clickable buttons.`,syntax:`<select name="role">
  <optgroup label="Admin">
    <option value="admin">Admin</option>
  </optgroup>
  <option value="user" selected>User</option>
</select>

<textarea name="bio" rows="4" cols="40"></textarea>

<button type="submit | reset | button">Label</button>`,notes:'Always set `type` on <button> (default is `submit`, which may accidentally submit a form). Use `<button>` over `<input type="submit">` — it can contain HTML. `<optgroup>` groups related options.',returns:`select: multiple, size | option: value, selected, disabled | textarea: rows, cols, maxlength, minlength, wrap | button: type, form, formaction, formmethod, formnovalidate`,variations:[{title:`Multi-select`,code:`<select name="skills" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</select>`},{title:`Button types`,code:`<button type="button" onclick="openModal()">Open</button>
<button type="submit">Save</button>
<button type="reset">Clear</button>`}]},{name:`<fieldset>, <legend>, <label>`,category:`Forms`,description:`<fieldset> groups related form controls; <legend> labels the group; <label> associates a text description with a control.`,syntax:`<fieldset>
  <legend>Delivery Address</legend>
  <label for="city">City</label>
  <input id="city" type="text" name="city" />
</fieldset>`,notes:"Associating <label> with an input (via `for`/`id` or wrapping) increases the click target and helps screen readers. Never use placeholder text as a substitute for labels.",returns:`fieldset: disabled, form, name | label: for`,variations:[{title:`Wrapped label`,code:`<label>
  <input type="checkbox" name="agree" />
  I agree to the terms
</label>`},{title:`Disabled group`,code:`<fieldset disabled>
  <legend>Locked Section</legend>
  <input type="text" />
</fieldset>`}]},{name:`<datalist> & <output>`,category:`Forms`,description:`<datalist> provides autocomplete suggestions for an <input>; <output> displays the result of a calculation.`,syntax:`<input list="browsers" name="browser" />
<datalist id="browsers">
  <option value="Chrome" />
  <option value="Firefox" />
</datalist>

<output name="result" for="a b">0</output>`,notes:"<datalist> suggestions are non-binding — the user can still type any value. <output> is semantically tied to a form calculation via the `for` attribute (space-separated input IDs).",returns:`datalist: id | output: for, form, name`,variations:[{title:`Range + output`,code:`<input type="range" id="vol" min="0" max="100"
  oninput="result.value = this.value" />
<output id="result" for="vol">50</output>`}]},{name:`<progress> & <meter>`,category:`Forms`,description:`<progress> shows task completion; <meter> represents a scalar measurement within a known range (disk usage, score, etc.).`,syntax:`<progress value="70" max="100">70%</progress>

<meter value="0.7" min="0" max="1"
  low="0.3" high="0.7" optimum="1">70%</meter>`,notes:"Omit `value` on <progress> for an indeterminate (animated) state. <meter> accepts `low`, `high`, and `optimum` to colour-code the gauge (green/yellow/red in most browsers).",returns:`progress: value, max | meter: value, min, max, low, high, optimum, form`,variations:[{title:`Indeterminate progress`,code:`<progress>Loading...</progress>`},{title:`Disk usage meter`,code:`<meter value="7" min="0" max="10" low="3" high="8" optimum="2">
  7 GB used
</meter>`}]},{name:`<img>`,category:`Media & Embeds`,description:"Embeds an image. Always include `alt` text for accessibility. Modern attributes enable lazy loading and responsive images.",syntax:`<img src="photo.jpg" alt="Describe the image"
  width="800" height="600"
  loading="lazy"
  decoding="async" />`,notes:'Always specify `width` and `height` to prevent layout shift (CLS). `loading="lazy"` defers off-screen images. `alt=""` (empty) marks decorative images that should be ignored by screen readers.',returns:`src, alt, width, height, loading (lazy | eager), decoding (async | sync | auto), fetchpriority (high | low | auto), srcset, sizes, crossorigin`,variations:[{title:`Responsive srcset`,code:`<img src="img-800.jpg"
  srcset="img-400.jpg 400w, img-800.jpg 800w, img-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 800px"
  alt="Responsive image" />`},{title:`Decorative image`,code:`<img src="divider.svg" alt="" role="presentation" />`}]},{name:`<picture>`,category:`Media & Embeds`,description:`Provides multiple source variants for an image — different formats (WebP, AVIF) or art-directed crops for different screen sizes.`,syntax:`<picture>
  <source srcset="img.avif" type="image/avif" />
  <source srcset="img.webp" type="image/webp" />
  <img src="img.jpg" alt="Fallback" />
</picture>`,notes:"The browser picks the first <source> it supports. The <img> is always required as the fallback and is where `alt`, `width`, `height`, and `loading` live.",returns:`source: srcset, sizes, type, media | img: all img attributes`,variations:[{title:`Art direction`,code:`<picture>
  <source media="(max-width: 600px)" srcset="portrait.jpg" />
  <img src="landscape.jpg" alt="Scenic view" />
</picture>`}]},{name:`<video> & <audio>`,category:`Media & Embeds`,description:`Embed media directly in the browser — multiple <source> children provide format fallbacks.`,syntax:`<video controls width="640" height="360" poster="thumb.jpg">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <track kind="subtitles" src="subs.vtt" srclang="en" label="English" />
</video>

<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
</audio>`,notes:'Always provide captions via <track kind="subtitles"> for accessibility. `autoplay` requires `muted` in most browsers. `preload="none"` reduces bandwidth for non-auto-played media.',returns:`controls, autoplay, muted, loop, poster (video), preload (none | metadata | auto), playsinline | track: kind, src, srclang, label, default`,variations:[{title:`Autoplaying muted video`,code:`<video autoplay muted loop playsinline
  src="bg.mp4" aria-hidden="true">
</video>`}]},{name:`<iframe>`,category:`Media & Embeds`,description:`Embeds another HTML document (or third-party content like maps, videos) inside the current page.`,syntax:`<iframe src="https://example.com" title="Description"
  width="600" height="400"
  loading="lazy"
  allow="fullscreen"
  sandbox="allow-scripts allow-same-origin">
</iframe>`,notes:'`title` is mandatory for accessibility. `sandbox` restricts the embedded content — list only the permissions it actually needs. `allow` controls Permissions Policy features. `loading="lazy"` defers off-screen iframes.',returns:`src, title, width, height, loading, sandbox, allow, allowfullscreen, referrerpolicy, name`,variations:[{title:`YouTube embed`,code:`<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video title"
  allow="accelerometer; autoplay; clipboard-write;
         encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy">
</iframe>`}]},{name:`<canvas>`,category:`Media & Embeds`,description:`A resolution-dependent bitmap surface for rendering graphics, animations, and game visuals via the JavaScript Canvas API.`,syntax:`<canvas id="myCanvas" width="400" height="300">
  Fallback text for non-supporting browsers.
</canvas>`,notes:"Set `width`/`height` as attributes (not CSS) to control the canvas resolution. CSS dimensions scale the rendered output. Always provide fallback content between the tags for accessibility.",returns:`width, height`,variations:[{title:`Drawing a rectangle`,code:`const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#6366f1';
ctx.fillRect(10, 10, 100, 50);`}]},{name:`<a>`,category:`Interactive`,description:`Creates a hyperlink to another page, resource, or location. One of the most fundamental HTML elements.`,syntax:`<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit Example
</a>`,notes:'Always add `rel="noopener noreferrer"` when using `target="_blank"` to prevent tab-napping attacks. Use `href="#id"` for same-page anchors. `download` attribute prompts a file download instead of navigation.',returns:`href, target, rel, download, hreflang, type, referrerpolicy, ping`,variations:[{title:`Anchor link`,code:`<a href="#section-2">Jump to Section 2</a>`},{title:`Download link`,code:`<a href="/report.pdf" download="annual-report.pdf">Download PDF</a>`},{title:`Email link`,code:`<a href="mailto:hello@example.com?subject=Hi">Email us</a>`}]},{name:`<details> & <summary>`,category:`Interactive`,description:`A native disclosure widget — the <summary> is always visible; the rest of <details> is shown/hidden when toggled. No JavaScript needed.`,syntax:`<details>
  <summary>Click to expand</summary>
  <p>Hidden content goes here.</p>
</details>`,notes:"Add the `open` attribute to start in the expanded state. The `toggle` event fires when the state changes. Style with `details[open]` in CSS. Great for FAQs and collapsible sections.",returns:`open (boolean attribute)`,variations:[{title:`FAQ item`,code:`<details>
  <summary>What is HTML?</summary>
  <p>HyperText Markup Language is the standard markup language for web pages.</p>
</details>`},{title:`Open by default`,code:`<details open>
  <summary>Expanded by default</summary>
  <p>Visible on load.</p>
</details>`}]},{name:`<dialog>`,category:`Interactive`,description:"A native modal or non-modal dialog element. Handles focus trapping, the Escape key, and the `::backdrop` pseudo-element automatically.",syntax:`<dialog id="myDialog">
  <h2>Dialog Title</h2>
  <p>Content...</p>
  <button onclick="myDialog.close()">Close</button>
</dialog>

<!-- JS -->
document.getElementById('myDialog').showModal();`,notes:"`showModal()` opens a modal (with backdrop and focus trap); `show()` opens non-modal. Access the return value via `dialog.returnValue`. Style the backdrop with `dialog::backdrop`.",returns:`open (boolean), returnValue | Methods: show(), showModal(), close(value)`,variations:[{title:`Modal with backdrop`,code:`<dialog id="modal">
  <h2>Confirm</h2>
  <button value="confirm" onclick="modal.close(this.value)">Yes</button>
  <button onclick="modal.close()">Cancel</button>
</dialog>

<button onclick="modal.showModal()">Open Modal</button>`},{title:`Backdrop styling`,code:`dialog::backdrop {
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(4px);
}`}]},{name:`Popover API`,category:`Interactive`,description:`A native HTML5 popover system — tooltips, dropdowns, and menus with automatic light-dismiss, focus management, and the top-layer, all without JavaScript.`,syntax:`<!-- Trigger -->
<button popovertarget="my-popover">Open</button>

<!-- Popover -->
<div id="my-popover" popover>
  Popover content
</div>`,notes:'Popovers are placed in the browser\'s top-layer — they appear above everything else without needing `z-index`. `popover="auto"` (default) light-dismisses when clicking outside; `popover="manual"` requires explicit close. Widely supported since 2024.',returns:`popover (auto | manual) | popovertarget | popovertargetaction (toggle | show | hide)`,variations:[{title:`Tooltip popover`,code:`<button popovertarget="tip" popovertargetaction="toggle">?</button>
<div id="tip" popover role="tooltip">
  This is a tooltip.
</div>`},{title:`JS control`,code:`const p = document.getElementById('my-popover');
p.showPopover();
p.hidePopover();
p.togglePopover();`}]},{name:`id, class, style`,category:`Global Attributes`,description:`The three most-used global attributes — unique identifier, CSS class hooks, and inline styles.`,syntax:`<div id="hero" class="section hero" style="color: red;"></div>`,notes:"`id` must be unique per page. `class` takes a space-separated list of names. Inline `style` has the highest specificity (short of `!important`) — prefer external stylesheets for maintainability.",returns:`Available on every HTML element.`,variations:[{title:`Multiple classes`,code:`<button class="btn btn-primary btn-large">Click me</button>`}]},{name:`data-* attributes`,category:`Global Attributes`,description:"Custom data attributes for embedding private data in HTML elements — accessible via JavaScript's `dataset` API.",syntax:`<div data-user-id="42" data-role="admin"></div>

// JS
const el = document.querySelector('[data-user-id]');
console.log(el.dataset.userId);   // '42'
console.log(el.dataset.role);     // 'admin'`,notes:"Attribute names are lowercase with hyphens; `dataset` converts them to camelCase. Values are always strings. Don't use `data-*` for critical data — it's visible in the DOM.",returns:`Available on every HTML element; read/write via element.dataset.`,variations:[{title:`CSS hook via data attr`,code:`<button data-variant="danger">Delete</button>

/* CSS */
[data-variant="danger"] { background: red; }`}]},{name:`hidden, disabled, readonly`,category:`Global Attributes`,description:"Boolean attributes that control visibility and interactivity. `hidden` removes an element from rendering; `disabled`/`readonly` restrict form controls.",syntax:`<div hidden>Not visible</div>
<input type="text" disabled />
<input type="text" readonly value="Fixed" />`,notes:"`hidden` is like `display: none` in CSS and removes the element from accessibility trees. `disabled` prevents interaction and form submission; `readonly` allows the value to be submitted. CSS `display:` overrides `hidden`.",returns:`hidden: global | disabled: button, input, select, textarea, fieldset, optgroup, option | readonly: input, textarea`,variations:[{title:`Conditional hidden`,code:`<section id="details" hidden>
  Extra details shown via JS.
</section>`}]},{name:`tabindex & contenteditable`,category:`Global Attributes`,description:"`tabindex` controls keyboard focus order; `contenteditable` makes any element editable by the user.",syntax:`<div tabindex="0">Focusable div</div>
<div tabindex="-1">Focusable only via JS</div>

<div contenteditable="true" role="textbox" aria-label="Notes">
  Editable content
</div>`,notes:'`tabindex="0"` adds the element to the natural tab order. `tabindex="-1"` removes it from tab order but allows `focus()` via JS. Positive values create an explicit order — avoid them. Always add a `role` and label when using `contenteditable`.',returns:`tabindex: any integer | contenteditable: true | false | plaintext-only`,variations:[{title:`Custom focusable widget`,code:`<div role="button" tabindex="0"
  onclick="activate()"
  onkeydown="e.key==='Enter' && activate()">
  Activate
</div>`}]},{name:`translate & spellcheck`,category:`Global Attributes`,description:"`translate` hints whether content should be machine-translated; `spellcheck` enables/disables browser spell checking on editable fields.",syntax:`<p translate="no" class="brand-name">Anthropic</p>
<textarea spellcheck="true"></textarea>
<code spellcheck="false">variableName</code>`,notes:'`translate="no"` is respected by browser translation tools and services like Google Translate — useful for brand names, code, and technical terms. `spellcheck` inherits from parent elements.',returns:`translate: yes | no | spellcheck: true | false`,variations:[{title:`Mixed translation`,code:`<p>
  Buy <span translate="no">Pro Plan</span> today.
</p>`}]},{name:`ARIA Roles`,category:`Accessibility`,description:"ARIA `role` attributes communicate the purpose of an element to assistive technologies when semantic HTML alone isn't enough.",syntax:`role="button"      <!-- interactive button -->
role="dialog"      <!-- modal window -->
role="alert"       <!-- urgent announced message -->
role="status"      <!-- polite status message -->
role="navigation"  <!-- nav landmark -->
role="main"        <!-- main landmark -->
role="banner"      <!-- header landmark -->
role="contentinfo" <!-- footer landmark -->
role="region"      <!-- generic landmark (needs label) -->
role="tooltip"     <!-- tooltip -->
role="tab" | "tabpanel" | "tablist"`,notes:"First rule of ARIA: don't use ARIA if a native HTML element provides the semantics. A `role` only changes how assistive technologies announce the element — it doesn't add keyboard behaviour automatically.",returns:`role: any ARIA role value`,variations:[{title:`Custom tab widget`,code:`<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
</div>
<div role="tabpanel" id="panel1">Content</div>`}]},{name:`ARIA Labels & Descriptions`,category:`Accessibility`,description:`Provide accessible names and descriptions to elements that lack visible text or need supplementary context.`,syntax:`aria-label="Close dialog"
aria-labelledby="heading-id"
aria-describedby="hint-id"
aria-hidden="true"
aria-live="polite" | "assertive"
aria-busy="true"
aria-expanded="true | false"
aria-controls="panel-id"
aria-current="page | step | date"`,notes:'`aria-labelledby` references another element\'s text (higher priority than `aria-label`). `aria-hidden="true"` removes an element from the accessibility tree entirely. `aria-live` announces dynamic content changes to screen readers.',returns:`All aria-* attributes are valid on any element.`,variations:[{title:`Icon button with label`,code:`<button aria-label="Close">
  <svg aria-hidden="true">...</svg>
</button>`},{title:`Live region`,code:`<div aria-live="polite" aria-atomic="true">
  Form saved successfully.
</div>`},{title:`Current page link`,code:`<a href="/about" aria-current="page">About</a>`}]},{name:`<template> & <slot>`,category:`Accessibility`,description:`<template> holds inert HTML fragments that can be cloned and inserted via JavaScript; <slot> is the insertion point for Web Component content projection.`,syntax:`<template id="card-tpl">
  <article class="card">
    <h2 class="card__title"></h2>
    <p class="card__body"></p>
  </article>
</template>

<!-- JS -->
const tpl = document.getElementById('card-tpl');
const clone = tpl.content.cloneNode(true);
document.body.appendChild(clone);`,notes:`<template> content is parsed but not rendered — it has no layout or rendering cost. It can contain scripts and styles that only activate when cloned. <slot> is used inside Shadow DOM for Web Components.`,returns:`template: id | slot: name`,variations:[{title:`Web Component slot`,code:`<!-- Component usage -->
<my-card>
  <span slot="title">Hello</span>
  <p slot="body">World</p>
</my-card>

<!-- Shadow DOM template -->
<template>
  <slot name="title"></slot>
  <slot name="body"></slot>
</template>`}]}],a={Document:`bg-neutral-100 text-neutral-600`,"Semantic Layout":`bg-primary-100 text-primary-700`,"Text & Inline":`bg-emerald-100 text-emerald-700`,"Lists & Tables":`bg-amber-100 text-amber-700`,Forms:`bg-violet-100 text-violet-700`,"Media & Embeds":`bg-rose-100 text-rose-700`,Interactive:`bg-cyan-100 text-cyan-700`,"Global Attributes":`bg-orange-100 text-orange-700`,Accessibility:`bg-teal-100 text-teal-700`};function o(){return(0,n.jsx)(t,{items:i,badgeColors:a,legendLabel:`Category`,labels:r,countLabel:`elements`})}export{o as default};