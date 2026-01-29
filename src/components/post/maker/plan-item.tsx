import { formatTimeAgo, formatToDetailedDate } from "@/lib/time";
import { convertRegionToKorean } from "@/lib/utils";
import Estimate from "../estimate";
import { usePlanPostByIdData } from "@/hooks/queries/use-plan-post-by-id-data";
import Fallback from "@/components/ui/fallback";
import Loader from "@/components/ui/loader";

export default function PlanPostItem({ id }: { id: string }) {
  const { data: planPost, error, isPending } = usePlanPostByIdData(id);

  if (error) return <Fallback error={error} />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-3 border-3 border-line-muted-foreground shadow-md rounded-md p-4">
      <div className="flex flex-col gap-1 border-b border-line-muted-foreground pb-2">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold line-clamp-1">{planPost.title}</div>
          <div className="text-xs text-muted-foreground">
            {formatTimeAgo(planPost.createdAt)}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {planPost.dreamer.nickName}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="bg-muted rounded-md p-1">여행일</div>
          <div className="text-lg">
            {formatToDetailedDate(planPost.tripDate)}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="bg-muted rounded-md p-1">여행지</div>
          <div className="text-lg">
            {convertRegionToKorean(planPost.serviceArea)}
          </div>
        </div>
      </div>
      <Estimate planId={id} />
    </div>
  );
}
