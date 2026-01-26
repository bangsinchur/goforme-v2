'use client'

import MakerPlanItem from "@/components/post/maker/maker-plan-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useInfinityMakerPlanData from "@/hooks/queries/use-infinity-maker-plan-data";
import Fallback from "@/components/ui/fallback";
import Loader from "@/components/ui/loader";
import { PlanResponse } from "@/types";


export default function MakerPlanPage() {
    const { data, error, isPending, fetchNextPage } = useInfinityMakerPlanData();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) fetchNextPage();

    }, [inView])

    if (error) return <Fallback error={error} />;
    if (isPending) return <Loader />;


    const allPlanItems = data.pages.flatMap((page: PlanResponse) => page.list);

    return (
        <div className="flex flex-col gap-5">
            <div className="text-background text-lg font-bold mt-5 bg-foreground rounded-md p-1 w-fit">모든 여행 목록</div>
            <div>
                {allPlanItems.map((planPost) => <MakerPlanItem key={planPost.id} {...planPost} />)}
            </div>
            <div ref={ref}>
            </div>
        </div>
    );
}