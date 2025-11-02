import { BASE_URL } from "@/constants/api";
import { IGetPubResponseClient } from "@/types/pubClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get - pubs
export const fetchPubsServiceClient =
  async (): Promise<IGetPubResponseClient> => {
    try {
      const response = await axios.get(`${BASE_URL}/publicite/clients`);

      if (!response?.data?.success) {
        throw response?.data;
      }

      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  };
