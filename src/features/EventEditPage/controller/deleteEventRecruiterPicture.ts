import { supabase } from "../../../supabaseClient"

export const deleteEventRecruiterPicture = async (pictureUrl: string) => {
  const { error } = await supabase.storage
    .from("recruiter-images")
    .remove([pictureUrl])
  if (error) throw error
}
