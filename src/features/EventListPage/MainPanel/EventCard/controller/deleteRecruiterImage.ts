import { supabase } from "../../../../../supabaseClient"

export const deleteRecruiterImage = async (
  eventRecruiterPictureUrl: string
) => {
  const { error } = await supabase.storage
    .from('recruiter-images')
    .remove([ eventRecruiterPictureUrl ])
  if (error) throw error
}
