import { BASE_URL } from "@/constants/api";
import { ICitiesResponsesClient } from "@/types/citiesClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - cities
export const fetchCitiesClient = async (): Promise<ICitiesResponsesClient> => {
  try {
    const response = await axios.get<ICitiesResponsesClient>(
      `${BASE_URL}/villes`
    );

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
