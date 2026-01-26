import { API } from '@/lib/constants'
import fetchWithAuth from '@/lib/fetch-with-auth'
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
        
        return await fetchWithAuth(`${API}/plans/maker${queryString}`, {
            credentials: 'include',
        });

        
    }catch(error:any){
     if(error.response?.status ===  403){
        throw new Error('해당 Maker의 아이디가 잘못되었습니다.');
     }
     console.error(error)
     throw error;
    }
}