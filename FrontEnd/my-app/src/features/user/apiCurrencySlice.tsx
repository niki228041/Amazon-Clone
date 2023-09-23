




import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";


export const apiCurrencySlice:any = createApi({
    reducerPath:"Currency",
    baseQuery:fetchBaseQuery({baseUrl:""}),
    tagTypes:['Currency'],
    endpoints:(builder)=>({
        getCurrency:builder.query<any,any>({
          query:(todo)=>({
            url:'http://data.fixer.io/api/latest?access_key=dfd68d16b142e2335e66b3f32b51bdb7&base=USD&symbols=GBP,JPY,EUR',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Currency']
        }),
    })
})

export const {useGetCurrencyQuery} = apiCurrencySlice