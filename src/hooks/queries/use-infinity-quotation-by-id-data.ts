import { getQuotationsByPlanId } from "@/api/plan-post";
import { QUERY_KEYS } from "@/lib/constants";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinityQuotationByIdData(planId: string) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.quotation.list,
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
