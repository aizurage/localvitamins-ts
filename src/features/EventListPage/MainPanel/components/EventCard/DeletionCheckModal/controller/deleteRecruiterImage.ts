export const deleteRecruiterImage = async () => {
  try {
    const { error } = await supabase.storage
      .from('recruiter-images')
      .remove(props.row.recruiter_picture)
    if (error) throw error
  } catch (error) {
    console.log('Event recruiter picture deletion failed')
    console.log(error.error_description || error.message)
    alert(
      'イベント募集者写真のデータ消去に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
    )
  }
}
