import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

export interface DateState {
    date: string
}

const initialState: DateState = {
    date: ""
}

const dateSlice = createSlice({
    name: "date",
    initialState,
    reducers: {
        updateDate: (state, action: PayloadAction<Dayjs>) => {
            state.date = action.payload.format("YYYY-MM-DD")
        }
    }
})

export const { updateDate } = dateSlice.actions
export const dateReducer = dateSlice.reducer