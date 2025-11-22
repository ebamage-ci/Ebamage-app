import apiClient from "@/services/apiClient";
import { IOrdersResponseClient } from "@/types/ordersClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get orders
export const fetchOrdersClient = async (
  token: string
): Promise<IOrdersResponseClient> => {
  try {
    const response = await apiClient.get(`/commande/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(
    //   "-- resp orders data -- ",
    //   JSON.stringify(response.data, null, 2)
    // );

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
