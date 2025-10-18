import { fetchShopsClient } from "@/services/shopsServiceClient";
import { useQuery } from "@tanstack/react-query";

const useClientFetchShops = () => {
  return useQuery({
    queryKey: ["shops", "client"],
    queryFn: fetchShopsClient,
  });
};

export default useClientFetchShops;
