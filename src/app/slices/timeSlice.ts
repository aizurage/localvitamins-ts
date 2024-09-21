import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Time {
    hour: number
    minute: number
}

export interface Period {
    start: Time
    end: Time
}

const initialState: Period = {
    start: {
        hour: 0,
        minute: 0
    },
    end: {
        hour: 0,
        minute: 0
    }
}


const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers:{
        setStartTime: (state, action: PayloadAction<Time>) => {
            state.start = action.payload
        },
        setEndTime: (state, action: PayloadAction<Time>) => {
            state.end = action.payload
        }
    }
})

export const {setStartTime, setEndTime} = timeSlice.actions
export const timeReducer = timeSlice.reducer