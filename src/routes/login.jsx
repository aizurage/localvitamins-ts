import { TextInput, Button, Group, PasswordInput, Space, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { At } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { Center } from '@mantine/core';

export default function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Center>
      <div>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          />
          <Space h="xl" />
          <Group position="center" mt="md">
            <Button
              type="submit"
              component={Link}
              to="/eventlist"
              color="orange"
            >Submit</Button>
          </Group>
        </form>
      </div>
    </Center>

  );
}
