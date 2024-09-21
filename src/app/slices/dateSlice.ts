import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload
        }
    }
})

export const { setDate } = dateSlice.actions
export const dateReducer = dateSlice.reducer