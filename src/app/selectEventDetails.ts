import { RootState } from "./rootReducer"

// In your slice file, create a custom selector
export const selectEventDetails = (state: RootState) => ({
  eventPictureUrl: state.eventPicture.eventPictureUrl,
  eventRecruiterPictureUrl:
        state.eventRecruiterPicture.eventRecruiterPictureUrl,
  date: state.date.date,
  time: state.time,
  user: state.user.user
})
