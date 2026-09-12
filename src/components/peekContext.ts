import { createContext, useContext } from "react";

export interface PeekApi {
  show: (src: string) => void;
  hide: () => void;
}

export const PeekContext = createContext<PeekApi>({ show: () => {}, hide: () => {} });

/** Access the cursor-following preview provided by `HoverPeekProvider`. */
export function usePeek() {
  return useContext(PeekContext);
}
