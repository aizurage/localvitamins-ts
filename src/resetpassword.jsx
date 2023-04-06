import {
  Center,
  Group,
  PasswordInput,
  Button,
  LoadingOverlay,
} from '@mantine/core'
import { supabase } from './supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { useState } from 'react'
export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm({
    initialValues: {
      password: '',
      _confirmed_password: '',
      get confirmed_password() {
        return this._confirmed_password
      },
      set confirmed_password(value) {
        this._confirmed_password = value
      },
    },

    validate: {
      confirmed_password: (value, values) =>
        value === values.password
          ? null
          : 'パスワード本体　と　確認用のパスワードが違います。',
    },
  })

  const submit = async (values) => {
    try {
      setLoading(true)
      const { error: PasswordResetError } = await supabase.auth.update({
        password: values.password,
      })
      if (PasswordResetError) throw PasswordResetError
      alert( 
        '「OK」をクリックし、パスワードの再設定が完了するまでこのままお待ちください。パスワードの設定が完了したら、最初の画面に自動で切り替わります。'
      )
      navigate('/')
    } catch (error) {
      console.log('Sending new password failed')
      console.log(error.message)
      alert(
        'パスワード再設定に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
      )
    } finally {
      setLoading(false)
    }
  }
return (
    <Center>
      <form onSubmit={form.onSubmit(submit)}>
        <LoadingOverlay visible={loading} />
        <h1>パスワードの再設定</h1>
        <p>これから使用する新しいパスワードを入力してください。</p>
        <PasswordInput
          label="パスワード"
          placeholder="新しいパスワード"
          {...form.getInputProps('password')}
        />
        <PasswordInput
          label="パスワード（確認用）"
          description="確認のため、パスワードをもう一度入力してください。"
          {...form.getInputProps('confirmed_password')}
        />
        <p color="red">
          パスワードは忘れないようにメモし、大切に保管してください。
        </p>
        <Group position="center" mt="md">
          <Button color="green" type="submit">
            提出する
          </Button>
        </Group>
      </form>
    </Center>
  )
}
