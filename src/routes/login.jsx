import { TextInput, Button, Group, PasswordInput, Space, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { At } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { Center } from '@mantine/core';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

export default function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (values) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn( values )
      if (error) throw error
      navigate('/eventlist');
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Center>
      <div>
        <LoadingOverlay visible={loading} />
        <form onSubmit={form.onSubmit(submit)}>
          <TextInput
            required
            label="メールアドレス"
            placeholder="your@email.com"
            icon={<At />}
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

  );
}
