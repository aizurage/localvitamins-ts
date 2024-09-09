import { supabase } from "../../../supabaseClient"

export const downloadEventData = async (eventID: number) => {
    const { data } = await supabase.from('EventTable').select().eq("id", eventID)
    setEvent(data[0])
    downloadEventImage(data[0].event_picture)
    downloadRecruiterImage(data[0].recruiter_picture)
}