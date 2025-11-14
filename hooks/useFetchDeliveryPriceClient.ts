import { fetchDeliveryPriceClient } from "@/services/deliveryPriceServiceClient";
import { useQuery } from "@tanstack/react-query";
const useFetchDeliveryPriceClient = () => {
  return useQuery({
    queryKey: ["deliveryPrice"],
    queryFn: fetchDeliveryPriceClient,
  });
};

export default useFetchDeliveryPriceClient;
