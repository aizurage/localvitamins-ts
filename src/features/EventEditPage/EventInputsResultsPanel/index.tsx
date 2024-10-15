/* eslint-disable camelcase */
import { FC } from "react"
import { UseFormGetValues, FieldValues } from "react-hook-form"
import { EventRecruiterResultsPanel } from "./EventRecruiterResultsPanel"
import { EventResultsPanel } from "./EventResultsPanel"

interface Props {
  getValues: UseFormGetValues<FieldValues>
}

export const EventInputsResultsPanel: FC<Props> = ({ getValues }) => {
  const formValues = getValues()
  const {
    recruiter_name,
    recruiter_introduction,
    recruiter_comment,
    ...eventData
  } = formValues

  // NOTE: もっと良いやり方ないかな↓
  const recruiter = {
    name: recruiter_name,
    introduction: recruiter_introduction,
    comment: recruiter_comment,
  }
  const event = {
    title: eventData.title,
    region: eventData.region,
    target: eventData.target,
    content: eventData.content,
    belongings: eventData.belongings,
    clothes: eventData.clothes,
    reward: eventData.reward,
    site: eventData.site,
    inquiry: eventData.inquiry,
  }

  return (
    <>
      <h1>入力情報確認</h1>
      <h3>
        入力した情報が表示されます。
        訂正がない場合は「次へ」ボタンを押してください。 訂正事項がある場合は、
        お手伝い基本情報入力画面（ステップ１、ステップ２）に戻って訂正してください。
      </h3>
      <EventResultsPanel event={event} />
      <EventRecruiterResultsPanel recruiter={recruiter} />
    </>
  )
}
