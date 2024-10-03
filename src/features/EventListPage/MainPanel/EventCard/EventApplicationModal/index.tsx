import { FC } from "react"
import {
  Button,
  Group,
  Modal,
  stylesToString,
  Textarea,
  TextInput,
} from "@mantine/core"
import {
  FieldValues,
  RegisterOptions,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form"
import { At } from "tabler-icons-react"
import { FormBaseInput } from "../../../../../components/Inputs/FormBaseInput"
import { Event } from "../../../../../states"

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
  const submit = async (values) => {}

  return (
    <Modal opened={opened} onClose={() => setOpened(false)}>
      <h3>{event.title}</h3>
      <p>以下の情報を主催者に送信して、参加申請をします。</p>
      <form onSubmit={handleSubmit(submit)}>
        <h3>名前</h3>
        <div className={styles.nameInput}>
          <FormBaseInput
            required
            label="姓"
            placeholder="姓"
            fieldname="familyname"
            register={register}
          />
          <FormBaseInput
            required
            label="名"
            placeholder="名"
            fieldname="firstname"
            register={register}
          />
        </div>
        <h3>メールアドレス</h3>
        <TextInput
          icon={<At />}
          style={{ top: 20 }}
          label="メールアドレス"
          required
          {...join_event_form.getInputProps("email")}
        />
        <h3>備考</h3>
        <label htmlFor="question">
          備考（質問・特記事項などございましたら、ご記入ください↓）
        </label>
        <Textarea
          id="question"
          style={{ top: 20 }}
          autosize={true}
          {...join_event_form.getInputProps("question")}
        />
        <Button type="submit" color="red" margin="center" style={{ top: 20 }}>
          送信
        </Button>
      </form>
    </Modal>
  )
}
