import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs:[],
    // Maintaining which category of filter was applied and tracking their values individually for better manipulation of data
    jobFilters: {
        companyName: "",
        minExp: "",
        location:[],
        minJdSalary: "",
        jobRole:[],

        //note: these keys were unavailable in the API Response at the time of building the project and was made based on the Weekday app functionality, these keys are assumed to be supplied from Backend
        techStack: [],
        numOfEmployees:[],

    }
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
        },
        updateJobFilters: (state, {payload}) => {
            state.jobFilters[payload["key"]] = payload.data
        },

    }
})

export const {storeJobs, clearJobs, updateJobFilters} = jobSlice.actions

export default jobSlice.reducer