import { useState, useEffect } from "react";

interface HookVariation {
  title: string;
  code: string;
}

interface HookData {
  name: string;
  version: string;
  description: string;
  syntax: string;
  args: string;
  returns: string;
  variations: HookVariation[];
}

const hooksData: HookData[] = [
  {
    name: "useState", version: "16.8",
    description: "Lets you add state variables to functional components.",
    syntax: "const [state, setState] = useState(initialState);",
    args: "initialState: The value you want the state to be initially. Can be a value or a function.",
    returns: "An array with two values: the current state and a state setter function.",
    variations: [
      { title: "Basic", code: "const [count, setCount] = useState(0);" },
      { title: "Lazy initialization", code: "const [state, setState] = useState(() => computeInitialState());" },
    ],
  },
  {
    name: "useEffect", version: "16.8",
    description: "Lets you perform side effects (data fetching, subscriptions) in function components.",
    syntax: "useEffect(setup, dependencies?);",
    args: "setup: Function with your effect logic. dependencies: Optional array of reactive values.",
    returns: "undefined. (The setup function itself may optionally return a cleanup function).",
    variations: [
      { title: "On mount only", code: "useEffect(() => {\n  fetchData();\n}, []);" },
      { title: "On every render", code: 'useEffect(() => {\n  console.log("Rendered!");\n});' },
      { title: "With cleanup", code: "useEffect(() => {\n  const sub = subscribe();\n  return () => sub.unsubscribe();\n}, []);" },
    ],
  },
  {
    name: "useContext", version: "16.8",
    description: "Lets you read and subscribe to context from your component.",
    syntax: "const value = useContext(SomeContext);",
    args: "SomeContext: The context object created previously with createContext.",
    returns: "The current context value, determined by the closest <Context.Provider> above the calling component.",
    variations: [
      { title: "Standard usage", code: "const theme = useContext(ThemeContext);" },
    ],
  },
  {
    name: "useReducer", version: "16.8",
    description: "Alternative to useState for managing complex state logic.",
    syntax: "const [state, dispatch] = useReducer(reducer, initialArg, init?);",
    args: "reducer: State calculation function. initialArg: Initial data. init: Optional initializer function.",
    returns: "An array with two values: the current state and a dispatch function to trigger updates.",
    variations: [
      { title: "Basic reducer", code: "const [state, dispatch] = useReducer(reducer, { count: 0 });" },
      { title: "Lazy initialization", code: "const [state, dispatch] = useReducer(reducer, initialArg, init);" },
    ],
  },
  {
    name: "useCallback", version: "16.8",
    description: "Returns a memoized callback function to prevent unnecessary re-renders.",
    syntax: "const cachedFn = useCallback(fn, dependencies);",
    args: "fn: The function value you want to cache. dependencies: Array of reactive values referenced inside fn.",
    returns: "The memoized callback function that only changes if dependencies change.",
    variations: [
      { title: "Caching event handlers", code: "const handleClick = useCallback(() => {\n  onSubmit(data);\n}, [data, onSubmit]);" },
    ],
  },
  {
    name: "useMemo", version: "16.8",
    description: "Returns a memoized value to optimize performance by caching expensive calculations.",
    syntax: "const cachedValue = useMemo(calculateValue, dependencies);",
    args: "calculateValue: Function calculating the value. dependencies: Array of reactive values.",
    returns: "The result of calling calculateValue, memoized until dependencies change.",
    variations: [
      { title: "Caching expensive math", code: "const result = useMemo(() => computeHeavyMath(a, b), [a, b]);" },
      { title: "Skipping re-renders (Object)", code: 'const options = useMemo(() => ({ align: "center" }), []);' },
    ],
  },
  {
    name: "useRef", version: "16.8",
    description: "Lets you reference a value that's not needed for rendering (e.g., DOM elements).",
    syntax: "const ref = useRef(initialValue);",
    args: "initialValue: The value you want the ref object's current property to be initially.",
    returns: "A mutable ref object with a single `current` property pointing to the value.",
    variations: [
      { title: "DOM manipulation", code: "const inputRef = useRef(null);\n// ...\n<input ref={inputRef} />" },
      { title: "Mutable values", code: "const timerRef = useRef(null);\ntimerRef.current = setInterval(...);" },
    ],
  },
  {
    name: "useImperativeHandle", version: "16.8",
    description: "Customizes the instance value exposed to parent components when using ref.",
    syntax: "useImperativeHandle(ref, createHandle, dependencies?);",
    args: "ref: The ref received from forwardRef. createHandle: Function returning the object to expose.",
    returns: "undefined.",
    variations: [
      { title: "Exposing specific methods", code: "useImperativeHandle(ref, () => ({\n  focus: () => {\n    inputRef.current.focus();\n  }\n}), []);" },
    ],
  },
  {
    name: "useLayoutEffect", version: "16.8",
    description: "Synchronous version of useEffect. Fires after all DOM mutations but before browser paint.",
    syntax: "useLayoutEffect(setup, dependencies?);",
    args: "Same as useEffect.",
    returns: "undefined. (The setup function itself may optionally return a cleanup function).",
    variations: [
      { title: "Measuring DOM elements", code: "useLayoutEffect(() => {\n  setHeight(ref.current.clientHeight);\n}, []);" },
    ],
  },
  {
    name: "useDebugValue", version: "16.8",
    description: "Lets you display a label for custom hooks in React DevTools.",
    syntax: "useDebugValue(value, format?);",
    args: "value: The value to display. format: Optional formatting function.",
    returns: "undefined.",
    variations: [
      { title: "Basic value", code: 'useDebugValue(isOnline ? "Online" : "Offline");' },
      { title: "Deferred formatting", code: "useDebugValue(date, date => date.toDateString());" },
    ],
  },
  {
    name: "useId", version: "18.0",
    description: "Generates unique IDs stable across server and client, useful for accessibility attributes.",
    syntax: "const id = useId();",
    args: "None.",
    returns: "A unique string ID.",
    variations: [
      { title: "Linking labels and inputs", code: "const id = useId();\n// <label htmlFor={id}>Name</label>\n// <input id={id} />" },
      { title: "Prefixing IDs", code: "const id = useId();\n// <div id={`${id}-first`}>...</div>" },
    ],
  },
  {
    name: "useTransition", version: "18.0",
    description: "Lets you mark state updates as non-urgent, keeping the UI responsive.",
    syntax: "const [isPending, startTransition] = useTransition();",
    args: "None.",
    returns: "An array with two items: a boolean `isPending` flag and a `startTransition` function.",
    variations: [
      { title: "Non-blocking updates", code: "const [isPending, startTransition] = useTransition();\nstartTransition(() => {\n  setTab(nextTab);\n});" },
    ],
  },
  {
    name: "useDeferredValue", version: "18.0",
    description: "Lets you defer updating a part of the UI so more important updates can happen first.",
    syntax: "const deferredValue = useDeferredValue(value, initialValue?);",
    args: "value: The value you want to defer. initialValue: Optional value for initial render.",
    returns: "The deferred version of the value (matches original on initial render, lags behind on updates).",
    variations: [
      { title: "Stale UI handling", code: "const deferredQuery = useDeferredValue(query);\n// Use deferredQuery for expensive rendering" },
    ],
  },
  {
    name: "useSyncExternalStore", version: "18.0",
    description: "Lets you subscribe to an external store securely for concurrent rendering.",
    syntax: "const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);",
    args: "subscribe: Function to register a callback. getSnapshot: Function returning current state.",
    returns: "The current snapshot of the store data.",
    variations: [
      { title: "Subscribing to browser APIs", code: "const isOnline = useSyncExternalStore(\n  subscribe,\n  () => navigator.onLine\n);" },
    ],
  },
  {
    name: "useInsertionEffect", version: "18.0",
    description: "Specialized hook for CSS-in-JS libraries to inject styles before layout effects.",
    syntax: "useInsertionEffect(setup, dependencies?);",
    args: "Same as useEffect.",
    returns: "undefined.",
    variations: [
      { title: "Injecting dynamic styles", code: "useInsertionEffect(() => {\n  document.head.appendChild(styleTag);\n}, [styleTag]);" },
    ],
  },
  {
    name: "use", version: "19.0",
    description: "Lets you read the value of a resource like a Promise or context directly inside render.",
    syntax: "const value = use(resource);",
    args: "resource: A Promise or a React Context object.",
    returns: "The resolved value of the resource (e.g., data from a Promise or Context value).",
    variations: [
      { title: "Unwrapping a Promise", code: "const data = use(fetchDataPromise);" },
      { title: "Conditional Context", code: "if (showTheme) {\n  const theme = use(ThemeContext);\n}" },
    ],
  },
  {
    name: "useActionState", version: "19.0",
    description: "Lets you update state based on the result of a form action.",
    syntax: "const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);",
    args: "fn: Action function. initialState: Starting state. permalink: Optional string for progressive enhancement.",
    returns: "An array with three items: current state, an action function to pass to forms, and a boolean `isPending` flag.",
    variations: [
      { title: "Form success/error states", code: "const [state, formAction, isPending] = useActionState(submitForm, null);\n// <form action={formAction}>" },
    ],
  },
  {
    name: "useFormStatus", version: "19.0",
    description: "Provides status information of the last form submission (must be inside a <form>).",
    syntax: "const { pending, data, method, action } = useFormStatus();",
    args: "None.",
    returns: "A status object containing `pending` (boolean), `data` (FormData), `method` (string), and `action` (reference).",
    variations: [
      { title: "Disabling submit button", code: "const { pending } = useFormStatus();\n// <button disabled={pending}>Submit</button>" },
    ],
  },
  {
    name: "useOptimistic", version: "19.0",
    description: "Lets you optimistically update the UI while a background action is pending.",
    syntax: "const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);",
    args: "state: True state. updateFn(currentState, optimisticValue): Returns the optimistic UI state.",
    returns: "An array with two values: the optimistic state and a function to apply an optimistic update.",
    variations: [
      { title: "Optimistic UI updates", code: "const [optimisticState, addOptimistic] = useOptimistic(\n  state,\n  (currentState, newValue) => [...currentState, newValue]\n);" },
    ],
  },
  {
    name: "Custom Hooks", version: "16.8",
    description: "Lets you extract and reuse stateful logic between components.",
    syntax: "function useMyCustomHook(args) { /* logic */ return data; }",
    args: "Any arguments required by your custom logic.",
    returns: "Any value or functions your custom logic needs to expose.",
    variations: [
      { title: "Data Fetching Hook", code: "function useFetch(url) {\n  const [data, setData] = useState(null);\n  // fetch logic...\n  return data;\n}" },
      { title: "Event Listener Hook", code: "function useWindowSize() {\n  const [size, setSize] = useState([0, 0]);\n  // listener logic...\n  return size;\n}" },
    ],
  },
];

const versionColor: Record<string, string> = {
  "16.8": "bg-primary-100 text-primary-700",
  "18.0": "bg-emerald-100 text-emerald-700",
  "19.0": "bg-amber-100 text-amber-700",
};

export default function ReactHooksCheatsheet() {
  const [selectedHook, setSelectedHook] = useState<HookData | null>(null);
  const [openVariation, setOpenVariation] = useState<number | null>(0);

  useEffect(() => {
    setOpenVariation(0);
  }, [selectedHook]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (selectedHook) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedHook]);

  return (
    <>
      {/* Hook grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {hooksData.map((hook) => (
          <button
            key={hook.name}
            onClick={() => setSelectedHook(hook)}
            className="group flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary-600"
          >
            <span className="text-base font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors leading-tight">
              {hook.name}
            </span>
            <span
              className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${versionColor[hook.version] ?? "bg-neutral-100 text-neutral-600"}`}
            >
              v{hook.version}
            </span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-neutral-500">
        <span className="font-medium text-neutral-400 uppercase tracking-wide">React version</span>
        {Object.entries(versionColor).map(([v, cls]) => (
          <span key={v} className={`px-2.5 py-0.5 rounded-full font-semibold ${cls}`}>
            v{v}
          </span>
        ))}
      </div>

      {/* Modal */}
      {selectedHook && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm"
          onClick={() => setSelectedHook(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-neutral-900">{selectedHook.name}</h2>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${versionColor[selectedHook.version] ?? "bg-neutral-100 text-neutral-600"}`}
                >
                  v{selectedHook.version}
                </span>
              </div>
              <button
                onClick={() => setSelectedHook(null)}
                className="text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 rounded-full hover:bg-neutral-200"
                aria-label="Close"
              >
                <span className="material-symbols-rounded text-xl! leading-none block!">close</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 max-h-[78vh] overflow-y-auto flex flex-col gap-6">
              <p className="text-neutral-600 leading-relaxed">{selectedHook.description}</p>

              {/* Syntax */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Syntax</p>
                <pre className="bg-neutral-950 text-neutral-100 rounded-xl p-4 overflow-x-auto text-sm font-mono" style={{ userSelect: "text" }}>
                  <code>{selectedHook.syntax}</code>
                </pre>
              </div>

              {/* Arguments */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Arguments</p>
                <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                  {selectedHook.args}
                </p>
              </div>

              {/* Returns */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Returns</p>
                <p className="text-sm text-neutral-600 leading-relaxed bg-neutral-50 border border-neutral-100 rounded-xl p-4">
                  {selectedHook.returns}
                </p>
              </div>

              {/* Variations accordion */}
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Variations / Usage</p>
                <div className="rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
                  {selectedHook.variations.map((variation, index) => {
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
