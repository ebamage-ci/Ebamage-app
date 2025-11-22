import apiClient from "@/services/apiClient";
import {
  INotifsResponseClient,
  INotifUpdateClient,
} from "@/types/notifClient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// get notifs
export const fetchNotifsClient = async (
  token: string
): Promise<INotifsResponseClient> => {
  try {
    // console.log(token);
    const response = await apiClient.get(`/notifications`, {
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

// update notif
export const updateUserDeviceToken = async (
  token: string,
  data: INotifUpdateClient
) => {
  // console.log("-- token -- ", token);
  // console.log("-- data -- ", JSON.stringify(data, null, 2));

  try {
    const response = await apiClient.post(
      `/device/token`,
      {
        hashid: data?.hashid,
        device_token: data?.deviceToken,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("-- resp update notif -- ", response.data);

    if (!response?.data?.success) {
      // console.log("-- !resp notifs data success -- ", response.data);

      throw response?.data;
    }

    return response.data;
  } catch (error) {
    // console.log("-- resp update notif error -- ", error);
    throw parseApiError(error);
  }
};
