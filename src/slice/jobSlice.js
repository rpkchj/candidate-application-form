import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs:[]
}

const jobSlice = createSlice({
    name: "jobSlice",
    initialState,
    reducers:{
        storeJobs: (state, {payload}) => {
            state.jobs.push(payload)
        }
    }
})

export const {storeJobs} = jobSlice.actions

export default jobSlice