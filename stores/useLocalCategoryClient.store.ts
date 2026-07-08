import { Category } from "@/types/categoryClient.type";
import { storage } from "@/stores/mmkv";
import { create } from "zustand";

interface LocalCategoryClientStore {
  categories: Category[];
  errorLocal: boolean;
  setCategories: (categories: Category[]) => void;
  loadCategories: () => void;
  resetCategories: () => void;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalCategoryClientStore = create<LocalCategoryClientStore>(
  (set) => ({
    categories: [],
    errorLocal: false,

    setErrorLocal: (val: boolean) => {
      set({ errorLocal: val });
    },

    setCategories: (categories: Category[]) => {
      try {
        storage.set("@categories", JSON.stringify(categories));
        set({ categories });
      } catch (error) {
        console.log("Erreur setCategories():", error);
        set({ errorLocal: true });
      }
    },

    loadCategories: () => {
      try {
        const data = storage.getString("@categories");
        const categories = data ? JSON.parse(data) : [];
        set({ categories, errorLocal: false });
      } catch (error) {
        console.log("Erreur loadCategories():", error);
        set({ errorLocal: true });
      }
    },

    resetCategories: () => {
      try {
        storage.remove("@categories");
        set({ categories: [] });
      } catch (error) {
        console.log("Erreur resetCategories():", error);
        set({ errorLocal: true });
      }
    },
  })
);
