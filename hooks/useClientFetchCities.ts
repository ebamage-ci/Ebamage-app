import { fetchCitiesClient } from "@/services/citiesServiceClient";
import { useQuery } from "@tanstack/react-query";

export const useClientFetchCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCitiesClient,
  });
};
