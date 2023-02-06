import {
  Center,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Space,
  LoadingOverlay,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { supabase } from './supabaseClient'
import { useState } from 'react'

export default function Register() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      username: '',
      firstname: '',
      familyname: '',
    },

    _validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
    get validate() {
      return this._validate
    },
    set validate(value) {
      this._validate = value
    },
  })

  const [loading, setLoading] = useState(false)
  const submit = async (values) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp(
        {
          email: values.email,
          password: values.password,
        },
        {
          data: {
            username: values.username,
            firstname: values.firstname,
            familyname: values.familyname,
          },
        },
      )
      if (error) throw error
      alert(
        '登録したメールアドレスに、アプリの案内メールが届きます。この画面を閉じて、メールに記載されているリンクをクリックしてください。新しいアプリ画面が表示されます。',
      )
    } catch (error) {
      console.log('Error new account creation')
      console.log(error.error_description || error.message)
      alert(
        'アカウント作成に失敗しました。入力に不備がないか、パスワードの書式に不備がないかどうかご確認ください。それでも解決しない場合は、アプリ運営チームLocal Vitaminsのメールアドレスlocalvitamins@gmail.comにお問い合わせください。',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Center>
        <h1>アカウント登録</h1>
      </Center>
      <Center>
        <div>
          <LoadingOverlay visible={loading} />
          <form onSubmit={form.onSubmit(submit)}>
            <TextInput
              label="姓"
              style={{ width: 500 }}
              required
              {...form.getInputProps('familyname')}
            />
            <Space h="xl" />
            <TextInput
              label="名"
              style={{ width: 500 }}
              required
              {...form.getInputProps('firstname')}
            />
            <Space h="xl" />
            <TextInput
              required
              label="ユーザーネーム"
              placeholder="ユーザーネーム"
              margin="center"
              style={{ width: 500 }}
              {...form.getInputProps('username')}
            />
            <Space h="xl" />
            <TextInput
              required
              label="メールアドレス"
              placeholder="your@email.com"
              margin="center"
              style={{ width: 500 }}
              {...form.getInputProps('email')}
            />
            <Space h="xl" />
            <PasswordInput
              placeholder="パスワード"
              label="パスワード"
              description="パスワードには、文字、数字、そして特殊文字を含めてください。"
              style={{ width: 500 }}
              required
              {...form.getInputProps('password')}
            />
            <Space h="xl" />
            <Group position="center" mt="md">
              <Button type="submit" color="orange">
                Submit
              </Button>
            </Group>
          </form>
        </div>
      </Center>
    </>
  )
}
