import apiClient from "@/services/apiClient";
import { ITendanceArticlesResponseClient } from "@/types/tendanceArticleClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get - articles tendance
export const fetchTendancesArticlesClient =
  async (): Promise<ITendanceArticlesResponseClient> => {
    try {
      const response = await apiClient.get<ITendanceArticlesResponseClient>(
        `/articles/tendances`
      );

      if (!response?.data?.success) {
        throw response?.data;
      }

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
