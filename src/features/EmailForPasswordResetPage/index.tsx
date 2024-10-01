import { FC } from 'react'
import { Center } from '@mantine/core'
import { FormPanel } from './FormPanel'

export const EmailForResetPasswordPage: FC = () => {
  return (
    <Center>
      <h1>パスワードの再設定</h1>
      <FormPanel />
    </Center>
  )
}
