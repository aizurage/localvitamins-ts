import { FC } from 'react'
import { Center } from '@mantine/core'
import { FormPanel } from './FormPanel'

export const RegisterAccountPage: FC = () => {
  return (
    <Center>
      <h1>アカウント登録</h1>
      <FormPanel />
    </Center>
  )
}
