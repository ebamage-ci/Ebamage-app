import { BASE_URL } from "@/constants/api";
import {
  IArticlesShopResponseClient,
  IShopsResponseClient,
} from "@/types/shopsClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - shops
export const fetchShopsClient = async (): Promise<IShopsResponseClient> => {
  try {
    const response = await axios.get(`${BASE_URL}/boutiques`);

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
    const response = await axios.get(`${BASE_URL}/articles/boutique/${shopId}`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw parseApiError(error);
  }
};
