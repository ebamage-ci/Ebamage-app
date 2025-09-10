import { useLocalOrdersClient } from "@/stores/useLocalOrdersClient.store";
import { IOrder } from "@/types/ordersClient.type";
import { useEffect, useMemo } from "react";

type ClientFetchOrders = {
  loading: boolean;

  ordersDataApi: IOrder[] | undefined;
};

export const useManageLoadOrdersClient = (
  data: ClientFetchOrders
): IOrder[] => {
  const { orders, setOrders, loadOrders } = useLocalOrdersClient();

  useEffect(() => {
    if (Array.isArray(data?.ordersDataApi)) {
      // Si on a des données de l'API, on les sauvegarde dans le stockage local

      setOrders(data.ordersDataApi);
    } else if (!data.ordersDataApi) {
      // Si on n'a pas de données de l'API, on charge depuis le stockage local
      loadOrders();
    }
  }, [data.ordersDataApi, loadOrders, setOrders]);

  return useMemo(() => {
    if (Array.isArray(data?.ordersDataApi)) {
      // Si on a des données de l'API , on les utilise
      return data?.ordersDataApi;
    }
    // Sinon on utilise les données du stockage local
    return orders;
  }, [data?.ordersDataApi, orders]);
};
