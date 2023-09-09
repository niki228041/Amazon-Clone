import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiOptionsSlice:any = createApi({
    reducerPath:"options",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Options'],
    endpoints:(builder)=>({
        createOptions:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Options/CreateOptions',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Options']
        }),
        getOptions:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Options/GetAllOptions',
              method:"GET",
              body:todo
            }),
            providesTags:result=>['Options']
          }),
        getOptionsByCategoryId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Options/GetOptionsByCategoryId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Options']
        }),
        getAllBaseOptionsAsync:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Options/GetAllBaseOptionsAsync',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Options']
        }),
        getOptionsByCategoryIdToCreateProduct:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Options/GetOptionsByCategoryId',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Options']
        }),
        

    })
})


export const {useGetOptionsQuery,useGetAllBaseOptionsAsyncQuery,useGetOptionsByCategoryIdQuery} = apiOptionsSlice