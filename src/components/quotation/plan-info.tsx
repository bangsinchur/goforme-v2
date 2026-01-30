"use client";

import { Button } from "../ui/button";
import { usePlanPostByIdData } from "@/hooks/queries/use-plan-post-by-id-data";
import { formatToDetailedDate } from "@/lib/time";
import { convertRegionToKorean } from "@/lib/utils";
import Loader from "../ui/loader";
import Fallback from "../ui/fallback";

interface PlanInfoProps {
  planId: string;
}

export default function PlanInfo({planId}: {planId: string}) {
  const { data: planData,error, isPending } = usePlanPostByIdData(planId);

  if (isPending) return <Loader />;
  if (error) return <Fallback error={error} />;

  return (
    <div className="flex justify-center bg-border rounded-md p-4 flex-col gap-2">
      <div className="text-lg font-bold line-clamp-1">{planData?.title}</div>
      <div className="flex gap-4">
        <div className="text-muted-foreground">플랜 요청일</div>
        <div>{formatToDetailedDate(planData?.createdAt)}</div>
      </div>
      <div className="flex gap-4">
        <div className="text-muted-foreground">플랜 여행일</div>
        <div>{formatToDetailedDate(planData?.tripDate)}</div>
      </div>
      <div className="flex gap-4">
        <div className="text-muted-foreground">플랜 여행지</div>
        <div>{convertRegionToKorean(planData?.serviceArea)}</div>
      </div>
      <div className="flex gap-4">
        <div className="text-muted-foreground">플랜 주내용</div>
        <div className="line-clamp-2">{planData?.details}</div>
      </div>
    </div>
  );
}
