import { useLocalRecmdArticlesClient } from "@/stores/useLocalRecmdArticlesClient.store";
import { IRecommandedArticleClient } from "@/types/recommandedArticleClient.type";
import { useEffect, useMemo } from "react";

type ClientFetchRecommandedArticles = {
  loading: boolean;
  rcmdArticlesDataApi: IRecommandedArticleClient[] | undefined;
};

export const useManageLoadRcmdArticlesClient = (
  data: ClientFetchRecommandedArticles
): IRecommandedArticleClient[] => {
  const {
    setRecommandedArticles,
    recommandedArticles,
    loadRecommandedArticles,
  } = useLocalRecmdArticlesClient();

  useEffect(() => {
    if (Array.isArray(data?.rcmdArticlesDataApi)) {
      // Si on a des données de l'API, on les sauvegarde dans le stockage local

      setRecommandedArticles(data.rcmdArticlesDataApi);
    } else if (!data.rcmdArticlesDataApi) {
      // Si on n'a pas de données de l'API, on charge depuis le stockage local
      loadRecommandedArticles();
    }
  }, [
    data.rcmdArticlesDataApi,
    loadRecommandedArticles,
    setRecommandedArticles,
  ]);

  return useMemo(() => {
    if (Array.isArray(data?.rcmdArticlesDataApi)) {
      // Si on a des données de l'API , on les utilise
      return data.rcmdArticlesDataApi;
    }
    // Sinon on utilise les données du stockage local
    return recommandedArticles;
  }, [data?.rcmdArticlesDataApi, recommandedArticles]);
};
