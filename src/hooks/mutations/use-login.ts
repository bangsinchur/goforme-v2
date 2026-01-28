import { login } from "@/api/auth";
import { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetSession } from "@/store/session";
import { QUERY_KEYS } from "@/lib/constants";

export function useLogin(callbacks?: UseMutationCallback) {
  const setSession = useSetSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.accessToken) {
        setSession({ accessToken: data.accessToken });
      }

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile.all });

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
