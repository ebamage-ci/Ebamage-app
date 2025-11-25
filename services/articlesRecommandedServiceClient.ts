import apiClient from "@/services/apiClient";
import { IRecommandedArticlesResponseClient } from "@/types/recommandedArticleClient.type";
import { parseApiError } from "@/utils/parseApiError";

// get - articles recommanded
export const fetchRecommandedArticlesClient = async (
  page: number
): Promise<IRecommandedArticlesResponseClient> => {
  try {
    const response = await apiClient.get(
      `/articles/recommandes?page=${page}&per_page=10`
    );

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
