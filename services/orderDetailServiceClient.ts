import { BASE_URL } from "@/constants/api";
import { IOrderDetailResponseClient } from "@/types/orderDetailClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - order detail
export const fetchOrderDetailServiceClient = async (
  id: string
): Promise<IOrderDetailResponseClient> => {
  try {
    const response = await axios.get(`${BASE_URL}/commande/${id}`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    console.log("detail order ---> ", JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
