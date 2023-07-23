import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiPlayerSlice:any = createApi({
    reducerPath:"player",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Player'],
    endpoints:(builder)=>({
        createGenre:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Player/CreateGenre',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Player']
        }),
        getGenres:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Player/GetAllGenres',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Player']
        }),
    })
})


export const {usegetGenresQuery} = apiPlayerSlice

