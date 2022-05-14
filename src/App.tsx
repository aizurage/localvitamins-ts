import { Button, Group, Container, Center, Title, Space } from '@mantine/core';
import { Link } from 'react-router-dom';
//import './App.css';

function App() {
  return (
    <>
        <Space h="xl"/>
        <Center>
          <h1>企画運営アプリ</h1>
        </Center>
        <Space h="xl"/>
        <Center>
          <Title order={1}>Local Vitamins</Title>
        </Center>
        <Space h="xl"/>
        <Group position="center">
          <Button
            className="app"
            component="a"
            href="https://forms.gle/4N7M3BcZf4k2ffQj6"
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

export default App;
