import { decrementArticleCartClient } from "@/services/articleCartServiceClient";
import { IDecrementArticleCartRequestClient } from "@/types/articlesCartClient.type";
import { useMutation } from "@tanstack/react-query";

export const useClientDecrementArticleCart = () => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: IDecrementArticleCartRequestClient;
      token: string;
    }) => decrementArticleCartClient(token, data),
  });
};
