import { BASE_URL } from "@/constants/api";
import { IOrdersResponseClient } from "@/types/ordersClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get orders
export const fetchOrdersClient = async (
  token: string
): Promise<IOrdersResponseClient> => {
  try {
    const response = await axios.get(`${BASE_URL}/commande/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("-- resp orders data -- ", response.data);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
