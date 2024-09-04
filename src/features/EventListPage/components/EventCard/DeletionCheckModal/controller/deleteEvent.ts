import { supabase } from "../../../../../../supabaseClient"
import { deleteEventImage } from "./deleteEventImage"
import { deleteEventParticipants } from "./deleteEventParticipants"
import { deleteRecruiterImage } from "./deleteRecruiterImage"

export const deleteEvent = async () => {
    try {
      deleteEventImage()
      deleteRecruiterImage()
      deleteEventParticipants()
      const { error } = await supabase
        .from('EventTable')
        .delete()
        .match({ uniqueID: props.row.uniqueID })
      if (error) throw error
      const { data } = await supabase.from('EventTable').select()
      props.setEvents(data)
      navigate('/')
    } catch (error) {
      console.log('Event deletion failed')
      console.log(error.error_description || error.message)
      alert(
        'イベントのデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    }
  }