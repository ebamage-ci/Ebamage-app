import { articleOrderServiceClient } from "@/services/articleOrderServiceClient";
import { IArticleOrderRequestClient } from "@/types/articleOrder.type";
import { useMutation } from "@tanstack/react-query";

export const useClientCartArticleOrder = () => {
  return useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string;
      data: IArticleOrderRequestClient;
    }) => articleOrderServiceClient(token, data),
  });
};
