import { fetchTownsByCityClient } from "@/services/townsCityServiceClient";
import { useQuery } from "@tanstack/react-query";

export const useClientFetchTownsByCity = (city: string) => {
  return useQuery({
    queryKey: ["towns", city],
    queryFn: () => fetchTownsByCityClient(city),
    enabled: city !== "", // Active la requête uniquement lorsque city n'est pas vide
  });
};
