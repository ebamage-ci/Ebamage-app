// import { fetchRecommandedArticlesClient } from "@/services/articlesRecommandedServiceClient";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// const useClientFetchRecommandedArticles = (page: number) => {
//   return useQuery({
//     queryKey: ["recommandedArticles", "client"],
//     queryFn: () => fetchRecommandedArticlesClient(page),
//     placeholderData: keepPreviousData,
//   });
// };

// export default useClientFetchRecommandedArticles;

import { fetchRecommandedArticlesClient } from "@/services/articlesRecommandedServiceClient";
import { useInfiniteQuery } from "@tanstack/react-query";

const useClientFetchRecommandedArticles = () => {
  return useInfiniteQuery({
    queryKey: ["recommandedArticles", "client", "infinite"],
    queryFn: ({ pageParam = 1 }) => fetchRecommandedArticlesClient(pageParam),
    initialPageParam: 1,
    // getNextPageParam: (lastPage) => {
    //   //  Vérifier s'il y a une page suivante
    //   if (lastPage.pagination.current_page < lastPage.pagination.total) {
    //     return lastPage.pagination.current_page + 1;
    //   }
    //   return undefined;
    // },

    getNextPageParam: (lastPage) => {
      //  CORRECTION : total = nombre total de pages
      if (lastPage.pagination.current_page < lastPage.pagination.total) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export default useClientFetchRecommandedArticles;
