import{t as e}from"./index-jsx-runtime.js";import{i as t,n}from"./index-components.js";var r=e(),i=[{name:`string`,category:`Primitive`,description:"Represents textual data. All JavaScript string methods are available. TypeScript distinguishes between the primitive `string` and the object wrapper `String` — always use the lowercase form.",syntax:`let name: string = 'Alice';`,notes:"Use single quotes, double quotes, or template literals. Never use `new String()` — it creates a String object, not a primitive, and behaves unexpectedly with `===`.",returns:`N/A — this is a type annotation.`,variations:[{title:`Basic declaration`,code:`let greeting: string = 'Hello';
const title: string = "TypeScript";`},{title:`Template literal`,code:"const user = 'Alice';\nconst msg: string = `Welcome, ${user}!`;"},{title:`Function parameter & return`,code:`function shout(text: string): string {
  return text.toUpperCase();
}`}]},{name:`number`,category:`Primitive`,description:"Represents all numeric values — integers, floats, hex, octal, binary, and special values like `NaN` and `Infinity`. TypeScript has no separate `int` or `float` type.",syntax:`let count: number = 42;`,notes:"All numbers are 64-bit IEEE 754 floats. Use `bigint` for integers beyond `Number.MAX_SAFE_INTEGER`. `NaN` and `Infinity` are valid `number` values.",returns:`N/A — this is a type annotation.`,variations:[{title:`Integer & float`,code:`const age: number = 30;
const pi: number = 3.14159;`},{title:`Hex, binary, octal`,code:`const hex: number   = 0xff;   // 255
const bin: number   = 0b1010; // 10
const oct: number   = 0o17;   // 15`},{title:`Special values`,code:`const inf: number = Infinity;
const nan: number = NaN;
console.log(typeof nan); // 'number'`}]},{name:`boolean`,category:`Primitive`,description:"Represents a logical value: either `true` or `false`. TypeScript narrows types based on boolean checks.",syntax:`let isActive: boolean = true;`,notes:"Do not use `Boolean()` as a type — use lowercase `boolean`. Truthy/falsy coercion from JavaScript still applies at runtime.",returns:`N/A — this is a type annotation.`,variations:[{title:`Flag variable`,code:`let isLoggedIn: boolean = false;
const isDone: boolean = true;`},{title:`From a comparison`,code:`const isAdult: boolean = age >= 18;`},{title:`Type narrowing`,code:`function greet(isAdmin: boolean) {
  if (isAdmin) {
    return 'Welcome, admin!';
  }
  return 'Welcome!';
}`}]},{name:`null & undefined`,category:`Primitive`,description:"`null` is an intentional absence of value. `undefined` means a variable has been declared but not assigned. With `strictNullChecks` enabled, neither is assignable to other types without explicit union.",syntax:`let value: string | null = null;
let data: number | undefined;`,notes:"Enable `strictNullChecks` (default in strict mode) — without it, `null` and `undefined` are silently assignable to every type, masking bugs.",returns:`N/A — these are types and values.`,variations:[{title:`Nullable field`,code:`let username: string | null = null;
username = 'Alice'; // now valid`},{title:`Optional variable`,code:`let config: object | undefined;
// config is undefined until assigned`},{title:`Nullish coalescing`,code:`const name: string | null = null;
const display = name ?? 'Anonymous'; // 'Anonymous'`}]},{name:`symbol`,category:`Primitive`,description:"A unique, immutable primitive used as object property keys. Each call to `Symbol()` creates a distinct value — no two symbols are equal.",syntax:`const id: symbol = Symbol('id');`,notes:"Symbols are never auto-coerced to strings. Use `Symbol.for(key)` to create/retrieve a global symbol shared across files/realms.",returns:`N/A — this is a type annotation.`,variations:[{title:`Unique key`,code:`const KEY: unique symbol = Symbol('key');
const obj = { [KEY]: 'secret' };`},{title:`Global symbol`,code:`const s1 = Symbol.for('shared');
const s2 = Symbol.for('shared');
console.log(s1 === s2); // true`}]},{name:`bigint`,category:`Primitive`,description:"Represents arbitrarily large integers beyond `Number.MAX_SAFE_INTEGER` (2^53 − 1). Created with an `n` suffix or `BigInt()` constructor.",syntax:`const big: bigint = 9007199254740993n;`,notes:"Cannot mix `bigint` and `number` in arithmetic — you must explicitly convert. Requires `target: ES2020` or higher in `tsconfig`.",returns:`N/A — this is a type annotation.`,variations:[{title:`Large integer`,code:`const huge: bigint = 123456789012345678901234567890n;`},{title:`Arithmetic`,code:`const a = 10n, b = 3n;
console.log(a / b);  // 3n  (integer division, no remainder)`},{title:`Conversion`,code:`const n: number = 42;
const b: bigint = BigInt(n);
const back: number = Number(b);`}]},{name:`any`,category:`Special`,description:"Opts the variable out of all type checking. Assignments to and from `any` are always allowed. Effectively disables TypeScript for that value.",syntax:`let value: any = 'hello';`,notes:"Avoid `any` — it silently spreads through code and defeats the purpose of TypeScript. Prefer `unknown` when the type is genuinely uncertain.",returns:`N/A — this is a type annotation.`,variations:[{title:`Escape hatch (avoid)`,code:`let data: any = fetchRawData();
data.nonExistentMethod(); // no error at compile time ⚠️`},{title:`Migrating JS code`,code:`// Temporary any while migrating from JS:
function legacy(input: any) {
  return input.trim();
}`}]},{name:`unknown`,category:`Special`,description:"A type-safe counterpart to `any`. You can assign anything to `unknown`, but you must narrow the type before using the value.",syntax:`let input: unknown = getInput();`,notes:"Prefer `unknown` over `any` for values from external sources (APIs, JSON, user input). Narrowing with `typeof` or `instanceof` unlocks the specific type.",returns:`N/A — this is a type annotation.`,variations:[{title:`Type-guard narrowing`,code:`function process(val: unknown) {
  if (typeof val === 'string') {
    console.log(val.toUpperCase()); // safe
  }
}`},{title:`API response`,code:`const data: unknown = JSON.parse(response);
if (typeof data === 'object' && data !== null && 'id' in data) {
  console.log((data as { id: number }).id);
}`}]},{name:`never`,category:`Special`,description:`Represents a value that never occurs — a function that always throws, an infinite loop, or an exhaustive switch branch. It is assignable to every type, but nothing is assignable to it.`,syntax:`function fail(msg: string): never {
  throw new Error(msg);
}`,notes:"`never` is TypeScript's way of proving that a code path is unreachable. Use it for exhaustive checks — if a value is typed as `never`, you've handled every case.",returns:"N/A — `never` means the function never returns.",variations:[{title:`Always-throws function`,code:`function panic(message: string): never {
  throw new Error(message);
}`},{title:`Exhaustive switch`,code:`type Shape = 'circle' | 'square';
function area(s: Shape) {
  switch (s) {
    case 'circle':  return Math.PI;
    case 'square':  return 1;
    default:
      const _exhaustive: never = s; // compile error if Shape grows
      return _exhaustive;
  }
}`}]},{name:`void`,category:`Special`,description:"Indicates that a function does not return a meaningful value. Variables of type `void` can only hold `undefined`.",syntax:`function log(msg: string): void {
  console.log(msg);
}`,notes:"Unlike `never`, a `void` function does return — it just returns `undefined` implicitly. Use `void` as the return type for callbacks and side-effect functions.",returns:"N/A — `void` means the return value is intentionally ignored.",variations:[{title:`Side-effect function`,code:`function saveToStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}`},{title:`Event handler type`,code:`const handleClick: (e: MouseEvent) => void = (e) => {
  e.preventDefault();
};`}]},{name:`object`,category:`Object & Collection`,description:"Represents any non-primitive value. The lowercase `object` type excludes `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, and `undefined`.",syntax:`let config: object = { debug: true };`,notes:"`object` is rarely useful on its own since you can't access properties without casting. Prefer explicit interfaces, type aliases, or `Record<K,V>` for typed objects.",returns:`N/A — this is a type annotation.`,variations:[{title:`Inline object type`,code:`const point: { x: number; y: number } = { x: 10, y: 20 };`},{title:`Optional properties`,code:`const user: { name: string; age?: number } = { name: 'Alice' };`},{title:`Index signature`,code:`const map: { [key: string]: number } = {};
map['score'] = 100;`}]},{name:`Tuple`,category:`Object & Collection`,description:`An array with a fixed number of elements whose types are known at each position. Useful for pairs, triples, or typed destructuring.`,syntax:`let pair: [string, number] = ['Alice', 30];`,notes:"Accessing beyond the defined indices causes a type error. Optional tuple elements use `?` suffix. Rest elements spread into the remaining positions.",returns:`N/A — this is a type annotation.`,variations:[{title:`Basic tuple`,code:`const coords: [number, number] = [51.5, -0.12];
const [lat, lng] = coords;`},{title:`Named tuple (TS 4.0+)`,code:`type Range = [start: number, end: number];
const r: Range = [0, 100];`},{title:`Optional element`,code:`type HttpResponse = [status: number, body: string, headers?: object];
const res: HttpResponse = [200, 'OK'];`},{title:`useState-style return`,code:`function useToggle(init: boolean): [boolean, () => void] {
  let val = init;
  return [val, () => { val = !val; }];
}`}]},{name:`enum`,category:`Object & Collection`,description:`A set of named numeric or string constants. Numeric enums auto-increment from 0; string enums require explicit values.`,syntax:`enum Direction { Up, Down, Left, Right }`,notes:"Numeric enums have a reverse mapping (`Direction[0] === 'Up'`). Prefer `const enum` for tree-shakable inlining, or string enums for readable serialized values. Some teams prefer union literal types over enums.",returns:"N/A — `enum` is a declaration.",variations:[{title:`Numeric enum`,code:`enum Status { Pending, Active, Closed }
const s: Status = Status.Active; // 1`},{title:`String enum`,code:`enum Direction {
  Up    = 'UP',
  Down  = 'DOWN',
  Left  = 'LEFT',
  Right = 'RIGHT',
}`},{title:`Const enum (inlined)`,code:`const enum Color { Red, Green, Blue }
const c = Color.Green; // compiled to: const c = 1;`},{title:`Union literal alternative`,code:`// Often preferred over enum:
type Role = 'admin' | 'editor' | 'viewer';`}]},{name:`Union  ( | )`,category:`Union & Intersection`,description:`A type that can be one of several types. TypeScript requires you to narrow the type before using type-specific operations.`,syntax:`let value: string | number;`,notes:"Discriminated unions add a shared literal field (e.g. `type`) to each member, letting TypeScript narrow automatically in a switch statement.",returns:`N/A — this is a type annotation.`,variations:[{title:`Basic union`,code:`function format(val: string | number): string {
  if (typeof val === 'number') return val.toFixed(2);
  return val.trim();
}`},{title:`Discriminated union`,code:`type Shape =
  | { kind: 'circle';  radius: number }
  | { kind: 'square';  side: number };

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'square': return s.side ** 2;
  }
}`},{title:`Nullable union`,code:`type MaybeUser = User | null | undefined;`}]},{name:`Intersection  ( & )`,category:`Union & Intersection`,description:`Combines multiple types into one that has ALL properties of every member. A value must satisfy every constituent type simultaneously.`,syntax:`type AdminUser = User & Admin;`,notes:"Intersecting incompatible primitives (e.g. `string & number`) yields `never`. Most useful for merging object shapes or mixing in traits (mixins).",returns:`N/A — this is a type annotation.`,variations:[{title:`Merge object shapes`,code:`type Timestamped = { createdAt: Date; updatedAt: Date };
type Post = { title: string; body: string };
type TimestampedPost = Post & Timestamped;`},{title:`Function parameter merge`,code:`function save(entity: Post & Timestamped) {
  db.insert(entity);
}`},{title:`Mixin pattern`,code:`type Loggable = { log: (msg: string) => void };
type Service = { fetch: () => Promise<Data> };
type LoggableService = Service & Loggable;`}]},{name:`Literal Types`,category:`Literal & Template`,description:`A type that represents a single specific value rather than all values of a kind. String, number, and boolean literals can all be used as types.`,syntax:`type Direction = 'north' | 'south' | 'east' | 'west';`,notes:"TypeScript widens inferred literal types (`let` → widened, `const` → narrowed). Use `as const` on objects/arrays to preserve literal types throughout.",returns:`N/A — this is a type annotation.`,variations:[{title:`String literal union`,code:`type Status = 'idle' | 'loading' | 'success' | 'error';
let state: Status = 'idle';`},{title:`Numeric literal`,code:`type Dice = 1 | 2 | 3 | 4 | 5 | 6;
function roll(): Dice { return (Math.floor(Math.random() * 6) + 1) as Dice; }`},{title:`Boolean literal`,code:`type AlwaysTrue = true;
const flag: AlwaysTrue = true;`},{title:`as const widening guard`,code:`const config = { env: 'production', port: 3000 } as const;
// config.env is 'production', not string
// config.port is 3000, not number`}]},{name:`Template Literal Types`,category:`Literal & Template`,description:`Constructs new string literal types by interpolating other literal types inside a template expression. Mirrors JavaScript template literal syntax at the type level.`,syntax:"type Greeting = `Hello, ${string}`;",notes:`Can be combined with unions to generate all combinations. Useful for event name patterns, CSS property names, or API endpoint strings.`,returns:`N/A — this is a type annotation.`,variations:[{title:`Event name pattern`,code:"type EventName = `on${Capitalize<string>}`;\n// Accepts: 'onClick', 'onChange', etc."},{title:`Combine unions`,code:"type Color = 'red' | 'blue';\ntype Size  = 'sm' | 'lg';\ntype Class = `${Color}-${Size}`;\n// 'red-sm' | 'red-lg' | 'blue-sm' | 'blue-lg'"},{title:`CSS property helper`,code:"type Side = 'top' | 'right' | 'bottom' | 'left';\ntype Padding = `padding-${Side}`;\n// 'padding-top' | 'padding-right' | ..."}]},{name:`type alias`,category:`Type Aliases & Interfaces`,description:`Creates a named alias for any type expression — primitives, unions, intersections, tuples, and more. Cannot be reopened after declaration.`,syntax:`type UserId = string;
type Result<T> = { data: T; error: null } | { data: null; error: Error };`,notes:"Prefer `type` for unions, intersections, tuples, and mapped types. Once defined, a type alias cannot be extended via declaration merging (unlike `interface`).",returns:"N/A — `type` is a declaration.",variations:[{title:`Primitive alias`,code:`type UserId = string;
type Milliseconds = number;
function delay(ms: Milliseconds): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}`},{title:`Complex union type`,code:`type ApiResponse<T> =
  | { status: 'ok';    data: T }
  | { status: 'error'; message: string };`},{title:`Mapped type`,code:`type Optional<T> = { [K in keyof T]?: T[K] };`}]},{name:`interface`,category:`Type Aliases & Interfaces`,description:`Defines the shape of an object. Supports declaration merging (multiple declarations with the same name are merged) and can be implemented by classes.`,syntax:`interface User {
  id: number;
  name: string;
  email?: string;
}`,notes:"Prefer `interface` for object shapes that may be extended or implemented by classes. Use `extends` for composition and `implements` to enforce a contract on a class.",returns:"N/A — `interface` is a declaration.",variations:[{title:`Basic interface`,code:`interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}`},{title:`Extending interfaces`,code:`interface Animal { name: string; }
interface Dog extends Animal { breed: string; }
const d: Dog = { name: 'Rex', breed: 'Husky' };`},{title:`Class implements`,code:`interface Serializable {
  serialize(): string;
}
class User implements Serializable {
  serialize() { return JSON.stringify(this); }
}`},{title:`Declaration merging`,code:`interface Window { myPlugin: () => void; }
// Both declarations merged into one Window type`}]},{name:`Partial<T>`,category:`Utility Types`,description:"Constructs a type with all properties of `T` set to optional. Equivalent to adding `?` to every field.",syntax:`Partial<User>`,notes:`Shallow — nested objects are not made partial. For deep partial, compose recursively with a mapped type.`,returns:"A type where every property of `T` is optional.",variations:[{title:`Update / patch function`,code:`function updateUser(id: number, patch: Partial<User>): User {
  return { ...getUser(id), ...patch };
}`},{title:`Default merging`,code:`const defaults: Partial<Config> = { theme: 'dark', lang: 'en' };
const config: Config = { ...defaults, ...userConfig } as Config;`}]},{name:`Required<T>`,category:`Utility Types`,description:"Constructs a type with all optional properties of `T` made required. The opposite of `Partial<T>`.",syntax:`Required<User>`,notes:`Useful after a partial config has been validated and all fields are guaranteed to be present.`,returns:"A type where every property of `T` is required.",variations:[{title:`After validation`,code:`function validateConfig(cfg: Partial<Config>): Required<Config> {
  // assert all fields exist
  return cfg as Required<Config>;
}`}]},{name:`Readonly<T>`,category:`Utility Types`,description:"Makes all properties of `T` read-only — they cannot be reassigned after the object is created.",syntax:`Readonly<User>`,notes:"Enforced only at the TypeScript level; JavaScript has no runtime enforcement. For deep immutability, use `as const` or a library like Immer.",returns:"A type where every property of `T` is `readonly`.",variations:[{title:`Immutable config`,code:`const CONFIG: Readonly<AppConfig> = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};
// CONFIG.apiUrl = '...'; // TS error`}]},{name:`Record<K, V>`,category:`Utility Types`,description:"Constructs an object type whose keys are `K` and values are `V`. A cleaner, more expressive alternative to an index signature.",syntax:`Record<string, number>`,notes:"When `K` is a union literal, every key is required in the resulting object, giving you exhaustiveness checking.",returns:"An object type `{ [P in K]: V }`.",variations:[{title:`Map of scores`,code:`const scores: Record<string, number> = {
  Alice: 95,
  Bob: 87,
};`},{title:`Exhaustive status map`,code:`type Status = 'idle' | 'loading' | 'error';
const labels: Record<Status, string> = {
  idle:    'Ready',
  loading: 'Loading…',
  error:   'Something went wrong',
  // missing key → TS error
};`}]},{name:`Pick<T, K>`,category:`Utility Types`,description:"Constructs a type by picking a subset of properties `K` from `T`.",syntax:`Pick<User, 'id' | 'name'>`,notes:"Useful for DTOs — expose only the fields consumers need. `K` must be a subset of `keyof T`.",returns:`A type with only the selected properties.`,variations:[{title:`Public DTO`,code:`type UserPreview = Pick<User, 'id' | 'name' | 'avatarUrl'>;`},{title:`Form fields subset`,code:`type LoginForm = Pick<User, 'email' | 'password'>;`}]},{name:`Omit<T, K>`,category:`Utility Types`,description:"Constructs a type by removing properties `K` from `T`. The inverse of `Pick`.",syntax:`Omit<User, 'password' | 'createdAt'>`,notes:"Prefer `Omit` when you want most of the type but need to exclude a few sensitive or irrelevant fields.",returns:`A type with the specified properties removed.`,variations:[{title:`Strip sensitive fields`,code:`type PublicUser = Omit<User, 'password' | 'refreshToken'>;`},{title:`New entity (without id)`,code:`type CreatePostInput = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;`}]},{name:`Exclude<T, U>`,category:`Utility Types`,description:"From a union type `T`, removes all members that are assignable to `U`.",syntax:`Exclude<'a' | 'b' | 'c', 'a'>  // 'b' | 'c'`,notes:"Operates on union members, not object keys. Contrast with `Omit`, which operates on object properties.",returns:`A union type with the excluded members removed.`,variations:[{title:`Remove a variant`,code:`type Status = 'idle' | 'loading' | 'error' | 'success';
type NonIdle = Exclude<Status, 'idle'>;
// 'loading' | 'error' | 'success'`},{title:`Non-nullable helper`,code:`type Defined<T> = Exclude<T, null | undefined>;`}]},{name:`NonNullable<T>`,category:`Utility Types`,description:"Removes `null` and `undefined` from a type. Shorthand for `Exclude<T, null | undefined>`.",syntax:`NonNullable<string | null | undefined>  // string`,notes:`Useful after you've verified a value is not null/undefined and want the type to reflect that without a cast.`,returns:"The type `T` with `null` and `undefined` excluded.",variations:[{title:`After null check`,code:`type User = { name: string | null };
type NonNullName = NonNullable<User['name']>; // string`},{title:`In a generic constraint`,code:`function notNull<T>(val: T): NonNullable<T> {
  if (val == null) throw new Error('Value is null');
  return val as NonNullable<T>;
}`}]},{name:`ReturnType<T>`,category:`Utility Types`,description:"Extracts the return type of a function type `T`. Useful for deriving types from existing functions without duplication.",syntax:`ReturnType<typeof myFunction>`,notes:"Works with any callable type. Pair with `Awaited<>` to unwrap the resolved type of an async function.",returns:`The return type of the function.`,variations:[{title:`From a function`,code:`function getUser() {
  return { id: 1, name: 'Alice' };
}
type User = ReturnType<typeof getUser>;
// { id: number; name: string }`},{title:`Async function`,code:`async function fetchConfig() {
  return { theme: 'dark', lang: 'en' };
}
type Config = Awaited<ReturnType<typeof fetchConfig>>;`}]}],a={Primitive:`bg-primary-100 text-primary-700`,Special:`bg-rose-100 text-rose-700`,"Object & Collection":`bg-amber-100 text-amber-700`,"Union & Intersection":`bg-violet-100 text-violet-700`,"Literal & Template":`bg-emerald-100 text-emerald-700`,"Type Aliases & Interfaces":`bg-sky-100 text-sky-700`,"Utility Types":`bg-orange-100 text-orange-700`};function o(){return(0,r.jsx)(n,{items:i,badgeColors:a,legendLabel:`Category`,labels:t})}export{o as default};