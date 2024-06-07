import {
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { genRepository } from "../repositiry/GENRepository";

export const useGenQuery = () => {
  const useCreateImageByPrompt = (
    options?: Omit<
      UseMutationOptions<void, unknown, string, unknown>,
      "mutationFn"
    >
  ) =>
    useMutation<void, unknown, string, unknown>({
      mutationFn: (prompt) => genRepository.generateImageByPrompt(prompt),
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) options.onSuccess(data, variables, context);
      },
      onError: (error, variables, context) => {
        if (options?.onError) options.onError(error, variables, context);
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

  const useGetImageByPrompt = (params: string) => {
    useQuery({
      queryKey: ["image", params],
      queryFn: () => genRepository.getImagebyPrompt(params),
    });
  };

  return {
    useCreateImageByPrompt,
    useCreateImageWithoutPrompt,
    useGetImageByPrompt,
  };
};
