import { API } from "@/lib/constants";
import fetchWithAuth from "@/lib/fetch-with-auth";
import { EstimateVariables, RequestParams } from "@/types";

function buildQueryString({
  isAssigned = false,
  tripType,
  keyword,
  orderBy,
  page,
  pageSize,
  id,
}: RequestParams) {
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

export default async function getPlanPosts({
  isAssigned,
  tripType,
  keyword,
  orderBy,
  page,
  pageSize,
  id,
}: RequestParams) {
  try {
    const queryString = buildQueryString({
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
    const response = await fetchWithAuth(`${API}/plans/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("여행 정보를 불러오는데 실패했습니다.");
    }
    return response.json();
  } catch (error) {
    console.error(error);
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
