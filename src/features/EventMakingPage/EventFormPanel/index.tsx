import { FC } from "react"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { At } from "tabler-icons-react"
import { FormBaseInput } from "../../../components/Inputs/FormBaseInput"
import { FormBaseTextarea } from "../../../components/Inputs/FormBaseTextarea"
import { DateTimeInputPanel } from "./DateTimeInputPanel"
import { EventPictureInput } from "./EventPictureInput"
import { EventSearchTagInput } from "./EventSearchTagInput"

interface Props {
    register: UseFormRegister<FieldValues>
    setValue: UseFormSetValue<FieldValues>
}

export const EventFormPanel: FC<Props> = ({ register, setValue }) => {
  return(
    <>
      <h1>お手伝い基本情報入力</h1>
      <FormBaseInput
        required
        label="お手伝い、イベントの名前"
        placeholder="お手伝いの名前"
        fieldname="title"
        register={register}
      />
      <FormBaseInput
        required
        label="開催場所の住所"
        placeholder="開催場所"
        fieldname="region"
        register={register}
      />
      <FormBaseInput
        required
        label="参加して欲しい人"
        placeholder="例：農業に興味のある人"
        fieldname="target"
        register={register}
      />
      <DateTimeInputPanel />
      <FormBaseTextarea
        required
        label="お手伝い内容"
        placeholder="企画内容"
        fieldname="content"
        minRows={3}
        register={register}
      />
      <FormBaseInput
        required
        label="持ち物"
        placeholder="持ち物"
        fieldname="belongings"
        register={register}
      />
      <FormBaseInput
        required
        label="服装"
        placeholder="服装"
        fieldname="clothes"
        register={register}
      />
      <FormBaseInput
        required
        label="お礼"
        placeholder="お礼"
        fieldname="reward"
        register={register}
      />
      <FormBaseInput
        required
        label="集合場所"
        placeholder="集合場所"
        fieldname="site"
        register={register}
      />
      <FormBaseInput
        required
        label="お問い合わせ先（メールアドレス）"
        placeholder="メールアドレス"
        fieldname="inquiry"
        register={register}
        icon={<At />}
      />
      <EventSearchTagInput setValue={setValue} />
      <EventPictureInput disabled={false} />
    </>
  )
}
