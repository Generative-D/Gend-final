import {
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { myRepository } from "../repositiry/MYRepository";

export const useMyQuery = () => {
  const useGetImgByAddress = (address: string) => {
    return useQuery({
      queryKey: ["image-list"],
      queryFn: () => myRepository.getImgByAddress(address),
    });
  };

  return {
    useGetImgByAddress,
  };
};
