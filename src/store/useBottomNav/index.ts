import { create } from "zustand";

export type BottomNavState = {
  showNotifications: boolean;
  changeNotificationsShowTo: (newValue: boolean) => void;
  showFriends: boolean;
  changeFriendsShowTo: (newValue: boolean) => void;
};

export const useBottomNav = create<BottomNavState>((set, get) => ({
  showFriends: false,
  changeFriendsShowTo: (newValue) => set({ showFriends: newValue }),
  showNotifications: false,
  changeNotificationsShowTo: (newValue) => set({ showNotifications: newValue }),
}));
