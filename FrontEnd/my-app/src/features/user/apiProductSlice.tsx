import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const apiProductSlice:any = createApi({
    reducerPath:"product",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5034"}),
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
        })
    })
})


export const {useGetProductsQuery,useGetProductByIdQuery,useDeleteProductQuery} = apiProductSlice

