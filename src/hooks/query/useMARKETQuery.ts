import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

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

  const useGetNftList = () => {
    return useQuery({
      queryKey: ["nft-list"],
      queryFn: marketRepository.getNftList,
    });
  };

  const useBuyImg = (
    options?: Omit<
      UseMutationOptions<
        void,
        unknown,
        { prompt: string; chain_address: string; address: string },
        unknown
      >,
      "mutationFn"
    >
  ) => {
    return useMutation({
      mutationFn: ({ prompt, chain_address, address }) =>
        marketRepository.buyImg({ prompt, chain_address, address }),
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) options.onSuccess(data, variables, context);
      },
      onError: (error, variables, context) => {
        if (options?.onError) options.onError(error, variables, context);
      },
      onMutate: (variables) => {
        if (options?.onMutate) options.onMutate(variables);
      },
    });
  };

  return {
    useGetImageList,
    useGetNftList,
    useGetAiList,
    useBuyImg,
  };
};
