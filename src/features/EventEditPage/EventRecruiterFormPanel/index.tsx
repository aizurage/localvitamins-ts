import { FC } from "react"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { PreviewAndEditField }
  from "../../../components/PreviewAndInput/PreviewAndEditField"
import { PreviewAndEditEventPictureField }
  from "../../../components/PreviewAndInput/PreviewAndEditPictureField"
import { EventRecruiter } from "../../../states"


interface Props {
  eventRecruiter: EventRecruiter
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export const EventRecruiterFormPanel: FC<Props> = ({
  eventRecruiter,
  register,
  setValue
}) => {
  const handlePictureChange = async () => {
    console.log("picture change")
  }

  const handleCancelButtonClick = async () => {
    console.log("cancel button click")
  }

  return(
    <>
      <h2>お手伝い募集者情報編集</h2>
      <PreviewAndEditField
        title="募集者の名前"
        content={eventRecruiter.name}
        placeholder="募集者の名前(編集後)"
        fieldname="recruiter_name"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="自己紹介文"
        content={eventRecruiter.introduction}
        placeholder="自己紹介文(編集後)"
        fieldname="recruiter_introduction"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditField
        title="一言コメント"
        content={eventRecruiter.comment}
        placeholder="一言コメント(編集後)"
        fieldname="recruiter_comment"
        register={register}
        setValue={setValue}
      />
      <PreviewAndEditEventPictureField
        pictureUrl={eventRecruiter.imageUrl}
        alt={`${eventRecruiter.name}さん`}
        onChange={handlePictureChange}
        onClick={handleCancelButtonClick}
      />
    </>
  )
}
