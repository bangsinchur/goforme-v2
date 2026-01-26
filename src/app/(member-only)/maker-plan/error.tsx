'use client'
import { TriangleAlert } from "lucide-react";

export default function MakerPlanError({ error }: { error: Error }) {
    return <div className="flex flex-col text-muted-foreground items-conter justify-center gap-2">
        <TriangleAlert className="h-6 w-6" />
        <div>오류가 발생했습니다. 잠시후 다시 시도해주세요</div>
        Error: {error.message}</div>;
}