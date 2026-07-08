import { ITendanceArticleClient } from "@/types/tendanceArticleClient.type";
import { storage } from "@/stores/mmkv";
import { create } from "zustand";

interface LocalTendancesArticlesClient {
  tendancesArticles: ITendanceArticleClient[] | [];
  setTendancesArticles: (
    tendancesArticles: ITendanceArticleClient[]
  ) => void;
  loadTendancesArticles: () => void;
  resetTendancesArticles: () => void;
  errorLocal: boolean;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalTendancesArticlesClient =
  create<LocalTendancesArticlesClient>((set) => ({
    tendancesArticles: [],
    errorLocal: false,

    setErrorLocal: (val) => set({ errorLocal: val }),

    setTendancesArticles: (tendancesArticles) => {
      try {
        const limited = Array.isArray(tendancesArticles)
          ? tendancesArticles.slice(0, 10)
          : [];
        storage.set("@tendancesArticles", JSON.stringify(limited));
        set({ tendancesArticles: limited });
      } catch (error) {
        console.log("Erreur setTendancesArticles():", error);
      }
    },

    loadTendancesArticles: () => {
      try {
        const data = storage.getString("@tendancesArticles");
        const tendancesArticles = data ? JSON.parse(data) : [];
        set({ tendancesArticles, errorLocal: false });
      } catch (error) {
        console.log("Erreur loadTendancesArticles():", error);
        set({ errorLocal: true });
      }
    },

    resetTendancesArticles: () => {
      try {
        storage.remove("@tendancesArticles");
        set({ tendancesArticles: [] });
      } catch (error) {
        console.log("Erreur resetTendancesArticles():", error);
      }
    },
  }));
