import { Center } from '@mantine/core'
import { FormPanel } from './FormPanel'
import { FC } from 'react'

export const RegisterAccountPage: FC = () => {
  return (
    <Center>
      <h1>アカウント登録</h1>
      <FormPanel />
    </Center>
  )
}
