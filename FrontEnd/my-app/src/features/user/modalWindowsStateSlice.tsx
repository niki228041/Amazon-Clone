//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {ChangeOrderCount, Order} from "../../components/types";
import { baseURL } from "../../api/axios";

export interface Modals{
    isCardOpen:boolean;
    isAddressOpen:boolean;
    isLoginRequestOpen:boolean;
    isCompanyOpen:boolean;
    isAlbumModalOpen:boolean;
    isBurgerModalOpen:boolean;
    selectedTracksIds:number[];
}

const initialState:Modals= {
    isCardOpen:false,
    isAddressOpen:false,
    isLoginRequestOpen:false,
    isCompanyOpen:false,
    isAlbumModalOpen:false,
    isBurgerModalOpen:false,
    selectedTracksIds:[],
};

const modalWindowsStateSlice = createSlice(
{
    name:'modalWindow',
    initialState,
    reducers:
    {
        setCardModalWindow(state,action: PayloadAction<boolean>){
            state.isCardOpen = action.payload;
        },
        setAddressModalWindow(state,action: PayloadAction<boolean>){
            state.isAddressOpen = action.payload;
        },
        setLoginRequestWindow(state,action: PayloadAction<boolean>){
            state.isLoginRequestOpen = action.payload;
        },
        setCompanyModalWindow(state,action: PayloadAction<boolean>){
            state.isCompanyOpen = action.payload;
        },
        setAlbumModalWindow(state,action: PayloadAction<boolean>){
            state.isAlbumModalOpen = action.payload;
        },
        setSelectedTracksIds(state,action: PayloadAction<number[]>){
            state.selectedTracksIds = action.payload;
        },
        setBurgerModalWindow(state,action: PayloadAction<boolean>){
            state.isBurgerModalOpen = action.payload;
        },
        
    },
    extraReducers(builder){
    }
});



// export const {login,registration} = userSlice.actions;
export const { setCardModalWindow,setAddressModalWindow,setLoginRequestWindow,setCompanyModalWindow,setAlbumModalWindow,setSelectedTracksIds,setBurgerModalWindow} = modalWindowsStateSlice.actions
export default modalWindowsStateSlice.reducer;