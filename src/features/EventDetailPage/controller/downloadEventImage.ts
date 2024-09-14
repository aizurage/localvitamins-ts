import { supabase } from "../../../supabaseClient"

export const downloadEventImage = async (imageUrl: string): Promise<string> => {
    try {
      const {data, error} = await supabase.storage.from("event-images").download(imageUrl)
      if(error) throw new Error("Fetching event image process in failed")
      return URL.createObjectURL(data)
    } catch (error) {
      console.log('Error downloading event image') 
      alert("イベントイメージ写真のダウンロードに失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。")
      return ""
    }
}