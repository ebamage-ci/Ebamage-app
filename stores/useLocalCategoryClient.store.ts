import { Category } from "@/types/categoryClient.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LocalCategoryClientStore {
  categories: Category[];
  errorLocal: boolean;
  setCategories: (categories: Category[]) => Promise<void>;
  loadCategories: () => Promise<void>;
  resetCategories: () => Promise<void>;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalCategoryClientStore = create<LocalCategoryClientStore>(
  (set) => ({
    categories: [],
    errorLocal: false,

    setErrorLocal: (val: boolean) => {
      set({ errorLocal: val });
    },

    setCategories: async (categories: Category[]) => {
      try {
        await AsyncStorage.setItem("@categories", JSON.stringify(categories));
        set({ categories });
      } catch (error) {
        console.log("Erreur setCategories():", error);
        set({ errorLocal: true });
      }
    },

    loadCategories: async () => {
      try {
        const data = await AsyncStorage.getItem("@categories");
        const categories = data ? JSON.parse(data) : [];
        set({ categories, errorLocal: false });
      } catch (error) {
        console.log("Erreur loadCategories():", error);
        set({ errorLocal: true });
      }
    },

    resetCategories: async () => {
      try {
        await AsyncStorage.removeItem("@categories");
        set({ categories: [] });
      } catch (error) {
        console.log("Erreur resetCategories():", error);
        set({ errorLocal: true });
      }
    },
  })
);
