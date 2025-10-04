import { updateUserDeviceToken } from "@/services/notifServiceClient";
import { INotifUpdateClient } from "@/types/notifClient.type";
import { useMutation } from "@tanstack/react-query";

export const useClientUpdateDeviceToken = () => {
  return useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string;
      data: INotifUpdateClient;
    }) => updateUserDeviceToken(token, data),
  });
};
