//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {ChangeOrderCount, Order} from "../../components/types";
import { baseURL } from "../../api/axios";



export interface Wishs{
    wishs:Order[]; 
}


// UserState :
const initialState:Wishs= {
    wishs:[],
};

// export const addOrder:any = createAsyncThunk('/api/Account/registration',async(dateFromFrontend:any)=>{
//     try{
//         const response = await axios.post(baseURL + '/api/Account/registration',dateFromFrontend);
//         return response.data;
//     }catch(err:any){
//         return err.message;
//     }
// })


const wishsSlice = createSlice(
{
    name:'wishs',
    initialState,
    reducers:
    {

        addWishitem(state,action: PayloadAction<Order>){
            state.wishs.push(action.payload);
            console.log("hereeeee")
        },
        deleteWishitem(state,action: PayloadAction<string>){
            state.wishs = state.wishs.filter(function(item) {
                return item.id !== action.payload
            })
        },
        updateWishitem(state,action: PayloadAction<ChangeOrderCount>){
            state.wishs[action.payload.index].count = action.payload.count;

            // state.orders = state.orders.filter(function(item) {
            //     return item.id !== action.payload
            // })
        }
    },
    extraReducers(builder){
    }
});



// export const {login,registration} = userSlice.actions;
export const { addWishitem, deleteWishitem ,updateWishitem} = wishsSlice.actions
export default wishsSlice.reducer;