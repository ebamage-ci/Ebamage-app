import { IShop } from "@/types/shop.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LocalShopsStore {
  shops: IShop[] | [];
  setShops: (shops: IShop[]) => Promise<void>;
  loadShops: () => Promise<void>;
  resetShops: () => Promise<void>;
  errorLocal: boolean;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalShopsStore = create<LocalShopsStore>((set) => ({
  shops: [],
  errorLocal: false,

  setErrorLocal: (val) => set({ errorLocal: val }),

  setShops: async (shops) => {
    try {
      await AsyncStorage.setItem("@shops", JSON.stringify(shops));
      set({ shops });
    } catch (error) {
      console.log("Erreur setShops():", error);
    }
  },

  loadShops: async () => {
    try {
      const data = await AsyncStorage.getItem("@shops");
      const shops = data ? JSON.parse(data) : [];
      set({ shops, errorLocal: false });
    } catch (error) {
      console.log("Erreur loadShops():", error);
      set({ errorLocal: true });
    }
  },

  resetShops: async () => {
    try {
      await AsyncStorage.removeItem("@shops");
      set({ shops: [] });
    } catch (error) {
      console.log("Erreur resetShops():", error);
    }
  },
}));