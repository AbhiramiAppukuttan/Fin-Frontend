import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { act } from "react"
import { getDecodedData, getUserData } from "../utils/storageHandler";



const userSlice=createSlice({
    name:'user',
    initialState:{
        isLogin:getUserData()? true:false,
        token:getUserData() || null,
        name:getDecodedData()?.name || null,
        email:getDecodedData()?.email || null,
        role:getDecodedData()?.role || null
    },
    reducers:{
        signup(state){                         //action is which acion is performed
            state.isLogin=true
            state.token=token,
            state.name=username,
            state.email=email   
        },
        login:((state,action)=>{
            console.log(action.payload);
            state.isLogin=true
            state.token=action.payload.token
            const decoded=jwtDecode(action.payload.token)
            console.log(decoded); 
            state.name=decoded.name
            state.email=decoded.email
            state.plan=decoded.plan   
        }),
        logout(state){
            state.isLogin=false,
            state.token=null,
            state.name=null,
            state.email=null,
            state.role=decoded.role

        }
    }

})

export const{signup,login,logout}=userSlice.actions
export default userSlice.reducer