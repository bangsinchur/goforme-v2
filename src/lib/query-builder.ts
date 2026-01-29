import type { DreamerPlanRequestParams, QuotationParams, RequestParams } from "@/types";

export function buildMakerPlanQueryString({
  isAssigned = false,
  tripType,
  keyword,
  orderBy,
  page,
  pageSize,
  id,
}: RequestParams): string {
  const params = [] as string[];

  if (isAssigned) params.push(`isAssigned=${isAssigned}`);
  if (tripType) params.push(`tripType=${tripType.join(",")}`);
  if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
  if (orderBy) params.push(`orderBy=${orderBy}`);
  if (page) params.push(`page=${page}`);
  if (pageSize) params.push(`pageSize=${pageSize}`);
  if (id) params.push(`id=${id}`);

  return params.length > 0 ? `?${params.join("&")}` : "";
}

export function buildDreamerPlanQueryString({
  status,
  page = 1,
  pageSize = 5,
}: DreamerPlanRequestParams): string {
  const params = [] as string[];

  if (status && status.length > 0) {
    status.forEach((s) => {
      params.push(`status=${s}`);
    });
  }

  params.push(`page=${page}`);
  params.push(`pageSize=${pageSize}`);
  params.push(`orderBy=RECENT`);

  return params.length > 0 ? `?${params.join("&")}` : "";
}

export function buildQuotationQueryString({
  planId,
  page = 1,
  pageSize = 5,
}: QuotationParams): string {
  const params = [] as string[];

  if (planId) params.push(`planId=${planId}`);
  params.push(`page=${page}`);
  params.push(`pageSize=${pageSize}`);
  return params.length > 0 ? `?${params.join("&")}` : "";
}