import { Participant } from "../../../states/Participant"
import { supabase } from "../../../supabaseClient"

export const fetchParticipants = async (
  eventID: number
): Promise<Participant[]> => {
  try {
    const { data, error } = await supabase
      .from('Participants')
      .select()
      .eq('eventID', eventID)

    if (error) throw new Error("Fetching event participants process in failed")
    return data as Participant[]

  } catch (error) {
    alert("お手伝い参加者取得処理に失敗しました。")
    return []
  }
}
