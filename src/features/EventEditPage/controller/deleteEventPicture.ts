import { supabase } from "../../../supabaseClient"

export const deleteEventPicture = async (pictureUrl: string) => {
  const { error } = await supabase.storage
    .from("event-images")
    .remove([pictureUrl])
  if (error) throw error
}
