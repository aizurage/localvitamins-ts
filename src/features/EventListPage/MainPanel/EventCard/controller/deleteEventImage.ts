import { supabase } from "../../../../../supabaseClient"

export const deleteEventImage = async (eventPictureUrl: string) => {
  const { error } = await supabase.storage
    .from('event-images')
    .remove([ eventPictureUrl ])
  if (error) throw error
}
