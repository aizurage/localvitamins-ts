import { EventPropsForDetailPage } from "../../../states"
import { supabase } from "../../../supabaseClient"

export const searchEvent = async (keywords: string[]): Promise<EventPropsForDetailPage[]> => {
  try {
    const searchEventResults: EventPropsForDetailPage[] = []
    for (let i = 0; i < keywords.length; i++) {
      const regExKeyword = '%' + keywords[i] + '%'
      const { data, error } = await supabase
        .from('EventTable')
        .select()
        .like('search_tags', regExKeyword)

      if (error) throw new Error("Searching events in failed")

      const {
        title,
        eventID,
        content,
        date,
        event_picture,
        planner_uniqueID
      } = data[0]
      const newEventObject: EventPropsForDetailPage = {
        title,
        eventID,
        content,
        date,
        event_picture,
        planner_uniqueID
      }
      searchEventResults.push(newEventObject)
    }

    return searchEventResults

  } catch (error) {
    alert("お手伝いの検索処理に失敗しました")
    return []
  }
}
