import { CategorizedArticle } from "./components";
import type { TopicItem, ModalLabels } from "./components";

const HTML_LABELS: ModalLabels = {
  syntax: "Syntax",
  detail: "Notes",
  returns: "Key Attributes",
  variations: "Examples",
};

const topicsData: TopicItem[] = [
  // ── Document ──────────────────────────────────────────────────────────────
  {
    name: "Document Shell",
    category: "Document",
    description: "The required skeleton for every HTML page — doctype declaration, root element, head, and body.",
    syntax: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Page Title</title>\n  </head>\n  <body>\n    <!-- content -->\n  </body>\n</html>",
    notes: "<!DOCTYPE html> tells the browser to use standards mode — always include it as the very first line. The `lang` attribute on <html> is essential for screen readers and search engines.",
    returns: "lang, dir (text direction: ltr | rtl)",
    variations: [
      { title: "Minimal shell", code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <title>My Page</title>\n</head>\n<body></body>\n</html>" },
    ],
  },
  {
    name: "<meta>",
    category: "Document",
    description: "Provides machine-readable metadata about the document — charset, viewport, description, and social sharing cards.",
    syntax: "<meta name=\"...\" content=\"...\" />\n<meta property=\"...\" content=\"...\" />\n<meta charset=\"UTF-8\" />\n<meta http-equiv=\"...\" content=\"...\" />",
    notes: "Always place `charset` first in <head>. The viewport meta tag is critical for responsive design. Open Graph (`og:`) and Twitter Card (`twitter:`) meta tags control social previews.",
    returns: "charset, name, content, property, http-equiv",
    variations: [
      { title: "Viewport", code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" },
      { title: "SEO description", code: "<meta name=\"description\" content=\"A short page summary.\" />" },
      { title: "Open Graph", code: "<meta property=\"og:title\" content=\"Page Title\" />\n<meta property=\"og:image\" content=\"https://example.com/img.png\" />\n<meta property=\"og:type\" content=\"website\" />" },
      { title: "Theme color", code: "<meta name=\"theme-color\" content=\"#6366f1\" />" },
    ],
  },
  {
    name: "<link>",
    category: "Document",
    description: "Defines relationships between the current document and external resources — stylesheets, icons, preload hints, and canonical URLs.",
    syntax: "<link rel=\"...\" href=\"...\" />",
    notes: "`preload` fetches a resource early and keeps it in cache (add `as` attribute). `preconnect` warms up the TCP connection to a third-party origin. `prefetch` hints at resources needed for the next page.",
    returns: "rel, href, type, as, media, crossorigin, sizes",
    variations: [
      { title: "Stylesheet", code: "<link rel=\"stylesheet\" href=\"styles.css\" />" },
      { title: "Favicon", code: "<link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\" />\n<link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\" />" },
      { title: "Preload font", code: "<link rel=\"preload\" href=\"font.woff2\" as=\"font\" type=\"font/woff2\" crossorigin />" },
      { title: "Canonical", code: "<link rel=\"canonical\" href=\"https://example.com/page\" />" },
      { title: "Preconnect", code: "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />" },
    ],
  },
  {
    name: "<script>",
    category: "Document",
    description: "Embeds or links JavaScript. The `defer` and `async` attributes control how scripts are fetched and executed relative to HTML parsing.",
    syntax: "<script src=\"app.js\" defer></script>\n<script src=\"analytics.js\" async></script>\n<script type=\"module\" src=\"main.js\"></script>",
    notes: "`defer` downloads in parallel and runs after HTML is parsed (in order). `async` downloads in parallel and runs immediately when ready (out of order). `type=\"module\"` enables ES module syntax and implies `defer`.",
    returns: "src, type, defer, async, integrity, crossorigin, nomodule",
    variations: [
      { title: "Deferred script", code: "<script src=\"app.js\" defer></script>" },
      { title: "ES module", code: "<script type=\"module\" src=\"main.js\"></script>" },
      { title: "Inline script", code: "<script>\n  console.log('Hello');\n</script>" },
      { title: "Subresource integrity", code: "<script src=\"lib.js\"\n  integrity=\"sha384-...\"\n  crossorigin=\"anonymous\"\n></script>" },
    ],
  },

  // ── Semantic Layout ───────────────────────────────────────────────────────
  {
    name: "<header> & <footer>",
    category: "Semantic Layout",
    description: "Landmark regions that mark the introductory content or navigational links (<header>) and closing content (<footer>) of a page or section.",
    syntax: "<header>...</header>\n<footer>...</footer>",
    notes: "Both can appear inside <article> or <section> to act as the header/footer for that region, not just the whole page. Assistive technologies expose them as landmarks.",
    returns: "No specific attributes — inherits global attributes.",
    variations: [
      { title: "Page header", code: "<header>\n  <a href=\"/\"><img src=\"logo.svg\" alt=\"Company\" /></a>\n  <nav>...</nav>\n</header>" },
      { title: "Article footer", code: "<article>\n  <h2>Post Title</h2>\n  <p>Content...</p>\n  <footer>\n    <time datetime=\"2026-05-12\">May 12, 2026</time>\n  </footer>\n</article>" },
    ],
  },
  {
    name: "<nav>",
    category: "Semantic Layout",
    description: "Marks a section of major navigation links — the browser and screen readers expose it as a navigation landmark.",
    syntax: "<nav aria-label=\"Main\">\n  <ul>\n    <li><a href=\"/\">Home</a></li>\n    <li><a href=\"/blog\">Blog</a></li>\n  </ul>\n</nav>",
    notes: "Use `aria-label` when a page has multiple <nav> elements to distinguish them (e.g., \"Main\" vs \"Breadcrumb\"). Not every group of links needs a <nav> — reserve it for primary navigation blocks.",
    returns: "aria-label, aria-labelledby",
    variations: [
      { title: "Breadcrumb nav", code: "<nav aria-label=\"Breadcrumb\">\n  <ol>\n    <li><a href=\"/\">Home</a></li>\n    <li><a href=\"/blog\">Blog</a></li>\n    <li aria-current=\"page\">Article</li>\n  </ol>\n</nav>" },
    ],
  },
  {
    name: "<main>, <article>, <section>",
    category: "Semantic Layout",
    description: "Core page-structure elements: <main> is the dominant content area, <article> is self-contained and syndication-ready, <section> groups thematically related content.",
    syntax: "<main>...</main>\n<article>...</article>\n<section>...</section>",
    notes: "A page should have exactly one <main>. <article> should make sense on its own when extracted (blog posts, cards, comments). <section> should always have a heading to label the group.",
    returns: "No specific attributes — inherits global attributes.",
    variations: [
      { title: "Page structure", code: "<main>\n  <section>\n    <h2>Featured</h2>\n    <article>...</article>\n  </section>\n</main>" },
    ],
  },
  {
    name: "<aside>",
    category: "Semantic Layout",
    description: "Marks content that is tangentially related to the surrounding content — sidebars, pull quotes, ads, or supplementary information.",
    syntax: "<aside>\n  <h2>Related Articles</h2>\n  <ul>...</ul>\n</aside>",
    notes: "When nested inside an <article>, <aside> is related to that article. When a direct child of <body> or <main>, it is related to the page as a whole.",
    returns: "No specific attributes — inherits global attributes.",
    variations: [
      { title: "Sidebar", code: "<aside aria-label=\"Sidebar\">\n  <section>\n    <h2>Tags</h2>\n    ...\n  </section>\n</aside>" },
    ],
  },
  {
    name: "<figure> & <figcaption>",
    category: "Semantic Layout",
    description: "Groups self-contained content (images, diagrams, code) with an optional caption that describes or credits it.",
    syntax: "<figure>\n  <img src=\"chart.png\" alt=\"Bar chart of sales\" />\n  <figcaption>Q1 2026 sales data</figcaption>\n</figure>",
    notes: "The <figcaption> can appear before or after the content. If the <img> has an adjacent <figcaption>, the `alt` can be empty (`alt=\"\"`) when the caption fully describes the image.",
    returns: "No specific attributes — inherits global attributes.",
    variations: [
      { title: "Code listing", code: "<figure>\n  <pre><code>const x = 1;</code></pre>\n  <figcaption>Variable declaration example</figcaption>\n</figure>" },
    ],
  },

  // ── Text & Inline ─────────────────────────────────────────────────────────
  {
    name: "Headings",
    category: "Text & Inline",
    description: "Six levels of section headings (<h1>–<h6>) that create a document outline used by screen readers and search engines.",
    syntax: "<h1>Page Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>",
    notes: "Use only one <h1> per page. Don't skip levels (e.g. h1 → h3) — structure should be a logical outline. Headings are for document structure, not visual sizing — use CSS for size.",
    returns: "No specific attributes — inherits global attributes.",
    variations: [
      { title: "Correct outline", code: "<h1>Recipes</h1>\n<h2>Breakfast</h2>\n<h3>Pancakes</h3>\n<h2>Dinner</h2>\n<h3>Pasta</h3>" },
    ],
  },
  {
    name: "Inline Text Elements",
    category: "Text & Inline",
    description: "Semantic inline elements that add meaning to runs of text — importance, emphasis, code, highlighting, and more.",
    syntax: "<strong>important</strong>   <!-- strong importance -->\n<em>emphasis</em>            <!-- stress emphasis -->\n<mark>highlighted</mark>     <!-- relevance highlight -->\n<code>inline code</code>     <!-- code fragment -->\n<kbd>Ctrl+S</kbd>            <!-- keyboard input -->\n<del>removed</del>           <!-- deleted text -->\n<ins>inserted</ins>          <!-- inserted text -->\n<sub>H<sub>2</sub>O</sub>   <!-- subscript -->\n<sup>x<sup>2</sup></sup>    <!-- superscript -->\n<abbr title=\"HyperText\">HTML</abbr>",
    notes: "Use <strong>/<em> for semantic meaning, not for visual bold/italic — that's CSS's job. <mark> is designed for search result highlights. <del>/<ins> pair with `datetime` for editorial changes.",
    returns: "abbr: title | del/ins: cite, datetime",
    variations: [
      { title: "Search result highlight", code: "<p>Results for <mark>TypeScript</mark>:</p>" },
      { title: "Keyboard shortcut", code: "<p>Save with <kbd>Ctrl</kbd>+<kbd>S</kbd></p>" },
    ],
  },
  {
    name: "<time>",
    category: "Text & Inline",
    description: "Represents a specific point or range in time — the `datetime` attribute provides a machine-readable version for browsers and search engines.",
    syntax: "<time datetime=\"2026-05-12\">May 12, 2026</time>\n<time datetime=\"2026-05-12T09:00\">9 AM</time>\n<time datetime=\"P1D\">one day</time>",
    notes: "The human-readable text and `datetime` value can differ. ISO 8601 format is required for `datetime`. Useful for `<article>` publish dates, events, and durations.",
    returns: "datetime (ISO 8601 date/time string)",
    variations: [
      { title: "Article date", code: "<time datetime=\"2026-05-12\">May 12, 2026</time>" },
      { title: "Duration", code: "<time datetime=\"PT2H30M\">2 hours 30 minutes</time>" },
    ],
  },
  {
    name: "<blockquote> & <cite>",
    category: "Text & Inline",
    description: "<blockquote> marks a section quoted from another source; <cite> references the title of a creative work.",
    syntax: "<blockquote cite=\"https://source.example\">\n  <p>Quote text here.</p>\n  <footer>— <cite>Book Title</cite></footer>\n</blockquote>",
    notes: "The `cite` attribute on <blockquote> is a URL pointing to the source — it is not displayed. The <cite> element references a work's title, not a person's name.",
    returns: "blockquote: cite (URL) | q: cite (URL)",
    variations: [
      { title: "Inline quote", code: "<p>As they say, <q cite=\"https://example.com\">brevity is the soul of wit</q>.</p>" },
    ],
  },
  {
    name: "<pre> & <code>",
    category: "Text & Inline",
    description: "<pre> preserves whitespace and line breaks (preformatted text); <code> marks computer code. Combine them for code blocks.",
    syntax: "<!-- Block code -->\n<pre><code>function hello() {\n  return 'world';\n}</code></pre>\n\n<!-- Inline code -->\n<p>Use <code>npm install</code> to install.</p>",
    notes: "Text inside <pre> is rendered exactly as typed, including spaces and newlines. Always escape HTML special characters (`<`, `>`, `&`) inside <code> blocks.",
    returns: "No specific attributes — inherits global attributes.",
    variations: [
      { title: "Code block with language", code: "<pre><code class=\"language-js\">const x = 1;</code></pre>" },
    ],
  },

  // ── Lists & Tables ────────────────────────────────────────────────────────
  {
    name: "Lists",
    category: "Lists & Tables",
    description: "<ul> for unordered lists, <ol> for ordered (numbered) lists, <dl> for description lists (term–definition pairs).",
    syntax: "<ul>\n  <li>Item</li>\n</ul>\n\n<ol start=\"3\" reversed>\n  <li>Third item</li>\n</ol>\n\n<dl>\n  <dt>Term</dt>\n  <dd>Definition</dd>\n</dl>",
    notes: "Nest lists by placing a <ul> or <ol> inside an <li>. <ol> accepts `start` (starting number), `reversed`, and `type` (1, A, a, I, i). <dl> is ideal for glossaries, FAQs, and metadata pairs.",
    returns: "ol: type, start, reversed | li: value (ol only)",
    variations: [
      { title: "Nested list", code: "<ul>\n  <li>Fruits\n    <ul>\n      <li>Apple</li>\n      <li>Banana</li>\n    </ul>\n  </li>\n</ul>" },
      { title: "Definition list", code: "<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language</dd>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n</dl>" },
    ],
  },
  {
    name: "<table>",
    category: "Lists & Tables",
    description: "Marks up tabular data — rows and columns with semantic header, body, and footer sections.",
    syntax: "<table>\n  <caption>Monthly Costs</caption>\n  <thead>\n    <tr><th scope=\"col\">Item</th><th scope=\"col\">Cost</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Hosting</td><td>$10</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td>Total</td><td>$10</td></tr>\n  </tfoot>\n</table>",
    notes: "Always include `scope` on <th> (`col` or `row`) for accessibility. Use <caption> to give the table a title. `colspan` and `rowspan` merge cells. Never use tables for layout — that's CSS Grid's job.",
    returns: "th: scope (col | row | colgroup | rowgroup) | td/th: colspan, rowspan | col: span",
    variations: [
      { title: "Spanning cells", code: "<tr>\n  <th scope=\"col\" colspan=\"2\">Name</th>\n  <th scope=\"col\">Age</th>\n</tr>" },
    ],
  },

  // ── Forms ─────────────────────────────────────────────────────────────────
  {
    name: "<form>",
    category: "Forms",
    description: "Creates an interactive form that collects user input and submits it to a server or handles it with JavaScript.",
    syntax: "<form action=\"/submit\" method=\"post\" novalidate>\n  <!-- inputs -->\n  <button type=\"submit\">Submit</button>\n</form>",
    notes: "`action` is the URL to submit to; omit for same-page submission. `method=\"post\"` for data changes, `method=\"get\"` for filters/searches. `novalidate` disables native browser validation (useful when implementing custom validation).",
    returns: "action, method (get | post), enctype, novalidate, autocomplete, target",
    variations: [
      { title: "File upload form", code: "<form method=\"post\" enctype=\"multipart/form-data\">\n  <input type=\"file\" name=\"avatar\" accept=\"image/*\" />\n  <button type=\"submit\">Upload</button>\n</form>" },
    ],
  },
  {
    name: "<input>",
    category: "Forms",
    description: "The most versatile form element — its behaviour is entirely defined by the `type` attribute. HTML5 added many new types.",
    syntax: "<input type=\"...\" name=\"...\" id=\"...\" />",
    notes: "Always pair an <input> with a <label> using `for`/`id` or by wrapping. The `name` attribute is what gets sent to the server. New HTML5 types provide mobile-friendly keyboards and native validation.",
    returns: "type, name, id, value, placeholder, required, disabled, readonly, autocomplete, autofocus, form",
    variations: [
      { title: "Text with label", code: "<label for=\"email\">Email</label>\n<input type=\"email\" id=\"email\" name=\"email\"\n  required autocomplete=\"email\" />" },
      { title: "Range slider", code: "<input type=\"range\" min=\"0\" max=\"100\" step=\"5\" value=\"50\" />" },
      { title: "Color picker", code: "<input type=\"color\" value=\"#6366f1\" />" },
      { title: "Date picker", code: "<input type=\"date\" min=\"2026-01-01\" max=\"2026-12-31\" />" },
    ],
  },
  {
    name: "Input Types (HTML5)",
    category: "Forms",
    description: "HTML5 introduced specialised input types that trigger appropriate mobile keyboards and provide built-in validation.",
    syntax: "type=\"text\"          <!-- default -->\ntype=\"email\"         <!-- validates email format -->\ntype=\"url\"           <!-- validates URL format -->\ntype=\"tel\"           <!-- telephone number -->\ntype=\"number\"        <!-- numeric with min/max/step -->\ntype=\"range\"         <!-- slider -->\ntype=\"date\"          <!-- date picker -->\ntype=\"datetime-local\"<!-- date + time -->\ntype=\"month\"         <!-- year + month -->\ntype=\"week\"          <!-- year + week -->\ntype=\"time\"          <!-- time picker -->\ntype=\"color\"         <!-- color picker -->\ntype=\"file\"          <!-- file upload -->\ntype=\"search\"        <!-- search field -->\ntype=\"password\"      <!-- masked input -->\ntype=\"checkbox\"      <!-- toggle -->\ntype=\"radio\"         <!-- single choice -->\ntype=\"hidden\"        <!-- hidden data -->\ntype=\"submit\" | \"reset\" | \"button\"",
    notes: "Browsers on mobile use the `type` attribute to show the appropriate keyboard (e.g. numeric pad for `number`, `@` key for `email`). Always specify `type`; omitting it defaults to `text`.",
    returns: "min, max, step (number/range/date) | accept (file) | multiple (email/file) | pattern (text/email/tel/url/password)",
    variations: [
      { title: "Number with bounds", code: "<input type=\"number\" min=\"1\" max=\"10\" step=\"1\" value=\"5\" />" },
      { title: "File with accept", code: "<input type=\"file\" accept=\".pdf,.docx\" multiple />" },
    ],
  },
  {
    name: "Form Validation Attributes",
    category: "Forms",
    description: "HTML5 built-in constraint validation — attributes that trigger native browser validation without JavaScript.",
    syntax: "required          <!-- field must have a value -->\nminlength / maxlength\nmin / max         <!-- for number/date/range -->\nstep              <!-- valid increment -->\npattern=\"regex\"   <!-- custom regex constraint -->\ntype=\"email|url\"  <!-- format validation -->\nnovalidate        <!-- disable on <form> -->",
    notes: "Use `:valid`, `:invalid`, `:required` CSS pseudo-classes to style validated fields. Call `reportValidity()` or `checkValidity()` in JS to trigger or test native validation. `setCustomValidity()` sets a custom error message.",
    returns: "N/A — declarative validation constraints.",
    variations: [
      { title: "Password rules", code: "<input type=\"password\"\n  minlength=\"8\"\n  pattern=\"(?=.*[A-Z])(?=.*[0-9]).{8,}\"\n  title=\"8+ chars, one uppercase, one number\"\n  required />" },
      { title: "Custom validity (JS)", code: "input.setCustomValidity('Username is taken');\ninput.reportValidity();" },
    ],
  },
  {
    name: "<select>, <textarea>, <button>",
    category: "Forms",
    description: "Other core form controls: dropdown selection, multi-line text input, and clickable buttons.",
    syntax: "<select name=\"role\">\n  <optgroup label=\"Admin\">\n    <option value=\"admin\">Admin</option>\n  </optgroup>\n  <option value=\"user\" selected>User</option>\n</select>\n\n<textarea name=\"bio\" rows=\"4\" cols=\"40\"></textarea>\n\n<button type=\"submit | reset | button\">Label</button>",
    notes: "Always set `type` on <button> (default is `submit`, which may accidentally submit a form). Use `<button>` over `<input type=\"submit\">` — it can contain HTML. `<optgroup>` groups related options.",
    returns: "select: multiple, size | option: value, selected, disabled | textarea: rows, cols, maxlength, minlength, wrap | button: type, form, formaction, formmethod, formnovalidate",
    variations: [
      { title: "Multi-select", code: "<select name=\"skills\" multiple size=\"4\">\n  <option value=\"html\">HTML</option>\n  <option value=\"css\">CSS</option>\n  <option value=\"js\">JavaScript</option>\n</select>" },
      { title: "Button types", code: "<button type=\"button\" onclick=\"openModal()\">Open</button>\n<button type=\"submit\">Save</button>\n<button type=\"reset\">Clear</button>" },
    ],
  },
  {
    name: "<fieldset>, <legend>, <label>",
    category: "Forms",
    description: "<fieldset> groups related form controls; <legend> labels the group; <label> associates a text description with a control.",
    syntax: "<fieldset>\n  <legend>Delivery Address</legend>\n  <label for=\"city\">City</label>\n  <input id=\"city\" type=\"text\" name=\"city\" />\n</fieldset>",
    notes: "Associating <label> with an input (via `for`/`id` or wrapping) increases the click target and helps screen readers. Never use placeholder text as a substitute for labels.",
    returns: "fieldset: disabled, form, name | label: for",
    variations: [
      { title: "Wrapped label", code: "<label>\n  <input type=\"checkbox\" name=\"agree\" />\n  I agree to the terms\n</label>" },
      { title: "Disabled group", code: "<fieldset disabled>\n  <legend>Locked Section</legend>\n  <input type=\"text\" />\n</fieldset>" },
    ],
  },
  {
    name: "<datalist> & <output>",
    category: "Forms",
    description: "<datalist> provides autocomplete suggestions for an <input>; <output> displays the result of a calculation.",
    syntax: "<input list=\"browsers\" name=\"browser\" />\n<datalist id=\"browsers\">\n  <option value=\"Chrome\" />\n  <option value=\"Firefox\" />\n</datalist>\n\n<output name=\"result\" for=\"a b\">0</output>",
    notes: "<datalist> suggestions are non-binding — the user can still type any value. <output> is semantically tied to a form calculation via the `for` attribute (space-separated input IDs).",
    returns: "datalist: id | output: for, form, name",
    variations: [
      { title: "Range + output", code: "<input type=\"range\" id=\"vol\" min=\"0\" max=\"100\"\n  oninput=\"result.value = this.value\" />\n<output id=\"result\" for=\"vol\">50</output>" },
    ],
  },
  {
    name: "<progress> & <meter>",
    category: "Forms",
    description: "<progress> shows task completion; <meter> represents a scalar measurement within a known range (disk usage, score, etc.).",
    syntax: "<progress value=\"70\" max=\"100\">70%</progress>\n\n<meter value=\"0.7\" min=\"0\" max=\"1\"\n  low=\"0.3\" high=\"0.7\" optimum=\"1\">70%</meter>",
    notes: "Omit `value` on <progress> for an indeterminate (animated) state. <meter> accepts `low`, `high`, and `optimum` to colour-code the gauge (green/yellow/red in most browsers).",
    returns: "progress: value, max | meter: value, min, max, low, high, optimum, form",
    variations: [
      { title: "Indeterminate progress", code: "<progress>Loading...</progress>" },
      { title: "Disk usage meter", code: "<meter value=\"7\" min=\"0\" max=\"10\" low=\"3\" high=\"8\" optimum=\"2\">\n  7 GB used\n</meter>" },
    ],
  },

  // ── Media & Embeds ────────────────────────────────────────────────────────
  {
    name: "<img>",
    category: "Media & Embeds",
    description: "Embeds an image. Always include `alt` text for accessibility. Modern attributes enable lazy loading and responsive images.",
    syntax: "<img src=\"photo.jpg\" alt=\"Describe the image\"\n  width=\"800\" height=\"600\"\n  loading=\"lazy\"\n  decoding=\"async\" />",
    notes: "Always specify `width` and `height` to prevent layout shift (CLS). `loading=\"lazy\"` defers off-screen images. `alt=\"\"` (empty) marks decorative images that should be ignored by screen readers.",
    returns: "src, alt, width, height, loading (lazy | eager), decoding (async | sync | auto), fetchpriority (high | low | auto), srcset, sizes, crossorigin",
    variations: [
      { title: "Responsive srcset", code: "<img src=\"img-800.jpg\"\n  srcset=\"img-400.jpg 400w, img-800.jpg 800w, img-1200.jpg 1200w\"\n  sizes=\"(max-width: 600px) 100vw, 800px\"\n  alt=\"Responsive image\" />" },
      { title: "Decorative image", code: "<img src=\"divider.svg\" alt=\"\" role=\"presentation\" />" },
    ],
  },
  {
    name: "<picture>",
    category: "Media & Embeds",
    description: "Provides multiple source variants for an image — different formats (WebP, AVIF) or art-directed crops for different screen sizes.",
    syntax: "<picture>\n  <source srcset=\"img.avif\" type=\"image/avif\" />\n  <source srcset=\"img.webp\" type=\"image/webp\" />\n  <img src=\"img.jpg\" alt=\"Fallback\" />\n</picture>",
    notes: "The browser picks the first <source> it supports. The <img> is always required as the fallback and is where `alt`, `width`, `height`, and `loading` live.",
    returns: "source: srcset, sizes, type, media | img: all img attributes",
    variations: [
      { title: "Art direction", code: "<picture>\n  <source media=\"(max-width: 600px)\" srcset=\"portrait.jpg\" />\n  <img src=\"landscape.jpg\" alt=\"Scenic view\" />\n</picture>" },
    ],
  },
  {
    name: "<video> & <audio>",
    category: "Media & Embeds",
    description: "Embed media directly in the browser — multiple <source> children provide format fallbacks.",
    syntax: "<video controls width=\"640\" height=\"360\" poster=\"thumb.jpg\">\n  <source src=\"video.mp4\" type=\"video/mp4\" />\n  <source src=\"video.webm\" type=\"video/webm\" />\n  <track kind=\"subtitles\" src=\"subs.vtt\" srclang=\"en\" label=\"English\" />\n</video>\n\n<audio controls>\n  <source src=\"audio.mp3\" type=\"audio/mpeg\" />\n</audio>",
    notes: "Always provide captions via <track kind=\"subtitles\"> for accessibility. `autoplay` requires `muted` in most browsers. `preload=\"none\"` reduces bandwidth for non-auto-played media.",
    returns: "controls, autoplay, muted, loop, poster (video), preload (none | metadata | auto), playsinline | track: kind, src, srclang, label, default",
    variations: [
      { title: "Autoplaying muted video", code: "<video autoplay muted loop playsinline\n  src=\"bg.mp4\" aria-hidden=\"true\">\n</video>" },
    ],
  },
  {
    name: "<iframe>",
    category: "Media & Embeds",
    description: "Embeds another HTML document (or third-party content like maps, videos) inside the current page.",
    syntax: "<iframe src=\"https://example.com\" title=\"Description\"\n  width=\"600\" height=\"400\"\n  loading=\"lazy\"\n  allow=\"fullscreen\"\n  sandbox=\"allow-scripts allow-same-origin\">\n</iframe>",
    notes: "`title` is mandatory for accessibility. `sandbox` restricts the embedded content — list only the permissions it actually needs. `allow` controls Permissions Policy features. `loading=\"lazy\"` defers off-screen iframes.",
    returns: "src, title, width, height, loading, sandbox, allow, allowfullscreen, referrerpolicy, name",
    variations: [
      { title: "YouTube embed", code: "<iframe\n  src=\"https://www.youtube.com/embed/VIDEO_ID\"\n  title=\"Video title\"\n  allow=\"accelerometer; autoplay; clipboard-write;\n         encrypted-media; gyroscope; picture-in-picture\"\n  allowfullscreen\n  loading=\"lazy\">\n</iframe>" },
    ],
  },
  {
    name: "<canvas>",
    category: "Media & Embeds",
    description: "A resolution-dependent bitmap surface for rendering graphics, animations, and game visuals via the JavaScript Canvas API.",
    syntax: "<canvas id=\"myCanvas\" width=\"400\" height=\"300\">\n  Fallback text for non-supporting browsers.\n</canvas>",
    notes: "Set `width`/`height` as attributes (not CSS) to control the canvas resolution. CSS dimensions scale the rendered output. Always provide fallback content between the tags for accessibility.",
    returns: "width, height",
    variations: [
      { title: "Drawing a rectangle", code: "const canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\nctx.fillStyle = '#6366f1';\nctx.fillRect(10, 10, 100, 50);" },
    ],
  },

  // ── Interactive ───────────────────────────────────────────────────────────
  {
    name: "<a>",
    category: "Interactive",
    description: "Creates a hyperlink to another page, resource, or location. One of the most fundamental HTML elements.",
    syntax: "<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">\n  Visit Example\n</a>",
    notes: "Always add `rel=\"noopener noreferrer\"` when using `target=\"_blank\"` to prevent tab-napping attacks. Use `href=\"#id\"` for same-page anchors. `download` attribute prompts a file download instead of navigation.",
    returns: "href, target, rel, download, hreflang, type, referrerpolicy, ping",
    variations: [
      { title: "Anchor link", code: "<a href=\"#section-2\">Jump to Section 2</a>" },
      { title: "Download link", code: "<a href=\"/report.pdf\" download=\"annual-report.pdf\">Download PDF</a>" },
      { title: "Email link", code: "<a href=\"mailto:hello@example.com?subject=Hi\">Email us</a>" },
    ],
  },
  {
    name: "<details> & <summary>",
    category: "Interactive",
    description: "A native disclosure widget — the <summary> is always visible; the rest of <details> is shown/hidden when toggled. No JavaScript needed.",
    syntax: "<details>\n  <summary>Click to expand</summary>\n  <p>Hidden content goes here.</p>\n</details>",
    notes: "Add the `open` attribute to start in the expanded state. The `toggle` event fires when the state changes. Style with `details[open]` in CSS. Great for FAQs and collapsible sections.",
    returns: "open (boolean attribute)",
    variations: [
      { title: "FAQ item", code: "<details>\n  <summary>What is HTML?</summary>\n  <p>HyperText Markup Language is the standard markup language for web pages.</p>\n</details>" },
      { title: "Open by default", code: "<details open>\n  <summary>Expanded by default</summary>\n  <p>Visible on load.</p>\n</details>" },
    ],
  },
  {
    name: "<dialog>",
    category: "Interactive",
    description: "A native modal or non-modal dialog element. Handles focus trapping, the Escape key, and the `::backdrop` pseudo-element automatically.",
    syntax: "<dialog id=\"myDialog\">\n  <h2>Dialog Title</h2>\n  <p>Content...</p>\n  <button onclick=\"myDialog.close()\">Close</button>\n</dialog>\n\n<!-- JS -->\ndocument.getElementById('myDialog').showModal();",
    notes: "`showModal()` opens a modal (with backdrop and focus trap); `show()` opens non-modal. Access the return value via `dialog.returnValue`. Style the backdrop with `dialog::backdrop`.",
    returns: "open (boolean), returnValue | Methods: show(), showModal(), close(value)",
    variations: [
      { title: "Modal with backdrop", code: "<dialog id=\"modal\">\n  <h2>Confirm</h2>\n  <button value=\"confirm\" onclick=\"modal.close(this.value)\">Yes</button>\n  <button onclick=\"modal.close()\">Cancel</button>\n</dialog>\n\n<button onclick=\"modal.showModal()\">Open Modal</button>" },
      { title: "Backdrop styling", code: "dialog::backdrop {\n  background: rgb(0 0 0 / 0.5);\n  backdrop-filter: blur(4px);\n}" },
    ],
  },
  {
    name: "Popover API",
    category: "Interactive",
    description: "A native HTML5 popover system — tooltips, dropdowns, and menus with automatic light-dismiss, focus management, and the top-layer, all without JavaScript.",
    syntax: "<!-- Trigger -->\n<button popovertarget=\"my-popover\">Open</button>\n\n<!-- Popover -->\n<div id=\"my-popover\" popover>\n  Popover content\n</div>",
    notes: "Popovers are placed in the browser's top-layer — they appear above everything else without needing `z-index`. `popover=\"auto\"` (default) light-dismisses when clicking outside; `popover=\"manual\"` requires explicit close. Widely supported since 2024.",
    returns: "popover (auto | manual) | popovertarget | popovertargetaction (toggle | show | hide)",
    variations: [
      { title: "Tooltip popover", code: "<button popovertarget=\"tip\" popovertargetaction=\"toggle\">?</button>\n<div id=\"tip\" popover role=\"tooltip\">\n  This is a tooltip.\n</div>" },
      { title: "JS control", code: "const p = document.getElementById('my-popover');\np.showPopover();\np.hidePopover();\np.togglePopover();" },
    ],
  },

  // ── Global Attributes ─────────────────────────────────────────────────────
  {
    name: "id, class, style",
    category: "Global Attributes",
    description: "The three most-used global attributes — unique identifier, CSS class hooks, and inline styles.",
    syntax: "<div id=\"hero\" class=\"section hero\" style=\"color: red;\"></div>",
    notes: "`id` must be unique per page. `class` takes a space-separated list of names. Inline `style` has the highest specificity (short of `!important`) — prefer external stylesheets for maintainability.",
    returns: "Available on every HTML element.",
    variations: [
      { title: "Multiple classes", code: "<button class=\"btn btn-primary btn-large\">Click me</button>" },
    ],
  },
  {
    name: "data-* attributes",
    category: "Global Attributes",
    description: "Custom data attributes for embedding private data in HTML elements — accessible via JavaScript's `dataset` API.",
    syntax: "<div data-user-id=\"42\" data-role=\"admin\"></div>\n\n// JS\nconst el = document.querySelector('[data-user-id]');\nconsole.log(el.dataset.userId);   // '42'\nconsole.log(el.dataset.role);     // 'admin'",
    notes: "Attribute names are lowercase with hyphens; `dataset` converts them to camelCase. Values are always strings. Don't use `data-*` for critical data — it's visible in the DOM.",
    returns: "Available on every HTML element; read/write via element.dataset.",
    variations: [
      { title: "CSS hook via data attr", code: "<button data-variant=\"danger\">Delete</button>\n\n/* CSS */\n[data-variant=\"danger\"] { background: red; }" },
    ],
  },
  {
    name: "hidden, disabled, readonly",
    category: "Global Attributes",
    description: "Boolean attributes that control visibility and interactivity. `hidden` removes an element from rendering; `disabled`/`readonly` restrict form controls.",
    syntax: "<div hidden>Not visible</div>\n<input type=\"text\" disabled />\n<input type=\"text\" readonly value=\"Fixed\" />",
    notes: "`hidden` is like `display: none` in CSS and removes the element from accessibility trees. `disabled` prevents interaction and form submission; `readonly` allows the value to be submitted. CSS `display:` overrides `hidden`.",
    returns: "hidden: global | disabled: button, input, select, textarea, fieldset, optgroup, option | readonly: input, textarea",
    variations: [
      { title: "Conditional hidden", code: "<section id=\"details\" hidden>\n  Extra details shown via JS.\n</section>" },
    ],
  },
  {
    name: "tabindex & contenteditable",
    category: "Global Attributes",
    description: "`tabindex` controls keyboard focus order; `contenteditable` makes any element editable by the user.",
    syntax: "<div tabindex=\"0\">Focusable div</div>\n<div tabindex=\"-1\">Focusable only via JS</div>\n\n<div contenteditable=\"true\" role=\"textbox\" aria-label=\"Notes\">\n  Editable content\n</div>",
    notes: "`tabindex=\"0\"` adds the element to the natural tab order. `tabindex=\"-1\"` removes it from tab order but allows `focus()` via JS. Positive values create an explicit order — avoid them. Always add a `role` and label when using `contenteditable`.",
    returns: "tabindex: any integer | contenteditable: true | false | plaintext-only",
    variations: [
      { title: "Custom focusable widget", code: "<div role=\"button\" tabindex=\"0\"\n  onclick=\"activate()\"\n  onkeydown=\"e.key==='Enter' && activate()\">\n  Activate\n</div>" },
    ],
  },
  {
    name: "translate & spellcheck",
    category: "Global Attributes",
    description: "`translate` hints whether content should be machine-translated; `spellcheck` enables/disables browser spell checking on editable fields.",
    syntax: "<p translate=\"no\" class=\"brand-name\">Anthropic</p>\n<textarea spellcheck=\"true\"></textarea>\n<code spellcheck=\"false\">variableName</code>",
    notes: "`translate=\"no\"` is respected by browser translation tools and services like Google Translate — useful for brand names, code, and technical terms. `spellcheck` inherits from parent elements.",
    returns: "translate: yes | no | spellcheck: true | false",
    variations: [
      { title: "Mixed translation", code: "<p>\n  Buy <span translate=\"no\">Pro Plan</span> today.\n</p>" },
    ],
  },

  // ── Accessibility ─────────────────────────────────────────────────────────
  {
    name: "ARIA Roles",
    category: "Accessibility",
    description: "ARIA `role` attributes communicate the purpose of an element to assistive technologies when semantic HTML alone isn't enough.",
    syntax: "role=\"button\"      <!-- interactive button -->\nrole=\"dialog\"      <!-- modal window -->\nrole=\"alert\"       <!-- urgent announced message -->\nrole=\"status\"      <!-- polite status message -->\nrole=\"navigation\"  <!-- nav landmark -->\nrole=\"main\"        <!-- main landmark -->\nrole=\"banner\"      <!-- header landmark -->\nrole=\"contentinfo\" <!-- footer landmark -->\nrole=\"region\"      <!-- generic landmark (needs label) -->\nrole=\"tooltip\"     <!-- tooltip -->\nrole=\"tab\" | \"tabpanel\" | \"tablist\"",
    notes: "First rule of ARIA: don't use ARIA if a native HTML element provides the semantics. A `role` only changes how assistive technologies announce the element — it doesn't add keyboard behaviour automatically.",
    returns: "role: any ARIA role value",
    variations: [
      { title: "Custom tab widget", code: "<div role=\"tablist\">\n  <button role=\"tab\" aria-selected=\"true\" aria-controls=\"panel1\">Tab 1</button>\n</div>\n<div role=\"tabpanel\" id=\"panel1\">Content</div>" },
    ],
  },
  {
    name: "ARIA Labels & Descriptions",
    category: "Accessibility",
    description: "Provide accessible names and descriptions to elements that lack visible text or need supplementary context.",
    syntax: "aria-label=\"Close dialog\"\naria-labelledby=\"heading-id\"\naria-describedby=\"hint-id\"\naria-hidden=\"true\"\naria-live=\"polite\" | \"assertive\"\naria-busy=\"true\"\naria-expanded=\"true | false\"\naria-controls=\"panel-id\"\naria-current=\"page | step | date\"",
    notes: "`aria-labelledby` references another element's text (higher priority than `aria-label`). `aria-hidden=\"true\"` removes an element from the accessibility tree entirely. `aria-live` announces dynamic content changes to screen readers.",
    returns: "All aria-* attributes are valid on any element.",
    variations: [
      { title: "Icon button with label", code: "<button aria-label=\"Close\">\n  <svg aria-hidden=\"true\">...</svg>\n</button>" },
      { title: "Live region", code: "<div aria-live=\"polite\" aria-atomic=\"true\">\n  Form saved successfully.\n</div>" },
      { title: "Current page link", code: "<a href=\"/about\" aria-current=\"page\">About</a>" },
    ],
  },
  {
    name: "<template> & <slot>",
    category: "Accessibility",
    description: "<template> holds inert HTML fragments that can be cloned and inserted via JavaScript; <slot> is the insertion point for Web Component content projection.",
    syntax: "<template id=\"card-tpl\">\n  <article class=\"card\">\n    <h2 class=\"card__title\"></h2>\n    <p class=\"card__body\"></p>\n  </article>\n</template>\n\n<!-- JS -->\nconst tpl = document.getElementById('card-tpl');\nconst clone = tpl.content.cloneNode(true);\ndocument.body.appendChild(clone);",
    notes: "<template> content is parsed but not rendered — it has no layout or rendering cost. It can contain scripts and styles that only activate when cloned. <slot> is used inside Shadow DOM for Web Components.",
    returns: "template: id | slot: name",
    variations: [
      { title: "Web Component slot", code: "<!-- Component usage -->\n<my-card>\n  <span slot=\"title\">Hello</span>\n  <p slot=\"body\">World</p>\n</my-card>\n\n<!-- Shadow DOM template -->\n<template>\n  <slot name=\"title\"></slot>\n  <slot name=\"body\"></slot>\n</template>" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Document":          "bg-neutral-100 text-neutral-600",
  "Semantic Layout":   "bg-primary-100 text-primary-700",
  "Text & Inline":     "bg-emerald-100 text-emerald-700",
  "Lists & Tables":    "bg-amber-100 text-amber-700",
  "Forms":             "bg-violet-100 text-violet-700",
  "Media & Embeds":    "bg-rose-100 text-rose-700",
  "Interactive":       "bg-cyan-100 text-cyan-700",
  "Global Attributes": "bg-orange-100 text-orange-700",
  "Accessibility":     "bg-teal-100 text-teal-700",
};

export default function HTMLCheatsheet() {
  return (
    <CategorizedArticle
      items={topicsData}
      badgeColors={categoryColor}
      legendLabel="Category"
      labels={HTML_LABELS}
      countLabel="elements"
    />
  );
}
