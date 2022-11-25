import { createSlice } from "@reduxjs/toolkit";

const userSlice =createSlice({
    name:"user",
    initialState:{
        currentUser:null,
        
       isLoggedin:false,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
           state.isLoggedin=true;
           state.error=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
        registerStart:(state)=>{
            state.isFetching=true;
        },
        registerSuccess:(state,action)=>{
            state.isFetching=false;
            state.isLoggedin=true;
            state.currentUser=action.payload;
        },
        registerFailure:(state)=>{
            state.error=true;
            state.isFetching=false;
        },
        updateCart:(state,action)=>{
           state.currentUser.cart=action.payload;
        },
        emptyCart:(state,action)=>{
            state.currentUser.cart.products=action.payload;
         }
        
       
        

    },
})

export const {loginStart,loginFailure,loginSuccess,registerStart,registerSuccess,registerFailure,logout,updateCart,emptyCart}=userSlice.actions;
export default userSlice.reducer;