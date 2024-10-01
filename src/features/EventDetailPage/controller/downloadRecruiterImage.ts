import { supabase } from "../../../supabaseClient"

export const downloadRecruiterImage = async (
  imageUrl: string
): Promise<string> => {
    try {
      const {data, error} = await supabase.storage
        .from("recruiter-images").download(imageUrl)
      if (error) 
        throw new Error("Fetching event recruiter image process in failed")
      return URL.createObjectURL(data)
    } catch (error) {
      console.log('Error downloading event recruiter image')
      alert("お手伝い募集者の写真ダウンロードに失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
      return ""
    }
}