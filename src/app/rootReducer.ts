import { combineReducers } from "@reduxjs/toolkit";
import { dateReducer } from "./slices/dateSlice";
import { timeReducer } from "./slices/timeSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
    user: userReducer,
    date: dateReducer,
    time: timeReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer