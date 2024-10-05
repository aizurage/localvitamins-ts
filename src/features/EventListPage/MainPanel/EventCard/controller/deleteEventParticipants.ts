import { supabase } from "../../../../../supabaseClient"

export const deleteEventParticipants = async (eventId: number) => {
  const { error } = await supabase
    .from('Participants')
    .delete()
    .eq('eventID', eventId)
  if (error) throw error
}
