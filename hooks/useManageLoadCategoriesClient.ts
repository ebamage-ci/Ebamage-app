import { useLocalCategoryClientStore } from "@/stores/useLocalCategoryClient.store";
import { Category } from "@/types/categoryClient.type";
import { useEffect, useMemo } from "react";

type ClientFetchCategories = {
  loading: boolean;

  categoriesDataApi: Category[] | undefined;
};

export const useManageLoadCategoriesClient = (
  data: ClientFetchCategories
): Category[] => {
  const { categories, setCategories, loadCategories } =
    useLocalCategoryClientStore();

  useEffect(() => {
    if (Array.isArray(data?.categoriesDataApi)) {
      // Si on a des données de l'API, on les sauvegarde dans le stockage local

      setCategories(data.categoriesDataApi);
    } else if (!data.categoriesDataApi) {
      // Si on n'a pas de données de l'API, on charge depuis le stockage local
      loadCategories();
    }
  }, [data.categoriesDataApi, loadCategories, setCategories]);

  return useMemo(() => {
    if (Array.isArray(data?.categoriesDataApi)) {
      // Si on a des données de l'API , on les utilise
      return data.categoriesDataApi;
    }
    // Sinon on utilise les données du stockage local
    return categories;
  }, [data.categoriesDataApi, categories]);
};
