import { fetchOrderDetailServiceClient } from "@/services/orderDetailServiceClient";
import { useQuery } from "@tanstack/react-query";

export const useClientFetchOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderDetailServiceClient(id),
  });
};
