import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./slice/jobSlice";


const reducer ={
    jobSlice: jobSlice
}

const store = configureStore({
    reducer,
    devTools: true
})

export default store