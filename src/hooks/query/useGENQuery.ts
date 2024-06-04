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
      mutationFn: (prompt) => genRepository.gerateImageByPrompt(prompt),
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.onSuccess) options.onSuccess(data, variables, context);
      },
      onError: (error, variables, context) => {
        if (options?.onError) options.onError(error, variables, context);
      },
    });

  return { useCreateImageByPrompt };
};
