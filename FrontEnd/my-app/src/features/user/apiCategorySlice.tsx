import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const apiCategorySlice:any = createApi({
    reducerPath:"category",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5034"}),
    tagTypes:['Category'],
    endpoints:(builder)=>({
        getCategories:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Categories/GetAll',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Category']
        })
    })
})


export const {useGetCategoriesQuery} = apiCategorySlice

