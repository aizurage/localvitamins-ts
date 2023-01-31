import { Button, Group, Center, Title, Space } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <>
        <Space h="xl"/>
        <Center>
          <h1>お手伝いマッチングアプリ</h1>
        </Center>
        <Space h="xl"/>
        <Center>
          <Title order={1}>Local Vitamins</Title>
        </Center>
        <Space h="xl"/>
        <Group position="center">
          <Button
            className="app"
            component={Link}
            to="/serviceTerms"
            color="lime"
          >
          ユーザー登録</Button> {" "}

          <Button
            className="app"
            component={Link}
            to="/login"
            color="lime"
          >
          ログイン</Button>
        </Group>
    </>
  );
}
