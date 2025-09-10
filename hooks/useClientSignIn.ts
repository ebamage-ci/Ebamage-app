import { signinClient } from "@/services/authServiceClient";
import { useMutation } from "@tanstack/react-query";

export const useClientSignIn = () => {
  return useMutation({
    mutationFn: signinClient,
  });
};
