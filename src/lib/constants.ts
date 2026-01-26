export const API = process.env.NEXT_PUBLIC_API_URL

export const QUERY_KEYS = {
makerPlan:{
    all:['makerPlan'],
    list:['makerPlan','list'],
    userList:(userId:string)=>['makerPlan','userList',userId],
    byId:(postId:string)=>['makerPlan','byId',postId],
    },
}