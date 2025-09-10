import { useLocalCartArticlesClient } from "@/stores/useLocalCartArticlesClient.store";
import { articleItemCart } from "@/types/articlesCartClient.type";
import { useEffect, useMemo } from "react";

type ClientFetchCartArticles = {
  cartArticlesDataApi: articleItemCart[] | undefined;
};

export const useManageLoadCartArtilcesClient = (
  data: ClientFetchCartArticles
): articleItemCart[] => {
  const { cart, setCart, loadCart } = useLocalCartArticlesClient();

  useEffect(() => {
    if (Array.isArray(data?.cartArticlesDataApi)) {
      // Si on a des données de l'API, on les sauvegarde dans le stockage local

      setCart(data.cartArticlesDataApi);
    } else if (!data.cartArticlesDataApi) {
      // Si on n'a pas de données de l'API, on charge depuis le stockage local
      loadCart();
    }
  }, [data.cartArticlesDataApi, loadCart, setCart]);

  return useMemo(() => {
    if (Array.isArray(data?.cartArticlesDataApi)) {
      // Si on a des données de l'API , on les utilise
      return data?.cartArticlesDataApi;
    }
    // Sinon on utilise les données du stockage local
    return cart;
  }, [data?.cartArticlesDataApi, cart]);
};
