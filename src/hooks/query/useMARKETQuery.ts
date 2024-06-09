import {
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { marketRepository } from "../repositiry/MARKETRepository";

export const useMarketQuery = () => {
  const useGetImageList = () => {
    return useQuery({
      queryKey: ["image-list"],
      queryFn: marketRepository.getImageList,
    });
  };

  return {
    useGetImageList,
  };
};
