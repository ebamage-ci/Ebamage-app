import { addArticleCartClient } from "@/services/articleCartServiceClient";
import { IAddArticleRequestClient } from "@/types/articlesCartClient.type";
import { useMutation } from "@tanstack/react-query";

export const useClientAddArticleCart = () => {
  return useMutation({
    mutationFn: ({
      data,
      token,
    }: {
      data: IAddArticleRequestClient;
      token: string;
    }) => addArticleCartClient(data, token),
  });
};
