import apiClient from "@/services/apiClient";
import { IArticleDetailResponseClient } from "@/types/articleDetailClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get - article detail
export const fetchArticleDetailServiceClient = async (
  id: string
): Promise<IArticleDetailResponseClient> => {
  try {
    const response = await apiClient.get(`/article/${id}`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
