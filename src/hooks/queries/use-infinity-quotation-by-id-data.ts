import { getQuotationsByPlanId } from "@/api/plan-post";
import { QUERY_KEYS } from "@/lib/constants";
import { QuotationDetail } from "@/types";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useInfinityQuotationByIdData(planId: string) {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.quotation.byId(planId),
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const currentPage = pageParam as number;
      const quotations = await getQuotationsByPlanId({
        planId,
        page: currentPage,
        pageSize: 5,
      });

      // 각 견적을 캐시에 정규화해서 저장 (재사용 가능)
      quotations.list.forEach((quotation: QuotationDetail) => {
        queryClient.setQueryData(
          QUERY_KEYS.quotation.detail(quotation.id),
          quotation
        );
      });

      // ID만 반환 (데이터 정규화 패턴)
      return quotations.list.map((quotation: QuotationDetail) => quotation.id);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) {
        return undefined;
      }
      return allPages.length + 1;
    },
    placeholderData: keepPreviousData,
  });
}
