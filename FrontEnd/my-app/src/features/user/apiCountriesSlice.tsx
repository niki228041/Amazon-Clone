






import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";


export const apiCountriesSlice:any = createApi({
    reducerPath:"Countries",
    baseQuery:fetchBaseQuery({baseUrl:""}),
    tagTypes:['Countries'],
    endpoints:(builder)=>({
        getCountries:builder.query<any,any>({
          query:(todo)=>({
            url:'https://restcountries.com/v3.1/all?fields=name,flags',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Countries']
        }),
    })
})

export const {useGetCountriesQuery} = apiCountriesSlice

