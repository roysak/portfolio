import{t as e}from"./index-jsx-runtime.js";import{i as t,n}from"./index-components.js";var r=e(),i=[{name:`Generic Function`,category:`Generics`,description:"A function that works over a range of types by introducing a type parameter `T`. The caller's argument type is inferred automatically, or can be supplied explicitly.",syntax:`function identity<T>(arg: T): T { return arg; }`,notes:`Type parameters are inferred from call-site arguments in most cases. Use explicit type arguments only when inference falls short.`,returns:`The same type as the input type parameter.`,variations:[{title:`Basic identity`,code:`function identity<T>(value: T): T {
  return value;
}
const n = identity(42);        // T = number
const s = identity('hello');   // T = string`},{title:`Multiple type params`,code:`function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
const p = pair('Alice', 30); // [string, number]`},{title:`Arrow generic (TSX)`,code:`// In .tsx files, add a trailing comma to disambiguate from JSX:
const wrap = <T,>(val: T): { value: T } => ({ value: val });`}]},{name:`Generic Constraints`,category:`Generics`,description:"Restrict what types `T` may be by using `extends`. TypeScript then knows the properties that are safe to access on `T`.",syntax:`function getLength<T extends { length: number }>(arg: T): number`,notes:"Without a constraint, TypeScript assumes `T` could be anything and disallows property access. Constraints are the safe way to unlock specific capabilities.",returns:`Depends on the function — the type parameter is constrained, not replaced.`,variations:[{title:`Length constraint`,code:`function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}`},{title:`Key constraint`,code:`function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const name = getProperty({ name: 'Alice', age: 30 }, 'name');`},{title:`Constructor constraint`,code:`function create<T>(Ctor: new () => T): T {
  return new Ctor();
}`}]},{name:`Generic Interface`,category:`Generics`,description:`An interface that is parameterised by one or more type variables. Consumers supply the concrete type when using the interface.`,syntax:`interface Box<T> { value: T; }`,notes:"Generic interfaces decouple the shape of a data structure from the type it holds. Type parameters can have defaults (`T = string`).",returns:`N/A — this is a type declaration.`,variations:[{title:`Simple container`,code:`interface Box<T> {
  value: T;
  map<U>(fn: (v: T) => U): Box<U>;
}
const numBox: Box<number> = { value: 42, map: fn => ({ value: fn(42), map: () => ({ value: undefined, map: () => ({} as any) }) }) };`},{title:`API response wrapper`,code:`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
type UserResponse = ApiResponse<User>;`},{title:`Default type parameter`,code:`interface Paginated<T = unknown> {
  items: T[];
  total: number;
  page: number;
}`}]},{name:`Generic Class`,category:`Generics`,description:`A class whose members can operate on a type determined at instantiation time.`,syntax:`class Stack<T> { private items: T[] = []; }`,notes:`Static members cannot reference the class type parameter — statics belong to the constructor, not the instance.`,returns:`N/A — this is a class declaration.`,variations:[{title:`Typed stack`,code:`class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  get size() { return this.items.length; }
}`},{title:`Generic repository`,code:`class Repository<T extends { id: number }> {
  private store = new Map<number, T>();
  save(entity: T) { this.store.set(entity.id, entity); }
  find(id: number): T | undefined { return this.store.get(id); }
}`}]},{name:`Conditional Type`,category:`Conditional Types`,description:"A type-level ternary: `T extends U ? X : Y`. If `T` is assignable to `U`, the type resolves to `X`; otherwise `Y`.",syntax:`type IsString<T> = T extends string ? true : false;`,notes:"When `T` is a union, conditional types are distributive by default — the condition is applied to each member individually.",returns:`N/A — this is a type expression.`,variations:[{title:`Simple check`,code:`type IsArray<T> = T extends unknown[] ? true : false;
type A = IsArray<number[]>; // true
type B = IsArray<string>;   // false`},{title:`Unwrap array`,code:`type UnpackArray<T> = T extends (infer U)[] ? U : T;
type N = UnpackArray<number[]>;  // number
type S = UnpackArray<string>;    // string`},{title:`Distributive union`,code:`type ToArray<T> = T extends unknown ? T[] : never;
type R = ToArray<string | number>;
// string[] | number[]  (distributed)`},{title:`Non-distributive (wrapped)`,code:`type ToArray<T> = [T] extends [unknown] ? T[] : never;
type R = ToArray<string | number>;
// (string | number)[]  (not distributed)`}]},{name:`infer`,category:`Conditional Types`,description:"Declares a type variable inside a `extends` clause of a conditional type. TypeScript infers what that variable should be from the matched type.",syntax:`type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;`,notes:"`infer` can only appear in the `extends` clause. Multiple `infer` variables are allowed in one expression.",returns:"N/A — `infer` is a keyword used inside a conditional type.",variations:[{title:`Infer function return`,code:`type Return<T> = T extends () => infer R ? R : never;
type R = Return<() => string>; // string`},{title:`Infer promise value`,code:`type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;
type V = Awaited<Promise<number>>; // number`},{title:`Infer first tuple element`,code:`type Head<T> = T extends [infer H, ...unknown[]] ? H : never;
type H = Head<[string, number, boolean]>; // string`}]},{name:`Mapped Type`,category:`Mapped Types`,description:`Creates a new type by iterating over the keys of another type and transforming their values or modifiers.`,syntax:`type Mapped<T> = { [K in keyof T]: SomeTransform<T[K]> };`,notes:"You can add or remove `readonly` and `?` modifiers with `+` / `-` prefixes. Key remapping with `as` is available in TS 4.1+.",returns:`N/A — this is a type expression.`,variations:[{title:`Make all optional`,code:`type Optional<T> = { [K in keyof T]?: T[K] };
// Equivalent to Partial<T>`},{title:`Make all readonly`,code:`type Immutable<T> = { readonly [K in keyof T]: T[K] };
// Equivalent to Readonly<T>`},{title:`Remove optional modifier`,code:`type Concrete<T> = { [K in keyof T]-?: T[K] };
// Equivalent to Required<T>`},{title:`Key remapping (TS 4.1+)`,code:`type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
// { getName: () => string; getAge: () => number; ... }`}]},{name:`keyof operator`,category:`Mapped Types`,description:`Produces a union of the known public keys of a type. Combined with generics, it enables type-safe property access.`,syntax:`type Keys = keyof SomeType;`,notes:"For arrays/tuples, `keyof` includes numeric indices and array method names. Pair with `T[K]` to get the value type for a specific key.",returns:`A string | number | symbol union of the type's keys.`,variations:[{title:`Extract keys`,code:`interface User { id: number; name: string; email: string; }
type UserKey = keyof User; // 'id' | 'name' | 'email'`},{title:`Type-safe getter`,code:`function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
get({ a: 1 }, 'a');  // number
get({ a: 1 }, 'b');  // TS error ✗`}]},{name:`Index Access Type  T[K]`,category:`Mapped Types`,description:"Looks up the type of a property `K` on type `T`. Works with literal types, union keys, and `number` to index arrays/tuples.",syntax:`type Age = User['age'];`,notes:"Use `keyof T` as the index to get a union of all value types. Use `number` to get the element type of an array.",returns:`N/A — this is a type-level lookup.`,variations:[{title:`Property type lookup`,code:`interface Config { host: string; port: number; ssl: boolean; }
type Port = Config['port']; // number`},{title:`Array element type`,code:`const roles = ['admin', 'editor', 'viewer'] as const;
type Role = typeof roles[number]; // 'admin' | 'editor' | 'viewer'`},{title:`Union key lookup`,code:`type Values = User['id' | 'name']; // number | string`}]},{name:`typeof guard`,category:`Type Guards`,description:"Narrows a type using JavaScript's `typeof` operator. TypeScript recognises `typeof` checks in `if` / `switch` statements and updates the type accordingly.",syntax:`if (typeof value === 'string') { /* value is string */ }`,notes:"Recognised literals: `'string'`, `'number'`, `'bigint'`, `'boolean'`, `'symbol'`, `'undefined'`, `'object'`, `'function'`. Note `typeof null === 'object'` — always check for `null` separately.",returns:`N/A — narrows the type inside the branch.`,variations:[{title:`String vs number`,code:`function format(val: string | number) {
  if (typeof val === 'string') return val.toUpperCase();
  return val.toFixed(2);
}`},{title:`Null + object guard`,code:`function isObject(val: unknown): val is object {
  return typeof val === 'object' && val !== null;
}`}]},{name:`instanceof guard`,category:`Type Guards`,description:`Narrows a type by checking whether a value was created by a given constructor. TypeScript narrows to the class type inside the branch.`,syntax:`if (value instanceof Date) { /* value is Date */ }`,notes:"Only works with constructor functions (classes, built-ins). Doesn't work across iframes/realms — use `Array.isArray()` or duck-typing for those cases.",returns:`N/A — narrows the type inside the branch.`,variations:[{title:`Class discrimination`,code:`class Cat { meow() {} }
class Dog { bark() {} }
function speak(animal: Cat | Dog) {
  if (animal instanceof Cat) animal.meow();
  else animal.bark();
}`},{title:`Error subclass`,code:`try {
  await fetch('/api');
} catch (err) {
  if (err instanceof TypeError) console.error('Network:', err.message);
  else throw err;
}`}]},{name:`in guard`,category:`Type Guards`,description:`Narrows a union by checking whether a property exists on the value. TypeScript infers the type that has that property inside the branch.`,syntax:`if ('swim' in animal) { /* animal has swim */ }`,notes:`Particularly useful for discriminated unions without a shared literal field. The checked key must be a string literal.`,returns:`N/A — narrows the type inside the branch.`,variations:[{title:`Duck-type narrowing`,code:`type Fish = { swim: () => void };
type Bird = { fly: () => void };
function move(pet: Fish | Bird) {
  if ('swim' in pet) pet.swim();
  else pet.fly();
}`},{title:`Optional property check`,code:`interface WithEmail { email: string; }
function notify(user: User | WithEmail) {
  if ('email' in user) sendEmail(user.email);
}`}]},{name:`Custom Type Guard`,category:`Type Guards`,description:"A function with a return type of `value is T` that tells TypeScript to narrow the type when the function returns `true`.",syntax:`function isUser(val: unknown): val is User { ... }`,notes:`TypeScript trusts the assertion — it does not verify the runtime logic. Keep your predicate correct; a lying type guard causes silent unsoundness.`,returns:"A `boolean` that narrows the argument type when `true`.",variations:[{title:`Shape check`,code:`function isUser(val: unknown): val is User {
  return (
    typeof val === 'object' && val !== null &&
    'id' in val && typeof (val as any).id === 'number' &&
    'name' in val && typeof (val as any).name === 'string'
  );
}`},{title:`Filter with type guard`,code:`const mixed: (string | null)[] = ['a', null, 'b'];
const strings = mixed.filter((x): x is string => x !== null);
// strings: string[]`}]},{name:`Assertion Function`,category:`Type Guards`,description:"A function annotated with `asserts condition` that narrows the type of a variable in the caller's scope if it doesn't throw.",syntax:`function assert(cond: unknown): asserts cond { ... }`,notes:`If the function returns normally, TypeScript narrows the type. If it throws, the narrowing is irrelevant. Requires TypeScript 3.7+.`,returns:"`void` — or throws; TypeScript assumes the type is narrowed after a non-throwing call.",variations:[{title:`Generic assert`,code:`function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) throw new Error(msg ?? 'Assertion failed');
}`},{title:`asserts value is T`,code:`function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw new TypeError('Expected string');
}

assertIsString(input);
input.toUpperCase(); // now safely typed as string`}]},{name:`Access Modifiers`,category:`Class Types`,description:"TypeScript adds `public`, `protected`, and `private` visibility modifiers. `private` is erased at runtime; `#` (ECMAScript private) is enforced at runtime.",syntax:`class User {
  public name: string;
  protected role: string;
  private secret: string;
}`,notes:"`private` is a compile-time check only. Use `#field` (hard private) for runtime enforcement. `protected` is accessible in subclasses.",returns:`N/A — these are class member modifiers.`,variations:[{title:`All three modifiers`,code:`class Account {
  public  id: number;
  protected balance: number = 0;
  private  pin: string;
  constructor(id: number, pin: string) {
    this.id = id; this.pin = pin;
  }
}`},{title:`Constructor shorthand`,code:`class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}
const p = new Point(1, 2); // p.x === 1`},{title:`Hard private (#)`,code:`class Counter {
  #count = 0;
  increment() { this.#count++; }
  get value() { return this.#count; }
}`}]},{name:`readonly (class)`,category:`Class Types`,description:"A class property marked `readonly` can only be assigned in the declaration or the constructor. Any later reassignment is a compile-time error.",syntax:`class Config {
  readonly apiUrl: string;
  constructor(url: string) { this.apiUrl = url; }
}`,notes:"Combine with `private` for fully encapsulated immutable fields. Does not prevent mutation of the object a `readonly` reference points to.",returns:`N/A — this is a property modifier.`,variations:[{title:`Immutable ID`,code:`class Entity {
  constructor(public readonly id: number) {}
}
const e = new Entity(1);
// e.id = 2; // TS error`}]},{name:`abstract class`,category:`Class Types`,description:`A class that cannot be instantiated directly but can define abstract methods that subclasses must implement.`,syntax:`abstract class Shape {
  abstract area(): number;
}`,notes:`Abstract classes can contain concrete methods and fields alongside abstract members. Use when a base class makes no sense on its own.`,returns:`N/A — this is a class declaration.`,variations:[{title:`Abstract with implementation`,code:`abstract class Shape {
  abstract area(): number;
  describe() {
    return \`Area is \${this.area().toFixed(2)}\`;
  }
}
class Circle extends Shape {
  constructor(private r: number) { super(); }
  area() { return Math.PI * this.r ** 2; }
}`}]},{name:`static members`,category:`Class Types`,description:"Properties and methods that belong to the class constructor itself, not to individual instances. Accessed via `ClassName.member`.",syntax:`class MathUtils {
  static readonly PI = 3.14159;
  static square(n: number) { return n * n; }
}`,notes:`Static members cannot reference the instance type parameter of a generic class. Use factory methods as a common static pattern.`,returns:`N/A — these are class-level members.`,variations:[{title:`Counter / singleton`,code:`class IdGenerator {
  private static next = 1;
  static generate() { return IdGenerator.next++; }
}`},{title:`Static factory`,code:`class Color {
  private constructor(public r: number, public g: number, public b: number) {}
  static fromHex(hex: string): Color {
    const n = parseInt(hex.slice(1), 16);
    return new Color((n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff);
  }
}`}]},{name:`Function Type`,category:`Function Types`,description:"Describes the signature of a function: its parameter types and return type. Can be expressed inline, as a `type` alias, or as a `call signature` in an interface.",syntax:`type Handler = (event: Event) => void;`,notes:"Parameter names in type aliases are optional but improve readability. Use `void` for functions whose return value is intentionally ignored.",returns:`N/A — this is a type annotation.`,variations:[{title:`Inline annotation`,code:"const greet: (name: string) => string = (name) => `Hello, ${name}`;"},{title:`Type alias`,code:`type Predicate<T> = (value: T) => boolean;
const isEven: Predicate<number> = n => n % 2 === 0;`},{title:`Call signature in interface`,code:`interface Formatter {
  (value: string): string;
  locale: string;
}`}]},{name:`Optional & Default Params`,category:`Function Types`,description:"Optional parameters are marked with `?` and may be `undefined`. Default parameters provide a fallback value and imply optionality.",syntax:`function greet(name: string, title?: string, sep = ', '): string`,notes:`Optional params must come after required ones. Default params widen the type at the call site — callers may omit them. Rest params collect remaining arguments into a typed array.`,returns:`N/A — these are parameter modifiers.`,variations:[{title:`Optional parameter`,code:`function log(message: string, level?: 'info' | 'warn' | 'error') {
  console[level ?? 'info'](message);
}`},{title:`Default parameter`,code:`function createUser(name: string, role = 'viewer') {
  return { name, role };
}
createUser('Alice');          // { name: 'Alice', role: 'viewer' }
createUser('Bob', 'admin');   // { name: 'Bob',  role: 'admin'  }`},{title:`Rest parameters`,code:`function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10`}]},{name:`Function Overloads`,category:`Function Types`,description:`Multiple function signatures for the same function that describe the different combinations of input and output types. The implementation signature is not visible to callers.`,syntax:`function process(x: string): string;
function process(x: number): number;
function process(x: any): any { ... }`,notes:`At least two overload signatures are needed. The implementation body must handle all overloads — it uses a broader type internally.`,returns:`The return type as defined per overload signature.`,variations:[{title:`String vs number overload`,code:`function double(x: string): string;
function double(x: number): number;
function double(x: string | number) {
  return typeof x === 'string' ? x.repeat(2) : x * 2;
}
const s = double('hi'); // string
const n = double(3);   // number`},{title:`Optional arg overload`,code:`function createElement(tag: 'a'): HTMLAnchorElement;
function createElement(tag: 'canvas'): HTMLCanvasElement;
function createElement(tag: string): HTMLElement {
  return document.createElement(tag);
}`}]},{name:`this parameter`,category:`Function Types`,description:"A fake first parameter named `this` that declares the expected type of `this` inside the function body. It is erased at compile time.",syntax:`function greet(this: User): string { return this.name; }`,notes:"Helps catch errors where a method is called out of context (e.g. after being destructured). Mark `this: void` to disallow any `this` usage.",returns:"N/A — `this` parameter is erased after type-checking.",variations:[{title:`Typed this`,code:`interface User { name: string; greet(this: User): string; }
const user: User = {
  name: 'Alice',
  greet() { return \`Hi, I'm \${this.name}\`; },
};
const { greet } = user;
// greet(); // TS error — 'this' context lost`},{title:`this: void callback`,code:`class Timer {
  private id = 0;
  start(callback: (this: void) => void) {
    this.id = setInterval(callback, 1000);
  }
}`}]}],a={Generics:`bg-primary-100 text-primary-700`,"Conditional Types":`bg-violet-100 text-violet-700`,"Mapped Types":`bg-amber-100 text-amber-700`,"Type Guards":`bg-emerald-100 text-emerald-700`,"Class Types":`bg-rose-100 text-rose-700`,"Function Types":`bg-sky-100 text-sky-700`};function o(){return(0,r.jsx)(n,{items:i,badgeColors:a,legendLabel:`Category`,labels:t})}export{o as default};