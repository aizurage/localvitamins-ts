import { supabase } from "../../../../../supabaseClient"
import { deleteEventImage } from "./deleteEventImage"
import { deleteEventParticipants } from "./deleteEventParticipants"
import { deleteRecruiterImage } from "./deleteRecruiterImage"
import { fetchEvent } from "./fetchEvent"

export const deleteEvent = async (eventId: number) => {
  const {
    event_picture: eventPictureUrl,
    recruiter_picture: eventRecruiterPictureUrl,
  } = await fetchEvent(eventId, "event_picture, recruiter_picture")
  const { error } = await supabase
    .from("EventTable")
    .delete()
    .match({ id: eventId })
  if (error) throw new Error("Deleting event data in failed")
  deleteEventImage(eventPictureUrl)
  deleteRecruiterImage(eventRecruiterPictureUrl)
  deleteEventParticipants(eventId)
}
