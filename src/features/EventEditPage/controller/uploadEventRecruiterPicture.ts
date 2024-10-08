import { supabase } from "../../../supabaseClient"

export const uploadEventRecruiterPicture = async (
  filePath: string,
  file: File
) => {
  const { error } = await supabase.storage
    .from("recruiter-images")
    .upload(filePath, file)
  if (error) throw new Error(
    "Uploading event recruiter picture to database storage in failed"
  )
}
