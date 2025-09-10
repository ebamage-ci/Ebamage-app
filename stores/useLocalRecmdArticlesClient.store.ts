import { IRecommandedArticleClient } from "@/types/recommandedArticleClient.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LocalRecmdArticlesClient {
  recommandedArticles: IRecommandedArticleClient[] | [];
  setRecommandedArticles: (
    recommandedArticles: IRecommandedArticleClient[]
  ) => Promise<void>;
  loadRecommandedArticles: () => Promise<void>;
  resetRecommandedArticles: () => Promise<void>;
  errorLocal: boolean;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalRecmdArticlesClient = create<LocalRecmdArticlesClient>(
  (set) => ({
    recommandedArticles: [],
    errorLocal: false,

    setErrorLocal: (val) => set({ errorLocal: val }),

    setRecommandedArticles: async (recommandedArticles) => {
      try {
        await AsyncStorage.setItem(
          "@recommandedArticles",
          JSON.stringify(recommandedArticles)
        );
        set({ recommandedArticles });
      } catch (error) {
        console.log("Erreur setRecommandedArticles():", error);
      }
    },

    loadRecommandedArticles: async () => {
      try {
        const data = await AsyncStorage.getItem("@recommandedArticles");
        const recommandedArticles = data ? JSON.parse(data) : [];
        set({ recommandedArticles, errorLocal: false });
      } catch (error) {
        console.log("Erreur loadRecommandedArticles():", error);
        set({ errorLocal: true });
      }
    },

    resetRecommandedArticles: async () => {
      try {
        await AsyncStorage.removeItem("@recommandedArticles");
        set({ recommandedArticles: [] });
      } catch (error) {
        console.log("Erreur resetRecommandedArticles():", error);
      }
    },
  })
);
