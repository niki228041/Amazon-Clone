import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiProductSlice:any = createApi({
    reducerPath:"product",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Product'],
    endpoints:(builder)=>({
        getProducts:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Products/GetProducts',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Product']
        }),
        getProductById:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Products/GetProductById',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Product']
        }),
        deleteProduct:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Products/DeleteProduct',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Product']
        }),
        createProduct:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Products/CreateProduct',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Product']
        }),
        getProductsByCategoryId:builder.mutation<any,any>({
        query:(todo)=>({
          url:'/api/Products/GetProductByCategoryId',
          method:"POST",
          body:todo
        }),
        invalidatesTags:['Product']
        }),
        getLinksForProduct:builder.mutation<any, any>({
          query:(todo)=>({
            url:'/api/Products/UploadImage',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Product']
        }),
        getLinksForProductByProductsIds:builder.query<any, any>({
          query:(todo)=>({
            url:'/api/Products/GetImageLinksByProductsIds',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Product']
        }),
        getProductWithFilters:builder.mutation<any, any>({
          query:(todo)=>({
            url:'/api/Products/GetProductWithFilters',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Product']
        }),
        getProductCount:builder.query<any, any>({
          query:(todo)=>({
            url:'/api/Products/GetProductCount',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Product']
        }),
        getProductWithLimitByCategoryId:builder.query<any, any>({
          query:(todo)=>({
            url:'/api/Products/GetProductWithLimitByCategoryId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Product']
        }),
        createComment:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Comment/CreateComment',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Product']
        }),
        getCommentsByProductId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Comment/GetCommentsByProductId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Product']
        }),
        canLeaveComment:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Comment/CanLeaveComment',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Product']
        }),
        
    })
})


export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductQuery,
  useGetLinksForProductByProductsIdsQuery,
  useGetProductCountQuery,
  useGetProductWithLimitByCategoryIdQuery,
  useGetCommentsByProductIdQuery,
  useCanLeaveCommentQuery} = apiProductSlice

