import { useLocalNotifsClient } from "@/stores/useLocalNotifsClient.store";
import { INotif } from "@/types/notifClient.type";
import { useEffect, useMemo } from "react";

type ClientFetchNotifs = {
  loading: boolean;

  notifsDataApi: INotif[] | undefined;
};

export const useManageLoadNotifsClient = (
  data: ClientFetchNotifs
): INotif[] => {
  const { notifs, setNotifs, loadNotifs } = useLocalNotifsClient();

  useEffect(() => {
    if (Array.isArray(data?.notifsDataApi)) {
      // Si on a des données de l'API, on les sauvegarde dans le stockage local

      setNotifs(data.notifsDataApi);
    } else if (!data.notifsDataApi) {
      // Si on n'a pas de données de l'API, on charge depuis le stockage local
      loadNotifs();
    }
  }, [data.notifsDataApi, loadNotifs, setNotifs]);

  return useMemo(() => {
    if (Array.isArray(data?.notifsDataApi)) {
      // Si on a des données de l'API , on les utilise
      return data?.notifsDataApi;
    }
    // Sinon on utilise les données du stockage local
    return notifs;
  }, [data?.notifsDataApi, notifs]);
};
