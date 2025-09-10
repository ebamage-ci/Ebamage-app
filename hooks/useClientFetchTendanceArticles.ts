import { fetchTendancesArticlesClient } from "@/services/articlesTendanceServiceClient";
import { useQuery } from "@tanstack/react-query";
const useClientFetchTendancesArticles = () => {
  return useQuery({
    queryKey: ["tendancesArticles", "client"],
    queryFn: fetchTendancesArticlesClient,
  });
};

export default useClientFetchTendancesArticles;
