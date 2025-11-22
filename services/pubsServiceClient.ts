import apiClient from "@/services/apiClient";
import { IGetPubResponseClient } from "@/types/pubClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get - pubs
export const fetchPubsServiceClient =
  async (): Promise<IGetPubResponseClient> => {
    try {
      const response = await apiClient.get(`/publicite/clients`);

      if (!response?.data?.success) {
        throw response?.data;
      }

      // console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
