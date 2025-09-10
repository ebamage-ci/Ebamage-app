import { fetchArticleSearchServiceClient } from "@/services/articleSearchServiceClient";
import { useQuery } from "@tanstack/react-query";

export const useClientFetchSearchedArticles = (keyword: string) => {
  return useQuery({
    queryKey: ["article", keyword],
    queryFn: () => fetchArticleSearchServiceClient(keyword),
  });
};
