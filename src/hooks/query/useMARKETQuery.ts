import { useQuery } from "@tanstack/react-query";

import { marketRepository } from "../repositiry/MARKETRepository";

export const useMarketQuery = () => {
  const useGetImageList = () => {
    return useQuery({
      queryKey: ["image-list"],
      queryFn: marketRepository.getImageList,
    });
  };

  const useGetAiList = () => {
    return useQuery({
      queryKey: ["ai-list"],
      queryFn: marketRepository.getAiList,
    });
  };

  return {
    useGetImageList,
    useGetAiList,
  };
};
