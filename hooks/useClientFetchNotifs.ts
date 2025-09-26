import { fetchNotifsClient } from "@/services/notifServiceClient";
import { useQuery } from "@tanstack/react-query";

const useClientFetchNotifs = (token: string) => {
  return useQuery({
    queryKey: ["notifs", "client"],
    queryFn: () => fetchNotifsClient(token),
  });
};

export default useClientFetchNotifs;
