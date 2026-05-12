import { CategorizedArticle, CODE_LABELS } from "./components";
import type { TopicItem } from "./components";

interface FeatureData {
  name: string;
  category: string;
  description: string;
  syntax: string;
  notes: string;
  returns: string;
  variations: { title: string; code: string }[];
}

const featuresData: FeatureData[] = [
  // ── Basics ──────────────────────────────────────────────────────────────
  {
    name: "Type Annotations",
    category: "Basics",
    description: "Explicitly declare the type of a variable, parameter, or return value using the colon syntax.",
    syntax: "let name: string = \"Alice\";\nlet age: number = 30;\nlet active: boolean = true;",
    notes: "Annotations are optional when TypeScript can infer the type. Prefer inference for local variables; annotate public API boundaries.",
    returns: "Compile-time type safety — TypeScript will error if you assign a mismatched value.",
    variations: [
      { title: "Variable", code: "let score: number = 100;" },
      { title: "Function parameter & return", code: "function greet(name: string): string {\n  return `Hello, ${name}`;\n}" },
      { title: "Array & tuple", code: "let ids: number[] = [1, 2, 3];\nlet pair: [string, number] = [\"age\", 30];" },
    ],
  },
  {
    name: "Type Inference",
    category: "Basics",
    description: "TypeScript automatically deduces types from assignments and expressions — you often don't need to annotate.",
    syntax: "let x = 42;         // inferred: number\nlet msg = \"hi\";     // inferred: string\nlet arr = [1, 2];   // inferred: number[]",
    notes: "Inference works for variables, return types, and generic arguments. Explicit annotations are still useful for function signatures and exported APIs.",
    returns: "The most specific type TypeScript can determine from context.",
    variations: [
      { title: "Return type inferred", code: "function add(a: number, b: number) {\n  return a + b; // return type: number\n}" },
      { title: "Contextual typing", code: "const names = [\"Alice\", \"Bob\"];\nnames.forEach(n => console.log(n.toUpperCase()));" },
    ],
  },
  {
    name: "Type Assertions",
    category: "Basics",
    description: "Tell TypeScript to treat a value as a specific type when you know more than the compiler.",
    syntax: "const el = document.getElementById(\"app\") as HTMLInputElement;\nconst el2 = <HTMLInputElement>document.getElementById(\"app\");",
    notes: "Assertions don't change the runtime value — they only affect static analysis. Prefer type guards over assertions when possible. Use `as unknown as T` for double assertions.",
    returns: "The value cast to the specified type at compile time.",
    variations: [
      { title: "as keyword", code: "const val = someValue as string;" },
      { title: "Non-null assertion (!)", code: "const el = document.getElementById(\"btn\")!; // asserts non-null" },
      { title: "as const", code: "const colors = [\"red\", \"green\"] as const;\n// type: readonly [\"red\", \"green\"]" },
    ],
  },
  {
    name: "satisfies Operator",
    category: "Basics",
    description: "Validates that a value matches a type without widening it — you keep the literal types while still getting type-checking.",
    syntax: "const config = {\n  port: 3000,\n  host: \"localhost\",\n} satisfies Record<string, string | number>;",
    notes: "Unlike a type annotation (`const config: Record<...>`), `satisfies` keeps `config.port` as `3000` (literal) rather than widening it to `number`. Added in TypeScript 4.9.",
    returns: "The original value with its inferred (narrower) type, validated against the target type.",
    variations: [
      { title: "Palette with literal keys", code: "const palette = {\n  red: [255, 0, 0],\n  green: \"#00ff00\",\n} satisfies Record<string, string | number[]>;\n// palette.red is number[], not (string | number[])" },
    ],
  },
  {
    name: "Enums",
    category: "Basics",
    description: "Named constants that make code more readable and less error-prone than magic strings or numbers.",
    syntax: "enum Direction { Up, Down, Left, Right }\nenum Status { Active = \"ACTIVE\", Inactive = \"INACTIVE\" }",
    notes: "Numeric enums auto-increment from 0. String enums require explicit initializers. `const enum` is inlined at compile time (no runtime object). Prefer `as const` objects for tree-shakeable alternatives.",
    returns: "A named enum type — members are both values and types.",
    variations: [
      { title: "Numeric enum", code: "enum Direction { Up = 1, Down, Left, Right }\nconst dir: Direction = Direction.Up;" },
      { title: "String enum", code: "enum Color { Red = \"RED\", Blue = \"BLUE\" }\nconst c: Color = Color.Red;" },
      { title: "const enum (inlined)", code: "const enum Size { Small = 1, Medium = 2, Large = 3 }" },
      { title: "as const alternative", code: "const STATUS = { Active: \"ACTIVE\", Inactive: \"INACTIVE\" } as const;\ntype Status = typeof STATUS[keyof typeof STATUS];" },
    ],
  },
  {
    name: "Union & Intersection Types",
    category: "Basics",
    description: "Union (`|`) means a value can be one of several types; intersection (`&`) means it must satisfy all of them simultaneously.",
    syntax: "// Union — one of\ntype ID = string | number;\n\n// Intersection — all of\ntype AdminUser = User & Admin;\n\n// Inline intersection\nfunction merge<A, B>(a: A, b: B): A & B {\n  return { ...a, ...b };\n}",
    notes: "Unions are narrowed at runtime with `typeof`, `instanceof`, or discriminant properties. Intersection of primitive types (e.g. `string & number`) collapses to `never` — it's mainly useful with object types.",
    returns: "A type that is either the union of possible types or the combined shape of all intersected types.",
    variations: [
      { title: "Nullable union", code: "type MaybeString = string | null | undefined;" },
      { title: "Discriminated shape", code: "type Shape =\n  | { kind: \"circle\"; radius: number }\n  | { kind: \"rect\";   width: number; height: number };" },
      { title: "Extending via intersection", code: "type WithTimestamps = { createdAt: Date; updatedAt: Date };\ntype TimestampedUser = User & WithTimestamps;" },
    ],
  },
  {
    name: "Literal Types",
    category: "Basics",
    description: "Narrow a type to a specific string, number, or boolean value — the building block of discriminated unions and precise API contracts.",
    syntax: "type Direction = \"up\" | \"down\" | \"left\" | \"right\";\ntype StatusCode = 200 | 400 | 404 | 500;\ntype Toggle = true | false; // same as boolean\n\nfunction move(dir: Direction): void { ... }",
    notes: "Without `as const`, TypeScript widens literal types inferred from `let` and object literals. Use `as const` or an explicit annotation to preserve the literal. Template literal types extend this to constructed strings.",
    returns: "Exactly the literal value — the type and value are the same token.",
    variations: [
      { title: "String literal union", code: "type Align = \"left\" | \"center\" | \"right\";\nfunction setAlign(a: Align) { ... }" },
      { title: "Numeric literal", code: "type Dice = 1 | 2 | 3 | 4 | 5 | 6;\nconst roll: Dice = 4;" },
      { title: "Widening prevented", code: "// widened to string:\nlet x = \"hello\";\n\n// stays as literal:\nconst y = \"hello\";       // type: \"hello\"\nconst z = \"hello\" as const; // type: \"hello\"" },
    ],
  },
  {
    name: "unknown, never, any",
    category: "Basics",
    description: "Three special types at opposite ends of the type hierarchy — `any` opts out of checking, `unknown` is the safe top type, `never` is the uninhabitable bottom type.",
    syntax: "// any — disables type checking (avoid)\nlet x: any = getApiResponse();\n\n// unknown — must narrow before use\nlet y: unknown = getApiResponse();\nif (typeof y === 'string') y.toUpperCase();\n\n// never — a value that can never exist\nfunction fail(msg: string): never {\n  throw new Error(msg);\n}",
    notes: "`any` is contagious — it spreads unsafely to callers. `unknown` requires explicit narrowing, making it the safe alternative. `never` appears as the return type of functions that always throw or loop, and as the result of impossible intersection types.",
    returns: "`any`: anything. `unknown`: requires narrowing first. `never`: unreachable — the function does not return.",
    variations: [
      { title: "Exhaustive switch", code: "function assertNever(x: never): never {\n  throw new Error(`Unhandled case: ${x}`);\n}\n// Place in the default: branch of a switch to\n// get a compile error when a case is missing." },
      { title: "Safe JSON parse", code: "function parseJSON(raw: string): unknown {\n  return JSON.parse(raw);\n}" },
    ],
  },
  // ── Functions ────────────────────────────────────────────────────────────
  {
    name: "Optional & Default Parameters",
    category: "Functions",
    description: "Mark parameters as optional with `?` or provide a default value — both make the argument non-required at the call site.",
    syntax: "function greet(name: string, greeting?: string): string { ... }\nfunction repeat(str: string, times: number = 2): string { ... }",
    notes: "Optional parameters must come after required ones. A parameter with a default is implicitly optional. Inside the function, an optional `param` is `Type | undefined`.",
    returns: "The function's declared return type.",
    variations: [
      { title: "Optional param", code: "function log(msg: string, level?: string) {\n  console.log(`[${level ?? \"info\"}] ${msg}`);\n}" },
      { title: "Default param", code: "function pad(n: number, width: number = 4) {\n  return String(n).padStart(width, \"0\");\n}" },
    ],
  },
  {
    name: "Rest Parameters",
    category: "Functions",
    description: "Collect an indefinite number of arguments into a typed array using the `...` spread syntax.",
    syntax: "function sum(...nums: number[]): number {\n  return nums.reduce((a, b) => a + b, 0);\n}",
    notes: "Rest parameters must be the last parameter and are typed as an array. Use tuple rest (`...args: [string, ...number[]]`) for more precise overload-like signatures.",
    returns: "The function's declared return type.",
    variations: [
      { title: "Basic rest", code: "function join(sep: string, ...words: string[]) {\n  return words.join(sep);\n}" },
      { title: "Tuple rest", code: "function first<T extends unknown[]>(...args: [T[0], ...T]): T[0] {\n  return args[0];\n}" },
    ],
  },
  {
    name: "Function Overloads",
    category: "Functions",
    description: "Declare multiple call signatures for a function so TypeScript can pick the correct return type based on argument types.",
    syntax: "function parse(input: string): number;\nfunction parse(input: number): string;\nfunction parse(input: string | number): number | string { ... }",
    notes: "Only the overload signatures are visible to callers — the implementation signature is not part of the public API. List more specific overloads before general ones.",
    returns: "The return type of the matched overload signature.",
    variations: [
      { title: "Date overloads", code: "function toDate(ts: number): Date;\nfunction toDate(str: string): Date;\nfunction toDate(val: number | string): Date {\n  return new Date(val);\n}" },
    ],
  },
  {
    name: "Async & Promise Types",
    category: "Functions",
    description: "Type async functions by annotating the return as `Promise<T>` — TypeScript infers the resolved type automatically from `async` functions.",
    syntax: "async function fetchUser(id: number): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json() as Promise<User>;\n}\n\n// Typing a callback-based async pattern\ntype AsyncFn<T> = () => Promise<T>;",
    notes: "`async` functions always return a `Promise` — annotating `Promise<void>` is correct for async functions that don't return a value. Use `Awaited<T>` to unwrap a `Promise<T>` at the type level without runtime await.",
    returns: "A `Promise<T>` that resolves to the annotated type `T`.",
    variations: [
      { title: "Async arrow function", code: "const getUser = async (id: number): Promise<User> => {\n  const res = await fetch(`/api/users/${id}`);\n  return res.json();\n};" },
      { title: "Error handling with union", code: "async function safeFetch(url: string): Promise<Data | null> {\n  try {\n    const res = await fetch(url);\n    return res.json();\n  } catch {\n    return null;\n  }\n}" },
      { title: "Awaited utility type", code: "type Resolved = Awaited<Promise<number>>; // number\ntype NestedResolved = Awaited<Promise<Promise<string>>>; // string" },
    ],
  },
  // ── Classes ──────────────────────────────────────────────────────────────
  {
    name: "Access Modifiers",
    category: "Classes",
    description: "Control the visibility of class members with `public`, `private`, `protected`, and `readonly`.",
    syntax: "class User {\n  public name: string;\n  private _id: number;\n  protected role: string;\n  readonly createdAt: Date;\n}",
    notes: "`public` is the default. `private` is TypeScript-only (use `#field` for runtime privacy). `protected` allows access in subclasses. `readonly` prevents reassignment after construction.",
    returns: "N/A — modifiers are compile-time constraints.",
    variations: [
      { title: "private field", code: "class Counter {\n  private count = 0;\n  increment() { this.count++; }\n}" },
      { title: "readonly", code: "class Config {\n  readonly maxRetries = 3;\n}" },
      { title: "JS private (#)", code: "class Token {\n  #secret: string;\n  constructor(s: string) { this.#secret = s; }\n}" },
    ],
  },
  {
    name: "Parameter Properties",
    category: "Classes",
    description: "Declare and assign class properties directly in the constructor signature — a TypeScript shorthand.",
    syntax: "class Point {\n  constructor(\n    public x: number,\n    public y: number,\n  ) {}\n}",
    notes: "Works with all access modifiers and `readonly`. Saves boilerplate compared to declaring properties then assigning them. The generated JavaScript still produces the same output.",
    returns: "N/A — syntactic sugar for property declaration + assignment.",
    variations: [
      { title: "Mixed shorthand", code: "class Service {\n  constructor(\n    private readonly db: Database,\n    public name: string,\n  ) {}\n}" },
    ],
  },
  {
    name: "Abstract Classes",
    category: "Classes",
    description: "Define a base class that cannot be instantiated directly — subclasses must implement all abstract members.",
    syntax: "abstract class Shape {\n  abstract area(): number;\n  toString() { return `Area: ${this.area()}`; }\n}",
    notes: "Abstract classes can contain both implemented and abstract members. Use interfaces when you only need a structural contract with no shared implementation.",
    returns: "N/A — abstract classes define a contract for subclasses.",
    variations: [
      { title: "Concrete subclass", code: "class Circle extends Shape {\n  constructor(private r: number) { super(); }\n  area() { return Math.PI * this.r ** 2; }\n}" },
    ],
  },
  // ── Generics ─────────────────────────────────────────────────────────────
  {
    name: "Generic Functions",
    category: "Generics",
    description: "Write functions that work across multiple types while preserving type information end-to-end.",
    syntax: "function identity<T>(value: T): T {\n  return value;\n}",
    notes: "TypeScript infers `T` from the argument most of the time. Provide explicit type arguments (`identity<string>(\"hi\")`) only when inference fails.",
    returns: "The same type `T` as the input — the concrete type is resolved at the call site.",
    variations: [
      { title: "Identity", code: "function identity<T>(val: T): T { return val; }\nconst n = identity(42); // n: number" },
      { title: "First element", code: "function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}" },
      { title: "Map with generics", code: "function mapArray<T, U>(arr: T[], fn: (x: T) => U): U[] {\n  return arr.map(fn);\n}" },
    ],
  },
  {
    name: "Generic Constraints",
    category: "Generics",
    description: "Use `extends` to restrict what types a type parameter can be, giving you access to specific properties.",
    syntax: "function getLength<T extends { length: number }>(val: T): number {\n  return val.length;\n}",
    notes: "Constraints let you access members that TypeScript can't know about on an unconstrained `T`. You can constrain to interfaces, other type params, or union types.",
    returns: "A value typed to the constrained `T`.",
    variations: [
      { title: "Constrained to interface", code: "interface Named { name: string }\nfunction greet<T extends Named>(obj: T) {\n  return `Hi ${obj.name}`;\n}" },
      { title: "keyof constraint", code: "function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}" },
    ],
  },
  {
    name: "Generic Defaults",
    category: "Generics",
    description: "Assign a fallback type to a type parameter so it can be omitted at the call or usage site.",
    syntax: "interface Response<T = unknown> {\n  data: T;\n  status: number;\n}",
    notes: "Defaults make generic types optional at usage sites. They are especially useful in library APIs where most callers don't need to customise the type parameter.",
    returns: "The default type when the type argument is not provided.",
    variations: [
      { title: "Interface with default", code: "interface Box<T = string> { value: T }\nconst b: Box = { value: \"hello\" }; // T = string" },
      { title: "Function with default", code: "function wrap<T = string>(val: T) { return { val }; }" },
    ],
  },
  // ── Advanced ─────────────────────────────────────────────────────────────
  {
    name: "keyof Operator",
    category: "Advanced",
    description: "Produces a union of the string (or numeric) keys of a type — useful for building indexed and mapped types.",
    syntax: "type Keys = keyof { a: number; b: string }; // \"a\" | \"b\"",
    notes: "`keyof any` is `string | number | symbol`. For array types, `keyof T[]` includes numeric indices and array method names. Commonly used with generic constraints.",
    returns: "A union type of the object's keys.",
    variations: [
      { title: "Typed property accessor", code: "function get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}" },
      { title: "keyof with typeof", code: "const config = { host: \"localhost\", port: 3000 };\ntype ConfigKey = keyof typeof config; // \"host\" | \"port\"" },
    ],
  },
  {
    name: "typeof Operator",
    category: "Advanced",
    description: "Extracts the TypeScript type of a JavaScript value — useful for deriving types from runtime values rather than duplicating declarations.",
    syntax: "const point = { x: 0, y: 0 };\ntype Point = typeof point; // { x: number; y: number }",
    notes: "In type positions, `typeof` refers to the static type. In expression positions, it's the JavaScript `typeof` runtime check. Commonly combined with `keyof` and `ReturnType`.",
    returns: "The inferred TypeScript type of the value.",
    variations: [
      { title: "From value", code: "const opts = { timeout: 5000, retries: 3 };\ntype Opts = typeof opts;" },
      { title: "ReturnType", code: "function parse() { return { id: 1, name: \"\" }; }\ntype Parsed = ReturnType<typeof parse>;" },
    ],
  },
  {
    name: "Conditional Types",
    category: "Advanced",
    description: "Express types that depend on a type-level condition using `T extends U ? X : Y` — enables powerful type-level logic.",
    syntax: "type IsString<T> = T extends string ? true : false;\ntype A = IsString<\"hi\">; // true\ntype B = IsString<42>;   // false",
    notes: "When `T` is a union, the condition distributes over each member. Use `[T] extends [U]` to prevent distribution. The `infer` keyword lets you capture a sub-type inside conditionals.",
    returns: "Either `X` or `Y` depending on whether `T` extends `U`.",
    variations: [
      { title: "NonNullable reimplemented", code: "type NoNull<T> = T extends null | undefined ? never : T;" },
      { title: "Distributive conditional", code: "type Flatten<T> = T extends Array<infer Item> ? Item : T;\ntype F = Flatten<string[]>; // string" },
    ],
  },
  {
    name: "infer Keyword",
    category: "Advanced",
    description: "Capture and name a sub-type within a conditional type — lets you extract parts of a type programmatically.",
    syntax: "type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;",
    notes: "`infer` can only appear in the `extends` clause of a conditional type. It is useful for extracting element types, return types, parameter types, and promise resolution types.",
    returns: "The inferred type assigned to the `infer` placeholder.",
    variations: [
      { title: "Unwrap Promise", code: "type Awaited<T> = T extends Promise<infer V> ? V : T;\ntype A = Awaited<Promise<number>>; // number" },
      { title: "First param", code: "type FirstArg<T extends (...a: any[]) => any> =\n  T extends (first: infer F, ...rest: any[]) => any ? F : never;" },
    ],
  },
  {
    name: "Mapped Types",
    category: "Advanced",
    description: "Iterate over the keys of a type to produce a new type — the foundation of most built-in utility types.",
    syntax: "type Readonly<T> = { readonly [K in keyof T]: T[K] };\ntype Optional<T> = { [K in keyof T]?: T[K] };",
    notes: "Add `-` before `readonly` or `?` to remove those modifiers (`-readonly`, `-?`). Use `as` clauses (key remapping) to rename or filter keys during mapping.",
    returns: "A new object type derived from `T`.",
    variations: [
      { title: "Nullable values", code: "type Nullable<T> = { [K in keyof T]: T[K] | null };" },
      { title: "Key remapping", code: "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};" },
    ],
  },
  {
    name: "Template Literal Types",
    category: "Advanced",
    description: "Construct string literal types by combining other literal types — mirrors JavaScript template literals at the type level.",
    syntax: "type EventName<T extends string> = `on${Capitalize<T>}`;\ntype E = EventName<\"click\">; // \"onClick\"",
    notes: "Union members distribute automatically inside template literals. Built-in utilities `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize` work with these types.",
    returns: "A string literal type (or union of them) built from the template.",
    variations: [
      { title: "CSS property union", code: "type Side = \"top\" | \"right\" | \"bottom\" | \"left\";\ntype Padding = `padding-${Side}`;" },
      { title: "Event handler names", code: "type Handler<T extends string> = `on${Capitalize<T>}`;\ntype H = Handler<\"click\" | \"focus\">; // \"onClick\" | \"onFocus\"" },
    ],
  },
  {
    name: "Type Guards",
    category: "Advanced",
    description: "Narrow a broad type to a specific one at runtime — TypeScript tracks the narrowed type in each branch automatically.",
    syntax: "// typeof guard\nif (typeof val === 'string') { val.toUpperCase(); }\n\n// instanceof guard\nif (err instanceof Error) { err.message; }\n\n// Custom type predicate\nfunction isUser(x: unknown): x is User {\n  return typeof x === 'object' && x !== null && 'id' in x;\n}\n\n// in guard\nif ('email' in obj) { obj.email; }",
    notes: "Type predicates (`x is T`) let you teach TypeScript about narrowing inside custom functions. Without the predicate, the function just returns `boolean` and TypeScript won't narrow the caller's type. Combine with discriminant properties for discriminated union narrowing.",
    returns: "The narrowed type inside the truthy branch of the guard.",
    variations: [
      { title: "Discriminant narrowing", code: "type Result<T> =\n  | { ok: true;  value: T }\n  | { ok: false; error: string };\n\nif (result.ok) {\n  console.log(result.value); // T\n} else {\n  console.log(result.error); // string\n}" },
      { title: "Array type guard", code: "function isStringArray(arr: unknown[]): arr is string[] {\n  return arr.every(item => typeof item === 'string');\n}" },
    ],
  },
  {
    name: "Discriminated Unions",
    category: "Advanced",
    description: "A union of types that share a common literal property (the discriminant) — TypeScript uses it to narrow each branch exhaustively.",
    syntax: "type Action =\n  | { type: 'increment'; amount: number }\n  | { type: 'decrement'; amount: number }\n  | { type: 'reset' };\n\nfunction reducer(state: number, action: Action): number {\n  switch (action.type) {\n    case 'increment': return state + action.amount;\n    case 'decrement': return state - action.amount;\n    case 'reset':     return 0;\n  }\n}",
    notes: "The discriminant must be a literal type — not just `string`. TypeScript's exhaustiveness check reports an error in the `default` branch if a case is unhandled (use `assertNever` for a runtime safety net). Common patterns: Redux actions, API responses, state machines.",
    returns: "The specific member type in each narrowed branch.",
    variations: [
      { title: "API response union", code: "type ApiResult<T> =\n  | { status: 'success'; data: T }\n  | { status: 'error';   message: string }\n  | { status: 'loading' };" },
      { title: "Exhaustive default", code: "default:\n  const _: never = action; // compile error if case missing\n  throw new Error(`Unknown action: ${_}`);" },
    ],
  },
  {
    name: "Utility Types",
    category: "Advanced",
    description: "Built-in generic helpers for transforming types — avoid writing mapped/conditional types by hand for common patterns.",
    syntax: "Partial<T>         // all props optional\nRequired<T>        // all props required\nReadonly<T>        // all props readonly\nPick<T, K>         // keep only keys K\nOmit<T, K>         // remove keys K\nRecord<K, V>       // map of K → V\nExclude<T, U>      // remove U from union T\nExtract<T, U>      // keep only U from union T\nNonNullable<T>     // remove null | undefined\nReturnType<F>      // return type of function F\nParameters<F>      // param tuple of function F\nInstanceType<C>    // instance type of class C\nAwaited<T>         // unwrap Promise<T>",
    notes: "These are implemented with mapped/conditional types — reading their source in `lib.es5.d.ts` is a great way to learn advanced TypeScript. `Pick` and `Omit` are complements; `Exclude` and `Extract` are the union equivalents.",
    returns: "A new type derived from the input type(s).",
    variations: [
      { title: "Partial for updates", code: "function updateUser(id: number, patch: Partial<User>): User { ... }" },
      { title: "Pick for projections", code: "type UserSummary = Pick<User, 'id' | 'name' | 'email'>;" },
      { title: "Record for maps", code: "const icons: Record<'success' | 'error' | 'warning', string> = {\n  success: '✓', error: '✗', warning: '⚠',\n};" },
      { title: "Omit for DTOs", code: "type CreateUser = Omit<User, 'id' | 'createdAt'>;" },
    ],
  },
  {
    name: "interface vs type",
    category: "Advanced",
    description: "Both declare named types — `interface` is open (mergeable, extendable), `type` is closed (supports unions, intersections, and mapped types).",
    syntax: "// interface — extendable, mergeable\ninterface Animal { name: string }\ninterface Dog extends Animal { breed: string }\n\n// type alias — supports any type expression\ntype ID = string | number;\ntype Point = { x: number; y: number };\ntype ReadonlyPoint = Readonly<Point>;",
    notes: "Prefer `interface` for public object shapes that others may extend (library APIs, class contracts). Prefer `type` for unions, intersections, primitives, tuples, and mapped/conditional results. Avoid mixing both for the same shape — pick one per codebase.",
    returns: "N/A — compile-time shape declarations.",
    variations: [
      { title: "Interface extending", code: "interface Shape { color: string }\ninterface Circle extends Shape { radius: number }" },
      { title: "Type for unions", code: "type StringOrNumber = string | number;\ntype Callback = (err: Error | null, data: string) => void;" },
      { title: "Type for tuples", code: "type Pair<T, U> = [T, U];\nconst entry: Pair<string, number> = ['age', 30];" },
    ],
  },
  {
    name: "Declaration Merging",
    category: "Advanced",
    description: "TypeScript merges multiple declarations with the same name — commonly used to extend third-party interfaces or augment modules.",
    syntax: "interface Window { myLib: MyLib; }\ninterface Window { analytics: Analytics; }",
    notes: "Interfaces merge; type aliases do not. Use module augmentation (`declare module`) to add properties to external packages. Class and namespace declarations can also merge.",
    returns: "N/A — a compile-time feature that combines declarations.",
    variations: [
      { title: "Extending a library type", code: "// global.d.ts\ndeclare global {\n  interface Window {\n    gtag: (...args: any[]) => void;\n  }\n}" },
      { title: "Module augmentation", code: "import \"express\";\ndeclare module \"express\" {\n  interface Request { user?: User; }\n}" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Basics":    "bg-primary-100 text-primary-700",
  "Functions": "bg-emerald-100 text-emerald-700",
  "Classes":   "bg-amber-100 text-amber-700",
  "Generics":  "bg-violet-100 text-violet-700",
  "Advanced":  "bg-rose-100 text-rose-700",
};

const items: TopicItem[] = featuresData.map((f) => ({
  name: f.name,
  category: f.category,
  description: f.description,
  syntax: f.syntax,
  notes: f.notes,
  returns: f.returns,
  variations: f.variations,
}));

export default function TypeScriptCheatsheet() {
  return (
    <CategorizedArticle
      items={items}
      badgeColors={categoryColor}
      legendLabel="Category"
      labels={CODE_LABELS}
      countLabel="features"
    />
  );
}
