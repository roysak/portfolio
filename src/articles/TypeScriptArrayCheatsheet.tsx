import { CategorizedArticle, CODE_LABELS } from "./components";
import type { TopicItem } from "./components";

const topicsData: TopicItem[] = [
  // ── Creation ──────────────────────────────────────────────────────────────
  {
    name: "Array literal []", category: "Creation",
    description: "The most common way to create an array. TypeScript infers the element type from the initial values, or you can annotate it explicitly.",
    syntax: "const arr: T[] = [item1, item2, ...];",
    notes: "Prefer literals over `new Array()`. TypeScript will widen the type unless you use `as const` or an explicit annotation.",
    returns: "A new array of the inferred or declared type.",
    variations: [
      { title: "Inferred type", code: "const nums = [1, 2, 3];          // number[]\nconst mixed = [1, 'a', true];    // (string | number | boolean)[]" },
      { title: "Explicit annotation", code: "const ids: number[] = [10, 20, 30];\nconst names: Array<string> = ['Alice', 'Bob'];" },
      { title: "Readonly / const assertion", code: "const COLORS = ['red', 'green', 'blue'] as const;\n// type: readonly [\"red\", \"green\", \"blue\"]\ntype Color = typeof COLORS[number]; // 'red' | 'green' | 'blue'" },
    ],
  },
  {
    name: "Array.from()", category: "Creation",
    description: "Creates a new array from an array-like or iterable object (e.g. NodeList, Set, string, Map). Accepts an optional mapping function.",
    syntax: "Array.from(arrayLike, mapFn?);",
    notes: "The mapFn receives (element, index). Particularly useful for converting DOM collections or generating ranges.",
    returns: "A new Array instance.",
    variations: [
      { title: "From a Set (dedup)", code: "const unique = Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]" },
      { title: "Generate a range", code: "const range = Array.from({ length: 5 }, (_, i) => i + 1);\n// [1, 2, 3, 4, 5]" },
      { title: "From a string", code: "const chars = Array.from('hello'); // ['h','e','l','l','o']" },
      { title: "From a NodeList", code: "const divs = Array.from(document.querySelectorAll('div'));\n// HTMLDivElement[] — fully typed" },
    ],
  },
  {
    name: "Array.of()", category: "Creation",
    description: "Creates an array from the arguments passed to it. Unlike `new Array(n)`, a single numeric argument creates a one-element array, not a sparse one.",
    syntax: "Array.of(element0, element1, ...);",
    notes: "`new Array(3)` creates `[empty × 3]`; `Array.of(3)` creates `[3]`. Use `Array.of` when you want predictable single-element arrays.",
    returns: "A new Array containing the supplied elements.",
    variations: [
      { title: "Avoid sparse-array pitfall", code: "new Array(3);      // [empty × 3]  (length 3, no elements)\nArray.of(3);       // [3]           (length 1)" },
      { title: "Multiple values", code: "Array.of(1, 2, 3); // [1, 2, 3]" },
    ],
  },
  {
    name: "Array.isArray()", category: "Creation",
    description: "Returns `true` if the value is an Array. Acts as a TypeScript type-guard that narrows `unknown` or `any` to `unknown[]`.",
    syntax: "Array.isArray(value);",
    notes: "Unlike `instanceof Array`, this works across iframes/realms. Use it as a type-guard before calling array methods on an uncertain value.",
    returns: "A `boolean`. In TypeScript, it also narrows the type inside the `if` block.",
    variations: [
      { title: "Type-guard usage", code: "function process(value: unknown) {\n  if (Array.isArray(value)) {\n    value.forEach(item => console.log(item)); // safe\n  }\n}" },
      { title: "Cross-realm check", code: "// Works even when the array comes from an iframe\nconst fromIframe = iframe.contentWindow!.eval('[1,2,3]');\nconsole.log(Array.isArray(fromIframe)); // true" },
    ],
  },

  // ── Mutation ──────────────────────────────────────────────────────────────
  {
    name: ".push() / .pop()", category: "Mutation",
    description: "`push` appends one or more elements to the end. `pop` removes and returns the last element. Both mutate the original array.",
    syntax: "arr.push(item1, item2?);\narr.pop();",
    notes: "`pop` returns `T | undefined` in TypeScript when the array type is `T[]`. On an empty array, `pop` returns `undefined`.",
    returns: "`push` → new length (number). `pop` → removed element or `undefined`.",
    variations: [
      { title: "Push multiple", code: "const stack: number[] = [1, 2];\nstack.push(3, 4); // stack = [1, 2, 3, 4], returns 4" },
      { title: "Pop (stack pattern)", code: "const stack = [1, 2, 3];\nconst top = stack.pop(); // 3, stack = [1, 2]" },
    ],
  },
  {
    name: ".shift() / .unshift()", category: "Mutation",
    description: "`shift` removes and returns the first element (O(n)). `unshift` prepends one or more elements to the beginning (O(n)).",
    syntax: "arr.shift();\narr.unshift(item1, item2?);",
    notes: "Both are O(n) because all remaining indices must be re-keyed. Use push/pop for performance-critical queues.",
    returns: "`shift` → removed element or `undefined`. `unshift` → new length.",
    variations: [
      { title: "Queue pattern", code: "const queue: string[] = ['a', 'b'];\nqueue.push('c');       // enqueue → ['a','b','c']\nconst first = queue.shift(); // dequeue → 'a'" },
      { title: "Prepend multiple", code: "const arr = [3, 4];\narr.unshift(1, 2); // arr = [1, 2, 3, 4]" },
    ],
  },
  {
    name: ".splice()", category: "Mutation",
    description: "Removes, replaces, or inserts elements at any position. Mutates the original array in place.",
    syntax: "arr.splice(start, deleteCount?, ...items);",
    notes: "Negative `start` counts from the end. `deleteCount` of 0 is a pure insert. Returns the removed elements.",
    returns: "An array of the removed elements (may be empty).",
    variations: [
      { title: "Delete at index", code: "const arr = [1, 2, 3, 4];\narr.splice(1, 1); // removes 2 → arr = [1, 3, 4]" },
      { title: "Insert without deleting", code: "const arr = [1, 4];\narr.splice(1, 0, 2, 3); // arr = [1, 2, 3, 4]" },
      { title: "Replace elements", code: "const arr = ['a', 'b', 'x', 'd'];\narr.splice(2, 1, 'c'); // arr = ['a','b','c','d']" },
    ],
  },
  {
    name: ".sort()", category: "Mutation",
    description: "Sorts the array in place. Without a comparator, elements are coerced to strings and sorted lexicographically — always provide a comparator for numbers.",
    syntax: "arr.sort((a, b) => a - b);",
    notes: "Mutates the original. The sort algorithm is stable in modern engines (V8, SpiderMonkey). For an immutable version, use `.toSorted()`.",
    returns: "The same (now sorted) array.",
    variations: [
      { title: "Numeric ascending", code: "const nums = [10, 2, 30, 4];\nnums.sort((a, b) => a - b); // [2, 4, 10, 30]" },
      { title: "Alphabetical strings", code: "const words = ['banana', 'apple', 'cherry'];\nwords.sort((a, b) => a.localeCompare(b));" },
      { title: "Sort objects by property", code: "const users = [{name:'Bob',age:30},{name:'Alice',age:25}];\nusers.sort((a, b) => a.age - b.age);" },
    ],
  },
  {
    name: ".reverse()", category: "Mutation",
    description: "Reverses the array in place. The first element becomes the last, and vice versa.",
    syntax: "arr.reverse();",
    notes: "Mutates the original array. For an immutable version, use `.toReversed()` (ES2023).",
    returns: "The same (now reversed) array.",
    variations: [
      { title: "In-place reverse", code: "const arr = [1, 2, 3];\narr.reverse(); // [3, 2, 1]" },
      { title: "Sort then reverse (descending)", code: "const nums = [3, 1, 4, 1, 5];\nnums.sort((a, b) => a - b).reverse(); // [5, 4, 3, 1, 1]" },
    ],
  },
  {
    name: ".fill()", category: "Mutation",
    description: "Fills all or part of an array with a static value. Mutates in place.",
    syntax: "arr.fill(value, start?, end?);",
    notes: "`start` and `end` are optional and support negative indices. Useful for zeroing out buffers or seeding arrays.",
    returns: "The modified array.",
    variations: [
      { title: "Zero-fill", code: "new Array(5).fill(0); // [0, 0, 0, 0, 0]" },
      { title: "Partial fill", code: "const arr = [1, 2, 3, 4, 5];\narr.fill(9, 1, 3); // [1, 9, 9, 4, 5]" },
    ],
  },

  // ── Search & Access ───────────────────────────────────────────────────────
  {
    name: ".at()", category: "Search & Access",
    description: "Returns the element at the given index. Accepts negative indices that count from the end (e.g. -1 is the last element).",
    syntax: "arr.at(index);",
    notes: "Cleaner than `arr[arr.length - 1]` for last-element access. Returns `undefined` if out of bounds.",
    returns: "The element at that index, or `undefined`.",
    variations: [
      { title: "Last element", code: "const arr = [10, 20, 30];\narr.at(-1);  // 30\narr.at(-2);  // 20" },
      { title: "Safe first/last", code: "const last = arr.at(-1) ?? 'default';" },
    ],
  },
  {
    name: ".indexOf() / .lastIndexOf()", category: "Search & Access",
    description: "`indexOf` returns the index of the first occurrence of a value; `lastIndexOf` searches from the end. Both use strict equality (`===`).",
    syntax: "arr.indexOf(value, fromIndex?);\narr.lastIndexOf(value, fromIndex?);",
    notes: "Returns `-1` when not found. Cannot find `NaN` — use `.findIndex(Number.isNaN)` instead.",
    returns: "The index (number), or `-1`.",
    variations: [
      { title: "Basic search", code: "const arr = [1, 2, 3, 2, 1];\narr.indexOf(2);      // 1\narr.lastIndexOf(2);  // 3" },
      { title: "Existence check", code: "if (arr.indexOf(target) !== -1) { /* found */ }" },
    ],
  },
  {
    name: ".find() / .findIndex()", category: "Search & Access",
    description: "`find` returns the first element that satisfies the predicate. `findIndex` returns its index. Both short-circuit on the first match.",
    syntax: "arr.find(predicate);\narr.findIndex(predicate);",
    notes: "TypeScript narrows the return type when you pass a type-guard as the predicate. Returns `undefined` / `-1` if nothing matches.",
    returns: "`find` → element or `undefined`. `findIndex` → index or `-1`.",
    variations: [
      { title: "Find by property", code: "const user = users.find(u => u.id === 42);\n// TypeScript knows user is User | undefined" },
      { title: "Type-guard predicate", code: "const strs = (arr as (string|number)[]).find(\n  (x): x is string => typeof x === 'string'\n);\n// strs is string | undefined" },
      { title: "Find index and splice", code: "const idx = items.findIndex(i => i.id === id);\nif (idx !== -1) items.splice(idx, 1);" },
    ],
  },
  {
    name: ".findLast() / .findLastIndex()", category: "Search & Access",
    description: "ES2023 variants of `find`/`findIndex` that search from the end of the array toward the beginning.",
    syntax: "arr.findLast(predicate);\narr.findLastIndex(predicate);",
    notes: "Useful when you expect the match to be near the end (e.g. latest log entry). `tsconfig` target must be ES2023 or lib must include `ES2023.Array`.",
    returns: "`findLast` → element or `undefined`. `findLastIndex` → index or `-1`.",
    variations: [
      { title: "Last matching item", code: "const events = [{type:'click'},{type:'hover'},{type:'click'}];\nconst lastClick = events.findLast(e => e.type === 'click');" },
    ],
  },
  {
    name: ".includes()", category: "Search & Access",
    description: "Returns `true` if the array contains the given value, using SameValueZero equality (handles `NaN` correctly, unlike `indexOf`).",
    syntax: "arr.includes(value, fromIndex?);",
    notes: "Prefer over `indexOf(x) !== -1` for readability. Does not accept a predicate — use `.some()` for that.",
    returns: "A `boolean`.",
    variations: [
      { title: "Simple check", code: "const fruits = ['apple', 'banana', 'cherry'];\nfruits.includes('banana'); // true" },
      { title: "NaN detection", code: "[1, NaN, 3].includes(NaN); // true  ✓\n[1, NaN, 3].indexOf(NaN);  // -1    ✗" },
    ],
  },

  // ── Iteration ─────────────────────────────────────────────────────────────
  {
    name: ".forEach()", category: "Iteration",
    description: "Executes a callback once for each element. Does not return a value and cannot be stopped early (use `for...of` with `break` if you need that).",
    syntax: "arr.forEach((element, index, array) => { ... });",
    notes: "Cannot be stopped with `break` or `return`. Skips empty slots in sparse arrays. For async callbacks, use `for...of` with `await` instead.",
    returns: "`undefined`.",
    variations: [
      { title: "Side effects", code: "users.forEach(user => {\n  console.log(`${user.name}: ${user.age}`);\n});" },
      { title: "Async — use for...of instead", code: "// ❌ forEach ignores returned promises\n// ✅ use for...of:\nfor (const url of urls) {\n  const data = await fetch(url).then(r => r.json());\n  process(data);\n}" },
    ],
  },
  {
    name: ".map()", category: "Iteration",
    description: "Creates a new array by applying a callback to every element. TypeScript infers the result type from the callback's return type.",
    syntax: "const result = arr.map((element, index) => newValue);",
    notes: "Always returns a new array of the same length. Use `.filter().map()` or `.flatMap()` when you also need to drop elements.",
    returns: "A new array of transformed elements.",
    variations: [
      { title: "Transform objects", code: "const names = users.map(u => u.name); // string[]" },
      { title: "Index usage", code: "const indexed = items.map((item, i) => ({ ...item, rank: i + 1 }));" },
      { title: "Type transformation", code: "const parsed: number[] = ['1','2','3'].map(Number);" },
    ],
  },
  {
    name: ".filter()", category: "Iteration",
    description: "Returns a new array containing only the elements for which the callback returns `true`. Accepts type-guard predicates for narrowed return types.",
    syntax: "const result = arr.filter((element) => boolean);",
    notes: "When you pass a type-guard `(x): x is SubType => ...`, TypeScript narrows the result type accordingly.",
    returns: "A new (shorter or equal-length) array.",
    variations: [
      { title: "Basic filter", code: "const evens = [1, 2, 3, 4, 5].filter(n => n % 2 === 0); // [2, 4]" },
      { title: "Type-guard filter", code: "const mixed: (string | null)[] = ['a', null, 'b', null];\nconst strings = mixed.filter((x): x is string => x !== null);\n// strings is string[], not (string | null)[]" },
      { title: "Filter objects", code: "const admins = users.filter(u => u.role === 'admin');" },
    ],
  },
  {
    name: ".reduce()", category: "Iteration",
    description: "Accumulates all elements into a single output value by repeatedly calling a reducer. The accumulator type can differ from the element type.",
    syntax: "arr.reduce((accumulator, current, index) => nextAcc, initialValue);",
    notes: "Always provide an initial value — its type determines the accumulator type in TypeScript. Without it, the accumulator type is inferred from the first element.",
    returns: "The final accumulated value.",
    variations: [
      { title: "Sum", code: "const total = [1, 2, 3, 4].reduce((sum, n) => sum + n, 0); // 10" },
      { title: "Group by property", code: "const byRole = users.reduce<Record<string, User[]>>((acc, user) => {\n  (acc[user.role] ??= []).push(user);\n  return acc;\n}, {});" },
      { title: "Array to Map", code: "const map = users.reduce<Map<number, User>>((m, u) => {\n  m.set(u.id, u);\n  return m;\n}, new Map());" },
    ],
  },
  {
    name: ".every() / .some()", category: "Iteration",
    description: "`every` returns `true` if ALL elements satisfy the predicate. `some` returns `true` if AT LEAST ONE element does. Both short-circuit.",
    syntax: "arr.every(predicate);\narr.some(predicate);",
    notes: "`every` returns `true` for an empty array (vacuous truth). `some` returns `false` for an empty array. Both accept type-guard predicates.",
    returns: "A `boolean`.",
    variations: [
      { title: "Validation", code: "const allPositive = nums.every(n => n > 0);\nconst hasNegative = nums.some(n => n < 0);" },
      { title: "Type-guard with every", code: "function allStrings(arr: unknown[]): arr is string[] {\n  return arr.every((x): x is string => typeof x === 'string');\n}" },
    ],
  },

  // ── Transformation ────────────────────────────────────────────────────────
  {
    name: ".flat() / .flatMap()", category: "Transformation",
    description: "`flat` flattens nested arrays up to the given depth. `flatMap` maps then flattens one level — more efficient than `.map().flat()`.",
    syntax: "arr.flat(depth?);\narr.flatMap((element) => arrayOrValue);",
    notes: "`flat()` defaults to depth 1. Use `Infinity` to fully flatten. `flatMap` only flattens one level — nest calls for deeper flattening.",
    returns: "A new flattened array.",
    variations: [
      { title: "Flatten nested", code: "[[1, 2], [3, [4]]].flat();        // [1, 2, 3, [4]]\n[[1, 2], [3, [4]]].flat(2);       // [1, 2, 3, 4]" },
      { title: "flatMap — expand rows", code: "const sentences = ['hello world', 'foo bar'];\nconst words = sentences.flatMap(s => s.split(' '));\n// ['hello','world','foo','bar']" },
      { title: "flatMap — filter + transform", code: "// Return [] to skip, [value] to keep\nconst positiveDoubles = nums.flatMap(n =>\n  n > 0 ? [n * 2] : []\n);" },
    ],
  },
  {
    name: ".slice()", category: "Transformation",
    description: "Returns a shallow copy of a portion of the array from `start` to `end` (exclusive). Does not mutate the original.",
    syntax: "arr.slice(start?, end?);",
    notes: "Negative indices count from the end. `slice()` with no arguments is a common pattern to shallow-clone an array.",
    returns: "A new array containing the selected elements.",
    variations: [
      { title: "Sub-array", code: "const arr = [1, 2, 3, 4, 5];\narr.slice(1, 3);  // [2, 3]\narr.slice(-2);    // [4, 5]" },
      { title: "Shallow clone", code: "const copy = original.slice();\n// or: [...original]" },
    ],
  },
  {
    name: ".concat()", category: "Transformation",
    description: "Merges two or more arrays (or values) into a new array without mutating the originals.",
    syntax: "arr.concat(value1, value2?);",
    notes: "Spread syntax `[...a, ...b]` is often preferred for readability. `concat` handles both arrays and individual values as arguments.",
    returns: "A new array containing all elements.",
    variations: [
      { title: "Merge arrays", code: "const a = [1, 2];\nconst b = [3, 4];\nconst c = a.concat(b); // [1, 2, 3, 4]" },
      { title: "Spread alternative", code: "const merged = [...a, ...b, 5, 6];" },
    ],
  },
  {
    name: ".join()", category: "Transformation",
    description: "Joins all elements into a single string using the given separator (default: comma).",
    syntax: "arr.join(separator?);",
    notes: "`undefined`, `null`, and empty slots become empty strings. Use an empty string separator to concatenate without any delimiter.",
    returns: "A `string`.",
    variations: [
      { title: "CSV row", code: "['Alice', 30, 'admin'].join(','); // 'Alice,30,admin'" },
      { title: "Path segments", code: "['usr', 'local', 'bin'].join('/'); // 'usr/local/bin'" },
      { title: "Concatenate chars", code: "['H','e','l','l','o'].join(''); // 'Hello'" },
    ],
  },
  {
    name: ".reduceRight()", category: "Transformation",
    description: "Like `.reduce()` but iterates from right to left (last element to first).",
    syntax: "arr.reduceRight((acc, current) => nextAcc, initialValue);",
    notes: "Useful for right-associative operations such as composing functions or reversing tree traversals.",
    returns: "The final accumulated value.",
    variations: [
      { title: "Right-to-left concat", code: "['a','b','c'].reduceRight((acc, s) => acc + s, ''); // 'cba'" },
      { title: "Function composition", code: "const compose = (...fns: Function[]) =>\n  (x: unknown) => fns.reduceRight((v, f) => f(v), x);" },
    ],
  },

  // ── Immutable (ES2023) ────────────────────────────────────────────────────
  {
    name: ".toSorted()", category: "Immutable (ES2023)",
    description: "Returns a new sorted array without mutating the original. Drop-in immutable replacement for `.sort()`.",
    syntax: "arr.toSorted((a, b) => a - b);",
    notes: "Requires TypeScript 5.2+ / `lib: [\"ES2023\"]`. Ideal for React state updates where mutation is forbidden.",
    returns: "A new sorted array.",
    variations: [
      { title: "Immutable sort", code: "const sorted = items.toSorted((a, b) => a.price - b.price);\n// items is unchanged" },
      { title: "React state update", code: "setItems(prev => prev.toSorted((a, b) => a.name.localeCompare(b.name)));" },
    ],
  },
  {
    name: ".toReversed()", category: "Immutable (ES2023)",
    description: "Returns a new reversed array without mutating the original. Immutable alternative to `.reverse()`.",
    syntax: "arr.toReversed();",
    notes: "Requires TypeScript 5.2+ / `lib: [\"ES2023\"]`. The original array is not modified.",
    returns: "A new array with elements in reverse order.",
    variations: [
      { title: "Immutable reverse", code: "const reversed = history.toReversed();\n// history is unchanged" },
    ],
  },
  {
    name: ".toSpliced()", category: "Immutable (ES2023)",
    description: "Returns a new array with elements removed, replaced, or inserted — like `.splice()` but immutable.",
    syntax: "arr.toSpliced(start, deleteCount?, ...items);",
    notes: "Requires TypeScript 5.2+ / `lib: [\"ES2023\"]`. Returns a copy; the original is unchanged.",
    returns: "A new array with the splicing applied.",
    variations: [
      { title: "Remove without mutation", code: "const next = list.toSpliced(idx, 1);\n// list unchanged, next has one fewer item" },
      { title: "Replace item in state", code: "setItems(prev => prev.toSpliced(idx, 1, updatedItem));" },
    ],
  },
  {
    name: ".with()", category: "Immutable (ES2023)",
    description: "Returns a new array with the element at the given index replaced by a new value. Negative indices are supported.",
    syntax: "arr.with(index, value);",
    notes: "Requires TypeScript 5.2+ / `lib: [\"ES2023\"]`. Cleaner than `[...arr.slice(0,i), val, ...arr.slice(i+1)]`.",
    returns: "A new array with the single element replaced.",
    variations: [
      { title: "Update by index", code: "const updated = arr.with(2, 99);\n// arr unchanged" },
      { title: "React state update", code: "setItems(prev => prev.with(selectedIdx, { ...item, done: true }));" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Creation":             "bg-primary-100 text-primary-700",
  "Mutation":             "bg-rose-100 text-rose-700",
  "Search & Access":      "bg-amber-100 text-amber-700",
  "Iteration":            "bg-emerald-100 text-emerald-700",
  "Transformation":       "bg-violet-100 text-violet-700",
  "Immutable (ES2023)":   "bg-sky-100 text-sky-700",
};

export default function TypeScriptArrayCheatsheet() {
  return (
    <CategorizedArticle
      items={topicsData}
      badgeColors={categoryColor}
      legendLabel="Category"
      labels={CODE_LABELS}
    />
  );
}
