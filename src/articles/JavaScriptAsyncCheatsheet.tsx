import { CategorizedArticle, CODE_LABELS } from "./components";
import type { TopicItem } from "./components";

const topicsData: TopicItem[] = [
  // ── Promises ──────────────────────────────────────────────────────────────
  {
    name: "new Promise()", category: "Promise",
    description: "Creates a new Promise. The executor function receives two callbacks: resolve (fulfills the promise with a value) and reject (rejects it with a reason).",
    syntax: "const p = new Promise((resolve, reject) => { ... });",
    notes: "The executor runs synchronously. Errors thrown inside it automatically reject the promise.",
    returns: "A Promise object that is initially pending, then becomes fulfilled or rejected.",
    variations: [
      { title: "Basic resolve", code: "const p = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('done'), 1000);\n});" },
      { title: "Reject on error", code: "const p = new Promise((resolve, reject) => {\n  if (!data) reject(new Error('No data'));\n  else resolve(data);\n});" },
    ],
  },
  {
    name: ".then()", category: "Promise",
    description: "Schedules callbacks to run when a promise is fulfilled or rejected. Returns a new promise, enabling chaining.",
    syntax: "promise.then(onFulfilled, onRejected?);",
    notes: "Returning a value from onFulfilled wraps it in a resolved promise. Throwing rejects the next promise in the chain.",
    returns: "A new Promise resolved with the return value of the callback.",
    variations: [
      { title: "Basic chaining", code: "fetch('/api/user')\n  .then(res => res.json())\n  .then(user => console.log(user.name));" },
      { title: "Transform value", code: "Promise.resolve(5)\n  .then(n => n * 2)\n  .then(n => console.log(n)); // 10" },
    ],
  },
  {
    name: ".catch()", category: "Promise",
    description: "Shorthand for `.then(null, onRejected)`. Handles rejections in a promise chain without interrupting the flow.",
    syntax: "promise.catch(onRejected);",
    notes: "Catches errors from all preceding .then() calls in the chain. A value returned from .catch() resolves the next promise.",
    returns: "A new Promise resolved with the return value of onRejected.",
    variations: [
      { title: "Error handling", code: "fetch('/api/data')\n  .then(res => res.json())\n  .catch(err => console.error('Failed:', err));" },
      { title: "Recovery / fallback", code: "fetchUser(id)\n  .catch(() => fetchCachedUser(id))\n  .then(user => render(user));" },
    ],
  },
  {
    name: ".finally()", category: "Promise",
    description: "Runs a callback when the promise settles (whether fulfilled or rejected). The callback receives no arguments.",
    syntax: "promise.finally(onFinally);",
    notes: "Use for cleanup (hiding spinners, closing connections) regardless of outcome.",
    returns: "A Promise that settles with the same value/reason as the original.",
    variations: [
      { title: "Hide loading spinner", code: "setLoading(true);\nfetchData()\n  .then(setData)\n  .catch(setError)\n  .finally(() => setLoading(false));" },
    ],
  },
  {
    name: "Promise.resolve()", category: "Promise",
    description: "Returns a Promise that is already fulfilled with the given value. If the value is a thenable, the promise adopts its state.",
    syntax: "Promise.resolve(value);",
    notes: "Useful for normalising values that may or may not be promises.",
    returns: "A fulfilled Promise.",
    variations: [
      { title: "Wrap a value", code: "Promise.resolve(42).then(v => console.log(v)); // 42" },
      { title: "Flatten a thenable", code: "const p = Promise.resolve(fetch('/api'));\n// p is a regular Promise wrapping the fetch" },
    ],
  },
  {
    name: "Promise.reject()", category: "Promise",
    description: "Returns a Promise that is already rejected with the given reason.",
    syntax: "Promise.reject(reason);",
    notes: "Always attach a .catch() or the rejection will be unhandled.",
    returns: "A rejected Promise.",
    variations: [
      { title: "Immediate rejection", code: "Promise.reject(new Error('Not found'))\n  .catch(err => console.error(err.message));" },
    ],
  },
  {
    name: "Promise.all()", category: "Promise",
    description: "Takes an iterable of promises and returns a single promise that fulfills when ALL input promises fulfill, or rejects as soon as any one rejects.",
    syntax: "Promise.all([p1, p2, p3]);",
    notes: "Fail-fast: one rejection immediately rejects the whole result. Results preserve input order.",
    returns: "A Promise fulfilled with an array of all resolved values.",
    variations: [
      { title: "Parallel fetches", code: "const [user, posts] = await Promise.all([\n  fetch('/api/user').then(r => r.json()),\n  fetch('/api/posts').then(r => r.json()),\n]);" },
    ],
  },
  {
    name: "Promise.allSettled()", category: "Promise",
    description: "Like Promise.all() but waits for ALL promises to settle, regardless of outcome. Never rejects.",
    syntax: "Promise.allSettled([p1, p2, p3]);",
    notes: "Each result object has a `status` of 'fulfilled' or 'rejected', plus `value` or `reason`.",
    returns: "A Promise fulfilled with an array of settlement descriptor objects.",
    variations: [
      { title: "Report all outcomes", code: "const results = await Promise.allSettled([p1, p2, p3]);\nresults.forEach(r => {\n  if (r.status === 'fulfilled') use(r.value);\n  else log(r.reason);\n});" },
    ],
  },
  {
    name: "Promise.race()", category: "Promise",
    description: "Returns a promise that settles as soon as the FIRST input promise settles (fulfilled or rejected).",
    syntax: "Promise.race([p1, p2]);",
    notes: "Useful for timeouts — race the actual request against a timeout promise.",
    returns: "A Promise with the value or reason of the first settled promise.",
    variations: [
      { title: "Timeout pattern", code: "const timeout = new Promise((_, reject) =>\n  setTimeout(() => reject(new Error('Timeout')), 5000)\n);\nconst result = await Promise.race([fetchData(), timeout]);" },
    ],
  },
  {
    name: "Promise.any()", category: "Promise",
    description: "Fulfills as soon as ANY input promise fulfills. Rejects only if ALL promises reject (with an AggregateError).",
    syntax: "Promise.any([p1, p2, p3]);",
    notes: "Opposite of Promise.all() in failure behaviour. Useful for trying multiple sources.",
    returns: "A Promise fulfilled with the value of the first fulfilled promise.",
    variations: [
      { title: "First successful fetch", code: "const data = await Promise.any([\n  fetch(primaryUrl),\n  fetch(fallbackUrl),\n  fetch(mirrorUrl),\n]);" },
    ],
  },

  // ── Async / Await ─────────────────────────────────────────────────────────
  {
    name: "async function", category: "Async/Await",
    description: "Declares an asynchronous function. It always returns a Promise — non-Promise return values are automatically wrapped.",
    syntax: "async function name(params) { ... }",
    notes: "Can use `await` inside. Arrow functions, methods, and class methods can also be async.",
    returns: "Always a Promise, resolved with the function's return value.",
    variations: [
      { title: "Function declaration", code: "async function getUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n}" },
      { title: "Arrow function", code: "const getUser = async (id) => {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n};" },
      { title: "Async class method", code: "class Api {\n  async getUser(id) {\n    const res = await fetch(`/api/users/${id}`);\n    return res.json();\n  }\n}" },
    ],
  },
  {
    name: "await", category: "Async/Await",
    description: "Pauses execution of the enclosing async function until the Promise settles. Non-Promise values are returned immediately.",
    syntax: "const result = await promise;",
    notes: "Can only be used inside `async` functions (or at the top level of ES modules). Throws if the awaited promise rejects.",
    returns: "The fulfilled value of the promise.",
    variations: [
      { title: "Sequential requests", code: "const user = await getUser(id);\nconst posts = await getPosts(user.id);" },
      { title: "Parallel with Promise.all", code: "const [user, posts] = await Promise.all([\n  getUser(id),\n  getPosts(id),\n]);" },
      { title: "Top-level await (ESM)", code: "// In an ES module:\nconst config = await fetch('/config.json').then(r => r.json());" },
    ],
  },
  {
    name: "try / catch / finally", category: "Async/Await",
    description: "Standard error handling for async/await code. A rejected promise inside `await` throws, which is caught by `catch`.",
    syntax: "try { await ... } catch (err) { ... } finally { ... }",
    notes: "Prefer try/catch with async/await over .catch() for consistent, readable error handling.",
    returns: "N/A — this is a control flow statement.",
    variations: [
      { title: "Basic error handling", code: "async function loadUser(id) {\n  try {\n    const user = await getUser(id);\n    render(user);\n  } catch (err) {\n    showError(err);\n  } finally {\n    setLoading(false);\n  }\n}" },
      { title: "Re-throw pattern", code: "async function save(data) {\n  try {\n    await api.save(data);\n  } catch (err) {\n    log(err);\n    throw err; // let the caller handle it\n  }\n}" },
    ],
  },
  {
    name: "Async Iteration", category: "Async/Await",
    description: "Use `for await...of` to iterate over async iterables (e.g. streams, paginated APIs) one item at a time.",
    syntax: "for await (const item of asyncIterable) { ... }",
    notes: "Works with anything that implements the async iterator protocol (Symbol.asyncIterator). Must be inside an async function.",
    returns: "N/A — iterates side-effectfully.",
    variations: [
      { title: "Read a stream", code: "async function readStream(stream) {\n  for await (const chunk of stream) {\n    process(chunk);\n  }\n}" },
      { title: "Paginated API", code: "async function* paginate(url) {\n  while (url) {\n    const { data, next } = await fetch(url).then(r => r.json());\n    yield* data;\n    url = next;\n  }\n}\nfor await (const item of paginate('/api/items')) {\n  display(item);\n}" },
    ],
  },
  {
    name: "Async Generator", category: "Async/Await",
    description: "An async function that can yield multiple values over time using `yield`. Consumers use `for await...of` to iterate.",
    syntax: "async function* name() { yield value; }",
    notes: "Combines the laziness of generators with the asynchrony of promises. Great for streaming data.",
    returns: "An async generator object (implements the async iterator protocol).",
    variations: [
      { title: "Polling generator", code: "async function* poll(url, interval) {\n  while (true) {\n    yield await fetch(url).then(r => r.json());\n    await new Promise(r => setTimeout(r, interval));\n  }\n}" },
    ],
  },
  {
    name: "AbortController", category: "Async/Await",
    description: "Allows you to abort one or more async operations (e.g. fetch requests) by signalling an AbortSignal.",
    syntax: "const controller = new AbortController();\nconst { signal } = controller;\ncontroller.abort();",
    notes: "Pass `signal` to fetch() or other APIs. Aborting causes the promise to reject with an AbortError.",
    returns: "N/A — imperative control object.",
    variations: [
      { title: "Cancel a fetch", code: "const controller = new AbortController();\nfetch('/api/data', { signal: controller.signal })\n  .then(r => r.json())\n  .catch(err => {\n    if (err.name === 'AbortError') return; // expected\n    throw err;\n  });\n// cancel:\ncontroller.abort();" },
      { title: "React cleanup", code: "useEffect(() => {\n  const controller = new AbortController();\n  fetchData(controller.signal).then(setData);\n  return () => controller.abort();\n}, []);" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Promise":     "bg-primary-100 text-primary-700",
  "Async/Await": "bg-amber-100 text-amber-700",
};

export default function JavaScriptAsyncCheatsheet() {
  return (
    <CategorizedArticle
      items={topicsData}
      badgeColors={categoryColor}
      legendLabel="Category"
      labels={CODE_LABELS}
    />
  );
}
