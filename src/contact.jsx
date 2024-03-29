import { Button, Center, Group, Input, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import emailjs from '@emailjs/browser'
import { supabase } from './supabaseClient'

import './contact.css'

export default function Contact() {
  const form = useForm({
    initialValues: {
      title: '',
      main: '',
    },
  })

  const submit = (values) => {
    try {
      console.log(supabase.auth.user())
      emailjs
        .send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          {
            title: values.title,
            main: values.main,
            email: supabase.auth.user().email,
            username: supabase.auth.user().user_metadata.username,
          },
          process.env.REACT_APP_PUBLIC_KEY,
        )
        .then(
          () => {
            alert('フォームの送信に成功しました。このタブを閉じてください。')
          },
          (error) => {
            throw error
          },
        )
    } catch (error) {
      console.log('Error sending questionnaire form')
      console.log(error.error_description || error.message)
      alert(
        'フォームの送信に失敗しました。運営チーム（miraikuru0512@gmail.com）に直接メールにてお問い合わせください。',
      )
    }
  }

  return (
    <Center>
      <form onSubmit={form.onSubmit(submit)}>
        <h3>お問い合わせフォーム</h3>
        <p>タイトル</p>
        <Input
          required
          placeholder="メールの件名"
          style={{ width: 400 }}
          {...form.getInputProps('title')}
        />
        <p>本文</p>
        <Textarea
          required
          placeholder="本文"
          minRows={5}
          style={{ width: 400 }}
          {...form.getInputProps('main')}
        />
        <Group position="center" mt="md">
          <Button className='form_submit' type="submit">
            送信
          </Button>
        </Group>
      </form>
    </Center>
  )
}
