import { fetchCategoriesClient } from "@/services/categoriesServicesClient";
import { useQuery } from "@tanstack/react-query";
const useClientFetchCategories = () => {
  return useQuery({
    queryKey: ["categories", "client"],
    queryFn: fetchCategoriesClient,
  });
};

export default useClientFetchCategories;
