import { fetchArticleCartClient } from "@/services/articleCartServiceClient";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { useQuery } from "@tanstack/react-query";
const useClientFetchArticleCart = (token: string) => {
  return useQuery({
    queryKey: ["cart", "client"],
    queryFn: () => fetchArticleCartClient(token),
    enabled: useAuthClientStore.getState().isConnected,
    // refetchOnMount: true,
  });
};

export default useClientFetchArticleCart;
