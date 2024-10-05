import { FC } from "react"
import { Button, Modal } from "@mantine/core"
import { FieldValues, useForm } from "react-hook-form"
import { At } from "tabler-icons-react"
import { FormBaseInput } from "../../../../../components/Inputs/FormBaseInput"
import { FormBaseTextarea }
  from "../../../../../components/Inputs/FormBaseTextarea"
import { Event, EventApplicationForm } from "../../../../../states"
import { sendEventApplication } from "../controller/sendEventApplication"
import styles from "./index.module.css"

interface Props {
  event: Event
  opened: boolean
  setOpened: (arg0: boolean) => void
}

export const EventApplicationModal: FC<Props> = ({
  event,
  opened,
  setOpened,
}) => {
  const { register, handleSubmit } = useForm()
  const submit = async (values: FieldValues) => {
    const formValue: EventApplicationForm = {
      eventId: Number(event.eventID),
      eventTitle: event.title,
      firstName: values.firstName,
      familyName: values.familyName,
      email: values.email,
      question: values.question
    }
    await sendEventApplication(formValue)
      .then(() => {
        alert('参加申請が完了しました。このタブを閉じてください。')
      }).catch(() => {
        alert(
          `
            参加申請処理に失敗しました。
            お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。
          `
        )
      })
  }

  return (
    <Modal opened={opened} onClose={() => setOpened(false)}>
      <h3>{event.title}</h3>
      <p>以下の情報を主催者に送信して、参加申請をします。</p>
      <form onSubmit={handleSubmit(submit)}>
        <h4>名前</h4>
        <div className={styles.nameInput}>
          <FormBaseInput
            required
            label="姓"
            placeholder="姓"
            fieldname="familyName"
            register={register}
          />
          <FormBaseInput
            required
            label="名"
            placeholder="名"
            fieldname="firstName"
            register={register}
          />
        </div>
        <h4>メールアドレス</h4>
        <FormBaseInput
          required
          label="メールアドレス"
          placeholder="example@gmail.com"
          fieldname="email"
          register={register}
          icon={<At />}
        />
        <h4>備考</h4>
        <FormBaseTextarea
          required={false}
          placeholder="備考（質問・特記事項などございましたら、ご記入ください）"
          fieldname="question"
          minRows={1}
          autoSize
          register={register}
        />
        <Button type="submit" className={styles.submitButton}>
          送信
        </Button>
      </form>
    </Modal>
  )
}
