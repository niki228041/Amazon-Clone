//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { baseURL } from "../../api/axios";
import { TrackFromServer } from "../../components/Player/Player";

export interface Track{
    currentTrack:TrackFromServer | null;
}
// State :
const initialState:Track= {
    currentTrack:null,
};

const trackSlice = createSlice(
{
    name:'track',
    initialState,
    reducers:
    {
        changeTrack(state,action: PayloadAction<TrackFromServer>){
            state.currentTrack = action.payload;
            console.log("hereeeee")
        },
        deleteTrack(state,action: PayloadAction<void>){
            state.currentTrack = null;
        }
    },
    extraReducers(builder){
    }
});

export const { changeTrack, deleteTrack} = trackSlice.actions
export default trackSlice.reducer;