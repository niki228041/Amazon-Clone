import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiAddressSlice:any = createApi({
    reducerPath:"Address",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Address'],
    endpoints:(builder)=>({
        addAddress:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Address/AddAddress',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Address']
        }),
        getAllAddresses:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Address/GetAllAddresses',
              method:"GET",
              body:todo
            }),
            providesTags:result=>['Address']
        }),
        getAddressByUserId:builder.query<any,any>({
            query:(todo)=>({
              url:'/api/Address/GetAddressByUserId',
              method:"POST",
              body:todo
            }),
            providesTags:result=>['Address']
        }),
        deleteAddress:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Address/DeleteAddressByUserId',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Address']
        }),
        getAddressesByUserId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Address/GetAddressesByUserId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Address']
        }),
        setDefaultAddressByAddressId:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Address/SetDefaultAddressByAddressId',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Address']
        })
        
        
    })
})


export const {useGetAddressByUserIdQuery,useGetAddressesByUserIdQuery,useSetDefaultAddressByAddressIdMutation} = apiAddressSlice