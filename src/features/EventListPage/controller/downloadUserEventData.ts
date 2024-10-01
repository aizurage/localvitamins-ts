import { EventPropsForDetailPage } from "../../../states"
import { supabase } from "../../../supabaseClient"

export const downloadMyEventData = async (userUniqueId: string): Promise<EventPropsForDetailPage[]> => {
  try {
    const { data, error } = await supabase
      .from('EventTable')
      .select()
      .eq('planner_uniqueID', userUniqueId)

    if (error) throw new Error("Downloading user's event in failed")
    if (data == null) return[]

    // WARNING: 以下のmap関数が正しく動くのか、検証する必要あり↓
    const eventData: EventPropsForDetailPage[] = data[0].map((event: EventPropsForDetailPage) => {
      return event
    })
    return eventData
  } catch (error) {
    alert("あなたのお手伝い情報取得処理に失敗しました。")
    return []
  }
}
