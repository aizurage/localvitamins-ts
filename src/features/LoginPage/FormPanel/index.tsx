import { FC, useState } from "react"
import { FormBaseInput } from "../../../components/Inputs/FormBaseInput"
import { FieldValues, useForm } from "react-hook-form"
import { PasswordInput } from "../../../components/Inputs/PasswordInput"
import { useNavigate } from "react-router-dom"
import { PasswordResetPanel } from "../PasswordResetPanel"
import { Button, LoadingOverlay } from "@mantine/core"
import styles from "./index.module.css"
import { handleLoginDataSubmit } from "../controller/handleLoginDataSubmit"
import { LoginData } from "../../../states"
import { useAppDispatch } from "../../../app/hook"
import { login } from "../../../app/slices/userSlice"

export const FormPanel: FC = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const submit = async (values: FieldValues) => {
    setLoading(true)
    const loginData: LoginData = {
      email: values.email,
      password: values.password
    }
    await handleLoginDataSubmit(loginData)
      .then((response) => {
        dispatch(login(response))
        navigate("/")
      }).catch(() => {
        alert(
          'ログイン処理に失敗しました。メールアドレスまたはパスワードに間違いがないかどうか確認してください。それでも解決できない場合は、運営チームmiraikuru0512@gmail.comまでお問い合わせください。',
        )
      }).finally(() => {
        setLoading(false)
      })
  }
  
  return(
    <form onSubmit={handleSubmit(submit)}>
      <LoadingOverlay visible={loading} />
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
      <PasswordResetPanel />
      <Button className={styles.loginButton} type="submit">
        ログイン
      </Button>
    </form>
  )
}