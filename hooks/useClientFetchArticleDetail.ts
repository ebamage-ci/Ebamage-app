import { fetchArticleDetailServiceClient } from "@/services/articleDetailServiceClient";
import { useQuery } from "@tanstack/react-query";

export const useClientFetchArticleDetail = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleDetailServiceClient(id),
  });
};
