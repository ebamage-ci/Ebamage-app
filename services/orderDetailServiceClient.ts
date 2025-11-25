import apiClient from "@/services/apiClient";
import { IOrderDetailResponseClient } from "@/types/orderDetailClient.type";
import { parseApiError } from "@/utils/parseApiError";

// get - order detail
export const fetchOrderDetailServiceClient = async (
  id: string
): Promise<IOrderDetailResponseClient> => {
  try {
    const response = await apiClient.get(`/commande/${id}`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    // console.log("detail order ---> ", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
