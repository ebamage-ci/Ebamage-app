import { BASE_URL } from "@/constants/api";
import {
  IArticleOrderRequestClient,
  IArticleOrderResponseClient,
} from "@/types/articleOrder.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

export const articleOrderServiceClient = async (
  token: string,
  data: IArticleOrderRequestClient
): Promise<IArticleOrderResponseClient> => {
  try {
    const response = await axios.post(`${BASE_URL}/passer/commande`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.success) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
