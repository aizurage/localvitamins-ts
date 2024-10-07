/* eslint-disable camelcase */
import { Event, EventRecruiter } from "../../../states"
import { supabase } from "../../../supabaseClient"

export const downloadEventData = async (eventID: number): Promise<{
    event: Event,
    eventRecruiter: EventRecruiter
}> => {
  try {
    const { data, error } = await supabase
      .from('EventTable').select().eq("id", eventID)
    if (error) throw new Error("Fetching whole event data in failed!")
    const {
      recruiter_name,
      recruiter_introduction,
      recruiter_picture,
      recruiter_comment,
      ...eventData
    } = data[0]
    const eventRecruiterData: EventRecruiter = {
      name: recruiter_name,
      introduction: recruiter_introduction,
      imageUrl: recruiter_picture,
      comment: recruiter_comment
    }
    return {
      event: eventData as Event,
      eventRecruiter: eventRecruiterData
    }
  } catch (error) {
    console.log('Error fetching event data')
    alert(
      `
            イベントのダウンロードに失敗しました。
            お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。
            `
    )
    return {
      event: {} as Event,
      eventRecruiter: {} as EventRecruiter
    }
  }
}
