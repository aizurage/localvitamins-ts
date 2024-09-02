import { supabase } from "../../../supabaseClient"
import { RegisteredAccountProps } from "./state"

export const submitContents = async (values: RegisteredAccountProps) => {
    await supabase.auth.signUp(
      {
        email: values.email,
        password: values.password,
        data: {
          username: values.username,
          firstname: values.firstname,
          familyname: values.familyname,
        }
      }
    ).then(() => {
        alert(
            '登録したメールアドレスに、アプリの案内メールが届きます。この画面を閉じて、メールに記載されているリンクをクリックしてください。新しいアプリ画面が表示されます。',
        )
    }).catch((error) => {
        console.log('Error new account creation')
        console.log(error.error_description || error.message)
        alert(
            'アカウント作成に失敗しました。入力に不備がないか、パスワードの書式に不備がないかどうかご確認ください。それでも解決しない場合は、アプリ運営チームのメールアドレスmiraikuru0512@gmail.comにお問い合わせください。',
        )
    })
}