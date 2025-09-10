import { useLocalTendancesArticlesClient } from "@/stores/useLocalTendanceArticlesClient.store";
import { ITendanceArticleClient } from "@/types/tendanceArticleClient.type";
import { useEffect, useMemo } from "react";

type ClientFetchTendanceArticles = {
  loading: boolean;

  tendanceArticlesDataApi: ITendanceArticleClient[] | undefined;
};

export const useManageLoadTendanceArticlesClient = (
  data: ClientFetchTendanceArticles
): ITendanceArticleClient[] => {
  const { setTendancesArticles, tendancesArticles, loadTendancesArticles } =
    useLocalTendancesArticlesClient();

  useEffect(() => {
    if (Array.isArray(data?.tendanceArticlesDataApi)) {
      // Si on a des données de l'API, on les sauvegarde dans le stockage local

      setTendancesArticles(data.tendanceArticlesDataApi);
    } else if (!data.tendanceArticlesDataApi) {
      // Si on n'a pas de données de l'API, on charge depuis le stockage local
      loadTendancesArticles();
    }
  }, [
    data.tendanceArticlesDataApi,
    loadTendancesArticles,
    setTendancesArticles,
  ]);

  return useMemo(() => {
    if (Array.isArray(data?.tendanceArticlesDataApi)) {
      // Si on a des données de l'API , on les utilise
      return data.tendanceArticlesDataApi;
    }
    // Sinon on utilise les données du stockage local
    return tendancesArticles;
  }, [data?.tendanceArticlesDataApi, tendancesArticles]);
};
