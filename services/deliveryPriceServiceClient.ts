import { BASE_URL } from "@/constants/api";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - delivery price
export const fetchDeliveryPriceClient = async (): Promise<{
  success: boolean;
  message: string;
  value: number;
}> => {
  try {
    const response = await axios.get<{
      success: boolean;
      message: string;
      value: number;
    }>(`${BASE_URL}/price-delivery`);

    // console.log("delivery price :", JSON.stringify(response?.data, null, 2));

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
