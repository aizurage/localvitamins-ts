import { FC } from "react"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { At } from "tabler-icons-react"
import { PreviewAndEditDateTimeField }
  from "../../../components/PreviewAndInput/PreviewAndEditDateTimeField"
import { PreviewAndEditField }
  from "../../../components/PreviewAndInput/PreviewAndEditField"
import { PreviewAndEditEventPictureField }
  from "../../../components/PreviewAndInput/PreviewAndEditPictureField"
import type { Event } from "./../../../states"

interface Props {
  event: Event
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export const EventFormPanel: FC<Props> = ({ event, register, setValue }) => {
  const handlePictureChange = async () => {

    // TODO: 処理の内容を書くこと
    console.log("picture change")
  }

  const handleCancelButtonClick = async () => {

    // TODO: 処理の内容を書くこと
    console.log("cancel button click")
  }

  return (
    <>
      <h2>お手伝い情報編集</h2>
      <PreviewAndEditField
        title="お手伝い、イベントの名前"
        content={event.title}
        placeholder="お手伝いの名前(編集後)"
        fieldname="title"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="開催場所の住所"
        content={event.region}
        placeholder="開催場所(編集後)"
        fieldname="region"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="参加して欲しい人"
        content={event.target}
        placeholder="例：農業に興味のある人(編集後)"
        fieldname="target"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditDateTimeField
        date={event.date}
        start={event.period.from}
        end={event.period.to}
      />
      <PreviewAndEditField
        title="お手伝い内容"
        content={event.content}
        placeholder="企画内容(編集後)"
        fieldname="content"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="持ち物"
        content={event.belongings}
        placeholder="持ち物(編集後)"
        fieldname="belongings"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="服装"
        content={event.clothes}
        placeholder="服装(編集後)"
        fieldname="clothes"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="お礼"
        content={event.reward}
        placeholder="お礼(編集後)"
        fieldname="reward"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="集合場所"
        content={event.site}
        placeholder="集合場所(編集後)"
        fieldname="site"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="お問い合わせ先（メールアドレス）"
        content={event.inquiry}
        placeholder="メールアドレス(編集後)"
        fieldname="inquiry"
        register={register}
        setValue={setValue}
        icon={<At />}
      />
      <PreviewAndEditEventPictureField
        pictureUrl={event.imageUrl}
        alt={event.title}
        onChange={handlePictureChange}
        onClick={handleCancelButtonClick}
      />
    </>
  )
}
