
import EstimateInfo from "@/components/quotation/estimate-info";
import PlanInfo from "@/components/quotation/plan-info";
import { Button } from "@/components/ui/button";
import Fallback from "@/components/ui/fallback";
import Loader from "@/components/ui/loader";
import { useInfinityQuotationByIdData } from "@/hooks/queries/use-infinity-quotation-by-id-data";
import { usePlanPostByIdData } from "@/hooks/queries/use-plan-post-by-id-data";
import Link from "next/link";

export default async function EstimatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-bold my-5 text-xl">플렌 상세 내용</div>
        <Link href="/dreamer-plan">
          <Button variant="outline">뒤로 가기</Button>
        </Link>
      </div>

      <PlanInfo planId={id} />
      <div className="flex flex-col mt-5">
        <div className="font-bold my-5 text-xl">플랜 견적 내역</div>

        <EstimateInfo planId={id} />
      </div>
    </div>
  );
}
