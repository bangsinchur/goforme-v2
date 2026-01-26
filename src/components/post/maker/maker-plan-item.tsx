import { Button } from "@/components/ui/button";
import { formatTimeAgo, formatToDetailedDate } from "@/lib/time";
import { PlanItem } from "@/types";
import { convertRegionToKorean } from "@/lib/utils";

export default function MakerPlanItem({id, title, createdAt, tripDate, serviceArea, dreamer}:PlanItem) {
    return (
        <div className="flex flex-col gap-3 border-3 border-line-muted-foreground shadow-md rounded-md p-4">
            <div className="flex flex-col gap-1 border-b border-line-muted-foreground pb-2">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-bold line-clamp-1">{title}</div>
                    <div className="text-xs text-muted-foreground">{formatTimeAgo(createdAt)}</div>
                </div>
                <div className="text-sm text-muted-foreground">{dreamer.nickName}</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                    <div className="bg-muted rounded-md p-1">여행일</div>
                    <div className="text-lg">{formatToDetailedDate(tripDate)}</div>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="bg-muted rounded-md p-1">여행지</div>
                    <div className="text-lg">{convertRegionToKorean(serviceArea)}</div>
                </div>
            </div>
            <Button className="w-full">여행 견적 보내기</Button>
        </div>
    )
}