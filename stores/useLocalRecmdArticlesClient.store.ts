import { IRecommandedArticleClient } from "@/types/recommandedArticleClient.type";
import { storage } from "@/stores/mmkv";
import { create } from "zustand";

interface LocalRecmdArticlesClient {
  recommandedArticles: IRecommandedArticleClient[] | [];
  setRecommandedArticles: (
    recommandedArticles: IRecommandedArticleClient[]
  ) => void;
  loadRecommandedArticles: () => void;
  resetRecommandedArticles: () => void;
  errorLocal: boolean;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalRecmdArticlesClient = create<LocalRecmdArticlesClient>(
  (set) => ({
    recommandedArticles: [],
    errorLocal: false,

    setErrorLocal: (val) => set({ errorLocal: val }),

    setRecommandedArticles: (recommandedArticles) => {
      try {
        const limited = Array.isArray(recommandedArticles)
          ? recommandedArticles.slice(0, 10)
          : [];
        storage.set("@recommandedArticles", JSON.stringify(limited));
        set({ recommandedArticles: limited });
      } catch (error) {
        console.log("Erreur setRecommandedArticles():", error);
      }
    },

    loadRecommandedArticles: () => {
      try {
        const data = storage.getString("@recommandedArticles");
        const recommandedArticles = data ? JSON.parse(data) : [];
        set({ recommandedArticles, errorLocal: false });
      } catch (error) {
        console.log("Erreur loadRecommandedArticles():", error);
        set({ errorLocal: true });
      }
    },

    resetRecommandedArticles: () => {
      try {
        storage.remove("@recommandedArticles");
        set({ recommandedArticles: [] });
      } catch (error) {
        console.log("Erreur resetRecommandedArticles():", error);
      }
    },
  })
);
