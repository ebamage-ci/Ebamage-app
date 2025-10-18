import { useLocalShopsStore } from "@/stores/useLocalShops.store";
import { IShop } from "@/types/shop.type";
import { useEffect, useMemo } from "react";

type ClientFetchShops = {
  loading: boolean;
  shopsDataApi: IShop[] | undefined;
};

export const useManageLoadShops = (
  data: ClientFetchShops
): IShop[] => {
  const { setShops, shops, loadShops } = useLocalShopsStore();

  useEffect(() => {
    if (Array.isArray(data?.shopsDataApi)) {
      // Si on a des données de l'API, on les sauvegarde dans le stockage local
      setShops(data.shopsDataApi);
    } else if (!data.shopsDataApi) {
      // Si on n'a pas de données de l'API, on charge depuis le stockage local
      loadShops();
    }
  }, [data.shopsDataApi, loadShops, setShops]);

  return useMemo(() => {
    if (Array.isArray(data?.shopsDataApi)) {
      // Si on a des données de l'API, on les utilise
      return data.shopsDataApi;
    }
    // Sinon on utilise les données du stockage local
    return shops;
  }, [data?.shopsDataApi, shops]);
};