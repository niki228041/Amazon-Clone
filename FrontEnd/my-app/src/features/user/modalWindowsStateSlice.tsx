//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {ChangeOrderCount, Order} from "../../components/types";
import { baseURL } from "../../api/axios";

export interface Modals{
    isCardOpen:boolean;
    isAddressOpen:boolean;
}

const initialState:Modals= {
    isCardOpen:false,
    isAddressOpen:false
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
    },
    extraReducers(builder){
    }
});



// export const {login,registration} = userSlice.actions;
export const { setCardModalWindow,setAddressModalWindow } = modalWindowsStateSlice.actions
export default modalWindowsStateSlice.reducer;