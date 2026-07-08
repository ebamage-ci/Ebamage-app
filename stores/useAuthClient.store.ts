import { IUserStorage } from "@/types/authclient.type";
import { storage } from "@/stores/mmkv";
import { create } from "zustand";

interface AuthClientStore {
  user: IUserStorage | null;
  isConnected: boolean;
  setUser: (user: IUserStorage) => void;
  setIsConnected: (isConnected: boolean) => void;
  loadAuth: () => void;
  reset: () => void;
  logout: () => void;
}

export const useAuthClientStore = create<AuthClientStore>((set) => ({
  user: null,
  isConnected: false,

  setUser: (user) => {
    storage.set("@user", JSON.stringify(user));
    set({ user });
  },

  setIsConnected: (isConnected) => {
    storage.set("@isConnected", isConnected.toString());
    set({ isConnected });
  },

  loadAuth: () => {
    const userData = storage.getString("@user");
    const user = userData ? JSON.parse(userData) : null;
    const isConnectedData = storage.getString("@isConnected");
    const isConnected = isConnectedData === "true";
    set({ user, isConnected });
  },

  reset: () => {
    storage.remove("@user");
    storage.remove("@isConnected");
    set({ user: null, isConnected: false });
  },

  logout: () => {
    storage.clearAll();
    set({ user: null, isConnected: false });
  },
}));
