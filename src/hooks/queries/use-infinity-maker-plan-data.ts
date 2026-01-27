import { QUERY_KEYS } from "@/lib/constants";
import getPlanPosts from "@/api/plan-post";
import { keepPreviousData, useInfiniteQuery,useQueryClient } from "@tanstack/react-query";
import { RequestParams, PlanResponse, PlanItem } from "@/types";

const PAGE_SIZE = 5;

export default function useInfinityMakerPlanData({isAssigned,tripType,keyword,orderBy,pageSize,id}:RequestParams={}) {
    const queryClient = useQueryClient();
    
    return useInfiniteQuery<string[]>({
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
       
            planPosts.list.forEach((planPost:PlanItem)=>{
                queryClient.setQueryData(QUERY_KEYS.makerPlan.byId(planPost.id), planPost);
            })

            return planPosts.list.map((planPost:PlanItem)=>planPost.id);
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