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

const ordersSlice = createSlice(
{
    name:'order',
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

            state.orderWasAdded = true;
        },
        updateOrderInBasket(state,action: PayloadAction<ChangeOrderCount>){
            state.orders[action.payload.index].count = action.payload.count;

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