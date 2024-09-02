import { supabase } from "../../../supabaseClient"

export const handleSubmit = async (values) => { 
    await supabase.auth.signIn(values)
    .then(() => {
      navigate('/')
    }).catch((error) => {
      console.log('Log in failed')
      console.log(error.error_description || error.message)
      alert(
        'ログイン処理に失敗しました。メールアドレスまたはパスワードに間違いがないかどうか確認してください。それでも解決できない場合は、運営チームmiraikuru0512@gmail.comまでお問い合わせください。',
      )
    })
}