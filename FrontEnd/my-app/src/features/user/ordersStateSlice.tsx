//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {ChangeOrderCount, Order} from "../../components/types";
import { baseURL } from "../../api/axios";



export interface Orders{
    orders:Order[]; 
    orderWasAdded:boolean;
}


// UserState :
const initialState:Orders= {
    orders:[],
    orderWasAdded:false
};

// export const addOrder:any = createAsyncThunk('/api/Account/registration',async(dateFromFrontend:any)=>{
//     try{
//         const response = await axios.post(baseURL + '/api/Account/registration',dateFromFrontend);
//         return response.data;
//     }catch(err:any){
//         return err.message;
//     }
// })


const ordersSlice = createSlice(
{
    name:'user',
    initialState,
    reducers:
    {
        addOrder(state,action: PayloadAction<Order>){
            state.orders.push(action.payload);
            state.orderWasAdded = true;
        },
        deleteOrder(state,action: PayloadAction<string>){
            state.orders = state.orders.filter(function(item) {
                return item.id !== action.payload
            })
        },
        deleteAllOrder(state,action: PayloadAction<void>){
            state.orders = [];
        },
        updateOrder(state,action: PayloadAction<ChangeOrderCount>){
            state.orders[action.payload.index].count = action.payload.count;
            // state.orders = state.orders.filter(function(item) {
            //     return item.id !== action.payload
            // })
            state.orderWasAdded = true;
        },
        updateOrderInBasket(state,action: PayloadAction<ChangeOrderCount>){
            state.orders[action.payload.index].count = action.payload.count;
            // state.orders = state.orders.filter(function(item) {
            //     return item.id !== action.payload
            // })
        },
        turnWasAddedToFalse(state,action:PayloadAction<void>)
        {
            state.orderWasAdded = false;
        }

        
    },
    extraReducers(builder){
    }
});



// export const {login,registration} = userSlice.actions;
export const { addOrder, deleteOrder ,updateOrder,deleteAllOrder,turnWasAddedToFalse,updateOrderInBasket} = ordersSlice.actions
export default ordersSlice.reducer;