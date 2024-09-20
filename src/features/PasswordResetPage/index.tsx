import { Center } from '@mantine/core'
import { FormPanel } from './FormPanel'

export default function PasswordResetPage() {
  return (
    <Center>
      <h1>パスワードの再設定</h1>
      <p>これから使用する新しいパスワードを入力してください。</p>
      <FormPanel />
    </Center>
  )
}
