import { checkEmail, checkNickName } from "@/api/auth";
import { signUpAction } from "@/app/actions/auth-actions"
import { useMutation } from "@tanstack/react-query";
import { UseMutationCallback } from "@/types";

export function useSignUp(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signUpAction,
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