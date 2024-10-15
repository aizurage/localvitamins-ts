import { supabase } from "../../../supabaseClient"

export const deleteEventPicture = async (
  eventPictureUrl: string
): Promise<void> => {
  const { error } = await supabase.storage
    .from("recruiter-images")
    .remove([eventPictureUrl])
  if (error)
    throw new Error("Deleting event picture from database storage in failed")
}
