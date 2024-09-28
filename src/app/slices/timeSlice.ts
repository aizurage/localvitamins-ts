import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Time {
    hour: string | null
    minute: string | null
}

export interface Period {
    start: Time
    end: Time
}

const initialState: Period = {
    start: {
        hour: "",
        minute: ""
    },
    end: {
        hour: "",
        minute: ""
    }
}


const timeSlice = createSlice({
    name: "time",
    initialState,
    reducers:{
        setStartHour: (state, action: PayloadAction<string | null>) => {
            state.start.hour = action.payload
        },
        setStartMinute: (state, action: PayloadAction<string | null>) => {
            state.start.minute = action.payload
        },
        setEndHour: (state, action: PayloadAction<string | null>) => {
            state.end.hour = action.payload
        },
        setEndMinute: (state, action: PayloadAction<string | null>) => {
            state.end.minute = action.payload
        },
    }
})

export const {
    setStartHour,
    setStartMinute,
    setEndHour,
    setEndMinute
} = timeSlice.actions
export const timeReducer = timeSlice.reducer