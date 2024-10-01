import { FC, useState } from "react"
import { Button } from "@mantine/core"
import { FieldValues, useForm } from "react-hook-form"
import { At } from "tabler-icons-react"
import { FormBaseInput } from "../../../components/Inputs/FormBaseInput"
import { WariningPanel } from "../WarningPanel"
import { handleEmailSubmit } from "../controller/handleEmailSubmit"
import styles from "./index.module.css"

export const FormPanel: FC = () => {
    const [submitted, setSubmitted] = useState(false)
    const { register, handleSubmit } = useForm()

    const submit = async (values: FieldValues) => {
        setSubmitted(true)
        await handleEmailSubmit(values.email)
        .catch(() => {
            alert(
            'メール送信に失敗しました。運営チーム (miraikuru0512@gmail.com) にお問い合わせください。',
            )
        })
    }

    return(
        <>
            <form onSubmit={handleSubmit(submit)}>
                <p>アカウントに登録したメールアドレスを入力してください。</p>
                <FormBaseInput
                    required={true}
                    label="メールアドレス"
                    placeholder="your@email.com"
                    fieldname="email"
                    register={register}
                    icon={<At />}
                />
                <Button className={styles.submitButton} type="submit">
                    送信する
                </Button>
            </form>
            {submitted && <WariningPanel />}
        </>
    )
}