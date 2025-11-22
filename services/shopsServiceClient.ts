import apiClient from "@/services/apiClient";
import {
  IArticlesShopResponseClient,
  IShopsResponseClient,
} from "@/types/shopsClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get - shops
export const fetchShopsClient = async (): Promise<IShopsResponseClient> => {
  try {
    const response = await apiClient.get(`/boutiques`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw parseApiError(error);
  }
};

// get - articles of shop

export const fetchArticlesShopClient = async (
  shopId: string
): Promise<IArticlesShopResponseClient> => {
  try {
    const response = await apiClient.get(`/articles/boutique/${shopId}`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw parseApiError(error);
  }
};
