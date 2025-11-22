import apiClient from "@/services/apiClient";
import { ICitiesResponsesClient } from "@/types/citiesClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get - cities
export const fetchCitiesClient = async (): Promise<ICitiesResponsesClient> => {
  try {
    const response = await apiClient.get<ICitiesResponsesClient>(
      `/villes`
    );

    // console.log("cities :", JSON.stringify(response?.data, null, 2));

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
