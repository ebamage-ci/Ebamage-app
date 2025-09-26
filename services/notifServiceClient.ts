import { BASE_URL } from "@/constants/api";
import { INotifsResponseClient } from "@/types/notifClient.type";
import { parseApiError } from "@/utils/parseApiError";
import axios from "axios";

// get notifs
export const fetchNotifsClient = async (
  token: string
): Promise<INotifsResponseClient> => {
  try {
    // console.log(token);
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("-- resp notifs data -- ", response.data);

    if (!response?.data?.success) {
      // console.log("-- resp notifs data -- ", response.data);

      throw response?.data;
    }

    return response.data;
  } catch (error) {
    // console.log("-- resp notifs error -- ", error);
    throw parseApiError(error);
  }
};
