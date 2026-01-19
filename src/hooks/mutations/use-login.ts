import { login } from "@/api/auth";
import { UseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useLogin(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}