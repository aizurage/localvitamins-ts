import { Center } from '@mantine/core'
import { FormPanel } from './FormPanel'
import { FC } from 'react'

export const LoginPage: FC = () => {

  return (
    <Center>
        <h1>ログイン</h1>
        <FormPanel />
    </Center>
  )
}
