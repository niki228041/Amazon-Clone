import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const apiCommentSlice:any = createApi({
    reducerPath:"comment",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5034"}),
    tagTypes:['comment'],
    endpoints:(builder)=>({
        createComment:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Comment/CreateComment',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['comment']
        }),
        getCommentsByProductId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Comment/GetCommentsByProductId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['comment']
        })
        
    })
})


export const {useGetCommentsByProductIdQuery} = apiCommentSlice