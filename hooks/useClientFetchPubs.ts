import { fetchPubsServiceClient } from "@/services/pubsServiceClient";
import { useQuery } from "@tanstack/react-query";

export const useClientFetchPubs = () => {
  return useQuery({
    queryKey: ["pubs"],
    queryFn: () => fetchPubsServiceClient(),
  });
};
