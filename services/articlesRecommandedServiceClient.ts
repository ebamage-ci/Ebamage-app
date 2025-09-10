import { BASE_URL } from "@/constants/api";
import { IRecommandedArticlesResponseClient } from "@/types/recommandedArticleClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - articles recommanded
export const fetchRecommandedArticlesClient =
  async (): Promise<IRecommandedArticlesResponseClient> => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/recommandes`);

      if (!response?.data?.success) {
        throw response?.data;
      }

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
