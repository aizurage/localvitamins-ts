import { TextInput, Button, Group, PasswordInput, Space, Text, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { At } from 'tabler-icons-react';
import { Link, useNavigate } from 'react-router-dom';
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
      const { error, user } = await supabase.auth.signIn( values )
      if (error) throw error
      console.log(user);
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
