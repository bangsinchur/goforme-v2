"use client";

import Fallback from "@/components/ui/fallback";
import Loader from "@/components/ui/loader";
import useInfinityDreamerPlanData from "@/hooks/queries/use-infinity-dreamer-plan-data";
import PlanPostItem from "../maker/plan-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function DreamerPlanPost() {
  const {
    data: planPosts,
    error,
    isPending,
    fetchNextPage,
  } = useInfinityDreamerPlanData({
    status: ["PENDING", "CONFIRMED"],
  });
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (error) return <Fallback error={error} />;
  if (isPending) return <Loader />;

  const allPlanItems = planPosts.pages.flatMap((page: string[]) => page);
  return (
    <div>
      <div className="font-bold m-5 text-lg">✈️내가 요청한 여행 목록📅</div>
      <div className="flex flex-col gap-3">
        {allPlanItems.map((id: string) => (
          <PlanPostItem key={id} id={id} />
        ))}
      </div>
      <div ref={ref}></div>
    </div>
  );
}
