import { BASE_URL } from "@/constants/api";
import { IArticleDetailResponseClient } from "@/types/articleDetailClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - article detail
export const fetchArticleDetailServiceClient = async (
  id: string
): Promise<IArticleDetailResponseClient> => {
  try {
    const response = await axios.get(`${BASE_URL}/article/${id}`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
