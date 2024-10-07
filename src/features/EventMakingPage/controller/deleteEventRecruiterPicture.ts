import { supabase } from "../../../supabaseClient"

export const deleteEventRecruiterPicture = async (
  recruiterPictureUrl: string
) => {
  const { error } = await supabase.storage
    .from("recruiter-images")
    .remove([ recruiterPictureUrl ])
  if(error) throw new Error(
    "Deleting event recruiter picture from database storage in failed"
  )
}
