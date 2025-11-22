import apiClient from "@/services/apiClient";
import {
  IArticleOrderRequestClient,
  IArticleOrderResponseClient,
} from "@/types/articleOrder.type";
import { parseApiError } from "@/utils/parseApiError";
 

export const articleOrderServiceClient = async (
  token: string,
  data: IArticleOrderRequestClient
): Promise<IArticleOrderResponseClient> => {
  try {
    const response = await apiClient.post(`/passer/commande`, data, {
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
