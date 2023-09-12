
import { createReducer } from "@reduxjs/toolkit";
import { create } from "react-test-renderer";

const init ={
    loading: false,
    data: null,
    iserror: false
}
export const lists = createReducer(init, {
    GETDATAP:(state)=>{
        state.loading= true
    },
    GETDATAF: (state,action)=>{
        state.loading = false,
        state.data = action.payload
    },
    GETDATAR:(state,action)=>{
        state.iserror = true
        state.data = null,
        state.loading = true
    }
})