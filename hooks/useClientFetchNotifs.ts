import { fetchNotifsClient } from "@/services/notifServiceClient";
import { useQuery } from "@tanstack/react-query";

import { useAuthClientStore } from "@/stores/useAuthClient.store";

const useClientFetchNotifs = (token: string) => {
  return useQuery({
    queryKey: ["notifs", "client"],
    queryFn: () => fetchNotifsClient(token),
    enabled: useAuthClientStore.getState().isConnected,
  });
};

export default useClientFetchNotifs;
