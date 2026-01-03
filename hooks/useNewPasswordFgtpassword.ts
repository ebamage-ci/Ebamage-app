import { newPasswordForgotPassword } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";

const useNewPasswordFgtpassword = () => {
  return useMutation({
    mutationKey: ["new-password-forgot-password"],
    mutationFn: newPasswordForgotPassword,
  });
};

export default useNewPasswordFgtpassword;
