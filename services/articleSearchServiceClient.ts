import { BASE_URL } from "@/constants/api";
import { IArticleSearchResponseClient } from "@/types/ArticleSearchClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - articles searched
export const fetchArticleSearchServiceClient = async (
  keyword: string
): Promise<IArticleSearchResponseClient> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recherche?keyword=${keyword}`
    );

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
