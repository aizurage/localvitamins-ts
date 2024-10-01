import { FC } from "react"
import { UseFormRegister, FieldValues } from "react-hook-form"
import { FormBaseInput } from "../../../components/Inputs/FormBaseInput"
import { EventRecruiterPictureInput } from "./EventRecruiterPictureInput"

interface Props {
  register: UseFormRegister<FieldValues>
}

export const EventRecruiterFormPanel: FC<Props> = ({ register }) => {
  return(
    <>
      <h1>お手伝い募集者情報入力</h1>
      <FormBaseInput
        required
        label="募集者の名前"
        placeholder="お手伝い募集者の名前"
        fieldname="recruiter_name"
        register={register}
      />
      <FormBaseInput
        required
        label="自己紹介文"
        placeholder="募集者の自己紹介文"
        fieldname="recruiter_introduction"
        register={register}
      />
      <FormBaseInput
        required
        label="一言コメント"
        placeholder="募集者の一言コメント"
        fieldname="recruiter_comment"
        register={register}
      />
      <EventRecruiterPictureInput disabled={false} />
    </>
  )
}
