import { handleClientLogout } from "@/utils/handleClientLogout";
import { useMutation } from "@tanstack/react-query";

export const useClientLogout = () => {
  return useMutation({
    // mutationFn: logoutClient,
    mutationFn: handleClientLogout,
  });
};
