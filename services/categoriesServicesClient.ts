import apiClient from "@/services/apiClient";
import { ICategoriesResponseClient } from "@/types/categoryClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get - categories
export const fetchCategoriesClient =
  async (): Promise<ICategoriesResponseClient> => {
    try {
      const response = await apiClient.get(`/categories`);

      if (!response?.data?.success) {
        throw response?.data;
      }

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
