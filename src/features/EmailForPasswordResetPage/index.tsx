import { Center } from '@mantine/core'
import { FormPanel } from './FormPanel'
import { FC } from 'react'

export const EmailForResetPasswordPage: FC = () => {
  return (
    <Center>
      <h1>パスワードの再設定</h1>
      <FormPanel />
    </Center>
  )
}
