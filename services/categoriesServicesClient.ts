import { BASE_URL } from "@/constants/api";
import { ICategoriesResponseClient } from "@/types/categoryClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - categories
export const fetchCategoriesClient =
  async (): Promise<ICategoriesResponseClient> => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);

      if (!response?.data?.success) {
        throw response?.data;
      }

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
