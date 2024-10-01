export const deleteEventImage = async () => {
  try {
    const { error } = await supabase.storage
      .from('event-images')
      .remove(props.row.event_picture)
    if (error) throw error
  } catch (error) {
    console.log('Event image picture deletion failed')
    console.log(error.error_description || error.message)
    alert(
      'イベント写真のデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
    )
  }
}
