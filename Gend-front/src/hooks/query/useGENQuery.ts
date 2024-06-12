import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { genRepository } from "../repository/GENRepository";

export const useGenQuery = () => {
  const useCreateImageByPrompt = (
    options?: Omit<
      UseMutationOptions<
        void,
        unknown,
        { prompt: string; address: string },
        unknown
      >,
      "mutationFn"
    >
  ) =>
    useMutation<void, unknown, { prompt: string; address: string }, unknown>({
      mutationFn: ({ prompt, address }) =>
        genRepository.generateImageByPrompt({ prompt, address }),
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

  const useCreateImageWithoutPrompt = (
    options?: Omit<
      UseMutationOptions<void, unknown, string, unknown>,
      "mutationFn"
    >
  ) =>
    useMutation<void, unknown, string, unknown>({
      mutationFn: (address) =>
        genRepository.generateImageWithoutPrompt(address),
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

  const useApplyStats = (
    options?: Omit<
      UseMutationOptions<
        void,
        unknown,
        { address: string; chain_address: string },
        unknown
      >,
      "mutationFn"
    >
  ) =>
    useMutation<
      void,
      unknown,
      { address: string; chain_address: string },
      unknown
    >({
      mutationFn: ({ address, chain_address }) =>
        genRepository.applyStats({ address, chain_address }),
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

  const useGetUserAi = (params: string) => {
    return useQuery({
      queryKey: ["userAi", params],
      queryFn: () => genRepository.getUserAi(params),
    });
  };

  const useMessage = ({
    address,
    prompt,
  }: {
    address: string;
    prompt: string;
  }) => {
    return useQuery({
      queryKey: ["message", address, prompt],
      queryFn: () => genRepository.getMessage({ address, prompt }),
    });
  };

  const useMessageByClick = ({ address }: { address: string }) => {
    return useQuery({
      queryKey: ["messageByClick", address],
      queryFn: () => genRepository.getMessageByClick({ address }),
    });
  };

  const useMine = (
    options?: Omit<
      UseMutationOptions<
        void,
        unknown,
        { address: string; prompt: string; chain_address: string },
        unknown
      >,
      "mutationFn"
    >
  ) =>
    useMutation<
      void,
      unknown,
      { address: string; prompt: string; chain_address: string },
      unknown
    >({
      mutationFn: ({ address, prompt, chain_address }) =>
        genRepository.mine({ address, prompt, chain_address }),
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

  return {
    useCreateImageByPrompt,
    useCreateImageWithoutPrompt,
    useApplyStats,
    useGetUserAi,
    useMine,
    useMessage,
    useMessageByClick,
  };
};
