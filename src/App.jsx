import { Button, Group, Center, Title, Space } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import ReactGA from "react-ga4"
import { useEffect } from 'react'

export default function App() {
  const location = useLocation()

  useEffect( () => {
    ReactGA.initialize("G-QJHNC9DXV9")
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname,
    })
  }, [location])
  
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
  )
}
