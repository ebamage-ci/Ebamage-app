import { fetchDeliveryPriceClient } from "@/services/deliveryPriceServiceClient";
import { useQuery } from "@tanstack/react-query";
const useFetchDeliveryPriceClient = (cout: number) => {
  return useQuery({
    queryKey: ["deliveryPrice", cout],
    queryFn: () => fetchDeliveryPriceClient(cout),
  });
};

export default useFetchDeliveryPriceClient;
