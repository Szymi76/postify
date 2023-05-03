import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_USERS_IN_RECENTLY_SEARCHED = 4;

type RecentlySearchedState = {
  usersIds: string[];
  add: (userId: string) => void;
  delete: (userId: string) => void;
};

export const useRecentlySearched = create<RecentlySearchedState>()(
  persist(
    (set, get) => ({
      usersIds: [],
      add: id => {
        if (get().usersIds.length >= MAX_USERS_IN_RECENTLY_SEARCHED) {
          set({ usersIds: get().usersIds.slice(0, MAX_USERS_IN_RECENTLY_SEARCHED - 1) });
        }
        set({ usersIds: Array.from(new Set([id, ...get().usersIds])) });
      },
      delete: userId => set({ usersIds: get().usersIds.filter(id => id != userId) }),
    }),
    {
      name: "recently-searched-users-storage", // name of the item in the storage (must be unique)
    }
  )
);
