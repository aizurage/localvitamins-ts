import { supabase } from "../../../supabaseClient"

export const joinEvent = async (values) => {
  await supabase.from('Participants').insert([
    {
      eventID: event.eventID,
      eventTitle: event.eventTitle,
      firstname: values.firstname,
      familyname: values.familyname,
      email: values.email,
      question: values.question
    }
  ]).then(() => {
    alert('参加申請が完了しました。このタブを閉じてください。')
  }).catch((error) => {
    console.log('Error joining event process')
    console.log(error.error_description || error.message)
    alert(
      '参加申請処理に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
    )
  })
}
