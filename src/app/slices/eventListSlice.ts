import { createSlice } from "@reduxjs/toolkit"
import { EventPropsForDetailPage } from "../../states"

export interface EventListState {
  eventlist: EventPropsForDetailPage[]
}

const initialState: EventListState = {
  eventlist: [],
}

const eventListSlice = createSlice({
  name: "eventList",
  initialState,
  reducers: {
    setEventList: (state, action) => {
      state.eventlist = action.payload
    },
  },
})

export const { setEventList } = eventListSlice.actions
export const eventListReducer = eventListSlice.reducer
