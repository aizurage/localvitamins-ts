import { Center, TextInput, Button, Group, Modal, PasswordInput, Space, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { supabase } from './supabaseClient';
import { useState } from 'react';

export default function Register() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      username: '',
      firstname: '',
      familyname: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

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
          data:{
            username: values.username,
            firstname: values.firstname,
            familyname: values.familyname,
          }
        }
      )
      //console.log(form.password);
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }


  const [opened, setOpened] = useState(true);
  
  return (
    <>
    <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="90%"
        withCloseButton={false}
        >
        {
          <>
            <h1>利用規約</h1>
            <ul>
              <li>収集する個人情報について</li>
              <li class="mark-list">ユーザーの氏名、及びメールアドレスを収集します。</li>
              <li>個人情報使用範囲について</li>
              <li class="mark-list">イベント企画者が、イベント参加者の情報を確認する際に使用されます。それ以外の用途では使用しません。</li>
              <li>個人情報の閲覧が可能な人について</li>
              <li class="mark-list">氏名及びメールアドレスについて、アプリ内のイベント企画者と、アプリの開発・運営チーム"localvitamins"が見ることができます。</li>
              <li>個人情報の消し方について</li>
              <li class="mark-list">アカウントを消すことで24時間以内に情報が削除されます。</li>
              <li>お問い合わせ先について</li>
              <li class="mark-list">個人情報の取扱で質問がある場合は、localvitamins 佐々木までメールでお問い合わせください。<br/>メールアドレス:wmid23lim@gmail.com</li>
            </ul>
            <p>以上の個人情報の使用条件について同意いただける場合は、「同意する」ボタンを押してください。アカウント登録画面が表示されます。</p>
            <Button
              color="red"
              onClick={() => setOpened(false)}>同意する</Button>
          </>
        }
    </Modal>
    <Center>
      <h1>アカウント登録</h1>
    </Center>
    <Center>
      <div>
        <LoadingOverlay visible={loading} />
        <form onSubmit={form.onSubmit(submit)}>
          <TextInput
              label="姓"
              style={{width: 500}}
              required
              {...form.getInputProps('familyname')}
            />
          <Space h="xl" />
          <TextInput
              label="名"
              style={{width: 500}}
              required
              {...form.getInputProps('firstname')}
            />
          <Space h="xl" />
          <TextInput
            required
            label="ユーザーネーム"
            placeholder='ユーザーネーム'
            margin="center"
            style={{width: 500}}
            {...form.getInputProps('username')}
          />
          <Space h="xl" />
          <TextInput
            required
            label="メールアドレス"
            placeholder="your@email.com"
            margin="center"
            style={{width: 500}}
            {...form.getInputProps('email')}
          />
          <Space h="xl" />
          <PasswordInput
            placeholder="パスワード"
            label="パスワード"
            description="パスワードには、文字、数字、そして特殊文字を含めてください。"
            style={{width: 500}}
            required
            {...form.getInputProps('password')}
          />
          <Space h="xl" />
          <Group position="center" mt="md">
            <Button
              type="submit"
              color="orange"
            >Submit</Button>
          </Group>
        </form>
      </div>
    </Center>
    </>
  );
}