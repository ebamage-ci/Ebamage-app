import apiClient from "@/services/apiClient";
import { ITownsCityResponseClient } from "@/types/townsCity";
import { parseApiError } from "@/utils/parseApiError";

// get - towns
export const fetchTownsByCityClient = async (
  city: string
): Promise<ITownsCityResponseClient> => {
  try {
    const response = await apiClient.get<ITownsCityResponseClient>(
      `/commune/${city}/ville`
    );

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
