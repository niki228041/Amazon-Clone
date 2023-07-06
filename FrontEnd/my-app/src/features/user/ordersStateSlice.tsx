//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {Order} from "../../components/types";

const baseURL ='https://localhost:5034';



export interface Orders{
    orders:Order[];
}


// UserState :
const initialState:Orders= {
    orders:[],
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
            console.log("hereeeee")
        },
        deleteOrder(state,action: PayloadAction<string>){
            state.orders = state.orders.filter(function(item) {
                return item.id !== action.payload
            })
        }
    },
    extraReducers(builder){
    }
});



// export const {login,registration} = userSlice.actions;
export const { addOrder, deleteOrder } = ordersSlice.actions
export default ordersSlice.reducer;