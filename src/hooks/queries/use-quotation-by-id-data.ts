import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { QuotationDetail } from "@/types";

export function useQuotationByIdData(quotationId: string) {
  return useQuery<QuotationDetail>({
    queryKey: QUERY_KEYS.quotation.detail(quotationId),
    queryFn: async () => {
      // 캐시에만 의존 (infinity query에서 이미 저장됨)
      // 실제로 fetch가 필요하면 API 호출 추가
      throw new Error("Quotation should be in cache");
    },
    enabled: !!quotationId,
  });
}
