import { resendOtpClient } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";

export const useClientResendOtp = () => {
  return useMutation({
    mutationFn: resendOtpClient,
  });
};
