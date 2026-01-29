import { getDreamerPlanPosts } from "@/api/plan-post";
import { QUERY_KEYS } from "@/lib/constants";
import { DreamerPlan, DreamerPlanRequestParams } from "@/types";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

const PAGE_SIZE = 5;

export default function useInfinityDreamerPlanWithQuotesData({
  status,
  page,
  pageSize,
}: DreamerPlanRequestParams) {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.quotation.list,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const currentPage = pageParam as number;
      const planPosts = await getDreamerPlanPosts({
        status,
        page: currentPage,
        pageSize: PAGE_SIZE,
      });

      console.log("🔍 [1] API 응답 전체:", planPosts);
      console.log("🔍 [2] 플랜 리스트:", planPosts.list);
      console.log("🔍 [3] 플랜 개수:", planPosts.list.length);

      // quotes가 있는 플랜만 필터링
      const plansWithQuotes = planPosts.list.filter((planPost: DreamerPlan) => {
        const hasQuotes = planPost.quotes && planPost.quotes.length > 0;
        console.log(`🔍 [4] 플랜 ${planPost.id}:`, {
          title: planPost.title,
          quotes: planPost.quotes,
          quotesLength: planPost.quotes?.length,
          hasQuotes: hasQuotes,
        });
        return hasQuotes;
      });

      console.log("✅ [5] 필터링 후 플랜 개수:", plansWithQuotes.length);
      console.log("✅ [6] 필터링된 플랜들:", plansWithQuotes);

      // 각 플랜을 캐시에 정규화해서 저장 (재사용 가능)
      plansWithQuotes.forEach((planPost: DreamerPlan) => {
        const cacheKey = QUERY_KEYS.plan.byId(planPost.id);
        queryClient.setQueryData(cacheKey, planPost);
        console.log(`💾 [7] 캐시 저장:`, {
          key: cacheKey,
          planId: planPost.id,
          title: planPost.title,
        });

        // 캐시 저장 확인
        const cached = queryClient.getQueryData(cacheKey);
        console.log(`✅ [8] 캐시 확인:`, cached ? "저장됨" : "실패");
      });

      // ID만 반환 (데이터 정규화 패턴)
      const ids = plansWithQuotes.map((planPost: DreamerPlan) => planPost.id);
      console.log("🎯 [9] 최종 반환 ID 리스트:", ids);

      return ids;
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
