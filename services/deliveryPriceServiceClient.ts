import apiClient from "@/services/apiClient";
import { parseApiError } from "@/utils/parseApiError";

// get - delivery price
export const fetchDeliveryPriceClient = async (
  cout: number
): Promise<{
  success: boolean;
  message: string;
  data: number;
}> => {
  try {
    const response = await apiClient.get<{
      success: boolean;
      message: string;
      data: number;
    }>(`/afficher/prix?cout=${cout}`);

    // console.log("delivery price :", JSON.stringify(response?.data, null, 2));

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
