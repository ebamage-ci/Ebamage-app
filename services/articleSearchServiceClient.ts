import { BASE_URL } from "@/constants/api";
import {
  IArticleSearchResponseClient,
  ISuggestionResponseClient,
} from "@/types/ArticleSearchClient.type";
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

// get - suggestions
export const fetchSuggestionsServiceClient = async (
  keyword: string
): Promise<ISuggestionResponseClient> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/suggestion?libelle=${keyword}`
    );

    console.log("suggests :", JSON.stringify(response?.data, null, 2));

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
