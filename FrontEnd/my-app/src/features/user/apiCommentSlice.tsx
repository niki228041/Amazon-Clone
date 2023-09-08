import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiCommentSlice:any = createApi({
    reducerPath:"comment",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['comment'],
    endpoints:(builder)=>({
        
        
        
    })
})


export const {} = apiCommentSlice