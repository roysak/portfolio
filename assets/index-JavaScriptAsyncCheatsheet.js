import{i as e,n as t,t as n}from"./index-jsx-runtime.js";var r=e(t(),1),i=n(),a=[{name:`new Promise()`,category:`Promise`,description:`Creates a new Promise. The executor function receives two callbacks: resolve (fulfills the promise with a value) and reject (rejects it with a reason).`,syntax:`const p = new Promise((resolve, reject) => { ... });`,notes:`The executor runs synchronously. Errors thrown inside it automatically reject the promise.`,returns:`A Promise object that is initially pending, then becomes fulfilled or rejected.`,variations:[{title:`Basic resolve`,code:`const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});`},{title:`Reject on error`,code:`const p = new Promise((resolve, reject) => {
  if (!data) reject(new Error('No data'));
  else resolve(data);
});`}]},{name:`.then()`,category:`Promise`,description:`Schedules callbacks to run when a promise is fulfilled or rejected. Returns a new promise, enabling chaining.`,syntax:`promise.then(onFulfilled, onRejected?);`,notes:`Returning a value from onFulfilled wraps it in a resolved promise. Throwing rejects the next promise in the chain.`,returns:`A new Promise resolved with the return value of the callback.`,variations:[{title:`Basic chaining`,code:`fetch('/api/user')
  .then(res => res.json())
  .then(user => console.log(user.name));`},{title:`Transform value`,code:`Promise.resolve(5)
  .then(n => n * 2)
  .then(n => console.log(n)); // 10`}]},{name:`.catch()`,category:`Promise`,description:"Shorthand for `.then(null, onRejected)`. Handles rejections in a promise chain without interrupting the flow.",syntax:`promise.catch(onRejected);`,notes:`Catches errors from all preceding .then() calls in the chain. A value returned from .catch() resolves the next promise.`,returns:`A new Promise resolved with the return value of onRejected.`,variations:[{title:`Error handling`,code:`fetch('/api/data')
  .then(res => res.json())
  .catch(err => console.error('Failed:', err));`},{title:`Recovery / fallback`,code:`fetchUser(id)
  .catch(() => fetchCachedUser(id))
  .then(user => render(user));`}]},{name:`.finally()`,category:`Promise`,description:`Runs a callback when the promise settles (whether fulfilled or rejected). The callback receives no arguments.`,syntax:`promise.finally(onFinally);`,notes:`Use for cleanup (hiding spinners, closing connections) regardless of outcome.`,returns:`A Promise that settles with the same value/reason as the original.`,variations:[{title:`Hide loading spinner`,code:`setLoading(true);
fetchData()
  .then(setData)
  .catch(setError)
  .finally(() => setLoading(false));`}]},{name:`Promise.resolve()`,category:`Promise`,description:`Returns a Promise that is already fulfilled with the given value. If the value is a thenable, the promise adopts its state.`,syntax:`Promise.resolve(value);`,notes:`Useful for normalising values that may or may not be promises.`,returns:`A fulfilled Promise.`,variations:[{title:`Wrap a value`,code:`Promise.resolve(42).then(v => console.log(v)); // 42`},{title:`Flatten a thenable`,code:`const p = Promise.resolve(fetch('/api'));
// p is a regular Promise wrapping the fetch`}]},{name:`Promise.reject()`,category:`Promise`,description:`Returns a Promise that is already rejected with the given reason.`,syntax:`Promise.reject(reason);`,notes:`Always attach a .catch() or the rejection will be unhandled.`,returns:`A rejected Promise.`,variations:[{title:`Immediate rejection`,code:`Promise.reject(new Error('Not found'))
  .catch(err => console.error(err.message));`}]},{name:`Promise.all()`,category:`Promise`,description:`Takes an iterable of promises and returns a single promise that fulfills when ALL input promises fulfill, or rejects as soon as any one rejects.`,syntax:`Promise.all([p1, p2, p3]);`,notes:`Fail-fast: one rejection immediately rejects the whole result. Results preserve input order.`,returns:`A Promise fulfilled with an array of all resolved values.`,variations:[{title:`Parallel fetches`,code:`const [user, posts] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);`}]},{name:`Promise.allSettled()`,category:`Promise`,description:`Like Promise.all() but waits for ALL promises to settle, regardless of outcome. Never rejects.`,syntax:`Promise.allSettled([p1, p2, p3]);`,notes:"Each result object has a `status` of 'fulfilled' or 'rejected', plus `value` or `reason`.",returns:`A Promise fulfilled with an array of settlement descriptor objects.`,variations:[{title:`Report all outcomes`,code:`const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === 'fulfilled') use(r.value);
  else log(r.reason);
});`}]},{name:`Promise.race()`,category:`Promise`,description:`Returns a promise that settles as soon as the FIRST input promise settles (fulfilled or rejected).`,syntax:`Promise.race([p1, p2]);`,notes:`Useful for timeouts — race the actual request against a timeout promise.`,returns:`A Promise with the value or reason of the first settled promise.`,variations:[{title:`Timeout pattern`,code:`const timeout = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timeout')), 5000)
);
const result = await Promise.race([fetchData(), timeout]);`}]},{name:`Promise.any()`,category:`Promise`,description:`Fulfills as soon as ANY input promise fulfills. Rejects only if ALL promises reject (with an AggregateError).`,syntax:`Promise.any([p1, p2, p3]);`,notes:`Opposite of Promise.all() in failure behaviour. Useful for trying multiple sources.`,returns:`A Promise fulfilled with the value of the first fulfilled promise.`,variations:[{title:`First successful fetch`,code:`const data = await Promise.any([
  fetch(primaryUrl),
  fetch(fallbackUrl),
  fetch(mirrorUrl),
]);`}]},{name:`async function`,category:`Async/Await`,description:`Declares an asynchronous function. It always returns a Promise — non-Promise return values are automatically wrapped.`,syntax:`async function name(params) { ... }`,notes:"Can use `await` inside. Arrow functions, methods, and class methods can also be async.",returns:`Always a Promise, resolved with the function's return value.`,variations:[{title:`Function declaration`,code:`async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}`},{title:`Arrow function`,code:`const getUser = async (id) => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
};`},{title:`Async class method`,code:`class Api {
  async getUser(id) {
    const res = await fetch(\`/api/users/\${id}\`);
    return res.json();
  }
}`}]},{name:`await`,category:`Async/Await`,description:`Pauses execution of the enclosing async function until the Promise settles. Non-Promise values are returned immediately.`,syntax:`const result = await promise;`,notes:"Can only be used inside `async` functions (or at the top level of ES modules). Throws if the awaited promise rejects.",returns:`The fulfilled value of the promise.`,variations:[{title:`Sequential requests`,code:`const user = await getUser(id);
const posts = await getPosts(user.id);`},{title:`Parallel with Promise.all`,code:`const [user, posts] = await Promise.all([
  getUser(id),
  getPosts(id),
]);`},{title:`Top-level await (ESM)`,code:`// In an ES module:
const config = await fetch('/config.json').then(r => r.json());`}]},{name:`try / catch / finally`,category:`Async/Await`,description:"Standard error handling for async/await code. A rejected promise inside `await` throws, which is caught by `catch`.",syntax:`try { await ... } catch (err) { ... } finally { ... }`,notes:`Prefer try/catch with async/await over .catch() for consistent, readable error handling.`,returns:`N/A — this is a control flow statement.`,variations:[{title:`Basic error handling`,code:`async function loadUser(id) {
  try {
    const user = await getUser(id);
    render(user);
  } catch (err) {
    showError(err);
  } finally {
    setLoading(false);
  }
}`},{title:`Re-throw pattern`,code:`async function save(data) {
  try {
    await api.save(data);
  } catch (err) {
    log(err);
    throw err; // let the caller handle it
  }
}`}]},{name:`Async Iteration`,category:`Async/Await`,description:"Use `for await...of` to iterate over async iterables (e.g. streams, paginated APIs) one item at a time.",syntax:`for await (const item of asyncIterable) { ... }`,notes:`Works with anything that implements the async iterator protocol (Symbol.asyncIterator). Must be inside an async function.`,returns:`N/A — iterates side-effectfully.`,variations:[{title:`Read a stream`,code:`async function readStream(stream) {
  for await (const chunk of stream) {
    process(chunk);
  }
}`},{title:`Paginated API`,code:`async function* paginate(url) {
  while (url) {
    const { data, next } = await fetch(url).then(r => r.json());
    yield* data;
    url = next;
  }
}
for await (const item of paginate('/api/items')) {
  display(item);
}`}]},{name:`Async Generator`,category:`Async/Await`,description:"An async function that can yield multiple values over time using `yield`. Consumers use `for await...of` to iterate.",syntax:`async function* name() { yield value; }`,notes:`Combines the laziness of generators with the asynchrony of promises. Great for streaming data.`,returns:`An async generator object (implements the async iterator protocol).`,variations:[{title:`Polling generator`,code:`async function* poll(url, interval) {
  while (true) {
    yield await fetch(url).then(r => r.json());
    await new Promise(r => setTimeout(r, interval));
  }
}`}]},{name:`AbortController`,category:`Async/Await`,description:`Allows you to abort one or more async operations (e.g. fetch requests) by signalling an AbortSignal.`,syntax:`const controller = new AbortController();
const { signal } = controller;
controller.abort();`,notes:"Pass `signal` to fetch() or other APIs. Aborting causes the promise to reject with an AbortError.",returns:`N/A — imperative control object.`,variations:[{title:`Cancel a fetch`,code:`const controller = new AbortController();
fetch('/api/data', { signal: controller.signal })
  .then(r => r.json())
  .catch(err => {
    if (err.name === 'AbortError') return; // expected
    throw err;
  });
// cancel:
controller.abort();`},{title:`React cleanup`,code:`useEffect(() => {
  const controller = new AbortController();
  fetchData(controller.signal).then(setData);
  return () => controller.abort();
}, []);`}]}],o={Promise:`bg-primary-100 text-primary-700`,"Async/Await":`bg-amber-100 text-amber-700`};function s(){let[e,t]=(0,r.useState)(null),[n,s]=(0,r.useState)(0),c=Array.from(new Set(a.map(e=>e.category)));return(0,r.useEffect)(()=>{s(0)},[e]),(0,r.useEffect)(()=>(document.body.style.overflow=e?`hidden`:``,()=>{document.body.style.overflow=``}),[e]),(0,i.jsxs)(i.Fragment,{children:[c.map(e=>(0,i.jsxs)(`section`,{className:`mb-10`,children:[(0,i.jsxs)(`div`,{className:`flex items-center gap-3 mb-4`,children:[(0,i.jsx)(`h2`,{className:`text-lg font-semibold text-neutral-800`,children:e}),(0,i.jsxs)(`span`,{className:`text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e]}`,children:[a.filter(t=>t.category===e).length,` topics`]})]}),(0,i.jsx)(`div`,{className:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3`,children:a.filter(t=>t.category===e).map(e=>(0,i.jsxs)(`button`,{onClick:()=>t(e),className:`group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-600`,children:[(0,i.jsx)(`span`,{className:`text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-tight`,children:e.name}),(0,i.jsx)(`span`,{className:`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e.category]}`,children:e.category})]},e.name))})]},e)),(0,i.jsxs)(`div`,{className:`flex flex-wrap items-center gap-4 text-xs text-neutral-500`,children:[(0,i.jsx)(`span`,{className:`font-medium text-neutral-400 uppercase tracking-wide`,children:`Category`}),Object.entries(o).map(([e,t])=>(0,i.jsx)(`span`,{className:`px-2.5 py-0.5 rounded-full font-semibold ${t}`,children:e},e))]}),e&&(0,i.jsx)(`div`,{className:`fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm`,onClick:()=>t(null),children:(0,i.jsxs)(`div`,{className:`bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden`,onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(`div`,{className:`flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50`,children:[(0,i.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,i.jsx)(`h2`,{className:`text-xl font-semibold text-neutral-900`,children:e.name}),(0,i.jsx)(`span`,{className:`text-xs font-semibold px-2.5 py-0.5 rounded-full ${o[e.category]}`,children:e.category})]}),(0,i.jsx)(`button`,{onClick:()=>t(null),className:`text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-200`,"aria-label":`Close`,children:(0,i.jsx)(`span`,{className:`material-symbols-rounded text-xl! leading-none block!`,children:`close`})})]}),(0,i.jsxs)(`div`,{className:`p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6`,children:[(0,i.jsx)(`p`,{className:`text-neutral-600 leading-relaxed`,children:e.description}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Syntax`}),(0,i.jsx)(`pre`,{className:`bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-sm font-mono`,style:{userSelect:`text`},children:(0,i.jsx)(`code`,{children:e.syntax})})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Notes`}),(0,i.jsx)(`p`,{className:`text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4`,children:e.notes})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Returns`}),(0,i.jsx)(`p`,{className:`text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4`,children:e.returns})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{className:`text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2`,children:`Examples`}),(0,i.jsx)(`div`,{className:`rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100`,children:e.variations.map((e,t)=>{let r=n===t;return(0,i.jsxs)(`div`,{className:`bg-neutral-50`,children:[(0,i.jsxs)(`button`,{onClick:()=>s(r?null:t),className:`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-100 transition-colors`,children:[(0,i.jsx)(`span`,{className:`text-sm font-semibold text-neutral-700`,children:e.title}),(0,i.jsx)(`span`,{className:`material-symbols-rounded text-base! text-neutral-400 transition-transform duration-200 ${r?`rotate-180`:``}`,children:`expand_more`})]}),r&&(0,i.jsx)(`div`,{className:`px-4 pb-4 pt-1 bg-white`,children:(0,i.jsx)(`pre`,{className:`bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-xs font-mono`,style:{userSelect:`text`},children:(0,i.jsx)(`code`,{children:e.code})})})]},t)})})]})]})]})})]})}export{s as default};