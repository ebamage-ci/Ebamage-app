import { deleteArticleCartClient } from "@/services/articleCartServiceClient";
import { IDeleteArticleCartRequestClient } from "@/types/articlesCartClient.type";
import { useMutation } from "@tanstack/react-query";

export const useClientDeleteArticleCart = () => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: IDeleteArticleCartRequestClient;
      token: string;
    }) => deleteArticleCartClient(token, data),
  });
};
