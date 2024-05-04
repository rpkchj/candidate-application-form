import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs:[]
}

const jobSlice = createSlice({
    name: "jobSlice",
    initialState,
    reducers:{
        storeJobs: (state, {payload}) => {
            state.jobs = [...state.jobs, ...payload]
        },
        clearJobs: (state) => {
            state.jobs = []
        }
    }
})

export const {storeJobs, clearJobs} = jobSlice.actions

export default jobSlice.reducer