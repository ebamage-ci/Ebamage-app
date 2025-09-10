import { IUserStorage } from "@/types/authclient.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";

interface AuthClientStore {
  user: IUserStorage | null;
  isConnected: boolean;
  setUser: (user: IUserStorage) => Promise<void>;
  setIsConnected: (isConnected: boolean) => Promise<void>;
  loadAuth: () => Promise<void>;
  reset: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthClientStore = create<AuthClientStore>((set) => ({
  user: null,
  isConnected: false,

  setUser: async (user) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      set({ user });
    } catch (error) {
      console.log("Erreur setUser():", error);
    }
  },

  setIsConnected: async (isConnected) => {
    try {
      await AsyncStorage.setItem("@isConnected", isConnected.toString());
      set({ isConnected });
    } catch (error) {
      console.log("Erreur setIsConnected():", error);
    }
  },

  loadAuth: async () => {
    try {
      const userData = await AsyncStorage.getItem("@user");

      // console.log("-- userData -- ", userData);

      const user = userData ? JSON.parse(userData) : null;
      const isConnectedData = await AsyncStorage.getItem("@isConnected");
      const isConnected = isConnectedData === "true";

      set({ user, isConnected });
    } catch (error) {
      console.log("Erreur loadAuth():", error);
    }
  },

  reset: async () => {
    try {
      await AsyncStorage.multiRemove(["@user", "@isConnected"]);
      set({ user: null, isConnected: false });
    } catch (error) {
      console.log("Erreur reset():", error);
    }
  },

  logout: async () => {
    await AsyncStorage.clear();
    set({ user: null, isConnected: false });
    router.replace("/auth");
  },
}));
