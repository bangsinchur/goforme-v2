import { UseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSendEstimate } from "@/api/plan-post";
import { QUERY_KEYS } from "@/lib/constants";



export function useEstimate(callbacks?: UseMutationCallback) {
const queryClient = useQueryClient();


    return useMutation({
        mutationFn: fetchSendEstimate,
        onSuccess: () => {
            if (callbacks?.onSuccess) {
                callbacks.onSuccess();
            }

            queryClient.resetQueries({
                queryKey:QUERY_KEYS.makerPlan.list,
            })
        },
        onError: (error) => {
            if (callbacks?.onError) {
                callbacks.onError(error);
            }
        },
    });
}   
