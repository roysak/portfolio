import { useState, useEffect } from "react";

interface TopicVariation {
  title: string;
  code: string;
}

interface TopicData {
  name: string;
  category: string;
  description: string;
  syntax: string;
  notes: string;
  returns: string;
  variations: TopicVariation[];
}

const topicsData: TopicData[] = [
  // ── Generics ──────────────────────────────────────────────────────────────
  {
    name: "Generic Function", category: "Generics",
    description: "A function that works over a range of types by introducing a type parameter `T`. The caller's argument type is inferred automatically, or can be supplied explicitly.",
    syntax: "function identity<T>(arg: T): T { return arg; }",
    notes: "Type parameters are inferred from call-site arguments in most cases. Use explicit type arguments only when inference falls short.",
    returns: "The same type as the input type parameter.",
    variations: [
      { title: "Basic identity", code: "function identity<T>(value: T): T {\n  return value;\n}\nconst n = identity(42);        // T = number\nconst s = identity('hello');   // T = string" },
      { title: "Multiple type params", code: "function pair<A, B>(a: A, b: B): [A, B] {\n  return [a, b];\n}\nconst p = pair('Alice', 30); // [string, number]" },
      { title: "Arrow generic (TSX)", code: "// In .tsx files, add a trailing comma to disambiguate from JSX:\nconst wrap = <T,>(val: T): { value: T } => ({ value: val });" },
    ],
  },
  {
    name: "Generic Constraints", category: "Generics",
    description: "Restrict what types `T` may be by using `extends`. TypeScript then knows the properties that are safe to access on `T`.",
    syntax: "function getLength<T extends { length: number }>(arg: T): number",
    notes: "Without a constraint, TypeScript assumes `T` could be anything and disallows property access. Constraints are the safe way to unlock specific capabilities.",
    returns: "Depends on the function — the type parameter is constrained, not replaced.",
    variations: [
      { title: "Length constraint", code: "function longest<T extends { length: number }>(a: T, b: T): T {\n  return a.length >= b.length ? a : b;\n}" },
      { title: "Key constraint", code: "function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nconst name = getProperty({ name: 'Alice', age: 30 }, 'name');" },
      { title: "Constructor constraint", code: "function create<T>(Ctor: new () => T): T {\n  return new Ctor();\n}" },
    ],
  },
  {
    name: "Generic Interface", category: "Generics",
    description: "An interface that is parameterised by one or more type variables. Consumers supply the concrete type when using the interface.",
    syntax: "interface Box<T> { value: T; }",
    notes: "Generic interfaces decouple the shape of a data structure from the type it holds. Type parameters can have defaults (`T = string`).",
    returns: "N/A — this is a type declaration.",
    variations: [
      { title: "Simple container", code: "interface Box<T> {\n  value: T;\n  map<U>(fn: (v: T) => U): Box<U>;\n}\nconst numBox: Box<number> = { value: 42, map: fn => ({ value: fn(42), map: () => ({ value: undefined, map: () => ({} as any) }) }) };" },
      { title: "API response wrapper", code: "interface ApiResponse<T> {\n  data: T;\n  status: number;\n  message: string;\n}\ntype UserResponse = ApiResponse<User>;" },
      { title: "Default type parameter", code: "interface Paginated<T = unknown> {\n  items: T[];\n  total: number;\n  page: number;\n}" },
    ],
  },
  {
    name: "Generic Class", category: "Generics",
    description: "A class whose members can operate on a type determined at instantiation time.",
    syntax: "class Stack<T> { private items: T[] = []; }",
    notes: "Static members cannot reference the class type parameter — statics belong to the constructor, not the instance.",
    returns: "N/A — this is a class declaration.",
    variations: [
      { title: "Typed stack", code: "class Stack<T> {\n  private items: T[] = [];\n  push(item: T): void { this.items.push(item); }\n  pop(): T | undefined { return this.items.pop(); }\n  get size() { return this.items.length; }\n}" },
      { title: "Generic repository", code: "class Repository<T extends { id: number }> {\n  private store = new Map<number, T>();\n  save(entity: T) { this.store.set(entity.id, entity); }\n  find(id: number): T | undefined { return this.store.get(id); }\n}" },
    ],
  },

  // ── Conditional Types ─────────────────────────────────────────────────────
  {
    name: "Conditional Type", category: "Conditional Types",
    description: "A type-level ternary: `T extends U ? X : Y`. If `T` is assignable to `U`, the type resolves to `X`; otherwise `Y`.",
    syntax: "type IsString<T> = T extends string ? true : false;",
    notes: "When `T` is a union, conditional types are distributive by default — the condition is applied to each member individually.",
    returns: "N/A — this is a type expression.",
    variations: [
      { title: "Simple check", code: "type IsArray<T> = T extends unknown[] ? true : false;\ntype A = IsArray<number[]>; // true\ntype B = IsArray<string>;   // false" },
      { title: "Unwrap array", code: "type UnpackArray<T> = T extends (infer U)[] ? U : T;\ntype N = UnpackArray<number[]>;  // number\ntype S = UnpackArray<string>;    // string" },
      { title: "Distributive union", code: "type ToArray<T> = T extends unknown ? T[] : never;\ntype R = ToArray<string | number>;\n// string[] | number[]  (distributed)" },
      { title: "Non-distributive (wrapped)", code: "type ToArray<T> = [T] extends [unknown] ? T[] : never;\ntype R = ToArray<string | number>;\n// (string | number)[]  (not distributed)" },
    ],
  },
  {
    name: "infer", category: "Conditional Types",
    description: "Declares a type variable inside a `extends` clause of a conditional type. TypeScript infers what that variable should be from the matched type.",
    syntax: "type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;",
    notes: "`infer` can only appear in the `extends` clause. Multiple `infer` variables are allowed in one expression.",
    returns: "N/A — `infer` is a keyword used inside a conditional type.",
    variations: [
      { title: "Infer function return", code: "type Return<T> = T extends () => infer R ? R : never;\ntype R = Return<() => string>; // string" },
      { title: "Infer promise value", code: "type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;\ntype V = Awaited<Promise<number>>; // number" },
      { title: "Infer first tuple element", code: "type Head<T> = T extends [infer H, ...unknown[]] ? H : never;\ntype H = Head<[string, number, boolean]>; // string" },
    ],
  },

  // ── Mapped Types ──────────────────────────────────────────────────────────
  {
    name: "Mapped Type", category: "Mapped Types",
    description: "Creates a new type by iterating over the keys of another type and transforming their values or modifiers.",
    syntax: "type Mapped<T> = { [K in keyof T]: SomeTransform<T[K]> };",
    notes: "You can add or remove `readonly` and `?` modifiers with `+` / `-` prefixes. Key remapping with `as` is available in TS 4.1+.",
    returns: "N/A — this is a type expression.",
    variations: [
      { title: "Make all optional", code: "type Optional<T> = { [K in keyof T]?: T[K] };\n// Equivalent to Partial<T>" },
      { title: "Make all readonly", code: "type Immutable<T> = { readonly [K in keyof T]: T[K] };\n// Equivalent to Readonly<T>" },
      { title: "Remove optional modifier", code: "type Concrete<T> = { [K in keyof T]-?: T[K] };\n// Equivalent to Required<T>" },
      { title: "Key remapping (TS 4.1+)", code: "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n// { getName: () => string; getAge: () => number; ... }" },
    ],
  },
  {
    name: "keyof operator", category: "Mapped Types",
    description: "Produces a union of the known public keys of a type. Combined with generics, it enables type-safe property access.",
    syntax: "type Keys = keyof SomeType;",
    notes: "For arrays/tuples, `keyof` includes numeric indices and array method names. Pair with `T[K]` to get the value type for a specific key.",
    returns: "A string | number | symbol union of the type's keys.",
    variations: [
      { title: "Extract keys", code: "interface User { id: number; name: string; email: string; }\ntype UserKey = keyof User; // 'id' | 'name' | 'email'" },
      { title: "Type-safe getter", code: "function get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nget({ a: 1 }, 'a');  // number\nget({ a: 1 }, 'b');  // TS error ✗" },
    ],
  },
  {
    name: "Index Access Type  T[K]", category: "Mapped Types",
    description: "Looks up the type of a property `K` on type `T`. Works with literal types, union keys, and `number` to index arrays/tuples.",
    syntax: "type Age = User['age'];",
    notes: "Use `keyof T` as the index to get a union of all value types. Use `number` to get the element type of an array.",
    returns: "N/A — this is a type-level lookup.",
    variations: [
      { title: "Property type lookup", code: "interface Config { host: string; port: number; ssl: boolean; }\ntype Port = Config['port']; // number" },
      { title: "Array element type", code: "const roles = ['admin', 'editor', 'viewer'] as const;\ntype Role = typeof roles[number]; // 'admin' | 'editor' | 'viewer'" },
      { title: "Union key lookup", code: "type Values = User['id' | 'name']; // number | string" },
    ],
  },

  // ── Type Guards ───────────────────────────────────────────────────────────
  {
    name: "typeof guard", category: "Type Guards",
    description: "Narrows a type using JavaScript's `typeof` operator. TypeScript recognises `typeof` checks in `if` / `switch` statements and updates the type accordingly.",
    syntax: "if (typeof value === 'string') { /* value is string */ }",
    notes: "Recognised literals: `'string'`, `'number'`, `'bigint'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`. Note `typeof null === 'object'` — always check for `null` separately.",
    returns: "N/A — narrows the type inside the branch.",
    variations: [
      { title: "String vs number", code: "function format(val: string | number) {\n  if (typeof val === 'string') return val.toUpperCase();\n  return val.toFixed(2);\n}" },
      { title: "Null + object guard", code: "function isObject(val: unknown): val is object {\n  return typeof val === 'object' && val !== null;\n}" },
    ],
  },
  {
    name: "instanceof guard", category: "Type Guards",
    description: "Narrows a type by checking whether a value was created by a given constructor. TypeScript narrows to the class type inside the branch.",
    syntax: "if (value instanceof Date) { /* value is Date */ }",
    notes: "Only works with constructor functions (classes, built-ins). Doesn't work across iframes/realms — use `Array.isArray()` or duck-typing for those cases.",
    returns: "N/A — narrows the type inside the branch.",
    variations: [
      { title: "Class discrimination", code: "class Cat { meow() {} }\nclass Dog { bark() {} }\nfunction speak(animal: Cat | Dog) {\n  if (animal instanceof Cat) animal.meow();\n  else animal.bark();\n}" },
      { title: "Error subclass", code: "try {\n  await fetch('/api');\n} catch (err) {\n  if (err instanceof TypeError) console.error('Network:', err.message);\n  else throw err;\n}" },
    ],
  },
  {
    name: "in guard", category: "Type Guards",
    description: "Narrows a union by checking whether a property exists on the value. TypeScript infers the type that has that property inside the branch.",
    syntax: "if ('swim' in animal) { /* animal has swim */ }",
    notes: "Particularly useful for discriminated unions without a shared literal field. The checked key must be a string literal.",
    returns: "N/A — narrows the type inside the branch.",
    variations: [
      { title: "Duck-type narrowing", code: "type Fish = { swim: () => void };\ntype Bird = { fly: () => void };\nfunction move(pet: Fish | Bird) {\n  if ('swim' in pet) pet.swim();\n  else pet.fly();\n}" },
      { title: "Optional property check", code: "interface WithEmail { email: string; }\nfunction notify(user: User | WithEmail) {\n  if ('email' in user) sendEmail(user.email);\n}" },
    ],
  },
  {
    name: "Custom Type Guard", category: "Type Guards",
    description: "A function with a return type of `value is T` that tells TypeScript to narrow the type when the function returns `true`.",
    syntax: "function isUser(val: unknown): val is User { ... }",
    notes: "TypeScript trusts the assertion — it does not verify the runtime logic. Keep your predicate correct; a lying type guard causes silent unsoundness.",
    returns: "A `boolean` that narrows the argument type when `true`.",
    variations: [
      { title: "Shape check", code: "function isUser(val: unknown): val is User {\n  return (\n    typeof val === 'object' && val !== null &&\n    'id' in val && typeof (val as any).id === 'number' &&\n    'name' in val && typeof (val as any).name === 'string'\n  );\n}" },
      { title: "Filter with type guard", code: "const mixed: (string | null)[] = ['a', null, 'b'];\nconst strings = mixed.filter((x): x is string => x !== null);\n// strings: string[]" },
    ],
  },
  {
    name: "Assertion Function", category: "Type Guards",
    description: "A function annotated with `asserts condition` that narrows the type of a variable in the caller's scope if it doesn't throw.",
    syntax: "function assert(cond: unknown): asserts cond { ... }",
    notes: "If the function returns normally, TypeScript narrows the type. If it throws, the narrowing is irrelevant. Requires TypeScript 3.7+.",
    returns: "`void` — or throws; TypeScript assumes the type is narrowed after a non-throwing call.",
    variations: [
      { title: "Generic assert", code: "function assert(condition: unknown, msg?: string): asserts condition {\n  if (!condition) throw new Error(msg ?? 'Assertion failed');\n}" },
      { title: "asserts value is T", code: "function assertIsString(val: unknown): asserts val is string {\n  if (typeof val !== 'string') throw new TypeError('Expected string');\n}\n\nassertIsString(input);\ninput.toUpperCase(); // now safely typed as string" },
    ],
  },

  // ── Class Types ───────────────────────────────────────────────────────────
  {
    name: "Access Modifiers", category: "Class Types",
    description: "TypeScript adds `public`, `protected`, and `private` visibility modifiers. `private` is erased at runtime; `#` (ECMAScript private) is enforced at runtime.",
    syntax: "class User {\n  public name: string;\n  protected role: string;\n  private secret: string;\n}",
    notes: "`private` is a compile-time check only. Use `#field` (hard private) for runtime enforcement. `protected` is accessible in subclasses.",
    returns: "N/A — these are class member modifiers.",
    variations: [
      { title: "All three modifiers", code: "class Account {\n  public  id: number;\n  protected balance: number = 0;\n  private  pin: string;\n  constructor(id: number, pin: string) {\n    this.id = id; this.pin = pin;\n  }\n}" },
      { title: "Constructor shorthand", code: "class Point {\n  constructor(\n    public x: number,\n    public y: number,\n  ) {}\n}\nconst p = new Point(1, 2); // p.x === 1" },
      { title: "Hard private (#)", code: "class Counter {\n  #count = 0;\n  increment() { this.#count++; }\n  get value() { return this.#count; }\n}" },
    ],
  },
  {
    name: "readonly (class)", category: "Class Types",
    description: "A class property marked `readonly` can only be assigned in the declaration or the constructor. Any later reassignment is a compile-time error.",
    syntax: "class Config {\n  readonly apiUrl: string;\n  constructor(url: string) { this.apiUrl = url; }\n}",
    notes: "Combine with `private` for fully encapsulated immutable fields. Does not prevent mutation of the object a `readonly` reference points to.",
    returns: "N/A — this is a property modifier.",
    variations: [
      { title: "Immutable ID", code: "class Entity {\n  constructor(public readonly id: number) {}\n}\nconst e = new Entity(1);\n// e.id = 2; // TS error" },
    ],
  },
  {
    name: "abstract class", category: "Class Types",
    description: "A class that cannot be instantiated directly but can define abstract methods that subclasses must implement.",
    syntax: "abstract class Shape {\n  abstract area(): number;\n}",
    notes: "Abstract classes can contain concrete methods and fields alongside abstract members. Use when a base class makes no sense on its own.",
    returns: "N/A — this is a class declaration.",
    variations: [
      { title: "Abstract with implementation", code: "abstract class Shape {\n  abstract area(): number;\n  describe() {\n    return `Area is ${this.area().toFixed(2)}`;\n  }\n}\nclass Circle extends Shape {\n  constructor(private r: number) { super(); }\n  area() { return Math.PI * this.r ** 2; }\n}" },
    ],
  },
  {
    name: "static members", category: "Class Types",
    description: "Properties and methods that belong to the class constructor itself, not to individual instances. Accessed via `ClassName.member`.",
    syntax: "class MathUtils {\n  static readonly PI = 3.14159;\n  static square(n: number) { return n * n; }\n}",
    notes: "Static members cannot reference the instance type parameter of a generic class. Use factory methods as a common static pattern.",
    returns: "N/A — these are class-level members.",
    variations: [
      { title: "Counter / singleton", code: "class IdGenerator {\n  private static next = 1;\n  static generate() { return IdGenerator.next++; }\n}" },
      { title: "Static factory", code: "class Color {\n  private constructor(public r: number, public g: number, public b: number) {}\n  static fromHex(hex: string): Color {\n    const n = parseInt(hex.slice(1), 16);\n    return new Color((n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff);\n  }\n}" },
    ],
  },

  // ── Function Types ────────────────────────────────────────────────────────
  {
    name: "Function Type", category: "Function Types",
    description: "Describes the signature of a function: its parameter types and return type. Can be expressed inline, as a `type` alias, or as a `call signature` in an interface.",
    syntax: "type Handler = (event: Event) => void;",
    notes: "Parameter names in type aliases are optional but improve readability. Use `void` for functions whose return value is intentionally ignored.",
    returns: "N/A — this is a type annotation.",
    variations: [
      { title: "Inline annotation", code: "const greet: (name: string) => string = (name) => `Hello, ${name}`;" },
      { title: "Type alias", code: "type Predicate<T> = (value: T) => boolean;\nconst isEven: Predicate<number> = n => n % 2 === 0;" },
      { title: "Call signature in interface", code: "interface Formatter {\n  (value: string): string;\n  locale: string;\n}" },
    ],
  },
  {
    name: "Optional & Default Params", category: "Function Types",
    description: "Optional parameters are marked with `?` and may be `undefined`. Default parameters provide a fallback value and imply optionality.",
    syntax: "function greet(name: string, title?: string, sep = ', '): string",
    notes: "Optional params must come after required ones. Default params widen the type at the call site — callers may omit them. Rest params collect remaining arguments into a typed array.",
    returns: "N/A — these are parameter modifiers.",
    variations: [
      { title: "Optional parameter", code: "function log(message: string, level?: 'info' | 'warn' | 'error') {\n  console[level ?? 'info'](message);\n}" },
      { title: "Default parameter", code: "function createUser(name: string, role = 'viewer') {\n  return { name, role };\n}\ncreateUser('Alice');          // { name: 'Alice', role: 'viewer' }\ncreateUser('Bob', 'admin');   // { name: 'Bob',  role: 'admin'  }" },
      { title: "Rest parameters", code: "function sum(...nums: number[]): number {\n  return nums.reduce((a, b) => a + b, 0);\n}\nsum(1, 2, 3, 4); // 10" },
    ],
  },
  {
    name: "Function Overloads", category: "Function Types",
    description: "Multiple function signatures for the same function that describe the different combinations of input and output types. The implementation signature is not visible to callers.",
    syntax: "function process(x: string): string;\nfunction process(x: number): number;\nfunction process(x: any): any { ... }",
    notes: "At least two overload signatures are needed. The implementation body must handle all overloads — it uses a broader type internally.",
    returns: "The return type as defined per overload signature.",
    variations: [
      { title: "String vs number overload", code: "function double(x: string): string;\nfunction double(x: number): number;\nfunction double(x: string | number) {\n  return typeof x === 'string' ? x.repeat(2) : x * 2;\n}\nconst s = double('hi'); // string\nconst n = double(3);   // number" },
      { title: "Optional arg overload", code: "function createElement(tag: 'a'): HTMLAnchorElement;\nfunction createElement(tag: 'canvas'): HTMLCanvasElement;\nfunction createElement(tag: string): HTMLElement {\n  return document.createElement(tag);\n}" },
    ],
  },
  {
    name: "this parameter", category: "Function Types",
    description: "A fake first parameter named `this` that declares the expected type of `this` inside the function body. It is erased at compile time.",
    syntax: "function greet(this: User): string { return this.name; }",
    notes: "Helps catch errors where a method is called out of context (e.g. after being destructured). Mark `this: void` to disallow any `this` usage.",
    returns: "N/A — `this` parameter is erased after type-checking.",
    variations: [
      { title: "Typed this", code: "interface User { name: string; greet(this: User): string; }\nconst user: User = {\n  name: 'Alice',\n  greet() { return `Hi, I'm ${this.name}`; },\n};\nconst { greet } = user;\n// greet(); // TS error — 'this' context lost" },
      { title: "this: void callback", code: "class Timer {\n  private id = 0;\n  start(callback: (this: void) => void) {\n    this.id = setInterval(callback, 1000);\n  }\n}" },
    ],
  },
];

const categoryColor: Record<string, string> = {
  "Generics":            "bg-primary-100 text-primary-700",
  "Conditional Types":   "bg-violet-100 text-violet-700",
  "Mapped Types":        "bg-amber-100 text-amber-700",
  "Type Guards":         "bg-emerald-100 text-emerald-700",
  "Class Types":         "bg-rose-100 text-rose-700",
  "Function Types":      "bg-sky-100 text-sky-700",
};

export default function TypeScriptDataTypes() {
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [openVariation, setOpenVariation] = useState<number | null>(0);

  const categories = Array.from(new Set(topicsData.map((t) => t.category)));

  useEffect(() => {
    setOpenVariation(0);
  }, [selectedTopic]);

  useEffect(() => {
    document.body.style.overflow = selectedTopic ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedTopic]);

  return (
    <>
      {categories.map((cat) => (
        <section key={cat} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-neutral-800">{cat}</h2>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[cat]}`}>
              {topicsData.filter((t) => t.category === cat).length} topics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {topicsData
              .filter((t) => t.category === cat)
              .map((topic) => (
                <button
                  key={topic.name}
                  onClick={() => setSelectedTopic(topic)}
                  className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-600"
                >
                  <span className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-tight">
                    {topic.name}
                  </span>
                  <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[topic.category]}`}>
                    {topic.category}
                  </span>
                </button>
              ))}
          </div>
        </section>
      ))}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        <span className="font-medium text-neutral-400 uppercase tracking-wide">Category</span>
        {Object.entries(categoryColor).map(([cat, cls]) => (
          <span key={cat} className={`px-2.5 py-0.5 rounded-full font-semibold ${cls}`}>
            {cat}
          </span>
        ))}
      </div>

      {/* Modal */}
      {selectedTopic && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-neutral-900">{selectedTopic.name}</h2>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColor[selectedTopic.category]}`}>
                  {selectedTopic.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedTopic(null)}
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-200"
                aria-label="Close"
              >
                <span className="material-symbols-rounded text-xl! leading-none block!">close</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6">
              <p className="text-neutral-600 leading-relaxed">{selectedTopic.description}</p>

              {/* Syntax */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Syntax</p>
                <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-sm font-mono" style={{ userSelect: "text" }}>
                  <code>{selectedTopic.syntax}</code>
                </pre>
              </div>

              {/* Notes */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Notes</p>
                <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                  {selectedTopic.notes}
                </p>
              </div>

              {/* Returns */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Returns</p>
                <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                  {selectedTopic.returns}
                </p>
              </div>

              {/* Variations accordion */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Examples</p>
                <div className="rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
                  {selectedTopic.variations.map((variation, index) => {
                    const isOpen = openVariation === index;
                    return (
                      <div key={index} className="bg-neutral-50">
                        <button
                          onClick={() => setOpenVariation(isOpen ? null : index)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-100 transition-colors"
                        >
                          <span className="text-sm font-semibold text-neutral-700">{variation.title}</span>
                          <span
                            className={`material-symbols-rounded text-base! text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          >
                            expand_more
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 bg-white">
                            <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-xs font-mono" style={{ userSelect: "text" }}>
                              <code>{variation.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
