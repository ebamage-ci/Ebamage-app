import { BASE_URL } from "@/constants/api";
import { ITownsCityResponseClient } from "@/types/townsCity";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - towns
export const fetchTownsByCityClient = async (
  city: string
): Promise<ITownsCityResponseClient> => {
  try {
    const response = await axios.get<ITownsCityResponseClient>(
      `${BASE_URL}/commune/${city}/ville`
    );

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
