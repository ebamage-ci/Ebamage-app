import apiClient from "@/services/apiClient";
import { IRecommandedArticlesResponseClient } from "@/types/recommandedArticleClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get - articles recommanded
export const fetchRecommandedArticlesClient =
  async (): Promise<IRecommandedArticlesResponseClient> => {
    try {
      const response = await apiClient.get(`/articles/recommandes`);

      if (!response?.data?.success) {
        throw response?.data;
      }

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
