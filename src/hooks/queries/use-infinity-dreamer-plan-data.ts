import { getDreamerPlanPosts } from "@/api/plan-post";
import { QUERY_KEYS } from "@/lib/constants";
import { DreamerPlan, DreamerPlanRequestParams } from "@/types";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

const PAGE_SIZE = 5;

export default function useInfinityDreamerPlanData({
  status,
  page,
  pageSize,
}: DreamerPlanRequestParams) {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.dreamerPlan.list,
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const currentPage = pageParam as number;
      const planPosts = await getDreamerPlanPosts({
        status,
        page: currentPage,
        pageSize: PAGE_SIZE,
      });
      planPosts.list.forEach((planPost: DreamerPlan) => {
        queryClient.setQueryData(QUERY_KEYS.plan.byId(planPost.id), planPost);
      });
      return planPosts.list.map((planPost: DreamerPlan) => planPost.id);
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
