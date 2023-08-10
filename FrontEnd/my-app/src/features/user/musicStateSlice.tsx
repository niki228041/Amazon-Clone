//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { baseURL } from "../../api/axios";
import { TrackFromServer } from "../../components/Player/Player";

export interface Track{
    currentTrack:TrackFromServer | null;
    isPlay:boolean;
}
// State :
const initialState:Track= {
    currentTrack:null,
    isPlay:false,
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
    },
    extraReducers(builder){}
});

export const { changeTrack, deleteTrack,setIsPlay} = trackSlice.actions
export default trackSlice.reducer;