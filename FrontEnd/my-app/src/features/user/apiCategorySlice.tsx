import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";




export const apiCategorySlice:any = createApi({
    reducerPath:"category",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Category'],
    endpoints:(builder)=>({
        getCategories:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Categories/GetAll',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Category']
        }),
        deleteCategory:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Categories/DeleteCategory',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Category']
        }),
        createCategory:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Categories/Create',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Category']
        }),
        getLinksForCategory:builder.mutation<any, any>({
          query:(todo)=>({
            url:'/api/Categories/UploadImage',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Category']
        }),
        getMainCategories:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Categories/GetMainCategories',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Category']
        }),
        getAllSubcategoriesByCategoryId:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Categories/GetAllSubcategoriesByCategoryId',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Category']
        }),
        editCategory:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Categories/EditCategory',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Category']
        }),
        
    })
})


export const {useGetCategoriesQuery,useGetMainCategoriesQuery,useEditCategoryMutation} = apiCategorySlice

