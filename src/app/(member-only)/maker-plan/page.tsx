import Link from "next/link";
import MakerPlanItem from "@/components/post/maker/maker-plan-item";

export default function MakerPlanPage() {

    
    return (
        <div className="flex flex-col gap-5">
            <div className="text-background text-lg font-bold mt-5 bg-foreground rounded-md p-1 w-fit">모든 여행 목록</div>
            <div>
               <MakerPlanItem planItem={data} />
            </div>
        </div>
    );
}