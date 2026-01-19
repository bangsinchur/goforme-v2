import { checkEmail, checkNickName, signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { UseMutationCallback } from "@/types";

export function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUp,
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

export function useCheckNickName(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: checkNickName,
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

export function useCheckEmail(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: checkEmail,
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