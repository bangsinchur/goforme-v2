import { API } from "@/lib/constants";
import fetchWithAuth from "@/lib/fetch-with-auth";
import { MakerProfileResponse, User, UserProfile } from "@/types";

export const getUserInfo = async (): Promise<User> => {
  try {
    const data = await fetchWithAuth(`${API}/users/me`, {
      credentials: "include",
    });
    return data;
  } catch (error: any) {
    console.error("사용자 정보를 불러오는데 실패했습니다:", error);
    throw error;
  }
};

export const getUserProfile = async (
  makerId?: string
): Promise<UserProfile | MakerProfileResponse> => {
  try {
    const endpoint = makerId ? `/users/maker/${makerId}` : `/profile`;
    const data = await fetchWithAuth(`${API}${endpoint}`, {
      credentials: "include",
    });
    return data;
  } catch (error: any) {
    console.error("사용자 프로필을 불러오는데 실패했습니다:", error);
    throw error;
  }
};
