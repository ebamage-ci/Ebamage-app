import { deleteClientAccount } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";

export const useClientDeleteAccount = () => {
  return useMutation({
    mutationKey: ["deleteClientAccount"],
    mutationFn: deleteClientAccount,
  });
};
