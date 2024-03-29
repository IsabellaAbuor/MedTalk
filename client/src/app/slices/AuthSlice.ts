import { createSlice } from "@reduxjs/toolkit";

interface authIntialState{

    userInfo:{
        uid:string;
        email:string;
        name:string;
    }
    |undefined;
    isDarkTheme: boolean;
}

const initialState: authIntialState ={
    userInfo: undefined,
    isDarkTheme: false,
};

export const authSlice =createSlice ({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.userInfo = action.payload;
        },
        changeTheme:(state, action)=>{
            state.isDarkTheme = action.payload.isDarkTheme;
        },
    },
});

export const { setUser, changeTheme } = authSlice.actions;