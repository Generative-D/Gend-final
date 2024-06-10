import { useQuery } from "@tanstack/react-query";

import { myRepository } from "../repositiry/MYRepository";

export const useMyQuery = () => {
  const useGetImgByAddress = (address: string) => {
    return useQuery({
      queryKey: ["my-nft-list"],
      queryFn: () => myRepository.getImgByAddress(address),
    });
  };

  return {
    useGetImgByAddress,
  };
};
