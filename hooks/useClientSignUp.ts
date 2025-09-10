import { signupClient } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";

export const useClientSignUp = () => {
  return useMutation({
    mutationFn: signupClient,
  });
};
