import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiCardSlice:any = createApi({
    reducerPath:"Card",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Card'],
    endpoints:(builder)=>({
        addCard:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Card/AddCard',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Card']
        }),
        getCard:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Card/GetAllCards',
              method:"GET",
              body:todo
            }),
            providesTags:result=>['Card']
        }),
        getCardsByUserId:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Card/GetCardByUserId',
              method:"POST",
              body:todo
            }),
            providesTags:result=>['Card']
          }),
        setDefaultCard:builder.mutation<any,any>({
            query:(todo)=>({
              url:'/api/Card/SetDefaultCard',
              method:"POST",
              body:todo
            }),
            invalidatesTags:['Card']
          }),
        getDefaultCardByUserId:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Card/FindDefaultCardByUserId',
              method:"POST",
              body:todo
            }),
            providesTags:result=>['Card']
          })
    })
})


export const {useGetCardsByUserIdQuery,useGetDefaultCardByUserIdQuery} = apiCardSlice