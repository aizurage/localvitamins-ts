import { Center, TextInput, Button, Group, PasswordInput, Space, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { supabase } from './supabaseClient';
import { useState } from 'react';
//import { ServiceTerms } from './serviceTerms';

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