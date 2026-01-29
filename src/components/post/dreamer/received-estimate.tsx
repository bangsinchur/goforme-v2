"use client";

import { ArrowBigLeftDash } from "lucide-react";
import PlanInfo from "@/components/quotation/plan-info";
import EstimateInfo from "@/components/quotation/estimate-info";
import { Button } from "@/components/ui/button";
import useInfinityDreamerPlanData from "@/hooks/queries/use-infinity-dreamer-plan-data";
import { useInfinityQuotationByIdData } from "@/hooks/queries/use-infinity-quotation-by-id-data";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { QuotationDetail, quoteInfo } from "@/types";
import Loader from "@/components/ui/loader";
import Fallback from "@/components/ui/fallback";

// 개별 견적 아이템 컴포넌트
function PlanWithQuotesItem({ planId }: { planId: string }) {
  const queryClient = useQueryClient();

  console.log(`🔎 [아이템] planId:`, planId);

  // 해당 플랜의 견적 목록 조회
  const {
    data: quotationData,
    isPending,
    error,
  } = useInfinityQuotationByIdData(planId);

  console.log(`🔎 [아이템 ${planId}] quotation 쿼리 결과:`, {
    quotationData,
    isPending,
    error,
  });

  if (isPending) {
    console.log(`⏳ [아이템 ${planId}] 로딩 중`);
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (error) {
    console.error(`❌ [아이템 ${planId}] 에러:`, error);
    return null; // 에러나면 표시 안 함
  }

  // 모든 페이지의 quotation ID를 평탄화
  const quotationIds =
    quotationData?.pages.flatMap((page: string[]) => page) || [];

  console.log(`📋 [아이템 ${planId}] quotation IDs:`, quotationIds);

  // 견적이 없으면 이 플랜을 표시하지 않음
  if (quotationIds.length === 0) {
    console.log(`⚠️ [아이템 ${planId}] 견적 없음, 표시 안 함`);
    return null;
  }

  console.log(
    `✅ [아이템 ${planId}] 견적 ${quotationIds.length}개 있음, 렌더링`
  );

  return (
    <div className="flex flex-col gap-3">
      {quotationIds.map((quotationId: string) => {
        // 캐시에서 견적 상세 정보 가져오기
        const quotation = queryClient.getQueryData<QuotationDetail>(
          QUERY_KEYS.quotation.detail(quotationId)
        );

        if (!quotation) {
          console.warn(`⚠️ [아이템] quotation ${quotationId} 캐시에 없음`);
          return null;
        }

        // quoteInfo 형태로 변환
        const quoteInfo: quoteInfo = {
          id: quotation.id,
          price: quotation.price,
          maker: {
            id: quotation.maker.nickName, // maker ID가 없으면 nickName 사용
            nickName: quotation.maker.nickName,
            image: quotation.maker.image,
          },
        };

        return (
          <div
            key={quotationId}
            className="flex flex-col gap-2 border border-foreground shadow-md rounded-md p-2"
          >
            <div className="flex w-full justify-between items-center px-4">
              <PlanInfo planId={planId} />
              <ArrowBigLeftDash className="h-12 w-12" />
              <EstimateInfo quoteInfo={quoteInfo} />
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1 cursor-pointer">
                승인하기
              </Button>
              <Button className="bg-chart-5 flex-1 cursor-pointer">
                거절하기
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ReceivedEstimate() {
  // 모든 플랜 ID 리스트 가져오기 (quotes 필터링 안 함)
  const { data, error, isPending } = useInfinityDreamerPlanData({
    status: ["PENDING", "CONFIRMED"],
  });

  console.log("📱 [컴포넌트] 쿼리 상태:", { data, error, isPending });

  // 모든 페이지의 플랜 ID를 평탄화
  const planIds = data?.pages.flatMap((page: string[]) => page) || [];

  console.log("📱 [컴포넌트] planIds:", planIds);
  console.log("📱 [컴포넌트] planIds 길이:", planIds.length);

  if (error) {
    console.error("❌ [컴포넌트] 에러 발생:", error);
    return <Fallback error={error} />;
  }

  if (isPending) {
    console.log("⏳ [컴포넌트] 로딩 중...");
    return <Loader />;
  }

  if (planIds.length === 0) {
    console.warn("⚠️ [컴포넌트] planIds가 비어있음!");
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="font-bold mb-5 text-lg">📚받은 견적서 목록📚</div>
        <div className="text-center text-muted-foreground py-10">
          아직 받은 견적이 없습니다.
        </div>
      </div>
    );
  }

  console.log("✅ [컴포넌트] 렌더링 시작");

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="font-bold mb-5 text-lg">📚받은 견적서 목록📚</div>
      {planIds.map((planId: string) => (
        <PlanWithQuotesItem key={planId} planId={planId} />
      ))}
    </div>
  );
}
