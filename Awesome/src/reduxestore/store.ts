import { configureStore } from "@reduxjs/toolkit";
//import listdata from "../../reduxe/reducer";
//import reducer from "../../reduxe/reducer/reducer";
import { getApiCall } from "../service/detapidata";
//import { lists } from "../../reduxe/reducer/reducer";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
    reducer: {
        //apidata: lists,
        [getApiCall.reducerPath]: getApiCall.reducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(getApiCall.middleware),

})

setupListeners(store.dispatch)
//export default store;