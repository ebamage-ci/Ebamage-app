import { ISuggestion } from "@/types/ArticleSearchClient.type";
import { create } from "zustand";
type SearchSuggestByQueryClientStore = {
  suggestions: ISuggestion[];
  setSuggestions: (suggestions: ISuggestion[]) => void;
};

// store for search suggestions
export const useSearchSuggestByQueryClientStore =
  create<SearchSuggestByQueryClientStore>((set) => ({
    suggestions: [],
    setSuggestions: (suggestions) => set({ suggestions }),
  }));
