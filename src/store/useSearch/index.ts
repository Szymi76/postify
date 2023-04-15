import { create } from "zustand";

export type SearchStates = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  forceClose: () => void;
};

export const useSearch = create<SearchStates>((set, get) => ({
  isOpen: false,
  query: "",
  setOpen: (open) => set({ isOpen: open }),
  setQuery: (q) => set({ query: q }),
  forceClose: () => set({ query: "", isOpen: false }),
}));
