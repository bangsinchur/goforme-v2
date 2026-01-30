// "use client";

// import { ArrowBigLeftDash } from "lucide-react";
// import PlanInfo from "@/components/quotation/plan-info";
// import EstimateInfo from "@/components/quotation/estimate-info";
// import { Button } from "@/components/ui/button";
// import useInfinityDreamerPlanData from "@/hooks/queries/use-infinity-dreamer-plan-data";
// import { useInfinityQuotationByIdData } from "@/hooks/queries/use-infinity-quotation-by-id-data";
// import { DreamerPlan, QuotationDetail, quoteInfo } from "@/types";
// import Loader from "@/components/ui/loader";
// import Fallback from "@/components/ui/fallback";
// import { useQueryClient } from "@tanstack/react-query";
// import { QUERY_KEYS } from "@/lib/constants";

// export default function ReceivedEstimate() {
//   const {
//     data: quotationData,
//     isPending,
//     error,
//   } = useInfinityQuotationByIdData(planId);

//   if (isPending) {
//     return <div className="text-center p-4">로딩 중...</div>;
//   }

//   if (error) {
//     console.error(`❌ planId: ${planId} quotation 에러`, error);
//     return null;
//   }

//   // 모든 페이지의 quotation 데이터를 평탄화
//   const quotations =
//     quotationData?.pages.flatMap((page: QuotationDetail[]) => page) || [];

//   console.log(`📋 planId: ${planId}, quotations 수:`, quotations.length);

//   // 견적이 없으면 이 플랜을 표시하지 않음
//   if (quotations.length === 0) {
//     return null;
//   }

//   if (!planData) {
//     console.warn(`⚠️ planId: ${planId} plan 데이터 캐시에 없음`);
//     return null;
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       {quotations.map((quotation: QuotationDetail) => {
//         // quoteInfo 형태로 변환
//         const quoteInfo: quoteInfo = {
//           id: quotation.id,
//           price: quotation.price,
//           maker: {
//             id: quotation.maker.nickName,
//             nickName: quotation.maker.nickName,
//             image: quotation.maker.image,
//           },
//         };

//         return (
//           <div
//             key={quotation.id}
//             className="flex flex-col gap-2 border border-foreground shadow-md rounded-md p-2"
//           >
//             <div className="flex w-full justify-between items-center px-4">
//               <PlanInfo planData={planData} />
//               <ArrowBigLeftDash className="h-12 w-12" />
//               <EstimateInfo quoteInfo={quoteInfo} />
//             </div>
//             <div className="flex gap-2 w-full">
//               <Button variant="outline" className="flex-1 cursor-pointer">
//                 승인하기
//               </Button>
//               <Button className="bg-chart-5 flex-1 cursor-pointer">
//                 거절하기
//               </Button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default function ReceivedEstimate() {
//   // 모든 플랜 ID 리스트 가져오기
//   const { data, error, isPending } = useInfinityDreamerPlanData({
//     status: ["PENDING", "CONFIRMED"],
//   });

//   console.log("🎯 [ReceivedEstimate] data:", data);

//   // 모든 페이지의 플랜 ID를 평탄화
//   const planIds = data?.pages.flatMap((page: string[]) => page) || [];

//   console.log("📋 [ReceivedEstimate] planIds:", planIds);

//   if (error) {
//     console.error("❌ [ReceivedEstimate] 에러:", error);
//     return <Fallback error={error} />;
//   }

//   if (isPending) {
//     console.log("⏳ [ReceivedEstimate] 로딩 중");
//     return <Loader />;
//   }

//   if (planIds.length === 0) {
//     return (
//       <div className="flex flex-col gap-3 w-full">
//         <div className="font-bold mb-5 text-lg">📚받은 견적서 목록📚</div>
//         <div className="text-center text-muted-foreground py-10">
//           아직 플랜이 없습니다.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-3 w-full">
//       <div className="font-bold mb-5 text-lg">📚받은 견적서 목록📚</div>
//       {planIds.map((planId: string) => (
//         <PlanWithQuotesItem key={planId} planId={planId} />
//       ))}
//     </div>
//   );
// }
