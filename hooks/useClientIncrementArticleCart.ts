import { incrementArticleCartClient } from "@/services/articleCartServiceClient";
import { IIncrementArticleCartRequestClient } from "@/types/articlesCartClient.type";
import { useMutation } from "@tanstack/react-query";

export const useClientIncrementArticleCart = () => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: IIncrementArticleCartRequestClient;
      token: string;
    }) => incrementArticleCartClient(token, data),
  });
};
