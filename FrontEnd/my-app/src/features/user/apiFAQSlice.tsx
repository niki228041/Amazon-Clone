import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiFAQSlice:any = createApi({
    reducerPath:"FAQ",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['FAQ'],
    endpoints:(builder)=>({
        getFAQs:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/FAQ/GetAllFAQ',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['FAQ']
        }),
        deleteAnswerFAQ:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/AnswerToFAQ/DeleteAnswerFAQById',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['FAQ']
        }),
        addFAQ:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/FAQ/AddFAQ',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['FAQ']
        }),
        addAnswerToFAQ:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/AnswerToFAQ/AddAnswerFAQ',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['FAQ']
        }),
        deleteFAQById:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/FAQ/DeleteFAQById',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['FAQ']
        }),
        
        
    })
})


export const {useGetFAQsQuery} = apiFAQSlice