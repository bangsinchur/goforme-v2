"use client";

import Loader from "../ui/loader";
import Fallback from "../ui/fallback";
import { useInfinityQuotationByIdData } from "@/hooks/queries/use-infinity-quotation-by-id-data";
import EstimateInfoItem from "./estimate-info-item";

export default function EstimateInfo({ planId }: { planId: string }) {
  const {
    data: quoteData,
    error,
    isPending,
  } = useInfinityQuotationByIdData(planId);

  if (isPending) return <Loader />;
  if (error) return <Fallback error={error} />;

  const quoteDataList = quoteData.pages.flatMap((page) => page);

  if (!quoteDataList.length)
    return (
      <div className="text-center text-sm text-foreground">
        견적 내역이 없습니다.
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {quoteDataList.map((quote) => (
        <EstimateInfoItem key={quote.id} {...quote} />
      ))}
    </div>
  );
}
