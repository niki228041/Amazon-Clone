import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { baseURL } from "../../api/axios";



export const apiPlayerSlice:any = createApi({
    reducerPath:"player",
    baseQuery:fetchBaseQuery({baseUrl:baseURL}),
    tagTypes:['Player'],
    endpoints:(builder)=>({
        createGenre:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Genre/CreateGenre',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Player']
        }),
        getGenres:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Genre/GetAllGenres',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Player']
        }),
        getMainImageLinkForTrack:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Track/GetImageLinksByTrackId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Player']
        }),
        getImageLinkByBase64:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Track/UploadImage',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Player']
        }),
        createTrack:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Track/CreateTrack',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Player']
        }),
        getTracks:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Track/GetAllTracks',
            method:"GET",
            body:todo
          }),
          providesTags:result=>['Player']
        }),
    })
})


export const {useGetGenresQuery,useGetTracksQuery} = apiPlayerSlice

