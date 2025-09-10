import { fetchRecommandedArticlesClient } from "@/services/articlesRecommandedServiceClient";
import { useQuery } from "@tanstack/react-query";
const useClientFetchRecommandedArticles = () => {
  return useQuery({
    queryKey: ["recommandedArticles", "client"],
    queryFn: fetchRecommandedArticlesClient,
  });
};

export default useClientFetchRecommandedArticles;
