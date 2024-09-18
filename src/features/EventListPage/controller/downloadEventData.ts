import { Dayjs } from "dayjs"
import { supabase } from "../../../supabaseClient"

interface EventPropsForDetailPage {
  title: string
  eventID: number
  content: string
  date: Dayjs
  event_picture: string
  planner_uniqueID: string
}

export const downloadEventData = async (): Promise<EventPropsForDetailPage[]> => {
  try {
    const { data, error } = await supabase.from('EventTable').select()
    if(error) throw new Error("Downloading all event data in failed")
    // WARNING: 以下のmap関数が正しく動くのか、検証する必要あり↓
    const eventData: EventPropsForDetailPage[] = data[0].map((event: EventPropsForDetailPage) => {
      return event
    })
    return eventData
    
  } catch (error) {
    alert("お手伝い情報取得処理に失敗しました。")
    return []
  }
}