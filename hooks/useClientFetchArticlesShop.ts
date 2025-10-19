import { fetchArticlesShopClient } from "@/services/shopsServiceClient";
import { useQuery } from "@tanstack/react-query";
const useClientFetchArticlesShop = (shopId: string) => {
  return useQuery({
    queryKey: ["articlesShop", "client", shopId],
    queryFn: () => fetchArticlesShopClient(shopId),
  });
};

export default useClientFetchArticlesShop;
