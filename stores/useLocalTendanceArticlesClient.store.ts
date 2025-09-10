import { ITendanceArticleClient } from "@/types/tendanceArticleClient.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LocalTendancesArticlesClient {
  tendancesArticles: ITendanceArticleClient[] | [];
  setTendancesArticles: (
    tendancesArticles: ITendanceArticleClient[]
  ) => Promise<void>;
  loadTendancesArticles: () => Promise<void>;
  resetTendancesArticles: () => Promise<void>;
  errorLocal: boolean;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalTendancesArticlesClient =
  create<LocalTendancesArticlesClient>((set) => ({
    tendancesArticles: [],
    errorLocal: false,

    setErrorLocal: (val) => set({ errorLocal: val }),

    setTendancesArticles: async (tendancesArticles) => {
      try {
        await AsyncStorage.setItem(
          "@tendancesArticles",
          JSON.stringify(tendancesArticles)
        );
        set({ tendancesArticles });
      } catch (error) {
        console.log("Erreur setTendancesArticles():", error);
      }
    },

    loadTendancesArticles: async () => {
      try {
        const data = await AsyncStorage.getItem("@tendancesArticles");
        const tendancesArticles = data ? JSON.parse(data) : [];
        set({ tendancesArticles, errorLocal: false });
      } catch (error) {
        console.log("Erreur loadTendancesArticles():", error);
        set({ errorLocal: true });
      }
    },

    resetTendancesArticles: async () => {
      try {
        await AsyncStorage.removeItem("@tendancesArticles");
        set({ tendancesArticles: [] });
      } catch (error) {
        console.log("Erreur resetTendancesArticles():", error);
      }
    },
  }));
