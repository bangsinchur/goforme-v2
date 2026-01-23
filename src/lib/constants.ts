export const API = process.env.NEXT_PUBLIC_API_URL

export const QUERY_KEYS = {
plan:{
    all:['plan'],
    list:['plan','list'],
    userList:(userId:string)=>['plan','userList',userId],
    byId:(postId:string)=>['plan','byId',postId],
    },
}