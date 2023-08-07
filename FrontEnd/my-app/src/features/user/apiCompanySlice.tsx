import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiCompanySlice:any = createApi({
    reducerPath:"company",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['company'],
    endpoints:(builder)=>({
        createCompany:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Company/AddCompany',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['company']
        }),
        getAllCompanies:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Company/GetAllCompanies',
              method:"GET",
              body:todo
            }),
            providesTags:result=>['company']
        }),
        getCompanyByUserId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Company/GetCompanyByUserId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['company']
        })
        
    })
})


export const {useGetCompanyByUserIdQuery,useGetAllCompaniesQuery} = apiCompanySlice