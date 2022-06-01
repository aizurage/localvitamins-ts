import { TextInput, Button, Group, PasswordInput, Space, Text, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { At } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Center } from '@mantine/core';
import { supabase } from '../supabaseClient';
import {useState} from 'react';

export default function Register() {
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
  const submit = async (values) => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signUp(
        {
          email: 'example@email.com',
          password: 'example-password',
        },
        {
          data: {
            name: 'John',
            age: 27,
          }
        }
      )
      if (error) throw error
      alert('Check your email for the login link!')
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
            margin="center"
            style={{width: 500}}
            {...form.getInputProps('email')}
          />
          <Space h="xl" />
          <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password must include at least one letter, number and special character"
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
