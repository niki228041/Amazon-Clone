import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";

export interface Currency{
    currency:string; 
}

const initialState:Currency= {
    currency:"",
};

const apiCurrencyStateSlice = createSlice(
{
    name:'currency',
    initialState,
    reducers:
    {
        setCurrency(state,action: PayloadAction<string>){
            state.currency = action.payload;
        },
    },
    extraReducers(builder){
    }
});

export const { setCurrency} = apiCurrencyStateSlice.actions
export default apiCurrencyStateSlice.reducer;