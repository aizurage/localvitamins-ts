import { FC, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { FormBaseInput } from "../../../components/Inputs/FormBaseInput"
import { Button, LoadingOverlay } from "@mantine/core"
import styles from "./index.module.css"
import { handleNewPasswordSubmit } from "../controller/handleNewPasswordSubmit"
import { useNavigate } from "react-router-dom"

export const FormPanel: FC = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const submit = async (values: FieldValues) => {
    setLoading(true)
    await handleNewPasswordSubmit(values.password)
      .then(() => {
        alert( 
          '「OK」をクリックし、パスワードの再設定が完了するまでこのままお待ちください。パスワードの設定が完了したら、ログイン画面に自動で切り替わります。'
        )
        navigate('/login')
      }).catch(() => {
        alert(
          'パスワード再設定に失敗しました。お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。',
        )
      }).finally(() => {
        setLoading(false)
      })
  }

  return(
        <form onSubmit={handleSubmit(submit)}>
          <LoadingOverlay visible={loading} />
          <FormBaseInput
              required
              register={register}
              label="パスワード"
              placeholder="新しいパスワード"
              fieldname="password"
          />
          <FormBaseInput
              required
              register={register}
              label="パスワード(確認用)"
              placeholder="新しいパスワード(確認用)"
              fieldname="conformedPassword"
          />
          <p className={styles.redChar}>
            パスワードは忘れないようにメモし、大切に保管してください。
          </p>
          <Button className={styles.submitButton} type="submit">
            提出する
          </Button>
        </form>
    )
}