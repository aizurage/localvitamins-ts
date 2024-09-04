export const downloadEventImage = async (imageUrl) => {
    try {
      await supabase.storage
        .from('event-images')
        .download(imageUrl)
        .then(
          (result) =>
            setEventPictureObjectURL(URL.createObjectURL(result.data)),
          (error) => {
            throw error
          },
        )
    } catch (error) {
      console.log('Error downloading image')
      console.log(error.error_description || error.message)
      // 写真が用意できないケースが考えられるため、一覧を表示するたびに「ダウンロードに失敗した」と表示するのはしつこい。
      // ストレスになる懸念があるので、アラートはなし。
      // alert(
      //  '写真のダウンロードに失敗した、もしくは写真がないお手伝いがありました。アプリの動作に影響は無いので、タブを閉じてください。',
      // )
    }
  }