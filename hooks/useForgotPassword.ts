import { forgotPassword } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";
const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: forgotPassword,
  });
};

export default useForgotPassword;
