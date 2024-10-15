import { FC, useState } from "react"
import { Button, LoadingOverlay } from "@mantine/core"
import { FieldValues, useForm } from "react-hook-form"
import { FormBaseInput } from "../../../components/Inputs/FormBaseInput"
import { PasswordInput } from "../../../components/Inputs/PasswordInput"
import { RegisteredAccount } from "../../../states/"
import { handleAccountSubmit } from "../controller/handleAccountSubmit"
import styles from "./index.module.css"

export const FormPanel: FC = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const submit = async (data: FieldValues) => {
    setLoading(true)
    const registeredAccount: RegisteredAccount = {
      email: data.email,
      password: data.password,
      username: data.username,
      firstname: data.firstname,
      familyname: data.familyname,
    }

    await handleAccountSubmit(registeredAccount)
      .then(() => {
        alert(
          `
            登録したメールアドレスに、アプリの案内メールが届きます。
            この画面を閉じて、メールに記載されているリンクをクリックしてください。
            新しいアプリ画面が表示されます。
          `
        )
      })
      .catch(() => {
        alert(
          `
            アカウント作成に失敗しました。
            入力に不備がないか、パスワードの書式に不備がないかどうかご確認ください。
            それでも解決しない場合は、アプリ運営チームのメールアドレス
            miraikuru0512@gmail.comにお問い合わせください。
          `
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <LoadingOverlay visible={loading} />
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
      <Button className={styles.submitButton} type="submit">
        登録する
      </Button>
    </form>
  )
}
