import { Center, Button, Group, LoadingOverlay } from '@mantine/core'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { FormBaseInput } from '../../../components/Inputs/FormBaseInput'
import { PasswordInput } from '../../../components/Inputs/PasswordInput'
import { submitContents } from '../controller/handleSubmit'
import { RegisteredAccountProps } from '../controller/state'

export function RegisterAccountPage() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const _handleSubmit = (data: FieldValues) => {
    setLoading(true)
    const _data: RegisteredAccountProps = {
      email: data.email,
      password: data.password,
      username: data.username,
      firstname: data.firstname,
      familyname: data.familyname,
    }
    submitContents(_data)
  }

  return (
    <Center>
      <h1>アカウント登録</h1>
      <LoadingOverlay visible={loading} />
      <form onSubmit={handleSubmit(_handleSubmit)}>
        <FormBaseInput
          required={true}
          label="姓"
          placeholder="姓"
          fieldname="familyName"
          register={register}
        />
        <FormBaseInput
          required={true}
          label="名"
          placeholder="名"
          fieldname="firstName"
          register={register}
        />
        <FormBaseInput
          required={true}
          label="ユーザーネーム"
          placeholder="ユーザーネーム"
          fieldname="username"
          register={register}
        />
        <FormBaseInput
          required={true}
          label="メールアドレス"
          placeholder="your@email.com"
          fieldname="email"
          register={register}
        />
        <PasswordInput
          required={true}
          label="パスワード"
          placeholder="パスワード"
          fieldname="password"
          description="パスワードには、文字、数字、そして特殊文字を含めてください。"
          register={register}
        />
        <Group 
          justify="center"
          align="center" 
          mt="md"
        >
          <Button type="submit" color="orange">
            Submit
          </Button>
        </Group>
      </form>
    </Center>
  )
}
