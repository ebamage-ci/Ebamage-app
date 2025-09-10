import { BASE_URL } from "@/constants/api";
import { ITendanceArticlesResponseClient } from "@/types/tendanceArticleClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - articles tendance
export const fetchTendancesArticlesClient =
  async (): Promise<ITendanceArticlesResponseClient> => {
    try {
      const response = await axios.get<ITendanceArticlesResponseClient>(
        `${BASE_URL}/articles/tendances`
      );

      if (!response?.data?.success) {
        throw response?.data;
      }

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
