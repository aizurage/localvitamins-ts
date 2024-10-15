import { supabase } from "../../../supabaseClient"

export const downloadEventPicture = async (pictureUrl: string) => {
  const { data, error } = await supabase.storage
    .from("recruiter-images")
    .download(pictureUrl)
  if (error) throw error
  return URL.createObjectURL(data)
}
