import { API } from "@/lib/constants";
import fetchWithAuth from "@/lib/fetch-with-auth";
import {
  DreamerPlanRequestParams,
  DreamerPlanResponse,
  EstimateVariables,
  MakerPlanResponse,
  QuotationParams,
  QuotationResponse,
  RequestParams,
} from "@/types";
import {
  buildDreamerPlanQueryString,
  buildMakerPlanQueryString,
  buildQuotationQueryString,
} from "@/lib/query-builder";

export async function getMakerPlanPosts({
  isAssigned,
  tripType,
  keyword,
  orderBy,
  page,
  pageSize,
  id,
}: RequestParams): Promise<MakerPlanResponse> {
  try {
    const queryString = buildMakerPlanQueryString({
      isAssigned,
      tripType,
      keyword,
      orderBy,
      page,
      pageSize,
      id,
    });

    return await fetchWithAuth(`${API}/plans/maker${queryString}`, {
      credentials: "include",
    });
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error("해당 Maker의 아이디가 잘못되었습니다.");
    }
    console.error(error);
    throw error;
  }
}

export async function fetchPlanPostById(id: string) {
  try {
    return await fetchWithAuth(`${API}/plans/${id}`, {
      credentials: "include",
    });
  } catch (error) {
    console.error("여행 정보를 불러오는데 실패했습니다:", error);
    throw error;
  }
}

export async function fetchSendEstimate({
  planId,
  quoteData,
}: EstimateVariables) {
  try {
    return await fetchWithAuth(`${API}/plans/${planId}/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quoteData),
      credentials: "include",
    });
  } catch (error: any) {
    if (error.response?.status === 409) {
      throw new Error("이미 견적이 존재합니다.");
    } else if (
      error.response?.status === 404 ||
      error.response?.status === 403
    ) {
      throw new Error("잘못된 접근 입니다.");
    }

    console.error(error);
    throw error;
  }
}

export async function getDreamerPlanPosts({
  status,
  page = 1,
  pageSize = 5,
}: DreamerPlanRequestParams): Promise<DreamerPlanResponse> {
  try {
    const queryString = buildDreamerPlanQueryString({ status, page, pageSize });
    return await fetchWithAuth(`${API}/plans/dreamer${queryString}`, {
      credentials: "include",
    });
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}

export async function getQuotationsByPlanId({planId, page = 1, pageSize = 5}: QuotationParams): Promise<QuotationResponse> {
  try {
    const queryString = buildQuotationQueryString({planId, page, pageSize});
    return await fetchWithAuth(`${API}/plans/${planId}/quotes${queryString}`, {
      credentials: "include",
    });
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}