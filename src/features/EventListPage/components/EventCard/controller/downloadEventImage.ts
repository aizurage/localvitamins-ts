import { supabase } from "../../../../../supabaseClient"

export const downloadEventImage = async (imageUrl: string): Promise<string> => {
    try {
      const {data, error} = await supabase.storage.from('event-images').download(imageUrl)
      if (error) throw new Error("Downloading event picture process in failed")
      return URL.createObjectURL(data)
    } catch (error) {
      return ""
    }
  }