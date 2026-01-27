import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { PlanItem } from "@/types";
import { fetchPlanPostById } from "@/api/plan-post";

export function usePlanPostByIdData(id:string) {
    
    return useQuery<PlanItem>({
        queryKey: QUERY_KEYS.makerPlan.byId(id),
        queryFn: () => fetchPlanPostById(id),
        enabled: false,
    });
}