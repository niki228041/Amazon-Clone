import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const apiOptionsSlice:any = createApi({
    reducerPath:"options",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5034"}),
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
    })
})


export const {useGetOptionsQuery,useGetOptionsByCategoryIdQuery} = apiOptionsSlice