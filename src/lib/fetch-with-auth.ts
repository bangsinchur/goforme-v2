import { getAccessToken } from "./utils";

export default async function fetchWithAuth(url: string, options: RequestInit) {
    const token = getAccessToken();

    const headers = token ?{...options.headers,Authorization:`Bearer ${token}`}:{...options.headers};

    const response = await fetch(url,{...options,headers});
    if(!response.ok){
        throw new Error(response.statusText);
    }
    return response.json();
}