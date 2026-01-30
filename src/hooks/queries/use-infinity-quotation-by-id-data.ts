import { getQuotationsByPlanId } from "@/api/plan-post";
import { QUERY_KEYS } from "@/lib/constants";
import { QuotationDetail } from "@/types";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinityQuotationByIdData(planId: string) {
  return useInfiniteQuery({
    // 각 planId별로 quotation 데이터 캐시 저장
    queryKey: QUERY_KEYS.quotation.byId(planId),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const currentPage = pageParam as number;
      const quotations = await getQuotationsByPlanId({
        planId,
        page: currentPage,
        pageSize: PAGE_SIZE,
      });
     
      return quotations.list;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
    placeholderData: keepPreviousData,
  });
}
