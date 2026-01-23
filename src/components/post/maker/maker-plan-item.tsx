import { Button } from "@/components/ui/button";
import { formatTimeAgo } from "@/lib/time";
import { PlanItem } from "@/types";

export default function MakerPlanItem(planItem:PlanItem) {
    return (
        <div className="flex flex-col gap-3 border-3 border-line-muted-foreground shadow-md rounded-md p-4">
            <div className="flex flex-col gap-1 border-b border-line-muted-foreground pb-2">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-bold line-clamp-1">{planItem.title}</div>
                    <div className="text-xs text-muted-foreground">{formatTimeAgo(planItem.createdAt)}</div>
                </div>
                <div className="text-sm text-muted-foreground">{planItem.dreamer.nickName}</div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                    <div className="bg-muted rounded-md p-1">여행일</div>
                    <div className="text-lg">{planItem.tripDate}</div>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="bg-muted rounded-md p-1">여행지</div>
                    <div className="text-lg">{planItem.serviceArea}</div>
                </div>
            </div>
            <Button className="w-full">여행 견적 보내기</Button>
        </div>
    )
}