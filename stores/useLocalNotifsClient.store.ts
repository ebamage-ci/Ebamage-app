import { INotif } from "@/types/notifClient.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LocalNotifsClient {
  notifs: INotif[];
  errorLocal: boolean;
  setNotifs: (notifs: INotif[]) => Promise<void>;
  loadNotifs: () => Promise<void>;
  resetNotifs: () => Promise<void>;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalNotifsClient = create<LocalNotifsClient>((set) => ({
  notifs: [],
  errorLocal: false,

  setErrorLocal: (val: boolean) => {
    set({ errorLocal: val });
  },

  setNotifs: async (notifs: INotif[]) => {
    try {
      await AsyncStorage.setItem("@notifs", JSON.stringify(notifs));
      set({ notifs });
    } catch (error) {
      console.log("Erreur setNotifs():", error);
      set({ errorLocal: true });
    }
  },

  loadNotifs: async () => {
    try {
      const data = await AsyncStorage.getItem("@notifs");
      const notifs = data ? JSON.parse(data) : [];
      set({ notifs, errorLocal: false });
    } catch (error) {
      console.log("Erreur loadNotifs():", error);
      set({ errorLocal: true });
    }
  },

  resetNotifs: async () => {
    try {
      await AsyncStorage.removeItem("@notifs");
      set({ notifs: [] });
    } catch (error) {
      console.log("Erreur resetNotifs():", error);
      set({ errorLocal: true });
    }
  },
}));
