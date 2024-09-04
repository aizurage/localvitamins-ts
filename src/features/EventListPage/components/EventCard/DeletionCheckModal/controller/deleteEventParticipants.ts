export const deleteEventParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('Participants')
        .delete()
        .eq('eventID', props.row.id)
      // イベント参加者がいて、かつその参加者データを削除できなかった場合、エラーを投げる
      if (data.length > 0 && error) throw error
    } catch (error) {
      console.log('Event participants deletion failed')
      console.log(error.error_description || error.message)
      alert(
        'イベント参加者のデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    }
  }