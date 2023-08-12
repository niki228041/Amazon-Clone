//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { baseURL } from "../../api/axios";
import { TrackFromServer } from "../../components/Player/Player";

export interface Track{
    currentTrack:TrackFromServer | null;
    isPlay:boolean;
    currentTime:number;
    duration:number;
    percentage:string;
    onChangeSlider:string;
}
// State :
const initialState:Track= {
    currentTrack:null,
    isPlay:false,
    currentTime:0,
    duration:0,
    percentage:"",
    onChangeSlider:"",
};

const trackSlice = createSlice(
{
    name:'track',
    initialState,
    reducers:
    {
        changeTrack(state,action: PayloadAction<TrackFromServer>){
            state.currentTrack = action.payload;
        },
        deleteTrack(state,action: PayloadAction<void>){
            state.currentTrack = null;
        },
        setIsPlay(state,action: PayloadAction<boolean>){
            state.isPlay = action.payload;
        },
        setCurrentTime(state,action:PayloadAction<number>)
        {
            state.currentTime = action?.payload;
        },
        setDurationTime(state,action:PayloadAction<number>)
        {
            state.duration = action.payload;
        },
        setPercentageTime(state,action:PayloadAction<string>)
        {
            state.percentage = action.payload;
        },
        setOnChangeSlider(state,action:PayloadAction<string>)
        {
            state.onChangeSlider = action.payload;
        },
        setLikes(state,action: PayloadAction<number[]>){
            if(state.currentTrack!=null)
            state.currentTrack.wasLikedByUsers = action.payload;
        },
    },
    extraReducers(builder){}
});

export const { changeTrack, deleteTrack,setIsPlay,setCurrentTime,setDurationTime,setPercentageTime,setOnChangeSlider,setLikes} = trackSlice.actions
export default trackSlice.reducer;