import { fetchSuggestionsServiceClient } from "@/services/articleSearchServiceClient";
import { useQuery } from "@tanstack/react-query";

export const useClientFetchSuggestions = (keyword: string) => {
  return useQuery({
    queryKey: ["suggestions", keyword],
    queryFn: () => fetchSuggestionsServiceClient(keyword),
    enabled: false,
  });
};
