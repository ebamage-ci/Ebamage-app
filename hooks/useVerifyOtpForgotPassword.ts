import { verifyOtpForgotPassword } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";
const useVerifyOtpForgotPassword = () => {
  return useMutation({
    mutationKey: ["verify-otp-forgot-password"],
    mutationFn: verifyOtpForgotPassword,
  });
};

export default useVerifyOtpForgotPassword;
