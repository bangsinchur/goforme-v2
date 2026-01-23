import { API } from '@/lib/constants'
import { getAccessToken } from '@/lib/utils'
import { RequestParams } from '@/types'

function buildQueryString({isAssigned,tripType,keyword,orderBy,page,pageSize,id}:RequestParams) {
    const params = [] as string[];
    if(isAssigned) params.push(`isAssigned=${isAssigned}`);
    if(tripType) params.push(`tripType=${tripType.join(',')}`);
    if(keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
    if(orderBy) params.push(`orderBy=${orderBy}`);
    if(page) params.push(`page=${page}`);
    if(pageSize) params.push(`pageSize=${pageSize}`);
    if(id) params.push(`id=${id}`);

    return params.length > 0 ? `?${params.join('&')}` : '';
}


export default async function getPlanPosts({isAssigned,tripType,keyword,orderBy,page,pageSize,id}:RequestParams) {
    try{
        const queryString = buildQueryString({isAssigned,tripType,keyword,orderBy,page,pageSize,id});
        
        const accessToken = getAccessToken()
        const headers = new Headers()
        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`)
        }

        const res = await fetch(`${API}/plans/maker${queryString}`, {
            headers,
            credentials: 'include',
        });
        if(!res.ok){
            throw new Error(res.statusText);
        }
        return res.json();
    }catch(error){
        
    }
}