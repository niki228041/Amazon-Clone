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
        getTracksByUserId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Track/GetTracksByUserId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Player']
        }),
        setLike:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Track/SetLikedTrack',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Player']
        }),
        getLikedTracksByUserId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Track/GetLikedTracksByUserId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Player']
        }),
        getTrackHistoryByUserId:builder.query<any,any>({
          query:(todo)=>({
            url:'/api/Track/GetTrackHistoryByUserId',
            method:"POST",
            body:todo
          }),
          providesTags:result=>['Player']
        }),
        addHistory:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Track/AddTrackHistory',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Player']
        }),
        deleteTrack:builder.mutation<any,any>({
          query:(todo)=>({
            url:'/api/Track/DeleteTrack',
            method:"POST",
            body:todo
          }),
          invalidatesTags:['Player']
        }),
        
    })
})


export const {useGetGenresQuery,useGetTracksQuery,useGetTracksByUserIdQuery,useGetLikedTracksByUserIdQuery,useGetTrackHistoryByUserIdQuery} = apiPlayerSlice

