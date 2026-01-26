import { getAccessToken, setAccessToken } from "./utils";
import { refreshToken } from "@/api/auth";

export default async function fetchWithAuth(url: string, options: RequestInit, retryCount = 0): Promise<any> {
    const token = getAccessToken();

    const headers = token 
        ? {...options.headers, Authorization: `Bearer ${token}`}
        : {...options.headers};

    const response = await fetch(url, {...options, headers});
    
    // 401 Unauthorized 오류 발생 시 토큰 리프레시 후 재시도
    if (response.status === 401 && retryCount === 0) {
        try {
            // 리프레시 토큰으로 새 액세스 토큰 발급
            const refreshResult = await refreshToken();
            
            if (refreshResult?.accessToken) {
                // 새 토큰으로 헤더 업데이트하여 재요청
                const newHeaders = {
                    ...options.headers,
                    Authorization: `Bearer ${refreshResult.accessToken}`
                };
                
                const retryResponse = await fetch(url, {...options, headers: newHeaders});
                
                if (!retryResponse.ok) {
                    throw new Error(retryResponse.statusText);
                }
                
                return retryResponse.json();
            }
        } catch (refreshError) {
            // 리프레시 실패 시 원래 오류를 던짐
            throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
        }
    }
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    
    return response.json();
}