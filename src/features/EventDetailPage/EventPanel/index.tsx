import { FC, useEffect, useState } from "react"
import { DateTimeBlock } from "../../../components/DateTimeBlock"
import { HeadingDescriptionBlock } from "../../../components/HeadingDescriptionBlock"
import { downloadEventImage } from "../controller/downloadEventImage"
import styles from "./index.module.css"
import type { Event } from "../../../states"

export const EventPanel: FC<{ event: Event }> = ({ event }) => {
  const [eventPictureObjectURL, setEventPictureObjectURL] = useState("")
  useEffect(() => {
    ;(async () => {
      const eventPictureObjectUrl = await downloadEventImage(event.imageUrl)
      setEventPictureObjectURL(eventPictureObjectUrl)
    })()
  }, [event.imageUrl])

  return (
    <>
      <img
        className={styles.eventImageStyle}
        src={eventPictureObjectURL}
        alt={event.title}
      />
      <h1>{event.title}</h1>
      <HeadingDescriptionBlock heading="開催場所" description={event.region} />
      <DateTimeBlock
        heading="開催日時"
        date={event.date}
        from={event.period.from}
        to={event.period.to}
      />
      <HeadingDescriptionBlock
        heading="参加して欲しい人"
        description={event.target}
      />
      <HeadingDescriptionBlock
        heading="お手伝い内容"
        description={event.content}
      />
      <HeadingDescriptionBlock
        heading="持ち物"
        description={event.belongings}
      />
      <HeadingDescriptionBlock heading="服装" description={event.clothes} />
      <HeadingDescriptionBlock heading="お礼" description={event.reward} />
      <HeadingDescriptionBlock heading="集合場所" description={event.site} />
      <HeadingDescriptionBlock
        heading="お問い合わせ先"
        description={event.inquiry}
      />
    </>
  )
}
