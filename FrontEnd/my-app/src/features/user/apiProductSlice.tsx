import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const apiProductSlice:any = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5034"}),
    tagTypes:['Category'],
    endpoints:(builder)=>({
        getProducts:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Categories/GetAll',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Category']
        })
    })
})


export const{useGetProductsQuery} = apiProductSlice

