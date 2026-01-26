import { QUERY_KEYS } from "@/lib/constants";
import getPlanPosts from "@/api/plan-post";
import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { RequestParams, PlanResponse } from "@/types";

const PAGE_SIZE = 5;

export default function useInfinityMakerPlanData({isAssigned,tripType,keyword,orderBy,pageSize,id}:RequestParams={}) {
    return useInfiniteQuery<PlanResponse>({
        queryKey: QUERY_KEYS.makerPlan.list,
        initialPageParam: 1,
        queryFn: async ({ pageParam = 1 }) => {
            const currentPage = pageParam as number;
            const planPosts = await getPlanPosts({
                isAssigned,
                tripType,
                keyword,
                orderBy,
                page: currentPage,
                pageSize: PAGE_SIZE,
                id
            });
            return planPosts;
        },
        
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.list.length < PAGE_SIZE) {
                return undefined;
            }
            return allPages.length + 1;
        },
       placeholderData: keepPreviousData,
    });
}