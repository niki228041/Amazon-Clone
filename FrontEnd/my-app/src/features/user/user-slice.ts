//DUCKS pattern
import { createSlice,PayloadAction,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import parseJwt from "../../api/jwtDecodeToken";

import { SetAccessToken,SetRefreshToken } from "../../api/jwtDecodeToken";
import { LoginRequest } from "../../components/Auth/types";
import { baseURL } from "../../api/axios";


export interface UserState{
    user:User;
    loading:boolean;
    accessToken:string;
    refreshToken:string;
    error:string|null;
    isAuth:boolean;
    message:string|null;
    allUsers:any;
}

interface User{
    email:string,
    name:string,
    surname:string,
    roles:string,
}


// UserState :
const initialState:UserState= {
    user:{email:"",name:"",surname:"",roles:""},
    accessToken:"",
    refreshToken:"",
    loading:false,
    error:"",
    isAuth:false,
    message:"",
    allUsers:[]
};

export const postRegistration:any = createAsyncThunk('/api/Account/registration',async(dateFromFrontend:any)=>{
    try{
        const response = await axios.post(baseURL + '/api/Account/registration',dateFromFrontend);
        return response.data;
    }catch(err:any){
        return err.message;
    }
})

export const postLogin:any = createAsyncThunk('/api/Account/login',async(dateFromFrontend:LoginRequest)=>{
    try{
        const response = await axios.post(baseURL + '/api/Account/login',dateFromFrontend);
        return response.data;
    }catch(err:any){
        return err.message;
    }
})


export const AuthUser:any = createAsyncThunk('',(token:string)=>{
    var decodedToken = "";
    if(token != "")
    {
        decodedToken = parseJwt(token) as any;
    }
    try{
        return decodedToken;
    }catch(err:any){
        return err.message;
    }
});



const userSlice = createSlice(
{
    name:'user',
    initialState,
    reducers:
    {},
    extraReducers(builder){
        builder
            .addCase(postRegistration.pending,(state,action)=>{
                state.loading = true;
            })
            .addCase(postRegistration.fulfilled,(state,action)=>{
                state.loading = false;
                state.accessToken = action.payload;
                SetAccessToken(action.payload);
                state.user = parseJwt(action.payload);
                state.isAuth = true;

            })
            .addCase(postLogin.pending,(state,action)=>{
                console.log("bro");
                state.loading = true;
            })
            .addCase(postLogin.fulfilled,(state,action)=>{
                state.loading = false;
                state.accessToken = action.payload;
                SetAccessToken(action.payload.payload);
                console.log(action.payload.payload);

                if(action.payload.payload != undefined)
                {
                    state.user = parseJwt(action.payload.payload);
                }
                else{
                    state.user = {email:"",name:"",surname:"",roles:""};
                }
                console.log(action.payload);
                state.isAuth = true;
            })
            .addCase(AuthUser.fulfilled,(state,action)=>{
                if(action.payload == "")
                {
                    state.isAuth = false;
                }
                else
                {
                    state.isAuth = true;
                }
                state.user = action.payload;
            })
    }
});



// export const {login,registration} = userSlice.actions;
export default userSlice.reducer;