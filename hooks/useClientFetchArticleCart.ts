import { fetchArticleCartClient } from "@/services/articleCartServiceClient";
import { useQuery } from "@tanstack/react-query";
const useClientFetchArticleCart = (token: string) => {
  return useQuery({
    queryKey: ["cart", "client"],
    queryFn: () => fetchArticleCartClient(token),
    // refetchOnMount: true,
  });
};

export default useClientFetchArticleCart;
