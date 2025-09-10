import { useQuery } from "@tanstack/react-query";

const useClientFetchArticles = () => {
  return useQuery({ queryKey: ["todos"], queryFn: () => {} });
};

export default useClientFetchArticles;
