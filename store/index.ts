import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      firstLaunch: true,
      setUser: (user) => set({ user }),
      setFirstLaunch: (firstLaunch) => set({ firstLaunch }),
      setToken: (token) => set({ token }),
      logOut: () => set({ user: null, token: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage for mobile
    }
  )
);
