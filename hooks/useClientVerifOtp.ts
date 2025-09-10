import { verifOtpClient } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";

export const useClientVerifOtp = () => {
  return useMutation({
    mutationFn: verifOtpClient,
  });
};
