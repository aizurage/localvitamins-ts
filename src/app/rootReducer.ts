import { combineReducers } from "@reduxjs/toolkit"
import { dateReducer } from "./slices/dateSlice"
import { eventPictureReducer } from "./slices/eventPictureSlice"
import { eventRecruiterPictureReducer } 
    from "./slices/eventRecruiterPictureSlice"
import { timeReducer } from "./slices/timeSlice"
import { userReducer } from "./slices/userSlice"

const rootReducer = combineReducers({
    user: userReducer,
    date: dateReducer,
    time: timeReducer,
    eventPicture: eventPictureReducer,
    eventRecruiterPicture: eventRecruiterPictureReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer