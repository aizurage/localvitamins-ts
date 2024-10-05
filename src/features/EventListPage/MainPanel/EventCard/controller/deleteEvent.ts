import { supabase } from "../../../../../supabaseClient"
import { deleteEventImage } from "./deleteEventImage"
import { deleteEventParticipants } from "./deleteEventParticipants"
import { deleteRecruiterImage } from "./deleteRecruiterImage"
import { fetchEvent } from "./fetchEvent"

export const deleteEvent = async (eventId: number) => {
    const {
      eventPictureUrl: event_picture,
      eventRecruiterPictureUrl: recruiter_picture
    } = await fetchEvent(
      eventId,
      "event_picture, recruiter_picture"
    )
    const { error } = await supabase.from('EventTable').delete().match({ id: eventId })
    if (error) throw new Error("Deleting event data in failed")
    deleteEventImage(eventPictureUrl)
    deleteRecruiterImage(eventRecruiterPictureUrl)
    deleteEventParticipants(eventId)    
  } catch (error) {
    console.log('Event deletion failed')
    console.log(error.error_description || error.message)
    alert(
      'イベントのデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
    )
  }
}
