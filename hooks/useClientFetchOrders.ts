import { fetchOrdersClient } from "@/services/orderServiceClient";
import { useQuery } from "@tanstack/react-query";

const useClientFetchOrders = (token: string) => {
  return useQuery({
    queryKey: ["orders", "client"],
    queryFn: () => fetchOrdersClient(token),
  });
};

export default useClientFetchOrders;