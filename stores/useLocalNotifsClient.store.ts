import { INotif } from "@/types/notifClient.type";
import { storage } from "@/stores/mmkv";
import { create } from "zustand";

interface LocalNotifsClient {
  notifs: INotif[];
  errorLocal: boolean;
  setNotifs: (notifs: INotif[]) => void;
  loadNotifs: () => void;
  resetNotifs: () => void;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalNotifsClient = create<LocalNotifsClient>((set) => ({
  notifs: [],
  errorLocal: false,

  setErrorLocal: (val: boolean) => {
    set({ errorLocal: val });
  },

  setNotifs: (notifs: INotif[]) => {
    try {
      const limited = Array.isArray(notifs) ? notifs.slice(0, 10) : [];
      storage.set("@notifs", JSON.stringify(limited));
      set({ notifs: limited });
    } catch (error) {
      console.log("Erreur setNotifs():", error);
      set({ errorLocal: true });
    }
  },

  loadNotifs: () => {
    try {
      const data = storage.getString("@notifs");
      const notifs = data ? JSON.parse(data) : [];
      set({ notifs, errorLocal: false });
    } catch (error) {
      console.log("Erreur loadNotifs():", error);
      set({ errorLocal: true });
    }
  },

  resetNotifs: () => {
    try {
      storage.remove("@notifs");
      set({ notifs: [] });
    } catch (error) {
      console.log("Erreur resetNotifs():", error);
      set({ errorLocal: true });
    }
  },
}));
