

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiOrderSlice:any = createApi({
    reducerPath:"Order",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Order'],
    endpoints:(builder)=>({
        addOrder:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Order/AddOrder',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Order']
        }),
        getAllOrders:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Order/GetAllOrders',
              method:"GET",
              body:todo
            }),
            providesTags:result=>['Order']
        }),
        getOrdersByUserId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Order/GetOrdersByUserId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Order']
        }),
        getOrdersByCompanyIdWithPagination:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Order/GetOrdersByCompanyIdWithPagination',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Order']
        }),
        closeAnOrderById:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Order/CloseAnOrderById',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Order']
        })
        
    })
})


export const {useGetOrdersByUserIdQuery,useGetOrdersByCompanyIdWithPaginationQuery} = apiOrderSlice