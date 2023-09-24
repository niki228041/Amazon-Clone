







import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiUserSlice:any = createApi({
    reducerPath:"userSlice",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['UserSlice'],
    endpoints:(builder)=>({
        getUserById:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Account/GetUserById',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['UserSlice']
        }),
    })
})


export const {useGetUserByIdQuery} = apiUserSlice

