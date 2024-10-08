import { supabase } from "../../../supabaseClient"

export const uploadEventPicture = async (
  filePath: string,
  file: File
) => {
  const { error } = await supabase.storage
    .from("event-images")
    .upload(filePath, file)
  if (error) throw new Error(
    "Uploading event picture to database storage in failed"
  )
}
