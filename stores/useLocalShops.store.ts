import { IShop } from "@/types/shop.type";
import { storage } from "@/stores/mmkv";
import { create } from "zustand";

interface LocalShopsStore {
  shops: IShop[] | [];
  setShops: (shops: IShop[]) => void;
  loadShops: () => void;
  resetShops: () => void;
  errorLocal: boolean;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalShopsStore = create<LocalShopsStore>((set) => ({
  shops: [],
  errorLocal: false,

  setErrorLocal: (val) => set({ errorLocal: val }),

  setShops: (shops) => {
    try {
      storage.set("@shops", JSON.stringify(shops));
      set({ shops });
    } catch (error) {
      console.log("Erreur setShops():", error);
    }
  },

  loadShops: () => {
    try {
      const data = storage.getString("@shops");
      const shops = data ? JSON.parse(data) : [];
      set({ shops, errorLocal: false });
    } catch (error) {
      console.log("Erreur loadShops():", error);
      set({ errorLocal: true });
    }
  },

  resetShops: () => {
    try {
      storage.remove("@shops");
      set({ shops: [] });
    } catch (error) {
      console.log("Erreur resetShops():", error);
    }
  },
}));
