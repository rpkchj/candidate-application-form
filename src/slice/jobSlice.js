import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs:[],
    // Maintaining which category of filter was applied and tracking their values individually for better manipulation of data
    jobFilters: {}
}

const jobSlice = createSlice({
    name: "jobSlice",
    initialState,
    reducers:{
        storeJobs: (state, {payload}) => {
            state.jobs = [...state.jobs, ...payload]
            const set = new Set(state.jobs)
            state.jobs = Array.from(set)
        },
        clearJobs: (state) => {
            state.jobs = []
        },
        updateJobFilters: (state, {payload}) => {
            // if any string value is empty or an array is empty means that filter has been totally removed hence removing the key: value pair from object
            if(typeof payload.data === "string"){
                if(payload.data === ""){
                    delete state.jobFilters[payload["key"]]
                }else{
                    state.jobFilters[payload["key"]] = payload.data
                }
            }else{
                if(payload.data.length <= 0){
                    delete state.jobFilters[payload["key"]]
                }else{
                    state.jobFilters[payload["key"]] = payload.data
                }
            }
           
        },

    }
})

export const {storeJobs, clearJobs, updateJobFilters} = jobSlice.actions

export default jobSlice.reducer