import {
  Center,
  Button,
  Group,
  LoadingOverlay,
} from '@mantine/core'

import { At } from 'tabler-icons-react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { FormBaseInput } from '../../../components/Inputs/FormBaseInput'
import { PasswordInput } from '../../../components/Inputs/PasswordInput'
import { useForm } from 'react-hook-form'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  return (
    <Center>
        <h1>ログイン</h1>
        <div>
          <LoadingOverlay visible={loading} />
          <form onSubmit={handleSubmit(_handleSubmit)}>
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
            <p>
              パスワードを忘れた方は、下のリンクをクリックして、パスワードの再設定をしてください。
            </p>
            <Link to={'/email_resetpw'}>
              パスワードを忘れた方は、ここをクリック。
            </Link>
            <Group justify="center" align="center"  mt="md">
              <Button type="submit" color="orange">
                ログイン
              </Button>
            </Group>
          </form>
        </div>
    </Center>
  )
}
