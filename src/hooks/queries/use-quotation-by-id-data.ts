import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { QuotationResponse } from "@/types";
import { getQuotationsByPlanId } from "@/api/plan-post";

export function useQuotationByIdData(planId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.quotation.byId(planId),
    queryFn: () => getQuotationsByPlanId({ planId, page: 1, pageSize: 5 }),
    enabled: !!planId,
  });
}
