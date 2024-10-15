import { FC } from "react"
import { Center } from "@mantine/core"
import { FormPanel } from "./FormPanel"

export const LoginPage: FC = () => {
  return (
    <Center>
      <h1>ログイン</h1>
      <FormPanel />
    </Center>
  )
}
